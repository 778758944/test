self.addEventListener("message", (e) => {
    // const { sharedBuffer } = e.data;
    // const sharedArray = new Int32Array(sharedBuffer);
    // console.log(sharedArray[1]);

    // atomics way: prevent from opt
    // while(Atomics.load(sharedArray, 1) !== 11) {
    //     console.log("not 11 atomic");
    // }

    // while(sharedArray[1] !== 11) {
    //     console.log("not 11");
    // }

    // Atomics.wait(sharedArray, 0, 0);
    // console.log(sharedArray[0]);

    const { sharedArray } = e.data;
    console.log(sharedArray[0]);
    sharedArray[0] = 99;
})