const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
const suits = ['♥', '♦', '♣', '♠'];

class Deck {
    constructor(cards = newDeck()) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift();
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit === '♠' || this.suit === '♣' ? 'black' : 'red';
    }

    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.value;
        cardDiv.classList.add('card', this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        return cardDiv;
    }
}

function newDeck() {
    return suits.flatMap(suit => {
        return faces.map(value => {
            return new Card(suit, value);
        })
    })
}

const deck = new Deck();

deck.shuffle();

console.log(deck.cards.slice(0, 5))
let testArray = deck.cards.slice(0, 5)

let resultSuits = testArray.map(card => card.suit);
let resultFaces = testArray.map(card => card.value);
let testHand = resultFaces.map((e, i) => e + resultSuits[i]);
console.log(resultSuits)
console.log(resultFaces)
// console.log(testHand)

// let testHand = ["j♥", 'j♥', '10♦', '5♣', '2♠'];
// let testHand = ['2♥', '3♥', '4♥', '5♥', '6♥'] //straight flush
// let testHand = ['a♥', '6♥', '3♥', '4♥', '5♥'] //straight flush
// let testHand = ['10♥', 'j♥', 'q♥', 'k♥', 'a♥'] //royal flush
// let testHand = ['2♥', 'j♥', 'q♥', 'k♥', 'q♥'] // flush
// let testHand = ['10♦', '10♦', '10♥', 'a♥', 'a♠'] //full house
// let testHand = ['10♦', 'j♦', 'q♦', 'k♥', 'a♠'] //straight
// let testHand = ['3♦', '2♦', '4♦', '10♥', '10♠'] //jacks or better

class Hand {
    constructor(testHand) {
        this.faces = testHand.map(card => faces.indexOf(card.slice(0, -1)));
        this.suits = testHand.map(card => suits.indexOf(card.slice(-1)));

        this.groups = faces.map((face, i) => this.faces.filter(j => i === j).length).sort((x, y) => y - x);
        this.groupsJOB = faces.map((face, i) => this.faces.filter(j => i === j && i > 8).length).sort((x, y) => y - x);

        this.shifted = this.faces.map(x => (x + 1) % 13);
        this.distance = Math.min(Math.max(...this.faces) - Math.min(...this.faces), Math.max(...this.shifted) - Math.min(...this.shifted));

        this.flush = this.suits.every(suit => suit === this.suits[0]);
        this.straight = this.groups[0] === 1 && this.distance < 5;;
    }
    analyze() {
        console.log(this.suits)
        console.log(this.faces)
        console.log(this.groups)


        if (this.straight && this.flush && this.faces.includes(12) && !this.faces.includes(0)) return ['royal-flush', 250];
        else if (this.straight && this.flush) return ['straight-flush', 50];
        else if (this.groups[0] === 4) return ['four-of-a-kind', 25];
        else if (this.groups[0] === 3 && this.groups[1] === 2) return ['full-house', 9];
        else if (this.flush) return ['flush', 6];
        else if (this.straight) return ['straight', 4];
        else if (this.groups[0] === 3) return ['three-of-a-kind', 3];
        else if (this.groups[0] === 2 && this.groups[1] === 2) return ['two-pair', 2];
        else if (this.groups[0] === 2 && this.groupsJOB[0] === 2) return ['jacks-or-better', 1];
        else return ['loss', 0];
    }
}

const hand = new Hand(testHand)
// console.log(hand.suits)
// console.log(hand.faces)
// console.log(hand.straight)
// console.log(hand.flush)

console.log(hand.analyze())