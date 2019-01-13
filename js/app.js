// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 50;
    this.speed = speed;
    this.xMove = 100;
    this.yMove = 80;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.xMove * 5){
        this.x += this.speed * dt;
    }
    else{
        // Reset killer's position to origin
        this.x = -this.xMove;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class
class Jumper{
    // Constructor
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.xMove = 100;
        this.yMove = 80;
        this.startX = this.xMove * 2;
        this.startY = (this.yMove * 5) +50;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }
    // Properties
    // x pos
    // y pos
    // Sprite image
// Method
    // Update position
        // Check collision here
            // Did player x and y collide with enemy?
        // Check win here
            // Did player x and y reach final tile?
    // Render
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
        // Draw player sprite on current x and y cood position
    // Handle keyboard input
        // Update player's x and y property accorrding to input
    handleInput(input){
        switch(input){
            case 'left':
                if(this.x > 0){
                    this.x -= this.xMove;
                }              
                break;
            case 'up':
                if(this.y > 0){
                    this.y -= this.yMove;
                }
                break;
            case 'right':
                if(this.x < this.xMove * 4){
                    this.x += this.xMove;
                }
                break;
            case 'down':
                if(this.y < this.yMove * 4){
                    this.y += this.yMove;
                }
                break;
        }
    }

    update(){
        for( let killer of allEnemies){
            if( this.y === killer.y && 
                killer.x + killer.xMove/2 > this.x &&
                killer.x < this.x + this.xMove/2
                ){
                console.log("collision!")
                this.reset();
            }
        //console.log(this.y);
        if(this.y === -30){
            this.victory = true;
            console.log("WIN!!!")
        }
        }
    }
    // Reset Player
        // Set x and y starting x and y
    reset(){
        this.x = this.startX;
        this.y = this.startY;
    }
    
}
    


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Jumper();
const killer_01 = new Enemy(0,0, 50);
const killer_02 = new Enemy(0,80, 250);

const allEnemies = []; 
allEnemies.push(killer_01, killer_02);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



