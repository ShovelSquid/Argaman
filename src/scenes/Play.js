class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';
        // preload sprites
        this.load.image('background', 'background.png');
        this.load.image('player', 'Player.png');
        this.load.image('enemy', 'Central.png');
        this.load.image('pillar', 'Pillar of Reconstruction.png');
        this.load.image('slash', 'Slash.png');
        // Load keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLSHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFTSHIFT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        
    }

    create() {
        console.log("ready to play");
        // initialize background
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0).setScale(SCALE);
        // initialize player
        this.player = new Player(this, game.config.width/2, game.config.height/3, 'player').setOrigin(0.5, 0.5);
        this.enemy = new Enemy(this, game.config.width*0.4, game.config.height/1.5, 'enemy').setOrigin(0.5, 0.5);
        this.factory = new Factory(this, game.config.width*0.2, game.config.height/2, 'pillar').setOrigin(0.5, 0.5);
        // initialize groups
        this.enemies = this.add.group();
        this.enemies.add(this.enemy);
        this.enemies.add(this.factory);
        // initialize collisions
        this.physics.add.collider(this.enemies, this.player, () => {            // collision b/w enemies and player
            //
        });
        this.physics.add.collider(this.factory, this.player, () => {            // collision b/w factory and player
            //
        });
        this.physics.add.collider(this.enemies, this.enemies, () => {           // collision b/w enemies
            //
        });
    }

    update() {
        this.player.update();
        this.enemies.getChildren().forEach((enemy) => {
            enemy.update();
        })
    }
}