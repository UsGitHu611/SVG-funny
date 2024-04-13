const BUTTON_TO_START_ANIMATION = document.querySelector('.btn');
const BUTTON_TO_RESET_ANIMATION = document.querySelector('.reset');
const SPIN_FOR_ANIMATION = document.querySelector('#main');

BUTTON_TO_START_ANIMATION.addEventListener('click', () => {
    BUTTON_TO_RESET_ANIMATION.classList.remove('reset-animation')
    SPIN_FOR_ANIMATION.classList.add('main')
});

BUTTON_TO_RESET_ANIMATION.addEventListener('click', (event) => {
    SPIN_FOR_ANIMATION.classList.remove('main')
    event.currentTarget.classList.add('reset-animation');
});