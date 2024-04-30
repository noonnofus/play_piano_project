import Piano from "./play_piano.js";
import { WhiteKeyAnimation, BlackKeyAnimation } from "./animation.js";


const whiteKey = new WhiteKeyAnimation();
const blackKey = new BlackKeyAnimation();

const piano = new Tone.PolySynth().toDestination();
const membrane = new Tone.MembraneSynth().toDestination();
let selectedSetting = new Piano(piano);

document.querySelector('.synth').addEventListener('click', (event) => {
    if (event.target.classList.contains("membrane")) {
        selectedSetting = new Piano(membrane);
    } else if (event.target.classList.contains("polysynth")) {
        selectedSetting = new Piano(piano);
    } else if (event.target.classList.contains("sampler")) {
        const input = document.querySelector(".file-upload")
        input.click()
    }
})


// Play piano by keyboard.
document.addEventListener('keydown', async (event) => {
    const value = selectedSetting.getDetuneVal();
    const key = event.key.toLowerCase();
    if (key === "a") {
        whiteKey.pressedAnimation('.a')
        selectedSetting.playC4()
    } else if (key === "w") {
        blackKey.pressedAnimation('.w')
        selectedSetting.playDb4()
    } else if (key === "s") {
        whiteKey.pressedAnimation('.s')
        selectedSetting.playD4()
    } else if (key === "e") {
        blackKey.pressedAnimation('.e')
        selectedSetting.playEb4()
    } else if (key === "d") {
        whiteKey.pressedAnimation('.d')
        selectedSetting.playE4()
    } else if (key === "f") {
        whiteKey.pressedAnimation('.f')
        selectedSetting.playF4()
    } else if (key === "t") {
        blackKey.pressedAnimation('.t')
        selectedSetting.playGb4()
    } else if (key === "g") {
        whiteKey.pressedAnimation('.g')
        selectedSetting.playG4()
    } else if (key === "y") {
        blackKey.pressedAnimation('.y')
        selectedSetting.playAb4()
    } else if (key === "h") {
        whiteKey.pressedAnimation('.h')
        selectedSetting.playA4()
    } else if (key === "u") {
        blackKey.pressedAnimation('.u')
        selectedSetting.playBb4()
    } else if (key === "j") {
        whiteKey.pressedAnimation('.j')
        selectedSetting.playB4()
    } else if (key === "k") {
        whiteKey.pressedAnimation('.k')
        selectedSetting.playC5()
    } else if (key === "+") {
        selectedSetting.detune("+");
        await getDetune(value)
    } else if (key === "-") {
        selectedSetting.detune("-");
        await getDetune(value)
    }
})

// controlling detune setting.
async function getDetune(value) {
    let container = document.querySelector('.container');
    let detune = document.querySelector('.detune');

    const res = await fetch("/detune", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
    })
    const data = await res.json();

    if (data.success === false) {
        console.error(data.message);
    } else {
        if (detune) {
            detune.remove()
            let div = document.createElement("div");
            div.innerHTML = `
            <p>detune: ${data.data.value}</p>
            `
            div.classList.add('detune');
            container.appendChild(div);
        } else {
            let div = document.createElement("div");
            div.innerHTML = `
            <p>detune: ${data.data.value}</p>
            `
            div.classList.add('detune');
            container.appendChild(div);
        }
    }
}

// setting voice file to piano
document.querySelector("#sampling").addEventListener("change", async (event) => {
    const file = document.querySelector('.file-upload').files[0];

    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch('/sampler', {
        method: "POST",
        body: formData,
    })

    const result = await res.json();

    if (result.success === false) {
        console.error(result.message);
    } else {
        const filename = result.data.newFileName
        
        const sampler = new Tone.Sampler({
            urls: {
                C4: `${filename}`
            }
        }).toDestination();
    
        selectedSetting = new Piano(sampler)
    }
})

// delete mp3 files every 30mins.
async function deleteJunkFiles() {
    const res = await fetch('/deleteJunkFiles', {
        method: 'POST'
    })

    const result = await res.json();

    if (result.success === false) {
        console.error(result.message);
    }
}

setInterval(deleteJunkFiles, 1800000);