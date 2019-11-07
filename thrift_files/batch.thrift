struct Unit {
    1: double CPUUtilization_Average,
    2: double NetworkIn_Average,
    3: double NetworkOut_Average,
    4: double MemoryUtilization_Average,
    5: double Final_Target
}

struct Batch {
    1: i32 batch_id,
    2: list<Unit> units=[]

}

/**
 * Attention: in python, if you want to use List, like `units` and `batches` here,
 * you must init them with `= []`, or they will be empty after you generate .py files with thrift command
 */

struct ServerResponse {
    1: string RFWID,
    2: list<Batch> batches=[],
    3: i32 last_batch_id
}

struct ClientRequest {
    1: string RFWID,
    2: i32 batch_id,
    3: i32 batch_unit,
    4: i32 batch_size,
    5: string benchmark_type,
    6: string dataset_type,
    7: string cpu,
    8: string net_in,
    9: string net_out,
    10: string mem,
    11: string final
}


service ParseRequest{
    ServerResponse parse_request(1: ClientRequest r)
}


