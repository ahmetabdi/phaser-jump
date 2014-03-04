  var game = new Phaser.Game(w, h, Phaser.CANVAS, 'gameContainer');

  game.state.add('Load', Game.Load);
  game.state.add('Play', Game.Play);
  game.state.add('End', Game.End);

  game.state.start('Load');
