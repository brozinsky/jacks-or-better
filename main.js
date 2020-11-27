const FACES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
const SUITS = ['♥', '♦', '♣', '♠'];

// let testHand = ["2♥", '5♥', '7♦', '8♣', '9♠'];
// let testHand = ['10♥', 'j♥', 'q♥', 'k♥', 'a♥'] //straight flush
// let testHand = ['2♥', 'j♥', 'q♥', 'k♥', 'q♥'] // flush
// let testHand = ['10♦', '10♦', '10♥', 'a♥', 'a♠'] //full house
let testHand = ['10♦', 'j♦', 'q♦', 'k♥', 'a♠'] //straight

class Hand {
    constructor(testHand) {
        this.faces = testHand.map(card => FACES.indexOf(card.slice(0, -1)));
        this.suits = testHand.map(card => SUITS.indexOf(card.slice(-1)));
    }

    isRoyalFlush() {

    }

    isStraightFlush() {

    }

    isFourOfAKind() {

    }

    isFullHouse() {

    }

    isFlush(suits) {
        return suits.every(suit => suit === suits[0]);
    }

    isStraight(faces) {
        let groups = FACES.map((face, i) => faces.filter(j => i === j).length).sort((x, y) => y - x);
        let shifted = faces.map(x => (x + 1) % 13);
        let distance = Math.min(Math.max(...faces) - Math.min(...faces), Math.max(...shifted) - Math.min(...shifted));
        return groups[0] === 1 && distance < 5;
    }

    isThreeOfAKind() {

    }

    isTwoPairs() {

    }

    isJacksOrBetter() {

    }
}

const hand = new Hand(testHand)
console.log(hand.isFlush(hand.suits))
console.log(hand.isStraight(hand.faces))