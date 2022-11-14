const MAX_CORDS = 300;
const MIN_CORDS = 0;
const MIN_WIDTH = 25;
const MAX_HEIGHT = 45;

const area = document.querySelector('.area');
const ball = area.querySelector('.ball');
const start = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timer = document.querySelector('#time');
const board = document.querySelector('.board');

let interval = null;
let time = 0;
let score = 0;

const ballColors = ["#20ffff","#100aa8","#f09089","#a1273"]

function onBallClick(){
    if(ball){
        ball.classList.add('hidden');
        ballPositionRender(ball);
        score++;
    }
}
ball.addEventListener('click', onBallClick);

function ballPositionRender(ball){
    const topCords = Math.floor(Math.random() * (MAX_CORDS - MIN_CORDS) + MIN_CORDS);
    const leftCords = Math.floor(Math.random() * (MAX_CORDS - MIN_CORDS) + MIN_CORDS);
    const ballWidth = Math.floor(Math.random() * (MAX_HEIGHT- MIN_WIDTH) + MIN_WIDTH);
    const ballHeight = Math.floor(Math.random() * (MAX_HEIGHT- MIN_WIDTH) + MIN_WIDTH);
    const ballRandomColor = ballColors[Math.floor(Math.random() * ((ballColors.length - 1) - 0 + 1) + 0)];
    
    ball.style.left = leftCords + "px";
    ball.style.top = topCords + "px";
    ball.style.height = ballHeight + "px";
    ball.style.width = ballWidth + "px";
    ball.style.background = ballRandomColor;

    ball.classList.remove('hidden');
};

start.addEventListener('click', () => {
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('time-btn')){
        time = parseInt(evt.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

function startGame(){
    interval = setInterval(decreaseTime, 1000);
    ballPositionRender();
    setTimer(time)
}

function finishGame(){
    clearInterval(interval);
    board.innerHTML = `<h1>Score <span>${score}</span></h1>`;
    timer.parentNode.innerHTML = ``;
}

function setTimer(value){
    if(value < 10){
        timer.innerHTML = `00:0${time}`
    }else{
        timer.innerHTML = `00:${time}`
    }
}

function decreaseTime(){
    if(time === 0) {
        finishGame();
    } else { 
        time--;
        setTimer(time);
    }
}
