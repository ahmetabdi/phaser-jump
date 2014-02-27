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

		game.stage.backgroundColor = '#A67D3D';

		cubes = game.add.group();
    cubes.createMultiple(20, 'cube');

    tiles = game.add.group();

    for (var x = 0; x < 40; x++)
    {
	    if (x == 0) { var tile = tiles.create(0 + (x * 15), h*2/3+22, 'tiles', 104); }
	    else if (x == 39) { var tile = tiles.create(0 + (x * 15), h*2/3+22, 'tiles', 106); }
	    else { var tile = tiles.create(0 + (x * 15), h*2/3+22, 'tiles', 105); }

	    tile.body.immovable = true;
    }

    this.start = 0;
    this.level = 0;

    this.player = this.game.add.sprite(80, h*1/3-50, 'player_idle_first');
		this.player.body.bounce.y = 0;
		this.player.body.collideWorldBounds = true;
    this.player.body.velocity.x = 40;
    this.player.body.velocity.y = 120;
    this.player.body.acceleration.y = 500;
  	this.player.anchor.setTo(0.5, 0.5);

  	this.labelDeath = game.add.text(100, h-35, '0', { font: '18px Arial', fill: '#fff', align: 'center' });
  	this.labelDeath.anchor.setTo(0.5, 0.5);
    this.labelLevel = game.add.text(w-100+0.5, h-35, '1/'+map.length, { font: '18px Arial', fill: '#fff', align: 'center' });
    this.labelLevel.anchor.setTo(0.5, 0.5);

    this.emitter = game.add.emitter(0, 0, 10);
    this.emitter.makeParticles('blood');
    this.emitter.gravity = 0;
    this.emitter.minParticleSpeed.setTo(-200, -200);
    this.emitter.maxParticleSpeed.setTo(200, 200);

    this.emitter2 = game.add.emitter(0, 0, 50);
    this.emitter2.makeParticles('lightning_particles');
    this.emitter2.gravity = 1000;
    this.emitter2.minParticleSpeed.setTo(-200, -200);
    this.emitter2.maxParticleSpeed.setTo(700, 900);

    this.player.loadTexture('player_idle', 0);
    this.player.animations.add('player_idle');
    this.player.loadTexture('player_jump', 0);
    this.player.animations.add('player_jump');
    this.player.loadTexture('player_running', 0);
    this.player.animations.add('player_running');
    this.player.loadTexture('player_idle', 0);

		this.cursor = this.game.input.keyboard.createCursorKeys();
  	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  	this.loadLevel();
	},

  render: function(){
    game.debug.renderSpriteBody(this.player.body);
  },

	update: function() {
		game.physics.collide(this.player, tiles);

    if(this.player.body.touching.down && this.start == 0) {
      this.player.animations.play('player_idle', 10, true);
    }

		//When spacebar is held down start the game
		if (game.input.mousePointer.isDown && this.player.body.touching.down) {
        this.playerJump();
        this.player.animations.play('player_jump', 10, false)
        if (this.start == 0) {
        	this.start = 1;
        }
    }

    //Move player to the right of the screen why the game is started
    if (this.player.body.touching.down && this.start == 1) {
    	this.player.alive = true;
    	this.player.body.velocity.x = 180;
      if(!game.input.mousePointer.isDown) {
        this.player.animations.play('player_running', 10, true)
      }
    }

    //Player global gravity when jumping etc
    this.player.body.gravity.y = 5;

    //If we reach the right side of the screen restart the view
    if (this.player.x >= w - 50)
	    	this.loadLevel();

	  //Check collision on players with obstacles(cubes)
	  game.physics.overlap(this.player, cubes, this.playerHit, null, this);

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
  },

	initPlayer: function() {
		this.player.body.gravity.y = 0;
		this.player.x = 30;
    if (this.start == 1) {
      this.player.y = h*2/3+50-this.player.height/2-30;
    }
    else {
      this.emitter2.x = this.player.x;
      this.emitter2.y = this.player.y;
      this.emitter2.start(true, 5000, null, 10);
      this.player.y = 0;
    }
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.angle = 0;
		if (this.rotation) this.rotation.pause();
	},

	playerJump: function() {
		this.player.body.velocity.y = -250;
	},

	playerHit: function(player, hit) {
    if (this.player.alive) {
      this.player.alive = false;
        this.emitter.x = player.x+player.width/2;
        this.emitter.y = player.y+player.height/2;
        this.emitter.start(true, 300, null, 8);

      death += 1;
      this.labelDeath.content = death;
      this.initPlayer();
    }
	},

	drawLevel: function(maap) {
    cubes.forEachAlive(function(cube){cube.kill();});

    var cube, height;
    for (var i = 0; i < maap.length; i++) {
      cube = cubes.getFirstExists(false);

      if (maap[i] == 1) {
        cubes.create(100+i*cube.width, h*2/3+6, 'cube', 4);
        height = 0.3;
      }
      else if (maap[i] == 2) {
        cubes.create(100+i*cube.width, h*2/3+6, 'cube', 4);
        height = 1;
      }
      else if (maap[i] == 3) {
        cubes.create(100+i*cube.width, h*2/3+6,'cube', 4);
        height = 1.5;
      }
      else if (maap[i] == 4) {
        cubes.create(100+i*cube.width, h*2/3+6, 'cube', 4);
        height = 1.8;
      }
      else if (maap[i] == 5) {
        cubes.create(100+i*cube.width, h*2/3-22+20, 'cube', 4);
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
