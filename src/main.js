/*
ARGAMAN
by Kaelen Cook

A game about exploring.


*/


let SCALE = 1;

let config = {
    type: Phaser.AUTO,
    width: 1048,
    height: 720,
    fps: 60,
    physics: {
        default: 'arcade',
        arcade: {
            useTree: true,
            gravity: {y: 0},
            debug: false,
        }
    },
    scene: [Menu, Play],
    scale: {
        mode: Phaser.Scale.FIT,
    },
    pixelArt: true,
};

let game = new Phaser.Game(config);