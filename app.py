import json

import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from thrift.protocol import TJSONProtocol
from thrift.server import TServer
from thrift.transport import TTransport

from thrift_files.genpy.batch import ParseRequest
from thrift_files.genpy.batch.ttypes import Unit, Batch, ServerResponse

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

DVD_training_data = pd.read_csv('WorkloadData/DVD-training.csv')
DVD_testing_data = pd.read_csv('WorkloadData/DVD-testing.csv')
NDBench_training_data = pd.read_csv('WorkloadData/NDBench-training.csv')
NDBench_testing_data = pd.read_csv('WorkloadData/NDBench-testing.csv')


def get_batches(data, batch_id, batch_unit, batch_size, metric):
    """
    :param data: pandas data frame
    :param batch_id: int, start from 0;
    :param batch_unit: size of single batch;
    :param batch_size: num of batches;
    :param metric: list, which columns should return;
    :return: simples in json format
    """
    return_simples = {}
    start_index = batch_id * batch_unit
    for i in range(batch_size):
        single_batch = json.loads(
            data.iloc[start_index:start_index + batch_unit].loc[:, metric].to_json(orient='records'))
        return_simples[batch_id + i] = single_batch
        start_index += batch_unit
    return return_simples


@app.route('/api/v1/batches', methods=['POST'])
def get_json_samples():
    requests = json.loads(request.get_data())
    RFWID = requests['RFWID']
    batch_id = int(requests['batch_id'])
    batch_unit = int(requests['batch_unit'])
    batch_size = int(requests['batch_size'])
    benchmark_type = requests['benchmark_type']
    dataset_type = requests['dataset_type']
    cpu = requests['cpu'] if 'cpu' in requests.keys() else None
    net_in = requests['net_in'] if 'net_in' in requests.keys() else None
    net_out = requests['net_out'] if 'net_out' in requests.keys() else None
    mem = requests['mem'] if 'mem' in requests.keys() else None
    final = requests['final'] if 'final' in requests.keys() else None
    metric = []
    simples = {}
    for i in [cpu, net_in, net_out, mem, final]:
        if i is not None: metric.append(i)
    if dataset_type == 'train' and benchmark_type == 'dell':
        simples = get_batches(DVD_training_data, batch_id, batch_unit, batch_size, metric)
    elif dataset_type == 'test' and benchmark_type == 'dell':
        simples = get_batches(DVD_testing_data, batch_id, batch_unit, batch_size, metric)
    elif dataset_type == 'train' and benchmark_type == 'netflix':
        simples = get_batches(NDBench_training_data, batch_id, batch_unit, batch_size, metric)
    elif dataset_type == 'test' and benchmark_type == 'netflix':
        simples = get_batches(NDBench_testing_data, batch_id, batch_unit, batch_size, metric)
    data = {'RFWID': RFWID, 'batches': simples, 'last_batch_id': batch_id + batch_size - 1}
    return jsonify(data)


class ParseRequestHandler:
    def parse_request(self, req):
        RFWID = req.RFWID
        batch_id = req.batch_id
        batch_unit = req.batch_unit
        batch_size = req.batch_size
        benchmark_type = req.benchmark_type
        dataset_type = req.dataset_type
        cpu = req.cpu
        net_in = req.net_in
        net_out = req.net_out
        mem = req.mem
        final = req.final
        metric = []
        for i in [cpu, net_in, net_out, mem, final]:
            if i is not None: metric.append(i)
        if dataset_type == 'train' and benchmark_type == 'dell':
            resp, last_batch_id = get_batches_for_bin(DVD_training_data, batch_id, batch_unit, batch_size, metric)
        elif dataset_type == 'test' and benchmark_type == 'dell':
            resp, last_batch_id = get_batches_for_bin(DVD_testing_data, batch_id, batch_unit, batch_size, metric)
        elif dataset_type == 'train' and benchmark_type == 'netflix':
            resp, last_batch_id = get_batches_for_bin(NDBench_training_data, batch_id, batch_unit, batch_size, metric)
        elif dataset_type == 'test' and benchmark_type == 'netflix':
            resp, last_batch_id = get_batches_for_bin(NDBench_testing_data, batch_id, batch_unit, batch_size, metric)
        resp.RFWID = RFWID
        resp.last_batch_id = last_batch_id
        return resp


def get_batches_for_bin(data, batch_id, batch_unit, batch_size, metric):
    resp = ServerResponse()
    batches = []
    start_index = batch_id * batch_unit
    for i in range(batch_size):
        single_batch = data.iloc[start_index:start_index + batch_unit].loc[:, metric]
        row_num = single_batch.shape[0]
        batch = Batch()
        units = []
        for j in range(row_num):
            units.append(Unit(**single_batch.iloc[j].to_dict()))
        batch.units = units
        batch.batch_id = batch_id + i
        batches.append(batch)
        start_index += batch_unit
    resp.batches = batches
    return resp, batch.batch_id


handler = ParseRequestHandler()
processor = ParseRequest.Processor(handler)
protocol = TJSONProtocol.TJSONProtocolFactory()
server = TServer.TServer(processor, None, None, None, protocol, protocol)


@app.route('/api/v2/batches', methods=['POST'])
def get_binary_samples():
    itrans = TTransport.TMemoryBuffer(request.data)
    otrans = TTransport.TMemoryBuffer()
    iprot = server.inputProtocolFactory.getProtocol(itrans)
    oprot = server.outputProtocolFactory.getProtocol(otrans)
    server.processor.process(iprot, oprot)
    return otrans.getvalue()


if __name__ == '__main__':
    app.run(debug=True)
