class Player extends Phaser.Physics.Arcade.Sprite {
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
        // fast footstep burst
        this.footstep = this.scene.time.addEvent({
            delay: 165,
            callback: () => {
                if (Math.abs(this.body.acceleration.x) == 0 && Math.abs(this.body.acceleration.y) == 0) {
                    console.log('pause');
                    this.footstep.paused = true;
                    this.stepping = false;
                }
                else if (this.canWalk()){
                    this.step(1.9, 115);
                }
            },
            loop: true,
            paused: true,
            startAt: 250,
        });
        console.log(this.footstep);
        console.log("hello!");
    }

    update() {
        // key movement
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
            this.dash(12, 160, 800);
        }
        // F performs a quick slash attack
        if (Phaser.Input.Keyboard.JustDown(keyF) && this.canSlash) {
            this.createSlash(this.width*3);
        }
        if (this.body.acceleration.x < 0) {
            this.setFlipX(true);
        }
        else if (this.body.acceleration.x > 0) {
            this.setFlipX(false);
        }
        this.setAcceleration(currentAccel[0], currentAccel[1]);
    }
    canWalk() {
        // can only walk if +ve acceleration 
        if (Math.abs(this.body.acceleration.x) > 0 || Math.abs(this.body.acceleration.y) > 0) {
            if (this.dashing) {             // can't walk if dashing
                return false;
            };
            if (this.stepping) {            // can't walk mid-step
                return false;
            }
            return true;                    // if not dashing or stepping and is moving, return true
        }
        return false;                       // otherwise, return false
    }

    step(magnitude = 1.5, length = 250, recharge = 350) {
        console.log('step');
        this.stepping = true;                           // stepping boolean to tell if mid-step
        this.setMaxVelocity(this.SPEED*magnitude);      // set walk speed to greater magnitude
        this.setVelocity(this.body.acceleration.x*2, this.body.acceleration.y*2);
        this.scene.time.delayedCall(length, () => {
            this.setMaxVelocity(this.SPEED);            // return to normal speed
            this.stepping = false;                      // finish mid-step
            this.footstep.paused = false;               // set footstep rhythm back in place
        });
        this.footstep.delay = recharge;                 // alter overall footstep delay (if needed)
    }

    dash(magnitude = 12, length = 150, recharge = 600) {
        this.setMaxVelocity(this.SPEED*magnitude);     // make player move faster
        // reminder that acceleration returns a vector
        this.setVelocity(this.body.acceleration.x, this.body.acceleration.y);
        this.canDash = false;                   // boolean
        this.dashing = true;                    // trooleans
        this.footstep.paused = true;            // stop (or attempt to) the walking event 
        this.scene.time.delayedCall(length, () => {
            // let interpolation = Phaser.Math.Interpolation.Bezier([this.body.maxVelocity, this.SPEED], 0.5);
            // console.log(interpolation);
            this.setMaxVelocity(this.SPEED);    // return to base speed
            this.dashing = false;               // no longer currently dashing
            this.footstep.paused = false;       // turn walking back on
        })
        this.scene.time.delayedCall(recharge, () => {
            this.canDash = true;                // able to dash again
        })
    }

    createSlash(range = this.width, magnitude = 0.5, length = 250, recharge = 150) {
        console.log('slash!');
        this.canSlash = false;                  // boolean for the
        this.slashing = true;                   // woolean
        this.step(2.5, 350, 600);               // make player move after
        this.setMaxVelocity(this.SPEED*magnitude);          // set slower velocity
        let direction = {                                   // get -1, 1 vector2 direction
            x: this.body.acceleration.x/this.ACCELERATION,  // not good for full 360 degree rotation
            y: this.body.acceleration.y/this.ACCELERATION   // only works in full left right up down
        };
        console.log(direction);
        console.log(this.angle);
        
        // add slash out a bit beyond sprite
        let slash = this.scene.add.sprite(this.x + direction.x*range, this.y + direction.y*range,
        'slash').setOrigin(0.5, 0.5).setScale(SCALE);
        let angleBetween = Phaser.Math.Angle.Between(this.x, this.y, slash.x, slash.y);         // Get angle in radians
        angleBetween *= 180/Math.PI;                        // convert angle to degrees
        slash.angle = angleBetween;                         // apply to sprite rotation
        console.log('angle: ', angleBetween);
        this.scene.time.delayedCall(length, () => {
            slash.destroy();                    // be prepared to end your most precious creations 
        })
        this.scene.time.delayedCall(recharge, () => {
            this.canSlash = true;               // they won't last that long
        });
    }
}