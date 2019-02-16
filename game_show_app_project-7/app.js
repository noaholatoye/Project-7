
//Sellect Elements
const startButton = document.querySelector('a');
let overlay = document.querySelector('#overlay');
const qwerty = document.getElementById('qwerty');
const keys = qwerty.getElementsByTagName('button');
let phrase = document.getElementById('phrase');
let ul = phrase.querySelector('ul');
let title = document.querySelector('.title');
let resetButton = document.createElement('a');
	
//phrases and score
let missed = 0;
let phrases = [
	'Many love social media',
	'Because it is an enabler',
	'Most people use it',
	'To chat or do business',
	'Many depend on it'
];

//hide overlay
startButton.addEventListener('click', (e) => {
	overlay = startButton.parentNode;
	overlay.removeChild(startButton); 
	overlay.style.display ='none';	
});


const getRandomPhraseArr = (phrases) => {
	let phraseNumber = phrases.length; 
	let selectedItem  = Math.floor(Math.random() * phraseNumber ); 
	let selectedPhrase = phrases[selectedItem];
	let phraseLength = selectedPhrase.length;
	let splitPhrase = [];
	for (let i = 0; i < phraseLength; i++){
	splitPhrase.push(selectedPhrase[i]);
	}
	return splitPhrase;
}

let selectedPhrase = getRandomPhraseArr(phrases);

//Add list items
const displayPrase = (selectedPhrase) => {
	for (let i = 0; i < selectedPhrase.length; i++) {
		let li = document.createElement('li');
		// transition to li
		li.style.transition = "all 2s";
		if (selectedPhrase[i] != " ") {
			li.className = 'letter';
			li.textContent = selectedPhrase[i];	
			ul.appendChild(li);
		} else {
			li.className = 'space';
			li.textContent = selectedPhrase[i];	
			ul.appendChild(li);
		}
	}
}

// Display Phrase

displayPrase(selectedPhrase);
qwerty.addEventListener('click', (e) => {
	let guessedLetter;
	if (e.target.tagName == 'BUTTON') {
		guessedLetter = e.target;
		// transition to the button
		guessedLetter.style.transition = "all 2s"
	} else {
		return;
	}

	const checkLetter = (guessedLetter) => {
		let letterFound = null;
		let selectedPhrase = document.querySelectorAll('.letter');

		for(let i = 0; i < selectedPhrase.length; i++){ 
			let selectedLetter = selectedPhrase[i].textContent.toLowerCase();
			if (selectedLetter == guessedLetter.textContent){
				selectedPhrase[i].className = 'show letter';
				guessedLetter.className = 'chosen';
				guessedLetter.setAttribute('disabled', 'true');	
				letterFound = guessedLetter;
			} else {
				guessedLetter.className = 'chosen ';
				guessedLetter.setAttribute('disabled', 'true');
				if (i == selectedPhrase.length) {
				letterFound = null;
				}
			}
		}
		return  letterFound; 
	}
	
	// CheckedLetter Ends

	let letterFound2 = checkLetter(guessedLetter);	
	const tries = document.querySelectorAll('.tries');	

	if (letterFound2 == null && missed <= tries.length ){ 		
				tries[missed].style.display = 'none';
				missed++;
	}

	const gameRestart = () => {
		resetButton.textContent = 'Start Again';
		overlay.append(resetButton);
		resetButton.className = "resetButton btn__reset";
		resetButton.style.display = 'none';
	}
			
	gameRestart();

	const checkWin = () => {
	let show = document.querySelectorAll('.show');
	let letter = document.querySelectorAll('.letter');
	let resetButton = document.querySelector('.resetButton');

	if( show.length == letter.length) { 

		setTimeout(function(){
			overlay.removeAttribute('class');
			overlay.className = 'win';
			title.textContent = 'Congratulations you\'ve won!';
			resetButton.style.display = 'inline-block';			
			overlay.style.display = 'flex';
		},1000);
		resetButton.addEventListener('click', () => {
			resetGame(); 
			resetButton.style.display = 'none';
		});
	} else if (missed == 5){

		setTimeout(function(){
			overlay.removeAttribute('class');
			overlay.className = 'lose';
			title.textContent = 'Sorry! You lose';
			resetButton.style.display = 'inline-block';			
			overlay.style.display = 'flex';
		}, 800);			
		resetButton.addEventListener('click', () => {
			resetGame(); 
			resetButton.style.display = 'none';
		});
	}

			}// check win			
			checkWin();
	
			const resetGame = () => {
				const tries = document.querySelectorAll('.tries');
				let chosen = document.querySelectorAll('.chosen');
				ul.innerHTML = "";	

				let selectedPhrase = getRandomPhraseArr(phrases);
				displayPrase(selectedPhrase);

				// Display heart	
				for (let i = 0; i < tries.length; i++){
					tries[i].style.display = 'inline-block';
				}

				//remove disables classes 
				for (let i=0; i < chosen.length; i++ ){
					chosen[i].removeAttribute('class');	
					chosen[i].removeAttribute('disabled'); 
				}		
				overlay.style.display = 'none';
				missed = 0;
	}	
});