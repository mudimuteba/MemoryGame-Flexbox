const cards = document.querySelectorAll('.memory_card');
let card1, card2;
let flipped = false;
let lockBoard = false;

cards.forEach(card => card.addEventListener('click', flipCard))

function flipCard() {
	if (lockBoard || this === card1) return;

	this.classList.add('flip');
	!flipped ? (flipped = true, card1 = this) : (card2 = this, checkMatch());
}

function checkMatch() {
	card1.dataset.framework === card2.dataset.framework ? disableCards() : unflipCards();
}

function disableCards() {
	card1.removeEventListener('click', flipCard);
	card2.removeEventListener('click', flipCard);
	resetBoard();
}

function unflipCards(){
	lockBoard = true;

	setTimeout(() => {
		lockBoard = false;

		card1.classList.remove('flip');
		card2.classList.remove('flip');
		resetBoard();
	}, 1250);
}

function resetBoard() {
	[flipped, lockBoard, card1, card2] = [false, false, null, null];
}

(function shuffle() {
	var numberOfCards = prompt("Please enter a number between 4 and 12. Otherwise the game will display 4 cards");
		numberOfCards = numberOfCards >= 4 && numberOfCards <= 12 && numberOfCards % 2 === 0  ? numberOfCards : 4;   
		for (var i = 0; i < cards.length - numberOfCards; i++)
			cards[i].style.display = "none";
	cards.forEach(card => {
		card.style.order = Math.floor(Math.random() * 12);
	});
})();
