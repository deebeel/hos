"use strict";


const Transform = require("stream").Transform;
const util = require("util");



function Common(callable, opts){
  if (!(this instanceof Common)){
    return new Common(callable, opts);
  }

  if (!opts) {
    opts = {};
  }
  Transform.call(this, {
    objectMode: true,
    highWaterMark: opts.highWaterMark || 16
  });

  this._callable = callable;
}

util.inherits(Common, Transform);

Common.prototype._handleInterimResult = function handleInterimResult(result){
  if (typeof result !== "undefined") {
    this.push.apply(this, arguments);
  }
};


Common.prototype._transform = function _transform(chunk, enc, callback){
  this._callable(chunk, function(err){
    if (err) {
      this.emit("error", err);
    }
    this._handleInterimResult
      .apply(this, Array.prototype.slice.call(arguments, 1));
    callback();
  }.bind(this));
};



module.exports = Common;


