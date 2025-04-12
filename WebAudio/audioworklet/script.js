let audioContext = null;
let hissGainRange;
let oscGainRange;
let hissGenNode;
let gainNode;
let hissGainParam;

async function createHissProcessor() {
    if (!audioContext) {
        try {
            audioContext = new AudioContext();
        } catch (e) {
            console.log("Unable to create audio context");
            return null;
        }
    }

    let processorNode;
    try {
        processorNode = new AudioWorkletNode(audioContext, "hiss-generator");
    } catch (e) {
        try {
            console.log("adding...");
            await audioContext.audioWorklet.addModule("hiss-generator.js");
            processorNode = new AudioWorkletNode(audioContext, "hiss-generator");
        } catch (e) {
            console.log(`Unable to create worklet node: ${e}`);
            return null;
        }
    }

    await audioContext.resume();
    return processorNode;
}


async function audioDemoStart() {
    hissGenNode = await createHissProcessor();
    if (!hissGenNode) {
        console.log("Unable to create hiss processor");
        return;
    }

    const soundSource = new OscillatorNode(audioContext);
    gainNode = audioContext.createGain();

    soundSource.type = "square";
    soundSource.frequency.setValueAtTime(440, audioContext.currentTime);

    gainNode.gain.setValueAtTime(oscGainRange.value, audioContext.currentTime);

    soundSource.connect(gainNode).connect(audioContext.destination);
    soundSource.start();

    hissGainParam = hissGenNode.parameters.get("gain");
    hissGainParam.setValueAtTime(hissGainRange.value, audioContext.currentTime);
}

async function toggleSound() {
    if (!audioContext) {
        audioDemoStart();

        hissGainRange.disabled = false;
        oscGainRange.disabled = false;
    } else {
        hissGainRange.disabled = true;
        oscGainRange.disabled = true;

        await audioContext.close();
        audioContext = null;
    }
}

window.addEventListener("load", (event) => {
    document.getElementById("toggle").addEventListener("click", toggleSound);
    hissGainRange = document.getElementById("hiss-gain");
    oscGainRange = document.getElementById("osc-gain");

    hissGainRange.oninput = updateHissGain;
    oscGainRange.oninput = updateOscGain;

    hissGainRange.disabled = true;
    oscGainRange.disable = true;
});

function updateHissGain(event) {
    // hissGainParam.setValueAtTime(event.target.value, audioContext.currentTime);
    hissGainParam.linearRampToValueAtTime(1.0, audioContext.currentTime + 2);
}

function updateOscGain(event) {
    gainNode.gain.setValueAtTime(event.target.value, audioContext.currentTime);
}