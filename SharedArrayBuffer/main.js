// const worker = new Worker("worker.js");
// const worker2 = new Worker("worker2.js");

const sharedBuffer = new SharedArrayBuffer(10 * Int32Array.BYTES_PER_ELEMENT);
const sharedArray = new Int32Array(sharedBuffer);
const btn = document.getElementById("btn");

const worker = new Worker('./worker.js');
sharedArray[0] = 100;

worker.postMessage({ sharedArray });

setTimeout(() => {
    console.log(sharedArray[0]);
}, 5000)

btn.onclick = () => {
    // const tab2 = window.open("http://localhost:8000/SharedArrayBuffer/subpage.html", "_blank", "popup");
    // setTimeout(() => {
    //     Atomics.store(sharedArray, 1, 11);
    //     tab2.postMessage({ name: "Jack" });
    // }, 3000);
    // tab2.postMessage({ sharedBuffer });
}



// worker.postMessage({ sharedBuffer });
// worker2.postMessage({ sharedBuffer });



// const sharedBuffer = new SharedArrayBuffer(1 * Int32Array.BYTES_PER_ELEMENT);
// const sharedArray = new Int32Array(sharedBuffer);




