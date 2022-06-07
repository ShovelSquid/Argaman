class Enemy extends Phaser.Physics.Arcade.Sprite {
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
        // Variables
        this.health = {
            max: 100,
            current: 100,
            life: 1,                // 1 for if +ve vitality or -1 for undead
        };
        this.damage = {
            base: 10,               // base damage amount
            type: 'miasma',         // type: Miasma;
            over: 0,                // instantaneously
        };
        // Booleans
        this.canDash = true;
        this.canSlash = true;
        this.dashing = false;
        this.slashing = false;
        this.stepping = false;

        // Create function
        this.setCollideWorldBounds(true);
        console.log("hello!");
    }
    update() {

    }

    hit(damage) {
        console.log(' hit for ', damage, ' damage!');
        this.health.current -= damage;      // take damage
        this.hitChunk();                    // show damage effects
        // if health < 0, die
        if (this.health.current * this.health.life < 0) {
            this.die();
        }
    }
    hitChunk(duration = 150) {
        console.log('hit chunk!');
        this.setVelocity(-this.SPEED, -this.SPEED);
        this.setTintFill(0xffffff);
        this.scene.physics.enable = false;
        this.delayedCall(duration, () => {
            this.clearTint();
            this.scene.physics.enable = true;
        })
    }
}