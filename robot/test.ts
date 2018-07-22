import { EventEmitter } from "events";


function A(msg: string) {
    console.log(`A:${msg}`);
}

function B(msg: string) {
    console.log(`B:${msg}`);
}

export function test() {
    var ee = new EventEmitter();
    ee.on("a", A);
    ee.on("a", B);
    ee.removeListener("a", A);
    ee.emit("a", "111");
}

