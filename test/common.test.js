"use strict";
const common = require("../lib/common");


describe("#common", ()=>{
  it("should emit an error", (done)=>{
    const stream = common((i, cb) => setImmediate(() => {
      cb(new Error("error"));
    }));
    stream.write(2);
    stream.end();
    stream.on("error", (err)=>{
      err.should.be.an.Error();
      err.message.should.be.eql("error");
      done();
    });
  });
  it("should invoke passed function and the emit it as a data event", (done)=>{
    const stream = common((i, cb) => cb(null, i));
    const res = [];
    stream.write(3);
    stream.write(2);
    stream.write(3);
    stream.end();

    stream.on("data", (data) => {
      res.push(data);
    });
    stream.on("end", () => {
      res.should.be.eql([3, 2, 3]);
      done();
    });
  });
});
