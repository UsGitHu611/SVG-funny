const MINUTES_ARROW = document.querySelector('#minArrow');
const SECOND_ARROW = document.querySelector('#secArrow');
const TIMER_DIGITS = document.querySelector('.timer');
const TIMER_CLOCK = document.querySelector('#timer');
const START_DIGITS_TIMER = document.querySelector('#start');
const RESET_DIGITS_TIMER = document.querySelector('#stop');

let StartDigTimer;
let StartCloclTimer;
let isStartClockTimer;
let i = 0;
let k = 0;
let j = 0;

let s = 0;
let m = 0;
let h = 0;


const INTERVAL_CLOCK_TIMER = () => {
    SECOND_ARROW.setAttribute('transform', `rotate(${i} 250 250)`)
    MINUTES_ARROW.setAttribute('transform', `rotate(${k} 250 250)`);
    j === 12 ? (k+=30, j=0) : j++;
    i+=30;
};

const INTERVAL_DIGITS_TIMER = () => {
    TIMER_DIGITS.textContent = `${h > 9 ? h : '0'+h}:${m > 9 ? m : '0'+m}:${s > 9 ? s : '0'+s}`
    s === 59 ? (m++, s=0) : s++;
    m === 59 && (h++, m=0);   
};


TIMER_CLOCK.addEventListener('click', () => {
    console.log(isStartClockTimer);
    isStartClockTimer = !isStartClockTimer;
    isStartClockTimer ? (
        StartCloclTimer = clearInterval(StartCloclTimer),
        StartCloclTimer = setInterval(INTERVAL_CLOCK_TIMER,1000) 
    ) : ( clearInterval(StartCloclTimer) )
})

START_DIGITS_TIMER.addEventListener('click', () => {
    StartDigTimer = clearInterval(StartDigTimer);
    StartDigTimer = setInterval(INTERVAL_DIGITS_TIMER,1000);
})

RESET_DIGITS_TIMER.addEventListener('click', () => {
    TIMER_DIGITS.textContent = '00:00:00';
    s = 0; m = 0; h = 0;
    clearInterval(StartDigTimer);
})