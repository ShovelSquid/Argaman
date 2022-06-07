class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scale = SCALE;
        // Arcade Physics
        this.SPEED = 500;
        this.ACCELERATION = 3500;
        this.DRAG = this.ACCELERATION * 1.2;
        this.setMaxVelocity(this.SPEED);
        this.setDrag(this.DRAG);
        this.setDamping(false);
        // Variables
        this.health = {
            max: 30,
            current: 30,
            life: 1,                // 1 for if +ve vitality or -1 for undead
        };
        this.damage = {
            base: 10,               // base damage amount
            type: 'miasma',         // type: Miasma;
            over: 0,                // instantaneously
            iframes: 60,             // duration of invincibility after hit
        };
        // Booleans
        this.canDash = true;
        this.canSlash = true;
        this.dashing = false;
        this.slashing = false;
        this.stepping = false;
        this.invincible = false;

        // Create function
        this.setCollideWorldBounds(true);
        console.log("hello!");

        this.setAcceleration(500, 100);
    }
    update() {

    }

    hit(damage) {
        console.log(' hit for ', damage, ' damage!');
        this.health.current -= damage;                  // take damage
        // if health < 0, die
        if (this.health.current * this.health.life <= 0) {
            this.die();
        }
        else {
            console.log('HP: ', this.health.current, '/', this.health.max);
            this.hitChunk();                                // show damage effects
            this.setVelocity(-this.SPEED, -this.SPEED);     // move backward
    
        }
    }

    die() {
        this.destroy();
    }

    hitChunk(duration = 150) {
        console.log('hit chunk!');
        this.setTintFill(0xffffff);
        this.body.enable = false;
        this.scene.time.delayedCall(duration, () => {
            this.clearTint();
            this.body.enable = true;
        })
    }
}