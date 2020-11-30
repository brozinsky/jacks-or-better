const FACES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
const SUITS = ['♥', '♦', '♣', '♠'];

// let testHand = ["2♥", '5♥', '7♦', '8♣', '9♠'];
// let testHand = ['2♥', '3♥', '4♥', '5♥', '6♥'] //straight flush
// let testHand = ['a♥', '6♥', '3♥', '4♥', '5♥'] //straight flush
let testHand = ['10♥', 'j♥', 'q♥', 'k♥', 'a♥'] //royal flush
// let testHand = ['2♥', 'j♥', 'q♥', 'k♥', 'q♥'] // flush
// let testHand = ['10♦', '10♦', '10♥', 'a♥', 'a♠'] //full house
// let testHand = ['10♦', 'j♦', 'q♦', 'k♥', 'a♠'] //straight
// let testHand = ['3♦', '2♦', '4♦', '10♥', '10♠'] //jacks or better


class Hand {
    constructor(testHand) {
        this.faces = testHand.map(card => FACES.indexOf(card.slice(0, -1)));
        this.suits = testHand.map(card => SUITS.indexOf(card.slice(-1)));

        this.groups = FACES.map((face, i) => this.faces.filter(j => i === j).length).sort((x, y) => y - x);
        this.shifted = this.faces.map(x => (x + 1) % 13);
        this.distance = Math.min(Math.max(...this.faces) - Math.min(...this.faces), Math.max(...this.shifted) - Math.min(...this.shifted));

        this.flush = this.suits.every(suit => suit === this.suits[0]);
        this.straight = this.groups[0] === 1 && this.distance < 5;;
    }

    analyze() {
        if (this.straight && this.flush && this.faces.includes(12) && !this.faces.includes(0)) return ['royal-flush', 250];
        else if (this.straight && this.flush) return ['straight-flush', 50];
        else if (this.groups[0] === 4) return ['four-of-a-kind', 25];
        else if (this.groups[0] === 3 && this.groups[1] === 2) return ['full-house', 9];
        else if (this.flush) return ['flush', 6];
        else if (this.straight) return ['straight', 4];
        else if (this.groups[0] === 3) return ['three-of-a-kind', 3];
        else if (this.groups[0] === 2 && this.groups[1] === 2) return ['two-pair', 2];
        else if (this.groups[0] === 2 && this.faces.includes(12) || this.faces.includes(11) || this.faces.includes(10) || this.faces.includes(9)) return ['jacks-or-better', 1];
        else return ['loss', 0];
    }
}

const hand = new Hand(testHand)
// console.log(hand.suits)
// console.log(hand.faces)
// console.log(hand.straight)
// console.log(hand.flush)

console.log(hand.analyze())