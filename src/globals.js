
const SPADES = 'S';
const HEARTS = 'H';
const CLUBS = 'C';
const DIAMONDS = 'D';

class Card {
	m_value;
	m_suit;
	m_faceup;

	constructor(v = null, s = null, f = null) {
		this.m_value = v;
		this.m_suit = s;
		this.m_faceup = f;
	}

	toString() {
		var value = this.m_value.toString();
		if (this.m_value == 11) { value = 'J'; }
		else if (this.m_value == 12) { value = 'Q'; }
		else if (this.m_value == 13) { value = 'K'; }
		else if (this.m_value == 1) { value = 'A'; }
		return value + this.m_suit.toString();
	}

	assign(card) {
		if (card instanceof Card) {
			this.m_value = card.m_value;
			this.m_suit = card.m_suit;
			this.m_faceup = card.m_faceup;
		}
	}
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export { SPADES, HEARTS, CLUBS, DIAMONDS, Card, getRndInteger }


