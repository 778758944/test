// init encoder
function handleChunk(chunk, metadata) {
    // console.log(chunk, metadata);
    const { decoderConfig } = metadata;
    if (decoderConfig) decoder.configure(decoderConfig);
    decoder.decode(chunk);
}


const init = {
    output: handleChunk,
    error: (err) => { console.log(err) }
};

const config = {
    codec: "avc1.64001F",
    width: 1280,
    height: 720,
    bitrate: 500000,
    framerate: 30
};

async function start() {

    const { supported } = await VideoEncoder.isConfigSupported(config);
    let frameCount = 0;

    if (supported) {
        const encoder = new VideoEncoder(init);
        encoder.configure(config);

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 1280,
                height: 720,
                framerate: 30
            }
        });

        const track = stream.getVideoTracks()[0];
        const trackProcessor = new MediaStreamTrackProcessor(track);

        const reader = trackProcessor.readable.getReader();

        while (true) {
            const result = await reader.read();
            if (result.done) break;

            const frame = result.value;

            if (encoder.encodeQueueSize > 2) {
                frame.close();
            } else {
                frameCount++;
                const keyFrame = frameCount % 150 === 0;
                encoder.encode(frame, { keyFrame });
                frame.close();
            }
        }


    } else {
        console.log("Config is not supported");
    }

}

start();

