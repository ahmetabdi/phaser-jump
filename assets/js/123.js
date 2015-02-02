/*
  Programming and art made by www.lessmilk.com
  You can freely look at the code below,
  but you are not allowed to use the code or art to make your own games
*/

var map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

	[0, 0, 5, 5, 5, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 3],
	[0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2],

	[0, 0, 5, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
	[0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 2, 2, 2, 0, 0, 5],
	[0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 5, 5, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 2],
	[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0],

	[0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 3, 3, 0, 0, 0, 0, 5, 0, 0],
	[0, 0, 0, 0, 0, 5, 0, 0, 2, 2, 0, 0, 0, 0, 5, 5, 0, 0, 0, 4, 0, 0],
	[0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 4, 1],
	[0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 2, 0, 0]];

Game.Play = function (game) {};

Game.Play.prototype = {

	create: function () {
		this.cursor = this.game.input.keyboard.createCursorKeys();

		// Player
		this.player = this.game.add.sprite(80, h*2/3-20, 'player');
		this.player.body.bounce.y = 0;
  	this.player.anchor.setTo(0.5, 0.5);

  	// Cube map
		this.cubes = game.add.group();
    this.cubes.createMultiple(20, 'cube');

		this.line = this.game.add.sprite(w/2, Math.floor(h*2/3), 'line');
		this.line.anchor.setTo(0.5, 0.5);
		this.line.body.immovable = true;

		// Audio
		this.hit_s = game.add.audio('hit');
    this.jump_s = game.add.audio('jump');

    // Labels
    this.labelDeath = game.add.text(100, h-35, '0', { font: '18px Arial', fill: '#fff', align: 'center' });
		this.labelDeath.anchor.setTo(0.5, 0.5);
    this.labelLevel = game.add.text(w-100+0.5, h-35, '1/'+map.length, { font: '18px Arial', fill: '#fff', align: 'center' });
		this.labelLevel.anchor.setTo(0.5, 0.5);
		this.labelTuto = game.add.text(Math.floor(w/2)+0.5, h-35+0.5, 'press space to jump', { font: '18px Arial', fill: '#fff', align: 'center' });
		this.labelTuto.anchor.setTo(0.5, 0.5);

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.level = 0;
    this.start = 0;

    this.emitter = game.add.emitter(0, 0, 200);
    this.emitter.makeParticles('test');
    this.emitter.gravity = 0;
    this.emitter.minParticleSpeed.setTo(-200, -200);
    this.emitter.maxParticleSpeed.setTo(200, 200);

		this.loadLevel();
	},

	update: function() {
		game.physics.collide(this.player, this.line);

			// Jump if the player is touching the group and space bar is pressed
	    if (this.spaceKey.isDown && this.player.body.touching.down) {
	        this.playerJump();
	        if (this.start == 0) {
	        	this.start = 1;
	        	this.player.body.velocity.x = 170;
	        	game.add.audio('music').play('', 0, 0.1, true);
	        }
	    }

	    if (this.player.body.touching.down && this.start == 1) {
	    	this.player.alive = true;
	    	this.player.body.velocity.x = 170;
	    }


	    if (this.player.x >= w - 60)
	    	this.loadLevel();

		this.emitter.forEachAlive(function(particle)
			{particle.alpha = game.math.clamp(particle.lifespan / 100, 0, 1);}, this);

		this.player.body.gravity.y = 12;

		if (this.player.y > this.line.y)
			this.initPlayer();

		game.physics.overlap(this.player, this.cubes, this.playerHit, null, this);
	},

	playerJump: function() {
		this.player.body.velocity.y = -250;
        this.jump_s.play('', 0, 0.1);
        this.rotation = this.game.add.tween(this.player).to({angle: this.player.angle + 180}, 700, Phaser.Easing.Linear.None);
        this.rotation.start();
	},

	playerHit: function(player, hit) {
		if (this.player.alive) {
			this.player.alive = false;
		    this.emitter.x = player.x+player.width/2;
		    this.emitter.y = player.y+player.height/2;
		    this.emitter.start(true, 300, null, 8);

			this.hit_s.play('', 0, 0.2);
			death += 1;
			this.labelDeath.content = death;
			this.initPlayer();
		}
	},

	loadLevel: function() {
		if (map.length == this.level)
			game.state.start('End');
		else {
			this.drawLevel(map[this.level]);
			this.level++;
			this.labelLevel.content = this.level + '/' + map.length;
			this.initPlayer();
		}
		if (this.level == 2) this.labelTuto.content = '';
	},

	initPlayer: function() {
		this.player.body.gravity.y = 0;
		this.player.x = 60;
		this.player.y = h*2/3-this.player.height/2-30;
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.angle = 0;
		if (this.rotation) this.rotation.pause();
	},

	drawLevel: function(maap) {
		this.cubes.forEachAlive(function(cube){cube.kill();});

		var cube, height;
		for (var i = 0; i < maap.length; i++) {
			cube = this.cubes.getFirstExists(false);

			if (maap[i] == 1) {
				cube.reset(100+i*cube.width, h*2/3);
				height = 0.3;
			}
			else if (maap[i] == 2) {
				cube.reset(100+i*cube.width, h*2/3);
				height = 1;
			}
			else if (maap[i] == 3) {
				cube.reset(100+i*cube.width, h*2/3);
				height = 1.5;
			}
			else if (maap[i] == 4) {
				cube.reset(100+i*cube.width, h*2/3);
				height = 1.8;
			}
			else if (maap[i] == 5) {
				cube.reset(100+i*cube.width, h*2/3-22);
				height = 0.5;
			}

			if (maap[i] != 0) {
				cube.scale.y = 0;
				cube.anchor.setTo(0, 1);
				this.game.add.tween(cube.scale).to({y : height}, 300*height, Phaser.Easing.Linear.None).start();
			}
		}
	}
};
