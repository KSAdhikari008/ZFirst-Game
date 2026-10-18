class mainScene {

  preload() {
    this.load.image('player', 'assets/player-1.png');
    this.load.image('item', 'assets/asteroid-1.png');
  }
  
  create() {
    this.score = 0;
    let style = { font: '20px Arial', fill: '#fff' };
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    this.arrow = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(100, 100, 'player');
    this.item = this.physics.add.sprite(50, 50, 'item');

    // Match the hitbox to the visible player, the PNG has transparent padding.
    this.player.body.setSize(16, 41, false);
    this.player.body.setOffset(56, 23);

    // Keep the player's hitbox inside the game frame.
    this.player.setCollideWorldBounds(true);
    
  }

  hit(){
    this.item.x = Phaser.Math.Between(20, 680);
    this.item.y = Phaser.Math.Between(40, 380);

    this.score += 10;
    this.scoreText.setText('score: ' + this.score);

    this.tweens.add({
      targets: this.player, // on the player 
      duration: 60, // for 60ms 
      scaleX: 1.4, // that scale vertically by 20% 
      scaleY: 1.4, // and scale horizontally by 20% 
      yoyo: true, // at the end, go back to original scale 
    });
  }

  update() {

    // Handle horizontal movement
    if(this.arrow.right.isDown){
      this.player.x += 3;
    }else if(this.arrow.left.isDown){
      this.player.x -= 3;
    }

    // Handle horizontal movement
    if(this.arrow.up.isDown){
      this.player.y -= 3;
    }else if(this.arrow.down.isDown){
      this.player.y += 3;
    }
  
    // If collision
    if(this.physics.overlap(this.player, this.item)){
      this.hit();
    }
  }
  
}


new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 500, // Height of the game in pixels
  backgroundColor: '#3498db', // The background color (blue)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
})