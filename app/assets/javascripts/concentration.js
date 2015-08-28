function Concentration() {
  this.newGame();
}

Concentration.prototype.setup = function() {
  for (var i=0; i<22; i++) {
    $('.board').append('<div class="card back"></div>');
  }
}

Concentration.prototype.newGame = function() {
  this.score = 0;
  this.deck = this.randomDeck();
  this.cards = [];
  this.dealCards();
  this.selectedCards = [];
}

Concentration.prototype.dealCards = function() {
  var newCards = [];
  while (this.cards.length < 22) {
    if (this.deck.length === 0) { break; }
    var card = this.deck.pop();
    this.cards.push(card);
    newCards.push(card);
  }
  return newCards;
}

Concentration.prototype.randomDeck = function() {
  // create deck
  var deck = [];
  for(var i=0; i<52; i++) {
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
  var cardSelectedIdx = this.selectedCards.indexOf(cardIdx);
  if (cardSelectedIdx > -1) {
    this.selectedCards.splice(cardSelectedIdx, 1);
  } else {
    this.selectedCards.push(cardIdx);
  }

  console.log(this.selectedCards)
}
