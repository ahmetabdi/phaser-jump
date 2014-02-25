Game.Play = function (game) {};

Game.Play.prototype = {

	create: function () {

		// game.stage.backgroundColor = '#2d2d2d';

	 //    tiles = game.add.group();

	 //    for (var x = 0; x < 40; x++)
	 //    {
	 //        var tile = tiles.create(0 + (x * 16), 300, 'tiles', 4);
	 //        tile.body.immovable = true;
	 //    }

	 //    this.start = 0;

	 //    sprite = game.add.sprite(50, 150, 'mummy');
	 //    sprite.name = 'mummy';
	 //    sprite.body.collideWorldBounds = true;
	 //    sprite.body.velocity.x = 40;
	 //    sprite.body.velocity.y = 120;
	 //    sprite.body.acceleration.y = 90; 


 	var mummy = game.add.sprite(300, 200, 'blood');

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    mummy.animations.add('walk');

    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    mummy.animations.play('walk', 20, true);



		// this.cursor = this.game.input.keyboard.createCursorKeys();

  //   	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function() {
		// game.physics.collide(sprite, tiles, this.playerHit, null, this);

		// if (this.spaceKey.isDown && sprite.body.touching.down) {
	 //        this.playerJump();
	 //        if (this.start == 0) {
	 //        	this.start = 1;
	 //        	sprite.body.velocity.x = 100;
	 //        }
	 //    }

	 //    if (sprite.body.touching.down && this.start == 1) { 
	 //    	sprite.body.velocity.x = 170;
	 //    }
	    
	 //    sprite.body.gravity.y = 12;


	},

	playerJump: function() {
		sprite.body.velocity.y = -50;
	},

	playerHit: function(player, hit) {
	    this.emitter.x = player.x+player.width/2;
	    this.emitter.y = player.y+player.height/2;
	    this.emitter.start(true, 500, null, 5);
		death += 1;
	},

};
