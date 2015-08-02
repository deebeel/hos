"use strict";

const Common = require("./common");
const util = require("util");


function Reduce(reducer, accumulator, opts){
  this._accumulator = accumulator;
  Common.call(this, (chunk, cb) => reducer(this._accumulator, chunk, cb), opts);
}

util.inherits(Reduce, Common);


Reduce.prototype._handleInterimResult = function handleInterimResult(result){
  this._accumulator = result;
};

Reduce.prototype._flush = function flush(callback){
  this.push(this._accumulator);
  callback();
};

module.exports = function createReduce(reducer, accumulator, opts){
  return new Reduce(reducer, accumulator, opts);
};

