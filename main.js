document.addEventListener('DOMContentLoaded', init);

var rightAnswers = 0;
var wrongAnswers = 0;
var skippedAnswers = 0;
var times = "\u00D7";
var divide = "\u00F7";
function init(){

	

	var operations = ['+', '-', times, divide];
	var first = document.getElementById('firstNumber');
	var second = document.getElementById('secondNumber');
	var sign = document.getElementById('operation');


	var randomNum1;
	var randomNum2;
	var randomSign;

	randomize();	

	console.log(randomNum1);
	console.log(randomNum2);
	console.log(randomSign);

	while(randomSign === divide && randomNum1 % randomNum2 != 0) {
			console.log('randomize');
			randomize();
	}
	
	document.getElementById('right-answer').textContent = rightAnswers;
	document.getElementById('wrong-answer').textContent = wrongAnswers;
	document.getElementById('skipped-answer').textContent = skippedAnswers;
	
	first.textContent = randomNum1.toString();
	second.textContent = randomNum2.toString();
	operation.textContent = randomSign;
	answer.textContent = '?';
	answer.style.color = "white";

	document.getElementById('win-phrase').textContent = " ";
	document.getElementById('lose-phrase').textContent = " ";

	
	/* Code from class */
	var allButtons = document.querySelectorAll('#buttons button');
	for(var i = 0; i < allButtons.length; i++) {
		allButtons[i].addEventListener('click', allButtonClicked);
	}

	document.getElementById('clear').addEventListener('click', clearClicked);
	document.getElementById('submit').addEventListener('click', submitClicked);
	document.getElementById('skip').addEventListener('click', skipClicked);

	function randomize(){
		randomNum1 = Math.floor(Math.random() * 100);
		randomNum2 = Math.floor(Math.random() * 100);
		randomSign = operations[Math.floor(Math.random() * 4)];
	}
}



function allButtonClicked(event) {
	var clicked = event.target.textContent;

	if(clicked === '+/-') {
		if(answer.textContent === '?') {
			answer.textContent = '?';
		}
		else {
			answer.textContent *= -1;
		}
	}
	else {
		if(answer.textContent === '?') {
			answer.textContent = clicked;
		}
		else {
			 answer.textContent += clicked;
		}
	}
}

function clearClicked() {
	answer.textContent = '?';
}

function submitClicked() {
	var first = parseInt(document.getElementById('firstNumber').textContent);
	var second = parseInt(document.getElementById('secondNumber').textContent);
	var sign = document.getElementById('operation').textContent;
	var answer = compute(first, second, sign);
	if(parseInt(document.getElementById('answer').textContent) === answer) {
		rightAnswers++;
		document.getElementById('win-phrase').textContent = "Correct Answer!";
		setTimeout(init, 3000);
	}
	else {
		wrongAnswers++;
		document.getElementById('lose-phrase').textContent = "Wrong Answer!";
		document.getElementById('answer').textContent = answer;
		document.getElementById('answer').style.color = "red";
		setTimeout(init, 3000);
	}
}

var compute = function(first, second, sign) {
	var answer;
	if(sign === '+') {
		answer = first + second;
	}
	else if(sign === '-') {
		answer = first - second;
	}
	else if(sign === times) {
		answer = first * second;
	}
	else if(sign === divide) {
		answer = first / second;
	}
	return answer;
}

function skipClicked() {
	skippedAnswers++;
	init();

}
