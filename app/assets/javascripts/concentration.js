function Concentration() {
  this.newGame();
}

Concentration.prototype.setup = function() {
  for (var i=0; i<22; i++) {
    $('.board').append('<div class="card back">' + (this.cards[i] -1) % 13 + '</div>');
  }

  $('.board').on('click', '.card', function (event) {
    $(event.currentTarget).toggleClass('highlighted');
    game.handleCardClick($(event.currentTarget).index());
  })
}

Concentration.prototype.newGame = function() {
  this.score = 0;
  this.deck = this.randomDeck();
  this.cards = [];
  this.dealCards();
  this.selectedCards = [];
}

Concentration.prototype.dealCards = function() {
  while (this.cards.length < 22) {
    var card = this.deck.pop();
    this.cards.push(card);
  }
}

Concentration.prototype.twoCards = function() {
  var newCards = [];
  while (this.deck.length > 0 && newCards.length < 2) {
    var card = this.deck.pop();
    newCards.push(card);
  }
  return newCards;
}

Concentration.prototype.randomDeck = function() {
  // create deck
  var deck = [];
  for(var i=0; i<24; i++) {
    deck.push(i+1);
  }
  // shuffle deck with knuth shuffle
  var currentIndex = deck.length;
  while (currentIndex > 0) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    var temp = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temp;
  }

  return deck;
}

Concentration.prototype.handleCardClick = function(cardIdx) {
  if (this.selectedCards.length >= 2) { return; }
  if (this.selectedCards.length === 0) {
    $('.card').removeClass('front back').addClass('back').empty();
  }
  var cardSelectedIdx = this.selectedCards.indexOf(cardIdx);
  if (cardSelectedIdx > -1) {
    this.selectedCards.splice(cardSelectedIdx, 1);
  } else {
    this.selectedCards.push(cardIdx);
  }

  if (this.selectedCards.length === 2) {
    this.handleSelection();
    $('.card').removeClass('highlighted');
  }
}

Concentration.prototype.handleSelection = function() {
  if (this.selectedCards.length !== 2) { return; }
  this.selectedCards.sort();
  var idx1 = this.selectedCards[0];
  var idx2 = this.selectedCards[1];

  var card1 = this.cards[idx1];
  $('.card').eq(idx1).removeClass('back').addClass('front').html((card1 -1) % 13)
  var card2 = this.cards[idx2];
  $('.card').eq(idx2).removeClass('back').addClass('front').html((card2 -1) % 13)

  // cards match but are different suit
  if ((card1 -1) % 13 === (card2 -1) % 13) {
    this.score += 1;
    var newCards = this.twoCards();
    // replace the card with newly dealt card if there is a card remaining in the deck
    // otherwise, remove the two cards from the table using .splice()
    if (newCards.length === 0) {
      this.cards.splice(idx2,1);
      this.cards.splice(idx1,1);
      setTimeout(function () {
        $('.front').remove();
      }, 1000);

    } else if (newCards.length === 1) {
      this.cards.splice(idx2,1);
      setTimeout(function() {
        $('.front').remove();
      }, 1000);

      this.cards[idx1] = newCards[0]
    } else if (newCards.length === 2) {
      this.cards[idx2] = newCards[0];
      this.cards[idx1] = newCards[1];
    }
  } else {
    this.score -= 1;
  }

  this.selectedCards = [];
  this.updateGameState();
}

Concentration.prototype.updateGameState = function() {
  $('.current-score').html(this.score);
  $('.current-deck').html(this.deck.length);
  if (this.gameOver()) {
    alert('game over!')
  }
}

Concentration.prototype.gameOver = function () {
  // just have to check if there are duplicate cards
  var cardsSoFar = {};
  for (var i = 0; i<this.cards.length; i++) {
    var card = (this.cards[i] - 1) % 13 // disregard suit of card
    if (cardsSoFar[card]) {
      return false;
    }
    cardsSoFar[card] = true;
  }
  return true;
}
