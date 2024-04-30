export default class Piano {
    value = 0;

    constructor(piano) {
        this.piano = piano;
    }
    
    playC4() {
        this.piano.triggerAttackRelease("C4", "8n")
    }
    
    playDb4() {
        this.piano.triggerAttackRelease("Db4", "8n")
    }

    playD4() {
        this.piano.triggerAttackRelease("D4", "8n")
    }

    playEb4() {
        this.piano.triggerAttackRelease("Eb4", "8n")
    }

    playE4() {
        this.piano.triggerAttackRelease("E4", "8n")
    }

    playF4() {
        this.piano.triggerAttackRelease("F4", "8n")
    }

    playGb4() {
        this.piano.triggerAttackRelease("Gb4", "8n")
    }

    playG4() {
        this.piano.triggerAttackRelease("G4", "8n")
    }

    playAb4() {
        this.piano.triggerAttackRelease("Ab4", "8n")
    }

    playA4() {
        this.piano.triggerAttackRelease("A4", "8n")
    }

    playBb4() {
        this.piano.triggerAttackRelease("Bb4", "8n")
    }

    playB4() {
        this.piano.triggerAttackRelease("B4", "8n")
    }

    playC5() {
        this.piano.triggerAttackRelease("C5", "8n")
    }

    detune(method) {
        if (method === "+") {
            this.value += 30;
        } else if (method === "-") {
            this.value -= 30;
        }
        this.piano.set({ detune: this.value });
    }

    getDetuneVal() {
        return this.value;
    }
}
