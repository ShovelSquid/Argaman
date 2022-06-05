class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scale = SCALE;
        // Arcade Physics
        this.SPEED = 200;
        this.ACCELERATION = 3500;
        this.DRAG = this.ACCELERATION * 0.6;
        this.setMaxVelocity(this.SPEED);
        this.setDrag(this.DRAG);
        this.setDamping(false);
        // Booleans
        this.canDash = true;
        this.canSlash = true;
        this.dashing = false;
        this.slashing = false;
        this.stepping = false;

        // Create function
        this.setCollideWorldBounds(true);
    }
    update() {
        
    }
}