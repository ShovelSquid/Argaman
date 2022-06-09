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
        this.DRAG = this.ACCELERATION * 0.8;
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
        this.health.current -= damage;                  // take damage
        // if health < 0, die
        if (this.health.current * this.health.life <= 0) {
            this.scene.time.removeEvent(this.accelCall);
            this.die();
        }
        else {
            this.hitChunk(150);                             // show damage effects
            this.setVelocity(-this.SPEED, 0);               // move backward
            this.setAcceleration(0, 0);
            this.scene.time.removeEvent(this.accelCall);
            this.accelCall = this.scene.time.addEvent({
                delay: 500,
                callback: () => {
                    this.setAcceleration(this.ACCELERATION, 0);
                }
            })
        }
    }

    die() {
        this.scene.time.removeEvent(this.clearCall, this.accelCall);
        console.log("death call");
        this.destroy();
    }

    hitChunk(duration = 150) {
        this.setTintFill(0xffffff);
        this.body.immovable = true;
        this.clearCall = this.scene.time.delayedCall(duration, () => {
            this.clearTint();
            this.body.immovable = false;
        })
    }
}