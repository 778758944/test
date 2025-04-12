self.addEventListener('message', (e) => {
    console.log('Audio data: ', e.data);
    let isDelay = true;
    const { reader, writer } = e.data;
    // setTimeout(() => { isDelay = true }, 5000);
    const audioTransformer = new TransformStream({
        async transform(audioFrame, controller) {
            // console.log('audio: ', audioFrame.timestamp);
            // controller.enqueue(audioFrame);
            setTimeout(() => {
                controller.enqueue(audioFrame);
            }, 1000);
            // controller.enqueue(audioFrame);
        },
    });

    reader.pipeThrough(audioTransformer).pipeTo(writer);

})