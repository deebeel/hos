"use strict";

const Common = require("./common");
const util = require("util");


function Filter(predicate, opts){
  Common.call(this, (chunk, cb) => predicate(chunk, (err, res) => {
    if(err){
      return cb(err);
    }
    const args = [];
    if (res) {
      args.push(null, chunk);
    }
    cb.apply(this, args);
  }), opts);
}

util.inherits(Filter, Common);


module.exports = function createFilter(predicate, opts){
  return new Filter(predicate, opts);
};

