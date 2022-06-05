class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }
    
    create() {
        console.log("Argamannn");
        keySPACE = Phaser.Input.Keyboard
        let textConfig = {
            fontfamily: 'sansserif',
            fontSize: '64px',
            backgroundColor: '#000',
            color: '#FFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        };
        this.add.text(this.game.config.width/2, this.game.config.height/5, 
        'ARGAMAN', textConfig).setOrigin(0.5, 0.5);
        textConfig.fontSize = '28px';
        this.add.text(this.game.config.width/2, this.game.config.height/3.5, 
        'BY KAELEN COOK', textConfig).setOrigin(0.5, 1);
        textConfig.fontSize = '32px';
        textConfig.color = '#FAB';
        this.add.text(this.game.config.width*0.4, this.game.config.height/2, 
        'Press ENTER to begin.', textConfig).setOrigin(1, 1);
    }
}