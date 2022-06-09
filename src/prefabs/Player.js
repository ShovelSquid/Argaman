class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scale = SCALE;
        // Arcade Physics
        this.SPEED = 300;
        this.DASHSPEED = 1600;
        this.ACCELERATION = 3500;
        this.DRAG = this.ACCELERATION * 0.4;
        this.setMaxVelocity(this.SPEED);
        this.setDrag(this.DRAG);
        this.setDamping(false);
        // Variables
        // this.direction = new Vector2;
        this.direction = {          // get a -1, 1 vector 2 direction
            x: 1,                   // not good for full 360 degree rotation
            y: 0                    // only 8-directional
        };
        this.combo = {
            active: false,          // are you currently in a combo?
            max: 3,                 // max amount of hits in combo
            count: 0,               // current combo counter
            pause: 250,             // time in milliseconds between slashes
            inputTime: 600,         // time in milliseconds to wait before cooldown
            recharge: 900,          // time in milliseconds of cooldown
        };
        this.health = {
            max: 100,               // max health :P
            current: 100,           // current health :O
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
        this.canMove = true;
        this.dashing = false;
        this.slashing = false;
        this.stepping = false;

        // Create function
        this.setCollideWorldBounds(true);
        // fast footstep burst
        // this.footstep = this.scene.time.addEvent({
        //     delay: 165,
        //     callback: () => {
        //         if (Math.abs(this.body.acceleration.x) == 0 && Math.abs(this.body.acceleration.y) == 0) {
        //             console.log('pause');
        //             this.footstep.paused = true;
        //             this.stepping = false;
        //         }
        //         else if (this.canWalk()){
        //             this.step(1.4, 115);
        //         }
        //     },
        //     loop: true,
        //     paused: true,
        //     startAt: 250,
        // });
        console.log("hello!");
    }

    update() {
        // key movement
        let currentAccel = [0, 0];
        if (keyW.isDown) {
            if (keyA.isUp && keyD.isUp) {
                this.direction.x = 0;
            };
            this.direction.y = -1;
            if (this.canWalk()) {
                currentAccel[1] -= this.ACCELERATION;
            }
        }
        if (keyA.isDown) {
            if (keyW.isUp && keyS.isUp) {
                this.direction.y = 0;
            };
            this.direction.x = -1;
            if (this.canWalk()) {
                currentAccel[0] -= this.ACCELERATION;
            }
        }
        if (keyS.isDown) {
            if (keyA.isUp && keyD.isUp) {
                this.direction.x = 0;
            };
            this.direction.y = 1;
            if (this.canWalk()) {
                currentAccel[1] += this.ACCELERATION;
            }
        }
        if (keyD.isDown) {
            if (keyW.isUp && keyS.isUp) {
                this.direction.y = 0;
            };
            this.direction.x = 1;
            if (this.canWalk()) {
                currentAccel[0] += this.ACCELERATION;
            }
        }
        // if (this.canWalk()) {
        //     this.footstep.paused = false;
        // }
        // Space down performs a dash
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.canDash) {
            this.dash();
        }
        // F performs a quick slash attack
        if (Phaser.Input.Keyboard.JustDown(keyF) && this.canSlash) {
            this.createSlash(this.width*3.5);
        }
        if (this.direction.x < 0) {
            this.setFlipX(true);
        }
        else if (this.direction.x > 0) {
            this.setFlipX(false);
        }
        if (this.canWalk()) {
            this.setAcceleration(currentAccel[0], currentAccel[1]);
        }
    }
    canWalk() {
        if (this.dashing) {             // can't walk if dashing
            console.log("you are dashing");
            return false;
        };
        if (this.stepping) {            // can't walk mid-step
            console.log("you are stepping");
            return false;
        }
        // if (this.combo.active) {        // can't walk mid-strike
        //     console.log("you are comboing");
        //     return false;
        // }
        if (!this.canMove) {            // if other things dictate you can't move.
            console.log("you can't move;");
            return false;
        }
        // If you aren't dashing, stepping, comboing, or etc, can walk :)
        return true;
    }

    step(magnitude = this.SPEED, length = 250, recharge = 350) {
        this.stepping = true;                           // stepping boolean to tell if mid-step
        this.setAcceleration(0, 0);
        this.setMaxVelocity(magnitude);      // set walk speed to greater magnitude
        this.setVelocity(this.direction.x*magnitude, this.direction.y*magnitude);
        this.scene.time.delayedCall(length, () => {
            this.setMaxVelocity(this.SPEED);            // return to normal speed
            this.stepping = false;                      // finish mid-step
            // this.footstep.paused = false;               // set footstep rhythm back in place
        });
        // this.footstep.delay = recharge;                 // alter overall footstep delay (if needed)
    }

    dash(magnitude = this.DASHSPEED, length = 150, recharge = 1000) {
        this.setMaxVelocity(magnitude);     // make player move faster
        // reminder that acceleration returns a vector
        this.setVelocity(this.direction.x*magnitude, this.direction.y*magnitude);
        this.canDash = false;                   // boolean
        this.canMove = false;                   // woolean
        this.dashing = true;                    // trooleans
        this.setAcceleration(0, 0);
        // this.footstep.paused = true;            // stop (or attempt to stop) the walking event 
        this.scene.time.delayedCall(length, () => {
            // let interpolation = Phaser.Math.Interpolation.Bezier([this.body.maxVelocity, this.SPEED], 0.5);
            // console.log(interpolation);
            this.setMaxVelocity(this.SPEED);    // return to base speed
            this.dashing = false;               // no longer currently dashing
            this.canMove = true;                // so you can move.
            // this.footstep.paused = false;       // turn walking back on
        })
        this.scene.time.delayedCall(recharge, () => {
            this.canDash = true;                // able to dash again
        })
    }

    createSlash(range = this.width, length = 250) {
        console.log("Can slash? Well, we're slashing, so let's see what it says: ", this.canSlash, ". Yep, makes sense.");
        // remove events to prevent jankiness
        this.scene.time.removeEvent(this.inputWait);
        this.scene.time.removeEvent(this.cooldown);
        this.scene.time.removeEvent(this.unlockMove);
        // If we already have a combo, iterate count (don't need two ifs, but i'm quirky :})
        if (this.combo.active) {
            this.combo.count++;
        }
        // If we don't have a combo, start a combo and iterate
        else if (this.combo.count == 0) {
            this.combo.active = true;
            this.combo.count++;
        }
        // If combo count is over max, stop combo and reset
        if (this.combo.count >= this.combo.max) {
            console.log("max combo!")
            this.canSlash = false;
            this.combo.active = false;
            this.combo.count = 0;
        }
        this.canMove = false;
        console.log("now? ", this.canSlash);
        this.slashing = true;                           // woolean
        this.step(this.SPEED*2, 100, 600);              // make player move after slashing

        // add slash out a bit beyond sprite
        let slash = this.scene.add.sprite(this.x + this.direction.x*(range), this.y + this.direction.y*(range), 
        'slash').setOrigin(0.5, 0.5).setScale(SCALE, SCALE);
        let hitByGroup = this.scene.add.group();        // add group of enemies hit by slash
        this.scene.physics.add.existing(slash);         // initialize physics
        // slash.body.startFollow(this);

        // add collision between enemies to scene
        this.scene.physics.add.overlap(this.scene.enemies, slash, (enemy) => {
            if (!hitByGroup.contains(enemy)) {          // if not in the group of enemies hit by slash,
                hitByGroup.add(enemy);                  // add them to that group
                enemy.hit(this.damage.base);            // and then hurt them :)
            }
        });
        let angleBetween = Phaser.Math.Angle.Between(this.x, this.y, slash.x, slash.y);         // Get angle in radians
        angleBetween *= 180/Math.PI;                    // convert angle to degrees
        slash.angle = angleBetween;                     // apply to sprite rotation
        this.scene.time.delayedCall(length, () => {
            hitByGroup.destroy();
            slash.destroy();                            // be prepared to end your most precious creations
        })
        // Can move again after a short period
        this.unlockMove = this.scene.time.delayedCall(this.combo.pause, () => {
            this.canMove = true;
        });
        // Input delay, gives time to perform a combo
        this.inputWait = this.scene.time.delayedCall(this.combo.inputTime, () => {
            console.log("Input over!");
            this.canSlash = false;                  // at end, input over no longer able to slash
            this.combo.active = false;              // reset combo
            this.combo.count = 0;
        });
        // Cooldown before next combo able to start
        this.cooldown = this.scene.time.delayedCall(this.combo.recharge, () => {
            console.log("cooldown done");
            this.canSlash = true;                   // can slash again
        });

    }
}