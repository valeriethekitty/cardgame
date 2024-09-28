
import { SPADES, HEARTS, CLUBS, DIAMONDS, Card, getRndInteger } from "./globals.js"

class Deck {
	m_size;
	m_deck = [];
	constructor() {
		for (let i = 0; i < 13; i++) {
			let c = new Card(i + 1, HEARTS, false);
			this.m_deck.push(c);
		};
		for (let i = 13; i < 26; i++) {
			let c = new Card(i - 12, CLUBS, false);
			this.m_deck.push(c);
		};
		var j = 13;
		for (let i = 26; i < 39; i++) {
			let c = new Card(i - j, DIAMONDS, false);
			this.m_deck.push(c);
			j += 2;
		};
		j = 26;
		for (let i = 39; i < 52; i++) {
			let c = new Card(i - j, SPADES, false);
			this.m_deck.push(c);
			j += 2;
		};
		this.m_size = 52;
	}
	shuffle() {
		for (let i = 0; i < this.m_size; i++) {
			let n = getRndInteger(0, this.m_size);
			let temp = this.m_deck[n];
			this.m_deck[n] = this.m_deck[i];
			this.m_deck[i] = temp;
		}
	}
	deal_top() {
		if (this.m_size <= 0) {
			return null;
		}
		let top = this.m_deck[this.m_size-1];
		this.m_deck[this.m_size-1] = null;
		this.m_size--;
		return top;
	}
	reset() {
		this.m_deck.length = 0; // idk
		for (let i = 0; i < 13; i++) {
			let c = new Card(i + 1, HEARTS, false);
			this.m_deck.push(c);
		};
		for (let i = 13; i < 26; i++) {
			let c = new Card(i - 12, CLUBS, false);
			this.m_deck.push(c);
		};
		var j = 13;
		for (let i = 26; i < 39; i++) {
			let c = new Card(i - j, DIAMONDS, false);
			this.m_deck.push(c);
			j += 2;
		};
		j = 26;
		for (let i = 39; i < 52; i++) {
			let c = new Card(i - j, SPADES, false);
			this.m_deck.push(c);
			j += 2;
		};
		this.m_size = 52
	}
}
//void printDeck();
//Card * operator[](int i);

export { Deck }