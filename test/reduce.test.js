"use strict";
const reduce = require("../lib/reduce.js");


describe("#reduce", ()=>{
  
  it("should reduce data with to the target", (done)=>{
    const stream = reduce((acc, i, cb) => cb(null, acc * i), 1);
    let res = 0;
    let count = 0;
    stream.write(3);
    stream.write(2);
    stream.write(3);
    stream.end();

    stream.on("data", (data) => {
      res = data;
      count++;
    });
    stream.on("end", () => {
      res.should.be.eql(18);
      count.should.be.eql(1);
      done();
    });
  });
});
