"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
function A(msg) {
    console.log(`A:${msg}`);
}
function B(msg) {
    console.log(`B:${msg}`);
}
function test() {
    var ee = new events_1.EventEmitter();
    ee.on("a", A);
    ee.on("a", B);
    ee.removeListener("a", A);
    ee.emit("a", "111");
}
exports.test = test;
//# sourceMappingURL=test.js.map