export class WhiteKeyAnimation {

    pressedAnimation(className) {
        const piano_key = document.querySelector(className);
        piano_key.classList.add('pressedWhite');

        setTimeout(() => {
            piano_key.classList.remove('pressedWhite');
        }, 250)
    }
}

export class BlackKeyAnimation {
    
    pressedAnimation(className) {
        const piano_key = document.querySelector(className);
        piano_key.classList.add('pressedBlack');

        setTimeout(() => {
            piano_key.classList.remove('pressedBlack');
        }, 250)
    }
}
