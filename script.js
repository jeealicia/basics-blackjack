/*
two-player blackjack, 1 human 1 computer
computer is always the dealer, two cards will be dealt to each player
player can either hit (draw) or stand (end)
dealer has to hit (draw) if current hand is below 17
jack/queen/king = 10, ace = 1 or 11
*/

var shuffledCardDeck = [];
var humanHand = [];
var computerHand = [];

// main function to play blackjack
var main = function (input) {
  // create and shuffle a deck
  shuffledCardDeck = shuffleCards(makeDeck());

  //deal 2 cards to human and computer
  dealCard(humanHand);
  dealCard(computerHand);
  dealCard(humanHand);
  dealCard(computerHand);

  //count the current hand of human and computer
  var humanHandCount = countCurrentHand(humanHand);
  var computerHandCount = countCurrentHand(computerHand);

  console.log(humanHand);
  console.log(humanHandCount);
  console.log(computerHand);
  console.log(computerHandCount);
};

// function to create a deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥︎", "♦︎", "♣︎", "♠︎"];
  var suitIdx = 0;
  while (suitIdx < suits.length) {
    var rankCounter = 1;
    var currentSuit = suits[suitIdx];
    while (rankCounter < 14) {
      var cardName = rankCounter;
      var convertPicCardRank = rankCounter;
      if (rankCounter == 1) {
        cardName = "ace";
      }
      if (rankCounter == 11) {
        cardName = "jack";
        convertPicCardRank = 10;
      }
      if (rankCounter == 12) {
        cardName = "queen";
        convertPicCardRank = 10;
      }
      if (rankCounter == 13) {
        cardName = "king";
        convertPicCardRank = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: convertPicCardRank,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIdx += 1;
  }
  return cardDeck;
};

// function to shuffle deck
function shuffleCards(cardDeck) {
  var currentIdx = 0;
  while (currentIdx < cardDeck.length) {
    var currentCard = cardDeck[currentIdx];
    var randomIdx = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIdx];
    // swap cards
    cardDeck[currentIdx] = randomCard;
    cardDeck[randomIdx] = currentCard;
    currentIdx += 1;
  }
  return cardDeck;
}

// function to generate random index
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// function to deal cards
var dealCard = function (playerHand) {
  playerHand.push(shuffledCardDeck.pop());
};

//function to count current hand
var countCurrentHand = function (playerHand) {
  var sum = 0;
  var counter = 0;
  while (counter < playerHand.length) {
    var currCard = playerHand[counter];
    sum += currCard.rank;
    counter = counter + 1;
  }
  return sum;
};
