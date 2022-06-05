class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scale = SCALE;

        // Arcade Physics
        this.SPEED = 150;
        this.ACCELERATION = 3500;
        this.DRAG = this.ACCELERATION * 0.6;
        this.setMaxVelocity(this.SPEED);
        this.setDrag(this.DRAG);
        this.setDamping(false);
        // Booleans
        this.canDash = true;
        this.dashing = false;

        // Create function
        this.setCollideWorldBounds(true);
        // fast footstep burst
        this.footstep = this.scene.time.addEvent({
            delay: 600,
            callback: () => {
                console.log("ieajrojr");
                if (Math.abs(this.body.acceleration.x) == 0 && Math.abs(this.body.acceleration.y) == 0) {
                    console.log('pause');
                    this.footstep.paused = true;
                }
                else {
                    console.log('keep');
                    this.setMaxVelocity(this.SPEED*2);
                    this.setVelocity(this.body.acceleration.x*2, this.body.acceleration.y*2);
                    this.scene.time.delayedCall(350, () => {
                        this.setMaxVelocity(this.SPEED);
                    })
                }
            },
            loop: true,
            paused: true,
            startAt: 250,
        });
        console.log(this.footstep);
        console.log("hello!");
    }

    preload() {

    }

    create() {

    }

    update() {
        let currentAccel = [0, 0];
        if (keyW.isDown) {
            currentAccel[1] -= this.ACCELERATION;
        }
        if (keyA.isDown) {
            currentAccel[0] -= this.ACCELERATION;
        }
        if (keyS.isDown) {
            currentAccel[1] += this.ACCELERATION;
        }
        if (keyD.isDown) {
            currentAccel[0] += this.ACCELERATION;
        }
        if (this.canWalk()) {
            this.footstep.paused = false;
        }
        // Space down performs a dash
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.canDash) {
            this.setMaxVelocity(this.SPEED*6);      // make player move faster
            // reminder that acceleration returns a vector
            this.setVelocity(this.body.acceleration.x, this.body.acceleration.y);
            this.canDash = false;                   // boolean
            this.dashing = true;                    // trooleans
            this.footstep.paused = true;            // stop (or attempt to) the walking event 
            this.scene.time.delayedCall(300, () => {
                // let interpolation = Phaser.Math.Interpolation.Bezier([this.body.maxVelocity, this.SPEED], 0.5);
                // console.log(interpolation);
                this.setMaxVelocity(this.SPEED);
                this.dashing = false;
                this.footstep.paused = false;
            })
            this.scene.time.delayedCall(800, () => {
                this.canDash = true;
            })
        }
        this.setAcceleration(currentAccel[0], currentAccel[1]);
    }
    canWalk() {
        if (Math.abs(this.body.acceleration.x) > 0 || Math.abs(this.body.acceleration.y) > 0) {
            if (!this.dashing) {
                return true;
            };
        }
        return false;
    }
}