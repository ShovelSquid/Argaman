class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        /*
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLSHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFTSHIFT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        */
    }
    
    create() {

        console.log("Argamannn");
        keySPACE = Phaser.Input.Keyboard;
        keyENTER = Phaser.Input.Keyboard.Key()
        let textConfig = {                  // text config!
            fontfamily: 'sansserif',        // not a font
            fontSize: '64px',
            backgroundColor: '#310',        // shortsized values??
            color: '#FFF',                  // all white
            align: 'center',
            padding: {                      // yes sir lord paddington himself
                top: 5,
                bottom: 5,
            },
        };
        // add menu text
        this.add.text(this.game.config.width/2, this.game.config.height/5,          // game title
        'ARGAMAN', textConfig).setOrigin(0.5, 0.5);
        textConfig.fontSize = '28px';
        this.add.text(this.game.config.width/2, this.game.config.height/3.5,        // game author
        'BY KAELEN COOK', textConfig).setOrigin(0.5, 1);
        textConfig.fontSize = '32px';
        textConfig.color = '#FAB';
        this.add.text(this.game.config.width*0.4, this.game.config.height/2,        // game instructions
        'Enter SPACE to begin.', textConfig).setOrigin(1, 1);

        this.input.keyboard.on('keydown-SPACE', () => {         // method for starting game
            this.startScene();
        });
        this.input.keyboard.on('keydown-ENTER', () => {         // alternate method for start
            this.startScene();
        })
    }

    startScene() {
        this.scene.start('playScene');          // extra function in case menu becomes elaborate
    }
}