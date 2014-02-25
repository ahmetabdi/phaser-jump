Game = {};

var w = 600;
var h = 500;
var death = 0;

function rand(num){ return Math.floor(Math.random() * num) };


Game.Load = function (game) {

};

Game.Load.prototype = {
	preload: function () {
	    game.stage.backgroundColor = '#9b59b6';
	    label1 = game.add.text(Math.floor(w/2), Math.floor(h/2)-20, 'Box Jump', { font: '30px Arial', fill: '#fff' });
	    label2 = game.add.text(Math.floor(w/2)+0.5, Math.floor(h/2)+20+0.5, 'loading...', { font: '16px Arial', fill: '#fff' });
		label1.anchor.setTo(0.5, 0.5);
		label2.anchor.setTo(0.5, 0.5);

		game.load.spritesheet('tiles', 'assets/sprites/platformer_tiles.png', 16, 16);
		game.load.spritesheet('mummy', 'assets/sprites/321.png', 37, 45, 1);

		game.load.image('test', 'assets/images/blood_a/blood_a_0001.png');

		game.load.spritesheet('blood', 'assets/sprites/blood.png', 32, 32, 6);


	},
	create: function () {
		game.state.start('Play');
	}
};
