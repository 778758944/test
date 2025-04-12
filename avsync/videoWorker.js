self.addEventListener('message', (e) => {
    console.log('video data: ', e.data);
    let count = 0;
    const { reader, writer } = e.data;
    const videoTransformer = new TransformStream({
        async transform(videoFrame, controller) {
            count++;
            const { timestamp, format, codedWidth, codedHeight, visibleRect } = videoFrame;
            const size = videoFrame.allocationSize();
            const buf = new ArrayBuffer(size);
            await videoFrame.copyTo(buf);
            videoFrame.close();
            const nextFrame = new VideoFrame(buf, {
                format,
                codedWidth,
                codedHeight,
                visibleRect,
                timestamp: count < 100 ? timestamp : timestamp - 500000,
                // duration: 1000,
                transfer: [buf]
            });
            // count++;
            if (count > 97 && count < 103) {
                console.log('nextFrame timestampe: ', count, nextFrame.timestamp);
            }
            // setTimeout(() => {
            //     controller.enqueue(nextFrame);
            // }, 1000);
            controller.enqueue(nextFrame);
            if (count < 100) {
                // controller.enqueue(nextFrame);
            } else if (count < 200) {
                // console.log('200');
                // drop
                // nextFrame.close()
                // controller.enqueue(nextFrame);
            } else {
                // controller.enqueue(nextFrame);
                // setTimeout(() => {
                //     controller.enqueue(nextFrame);
                // }, 1000)
            }

            // setTimeout(async () => {
            //     const nextFrame = new VideoFrame(buf, {
            //         format,
            //         codedWidth,
            //         codedHeight,
            //         visibleRect,
            //         timestamp: timestamp,
            //         transfer: [buf]
            //     });
            //     controller.enqueue(nextFrame);
            // }, 1000);
        },
    });
    reader.pipeThrough(videoTransformer).pipeTo(writer);
});