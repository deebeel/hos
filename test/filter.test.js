"use strict";
const filter = require("../lib/filter.js");


describe("#filter", ()=>{
  it("should apply predicate to the imput data and ether propagate it or not", (done)=>{
    const stream = filter((i, cb) => cb(null, i % 2 === 0));
    const res = [];
    stream.write(1);
    stream.write(2);
    stream.write(3);
    stream.end();
    stream.on("data", (data) => {
      res.push(data);
    });
    stream.on("end", () => {
      res.should.be.eql([2]);
      done();
    });
  });
});
