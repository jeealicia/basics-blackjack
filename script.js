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

  //deal 2 cards to human and computer at the start of the game
  if (humanHand.length == 0) {
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

    // check if human or computer hand has blackjack
    if (humanHand.length == 2 && computerHand.length == 2) {
      // computer draws blackjack and wins
      if (computerHandCount == 21 && humanHandCount != 21) {
        var returnMessage = computerWinsBlackjack();
        return returnMessage;
      }
      // human draws blackjack and wins
      if (computerHandCount != 21 && humanHandCount == 21) {
        var returnMessage = humanWinsBlackjack();
        return returnMessage;
      }
    }

    // if human and computer hand has no blackjack wins, show cards that player has drawn
    return `You have drawn the following cards:${currentHand(humanHand)}<br><br>
  Please enter "hit" if you would like to draw another card or "stand" to end your turn.`;
  }

  // check for valid input
  if (input != "hit" && input != "stand") {
    return `Your input is invalid. Please enter "hit" if you would like to draw another card or "stand" to end your turn.`;
  }

  // player chooses to draw another card
  if (input == "hit") {
    dealCard(humanHand);
    humanHandCount = countCurrentHand(humanHand);
    console.log(humanHand);
    console.log(humanHandCount);
    if (countCurrentHand(humanHand) > 21) {
      return `You have drawn the following cards:${currentHand(
        humanHand
      )}<br><br>
  Your total score is > 21, you lose. <br><br>
  Please refresh to play again.`;
    } else {
      // player did not exceed 21
      if (countCurrentHand(computerHand) < 17) {
        dealCard(computerHand);
        computerHandCount = countCurrentHand(computerHand);
        console.log(computerHand);
        console.log(computerHandCount);
      }
    }
  }

  // player chooses to end game, check for non-blackjack wins
  if (input == "stand") {
    // if dealer has less than 17, dealer will need to draw card
    if (computerHandCount < 17) {
      dealCard(computerHand);
      console.log(computerHand);
      console.log(computerHandCount);
    }
  }
  checkNormalWin(humanHandCount, computerHandCount);
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
        cardName = "Ace";
      }
      if (rankCounter == 11) {
        cardName = "Jack";
        convertPicCardRank = 10;
      }
      if (rankCounter == 12) {
        cardName = "Queen";
        convertPicCardRank = 10;
      }
      if (rankCounter == 13) {
        cardName = "King";
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
    // let ace default value be 11
    if (currCard.name == "Ace") {
      sum += 11;
    } else {
      sum += currCard.rank;
    }
    counter = counter + 1;
  }
  return sum;
};

// function to return human blackjack win
var humanWinsBlackjack = function () {
  return `Player has Blackjack and wins, Computer loses!<br><br> 
  You have drawn the following cards:${currentHand(humanHand)}<br><br>
  Computer has drawn the following cards:${currentHand(computerHand)}<br><br>
  Please refresh to play again.`;
};

// function to return computer win blackjack
var computerWinsBlackjack = function () {
  return `Computer has Blackjack and wins, Player loses!<br><br>
  You have drawn the following cards:${currentHand(humanHand)}<br><br>
  Computer has drawn the following cards:${currentHand(computerHand)}<br><br>
  Please refresh to play again.`;
};

// function to check for non-blackjack wins
var checkNormalWin = function (player, computer) {
  // assuming both player keep within 21
  if (player < 21 && computer < 21) {
    if (player > computer) {
      return `Player is closer to 21 and wins, Computer loses!`;
    } else {
      return `Computer is closer to 21 and wins, Player loses!`;
    }
  }
  if (player == 21 && computer != 21) {
    return `Player gets 21 and wins!`;
  }
};

// function to show current hand to user
var currentHand = function (playerHand) {
  var cards = "";
  var handIndex = 0;

  while (handIndex < playerHand.length) {
    cards = cards + "<br>" + playerHand[handIndex].name;
    handIndex = handIndex + 1;
  }
  return cards;
};
