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
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0).setScale(SCALE);
        this.player = new Player(this, game.config.width/2, game.config.height/3, 
        'player').setOrigin(0.5, 0.5);
    }

    update() {
        this.player.update();
    }
}