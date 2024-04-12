const MINUTES_ARROW = document.querySelector('#minArrow');
const SECOND_ARROW = document.querySelector('#secArrow');
const TIMER_DIGITS = document.querySelector('.timer');
const TIMER_CLOCK = document.querySelector('#timer');
const START_DIGITS_TIMER = document.querySelector('#start');
const RESET_DIGITS_TIMER = document.querySelector('#stop');
const LOG_CONTAINER_CLOCK = document.querySelector('.clock-logs');
const LOG_CONTAINER_DIGITS = document.querySelector('.digits-logs');
const { clientHeight, clientWidth } = document.querySelector('#mainCircle');

let StartDigTimer;
let StartCloclTimer;
let isStartClockTimer;
let i = 0;
let k = 0;
let j = 0;

let s = 0;
let m = 0;
let h = 0;


const TEXT_OFFSET = (r, points, clientHeight, clientWidth, offsetX, offsetY) => {
    let s = [];
    let x, y;
  
    for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / points) {
      x = clientWidth / 2 + r * Math.sin(i) - offsetX;
      y = clientHeight / 2 + r * Math.cos(i) - offsetY;
      s.push({ x, y });
    }
    return s;
};


const DROWING_LINES_IN_CIRCLE = (amountLines, widthSvg, heightSvg) => {
  let cordinates = [];
  let x, y;  

  for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / amountLines) {
    x = widthSvg / 2 + 200 * Math.sin(i);
    y = heightSvg / 2 + 200 * Math.cos(i) - 50;
    cordinates.push({ x, y });
  }

  const OFFSET = TEXT_OFFSET(220, 12,clientHeight, clientWidth, 21, 61);
  
  for (const [i,{ x, y }] of cordinates.entries()) {
    
    document.querySelector('#mainCircle').insertAdjacentHTML('beforeend', `
    <g>
        <foreignObject x="${OFFSET[i].x}" y="${OFFSET[i].y}" class="digits" width="40" height="40">
            ${i + 1}
        </foreignObject>
        <circle
            r="6"
            transform="translate(${x} ${y})"
            data-hour="${ i + 1 }"
        />
    </g>
    `);
  }

}

const INTERVAL_CLOCK_TIMER = () => {
    SECOND_ARROW.setAttribute('transform', `rotate(${i} 250 250)`);
    MINUTES_ARROW.setAttribute('transform', `rotate(${k} 250 250)`);
    j === 12 ? (k+=30, j=0) : j++;
    i+=30;
};

const INTERVAL_DIGITS_TIMER = () => {
    TIMER_DIGITS.textContent = `${h > 9 ? h : '0'+h}:${m > 9 ? m : '0'+m}:${s > 9 ? s : '0'+s}`
    s === 59 ? (m++, s=0) : s++;
    m === 59 && (h++, m=0);   
};

const ADD_LOGS_TIMER_DIGITS = (logContainer, ...params) => {
    const [h, m, s] = params;
    logContainer.insertAdjacentHTML('beforeend',`
        <li>
        <code>
            ${ !h 
                ? JSON.stringify({ hour : h, minutes : m, second : s },null, 2) 
                : JSON.stringify({ minutes : m, second : s }, null, 2)}
        <code/>
        </li>
    `);
};

const ADD_LOGS_TIMER_CLOCK = (logContainer, ...params) => {
    const [j, k] = params;
    logContainer.insertAdjacentHTML('beforeend',`
        <li>
        <code>
            ${JSON.stringify({ minutes : k - 25, second : j * 5 }, null, 2)}
        <code/>
        </li>
    `);
};

DROWING_LINES_IN_CIRCLE(12, clientWidth, clientHeight)

TIMER_CLOCK.addEventListener('click', () => {
    isStartClockTimer = !isStartClockTimer;
    isStartClockTimer ? (
        StartCloclTimer = clearInterval(StartCloclTimer),
        StartCloclTimer = setInterval(INTERVAL_CLOCK_TIMER,1000) 
    ) : ( 
        clearInterval(StartCloclTimer),
        ADD_LOGS_TIMER_CLOCK(LOG_CONTAINER_CLOCK, j, k)
    )
});

START_DIGITS_TIMER.addEventListener('click', () => {
    StartDigTimer = clearInterval(StartDigTimer);
    StartDigTimer = setInterval(INTERVAL_DIGITS_TIMER,1000);
});

RESET_DIGITS_TIMER.addEventListener('click', () => {
    ADD_LOGS_TIMER_DIGITS(LOG_CONTAINER_DIGITS,h,m,s)
    TIMER_DIGITS.textContent = '00:00:00';
    s = 0; m = 0; h = 0;
    clearInterval(StartDigTimer);
});