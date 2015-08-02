"use strict";
const map = require("../lib/map.js");


describe("#map", ()=>{
  it("should map data with mapper", (done)=>{
    const stream = map((i, cb) => cb(null, i * i));
    const res = [];

    stream.write(1);
    stream.write(2);
    stream.write(3);
    stream.end();

    stream.on("data", (data) => {
      res.push(data);
    });
    stream.on("end", () => {
      res.should.be.eql([1, 4, 9]);
      done();
    });
  });
});
