async function fetchDataFromServer() {
    const response = await fetch('/getDetuneVal');
    const data = await response.json();
    console.log(data);
}

async function getTone() {
    await fetch('https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js')
    .then(response => {
        console.log(response.json());
    })
}

async function getDetune() {
    const res = await fetch("/detune", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        }
    })
    const data = await res.json()
    console.log(data);
}

module.exports = { getDetune };