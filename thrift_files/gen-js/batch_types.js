//
// Autogenerated by Thrift Compiler (0.12.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


Unit = function(args) {
  this.CPUUtilization_Average = null;
  this.NetworkIn_Average = null;
  this.NetworkOut_Average = null;
  this.MemoryUtilization_Average = null;
  this.Final_Target = null;
  if (args) {
    if (args.CPUUtilization_Average !== undefined && args.CPUUtilization_Average !== null) {
      this.CPUUtilization_Average = args.CPUUtilization_Average;
    }
    if (args.NetworkIn_Average !== undefined && args.NetworkIn_Average !== null) {
      this.NetworkIn_Average = args.NetworkIn_Average;
    }
    if (args.NetworkOut_Average !== undefined && args.NetworkOut_Average !== null) {
      this.NetworkOut_Average = args.NetworkOut_Average;
    }
    if (args.MemoryUtilization_Average !== undefined && args.MemoryUtilization_Average !== null) {
      this.MemoryUtilization_Average = args.MemoryUtilization_Average;
    }
    if (args.Final_Target !== undefined && args.Final_Target !== null) {
      this.Final_Target = args.Final_Target;
    }
  }
};
Unit.prototype = {};
Unit.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.DOUBLE) {
        this.CPUUtilization_Average = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.DOUBLE) {
        this.NetworkIn_Average = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.DOUBLE) {
        this.NetworkOut_Average = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.DOUBLE) {
        this.MemoryUtilization_Average = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.DOUBLE) {
        this.Final_Target = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Unit.prototype.write = function(output) {
  output.writeStructBegin('Unit');
  if (this.CPUUtilization_Average !== null && this.CPUUtilization_Average !== undefined) {
    output.writeFieldBegin('CPUUtilization_Average', Thrift.Type.DOUBLE, 1);
    output.writeDouble(this.CPUUtilization_Average);
    output.writeFieldEnd();
  }
  if (this.NetworkIn_Average !== null && this.NetworkIn_Average !== undefined) {
    output.writeFieldBegin('NetworkIn_Average', Thrift.Type.DOUBLE, 2);
    output.writeDouble(this.NetworkIn_Average);
    output.writeFieldEnd();
  }
  if (this.NetworkOut_Average !== null && this.NetworkOut_Average !== undefined) {
    output.writeFieldBegin('NetworkOut_Average', Thrift.Type.DOUBLE, 3);
    output.writeDouble(this.NetworkOut_Average);
    output.writeFieldEnd();
  }
  if (this.MemoryUtilization_Average !== null && this.MemoryUtilization_Average !== undefined) {
    output.writeFieldBegin('MemoryUtilization_Average', Thrift.Type.DOUBLE, 4);
    output.writeDouble(this.MemoryUtilization_Average);
    output.writeFieldEnd();
  }
  if (this.Final_Target !== null && this.Final_Target !== undefined) {
    output.writeFieldBegin('Final_Target', Thrift.Type.DOUBLE, 5);
    output.writeDouble(this.Final_Target);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Batch = function(args) {
  this.batch_id = null;
  this.units = [];
  if (args) {
    if (args.batch_id !== undefined && args.batch_id !== null) {
      this.batch_id = args.batch_id;
    }
    if (args.units !== undefined && args.units !== null) {
      this.units = Thrift.copyList(args.units, [Unit]);
    }
  }
};
Batch.prototype = {};
Batch.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.batch_id = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        this.units = [];
        var _rtmp31 = input.readListBegin();
        var _size0 = _rtmp31.size || 0;
        for (var _i2 = 0; _i2 < _size0; ++_i2) {
          var elem3 = null;
          elem3 = new Unit();
          elem3.read(input);
          this.units.push(elem3);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Batch.prototype.write = function(output) {
  output.writeStructBegin('Batch');
  if (this.batch_id !== null && this.batch_id !== undefined) {
    output.writeFieldBegin('batch_id', Thrift.Type.I32, 1);
    output.writeI32(this.batch_id);
    output.writeFieldEnd();
  }
  if (this.units !== null && this.units !== undefined) {
    output.writeFieldBegin('units', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRUCT, this.units.length);
    for (var iter4 in this.units) {
      if (this.units.hasOwnProperty(iter4)) {
        iter4 = this.units[iter4];
        iter4.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ServerResponse = function(args) {
  this.RFWID = null;
  this.batches = [];
  this.last_batch_id = null;
  if (args) {
    if (args.RFWID !== undefined && args.RFWID !== null) {
      this.RFWID = args.RFWID;
    }
    if (args.batches !== undefined && args.batches !== null) {
      this.batches = Thrift.copyList(args.batches, [Batch]);
    }
    if (args.last_batch_id !== undefined && args.last_batch_id !== null) {
      this.last_batch_id = args.last_batch_id;
    }
  }
};
ServerResponse.prototype = {};
ServerResponse.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.RFWID = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        this.batches = [];
        var _rtmp36 = input.readListBegin();
        var _size5 = _rtmp36.size || 0;
        for (var _i7 = 0; _i7 < _size5; ++_i7) {
          var elem8 = null;
          elem8 = new Batch();
          elem8.read(input);
          this.batches.push(elem8);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.last_batch_id = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ServerResponse.prototype.write = function(output) {
  output.writeStructBegin('ServerResponse');
  if (this.RFWID !== null && this.RFWID !== undefined) {
    output.writeFieldBegin('RFWID', Thrift.Type.STRING, 1);
    output.writeString(this.RFWID);
    output.writeFieldEnd();
  }
  if (this.batches !== null && this.batches !== undefined) {
    output.writeFieldBegin('batches', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRUCT, this.batches.length);
    for (var iter9 in this.batches) {
      if (this.batches.hasOwnProperty(iter9)) {
        iter9 = this.batches[iter9];
        iter9.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.last_batch_id !== null && this.last_batch_id !== undefined) {
    output.writeFieldBegin('last_batch_id', Thrift.Type.I32, 3);
    output.writeI32(this.last_batch_id);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientRequest = function(args) {
  this.RFWID = null;
  this.batch_id = null;
  this.batch_unit = null;
  this.batch_size = null;
  this.benchmark_type = null;
  this.dataset_type = null;
  this.cpu = null;
  this.net_in = null;
  this.net_out = null;
  this.mem = null;
  this.final = null;
  if (args) {
    if (args.RFWID !== undefined && args.RFWID !== null) {
      this.RFWID = args.RFWID;
    }
    if (args.batch_id !== undefined && args.batch_id !== null) {
      this.batch_id = args.batch_id;
    }
    if (args.batch_unit !== undefined && args.batch_unit !== null) {
      this.batch_unit = args.batch_unit;
    }
    if (args.batch_size !== undefined && args.batch_size !== null) {
      this.batch_size = args.batch_size;
    }
    if (args.benchmark_type !== undefined && args.benchmark_type !== null) {
      this.benchmark_type = args.benchmark_type;
    }
    if (args.dataset_type !== undefined && args.dataset_type !== null) {
      this.dataset_type = args.dataset_type;
    }
    if (args.cpu !== undefined && args.cpu !== null) {
      this.cpu = args.cpu;
    }
    if (args.net_in !== undefined && args.net_in !== null) {
      this.net_in = args.net_in;
    }
    if (args.net_out !== undefined && args.net_out !== null) {
      this.net_out = args.net_out;
    }
    if (args.mem !== undefined && args.mem !== null) {
      this.mem = args.mem;
    }
    if (args.final !== undefined && args.final !== null) {
      this.final = args.final;
    }
  }
};
ClientRequest.prototype = {};
ClientRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.RFWID = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.batch_id = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.batch_unit = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.batch_size = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.benchmark_type = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.dataset_type = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.cpu = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.STRING) {
        this.net_in = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.STRING) {
        this.net_out = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 10:
      if (ftype == Thrift.Type.STRING) {
        this.mem = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 11:
      if (ftype == Thrift.Type.STRING) {
        this.final = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ClientRequest.prototype.write = function(output) {
  output.writeStructBegin('ClientRequest');
  if (this.RFWID !== null && this.RFWID !== undefined) {
    output.writeFieldBegin('RFWID', Thrift.Type.STRING, 1);
    output.writeString(this.RFWID);
    output.writeFieldEnd();
  }
  if (this.batch_id !== null && this.batch_id !== undefined) {
    output.writeFieldBegin('batch_id', Thrift.Type.I32, 2);
    output.writeI32(this.batch_id);
    output.writeFieldEnd();
  }
  if (this.batch_unit !== null && this.batch_unit !== undefined) {
    output.writeFieldBegin('batch_unit', Thrift.Type.I32, 3);
    output.writeI32(this.batch_unit);
    output.writeFieldEnd();
  }
  if (this.batch_size !== null && this.batch_size !== undefined) {
    output.writeFieldBegin('batch_size', Thrift.Type.I32, 4);
    output.writeI32(this.batch_size);
    output.writeFieldEnd();
  }
  if (this.benchmark_type !== null && this.benchmark_type !== undefined) {
    output.writeFieldBegin('benchmark_type', Thrift.Type.STRING, 5);
    output.writeString(this.benchmark_type);
    output.writeFieldEnd();
  }
  if (this.dataset_type !== null && this.dataset_type !== undefined) {
    output.writeFieldBegin('dataset_type', Thrift.Type.STRING, 6);
    output.writeString(this.dataset_type);
    output.writeFieldEnd();
  }
  if (this.cpu !== null && this.cpu !== undefined) {
    output.writeFieldBegin('cpu', Thrift.Type.STRING, 7);
    output.writeString(this.cpu);
    output.writeFieldEnd();
  }
  if (this.net_in !== null && this.net_in !== undefined) {
    output.writeFieldBegin('net_in', Thrift.Type.STRING, 8);
    output.writeString(this.net_in);
    output.writeFieldEnd();
  }
  if (this.net_out !== null && this.net_out !== undefined) {
    output.writeFieldBegin('net_out', Thrift.Type.STRING, 9);
    output.writeString(this.net_out);
    output.writeFieldEnd();
  }
  if (this.mem !== null && this.mem !== undefined) {
    output.writeFieldBegin('mem', Thrift.Type.STRING, 10);
    output.writeString(this.mem);
    output.writeFieldEnd();
  }
  if (this.final !== null && this.final !== undefined) {
    output.writeFieldBegin('final', Thrift.Type.STRING, 11);
    output.writeString(this.final);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

