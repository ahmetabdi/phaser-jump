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
    label1 = game.add.text(Math.floor(w/2), Math.floor(h/2)-20, 'loading...', { font: '30px Arial', fill: '#fff' });
    label2 = game.add.text(Math.floor(w/2)+0.5, Math.floor(h/2)+20+0.5, 'loading...', { font: '16px Arial', fill: '#fff' });
	label1.anchor.setTo(0.5, 0.5);
	label2.anchor.setTo(0.5, 0.5);

	game.load.spritesheet('tiles', 'assets/sprites/platformer_tiles.png', 16, 16);
	game.load.spritesheet('player_idle_first', 'assets/sprites/player_idle.png', 64, 64, 1);

	game.load.image('test', 'assets/images/blood_a/blood_a_0001.png');

	game.load.spritesheet('blood', 'assets/sprites/blood.png', 32, 32, 6);

    game.load.spritesheet('lightning_particles', 'assets/sprites/blood.png', 32, 32, 6);

    game.load.image('lightning_bolt', 'assets/images/bolt_tesla/bolt_tesla_0010.png');

    game.load.spritesheet('player_jump', 'assets/sprites/player_jump.png', 64, 64, 6);
    game.load.spritesheet('player_idle', 'assets/sprites/player_idle.png', 64, 64, 6);
    game.load.spritesheet('player_running', 'assets/sprites/player_running.png', 64, 64, 6);

	},
	create: function () {
		game.state.start('Play');
	}
};
