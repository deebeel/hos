"use strict";
const util = require("util");
const Common = require("./common.js");
function Partition(size, opts){
  Common.call(this, opts);
  this._size = size || 1;
  this._buffer = [];
}

util.inherits(Partition, Common);

Partition.prototype._transform = function transform(chunk, enc, callback){
  this._buffer.push(chunk);
  if (this._buffer.length === this._size) {
    this.push(this._buffer);
    this._buffer = [];
  }
  callback();
};


Partition.prototype._flush = function flush(callback){
    if(this._buffer.length > 0){
      this.push(this._buffer);
    }
    callback();
};


module.exports = function createPartition(size, highWaterMark){
  return new Partition(size, highWaterMark);
};

