"use strict";
const partition = require("../lib/partition");


describe("#partition", ()=> {
  it("should take data and collect it by parts", (done)=>{
    const stream = partition(3);
    const acc = [];
    for(let i = 1; i < 8; i++) {
      stream.write(i);
    }
    stream.end();
    stream.on("data", (data) => {
      acc.push(data);
    });
    stream.on("end", () => {
      acc.should.be.eql([[1, 2, 3], [4, 5, 6], [7]]);
      done();
    });
  });
});
