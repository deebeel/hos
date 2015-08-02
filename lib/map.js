"use strict";
const util = require("util");
const Common = require("./common.js");


function Map(mapper, opts){
  Common.call(this, mapper, opts);
}

util.inherits(Map, Common);


module.exports = function createMap(mapper, opts){
  return new Map(mapper, opts);
};

