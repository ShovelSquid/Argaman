class Factory extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scale = SCALE;
        this.body.immovable = true;
        // Variables
        this.health = {
            max: 100,
            current: 100,
            life: 1                     // 1 for normal vitality, -1 for undead, 0 for invincibility?
        };
        // Booleans
        this.invincible = false;

        this.spawnTimer = this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                console.log("callback");
                this.addEnemy();
            },
            loop: true,
            paused: false,
            startAt: 1000,
        });
    }

    update() {

    }

    addEnemy() {
        console.log("new baby");
        let enemy = new Enemy(this.scene, this.x + this.width*2, this.y, 'enemy').setOrigin(0.5, 1);
        this.scene.enemies.add(enemy);
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
        }
    }

    die() {
        this.scene.time.removeEvent(this.spawnTimer);
        this.destroy();
    }

    hitChunk(duration = 150) {
        console.log('hit chunk!');
        this.setTintFill(0xffffff);
        this.scene.time.delayedCall(duration, () => {
            this.clearTint();
        })
    }
}