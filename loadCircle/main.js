const BUTTON_TO_START_ANIMATION = document.querySelector('.btn');
const BUTTON_TO_RESET_ANIMATION = document.querySelector('.reset');
const SPIN_FOR_ANIMATION = document.querySelector('#main');
const PERCENT_LOADING = document.querySelector('.percent');
let INTERVAL = null;

BUTTON_TO_START_ANIMATION.addEventListener('click', () => {
    BUTTON_TO_RESET_ANIMATION.classList.remove('reset-animation');
    SPIN_FOR_ANIMATION.classList.add('main');
    
    INTERVAL = setInterval(() => {
        PERCENT_LOADING.textContent = `${parseInt(PERCENT_LOADING.textContent) + 1}%`;

        if(parseInt(PERCENT_LOADING.textContent) === 100) {
            SPIN_FOR_ANIMATION.classList.remove('main');    
            clearInterval(INTERVAL);
        }
    }, 99);
});


BUTTON_TO_RESET_ANIMATION.addEventListener('click', (event) => {
    SPIN_FOR_ANIMATION.classList.remove('main');
    event.currentTarget.classList.add('reset-animation');
    PERCENT_LOADING.textContent = '0%';    
    clearInterval(INTERVAL);
});

