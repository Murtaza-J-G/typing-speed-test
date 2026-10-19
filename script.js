const theTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const textWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");

var timer =[0,0,0,0];

var timerRunning = false;

var interval;

function leadingZero(time){
    if(time<=9){
        time = "0"+time;
    }
    return time;
}

function runTimer(){
    let currentTime = leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);

    theTimer.innerHTML=currentTime;

    timer[3]++;

    timer[0]=Math.floor((timer[3]/100)/60);
    timer[1]=Math.floor(timer[3]/100)-(timer[0]*60);
    timer[2]=Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));

}

function spellCheck(){
    let textEntered = testArea.value;
    let originTextMath = originText.substring(0, textEntered.length);

    if(textEntered==originText){
        textWrapper.style.borderColor = "green";
        clearInterval(interval);
    }else{
        if(textEntered==originTextMath){
            textWrapper.style.borderColor = "yellow";
        }else{
            textWrapper.style.borderColor = "red";
        }
    }
}

function reset(){
    clearInterval(interval);
    interval=null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    textWrapper.style.borderColor = "grey";
}

function start(){
    let textEnteredLength = testArea.value.length;

    if(textEnteredLength==0 && !timerRunning){
        timerRunning = true;
       interval = setInterval(runTimer, 10);
    }
}

testArea.addEventListener('keypress', start);

testArea.addEventListener('keyup', spellCheck);

resetButton.addEventListener('click', reset);