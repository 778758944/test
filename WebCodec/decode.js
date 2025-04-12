let decoder = null;
(async function initDecode() {
    const cvs = document.getElementById("cvs");
    const ctx = cvs.getContext("2d");
    let peddingFrames = [];
    let underflow = true;
    let baseTime = 0;

    function handleFrame(frame) {
        console.log('decode frame: ', frame);
        peddingFrames.push(frame);
        if (underflow) setTimeout(renderFrame, 0);
    }

    function calculateTimeUntilNextFrame(timestamp) {
        if (baseTime === 0) baseTime = performance.now();
        const frameTime = performance.now() - baseTime;
        return Math.max(0, timestamp/1000 - frameTime);
    }

    async function renderFrame() {
        underflow = peddingFrames.length === 0;
        if (underflow) return;

        const frame = peddingFrames.shift();
        const renderTime = calculateTimeUntilNextFrame(frame.timestamp);
        await new Promise((r) => {
            setTimeout(r, renderTime);
        });

        ctx.drawImage(frame, 0, 0);
        frame.close();

        setTimeout(renderFrame, 0);
    }

    const init = {
        output: handleFrame,
        error: (err) => { console.log(err) }
    };

    const config = {
        // codec: "avc1.64001F",
        codec: 'avc1.64001F',
        codedWidth: 1280,
        codedHeight: 720
    }

    const { supported } = await VideoDecoder.isConfigSupported(config);
    if (supported) {
        decoder = new VideoDecoder(init);
        decoder.configure(config);
    } else {
        console.log("decode init err");
    }
})();