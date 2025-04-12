self.addEventListener("message", (e) => {
    const { sharedBuffer } = e.data;
    const sharedArray = new Int32Array(sharedBuffer);

    Atomics.store(sharedArray, 1, 11);

    setTimeout(() => {
        Atomics.store(sharedArray, 0, 0);
        Atomics.notify(sharedArray, 0, 1);
    }, 5000)
})