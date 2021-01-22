//Asg5 Project: Space Game (made with HTML and JAVASCRIPT)
// Code made by Akshay Radhakrishnan, Olivia Wong and Josue Uriarte

window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};

var shoot = new Audio("shootingSound.wav");
var explode = new Audio("explodeSound.mp4");
var death = new Audio("dyingSound.wav");

var gameScreen = document.getElementById("gameScreen");
var ctx = gameScreen.getContext("2d");
var asteroid = document.getElementById("asteroid");
var enemySpace = document.getElementById("enemySpace");
var health1 = document.getElementById("health1");
var health2 = document.getElementById("health2");
var health3 = document.getElementById("health3");
var score = 0;
var lives = 3;
var cooldown = 0;
var healthbarcolor = "green";
gameScreen.style.position = "absolute";
gameScreen.style.left = 0;
gameScreen.style.top = 0;
gameScreen.width = window.innerWidth;
gameScreen.height = window.innerHeight;
gameScreen.style.width = window.innerWidth + "px";
gameScreen.style.height = window.innerHeight + "px";
gameScreen.style.backgroundColor = "black";
document.body.appendChild(gameScreen);

var spaceship = {
    width: 40,
    height: 40,
    xPos: (gameScreen.width / 2),
    yPos: 500,
    dx: 0,
    dy: 0,
    draw: function() {
        ctx.drawImage(enemyImage, this.xPos, this.yPos, this.width, this.height);
    },
    update: function() {
        //Collision Detection w/ Asteroids & Bullets
        for(i = 0; i < asteroids.length; i++) {
            for(k = 0; k < bullets.length; k++) {
                if(bullets[k].xPos < asteroids[i].xPos + asteroids[i].width && bullets[k].xPos + bullets[k].width > asteroids[i].xPos && bullets[k].yPos < asteroids[i].yPos + asteroids[i].height && bullets[k].yPos + bullets[k].height > asteroids[i].yPos) {
                    explode.play();
                    bullets.splice(k, 1);
                    k--;
                    asteroids.splice(i, 1);
                    break;
                }
            }
        }
        //Collision detection between Enemy Bullets & Spaceship
        for(i = 0; i < enemybullets.length; i++) {
            if(this.xPos < enemybullets[i].xPos + enemybullets[i].width && this.xPos + this.width > enemybullets[i].xPos && this.yPos < enemybullets[i].yPos + enemybullets[i].height && this.yPos + this.height > enemybullets[i].yPos) {
                if(lives < 2) {
                    healthbar.width = 100;
                }
                lives--;
                asteroids = [];
                enemybullets = [];
                bullets = [];
                break;
            }
        }
        //Collision detection between Asteroids & Spaceship
        for(i = 0; i < asteroids.length; i++) {
            if(this.xPos < asteroids[i].xPos + asteroids[i].width && this.xPos + this.width > asteroids[i].xPos && this.yPos < asteroids[i].yPos + asteroids[i].height && this.yPos + this.height > asteroids[i].yPos) {
                if(lives < 2) {
                    healthbar.width = 100;
                }
                lives--;
                asteroids = [];
                enemybullets = [];
                bullets = [];
                break; 
            }
        }
        var up = 0;
        var right = 0;
        if(this.goUp && this.yPos > 5) up--;
        if(this.goDown && this.yPos < gameScreen.height - this.height - 19) up++;
        if(this.goLeft && this.xPos > 0 + 21) right--;
        if(this.goRight && this.xPos < gameScreen.width - this.width) right++;
        if(!(up == 0 && right == 0)) {
            var acel = 1;
            var angle_acel = Math.atan2(up, right);
            this.dx += Math.cos(angle_acel) * acel;
            this.dy += Math.sin(angle_acel) * acel;
        }
        this.xPos += this.dx;
        this.yPos += this.dy;
        var angle = Math.atan2(this.dy, this.dx);
        var vel = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        vel *= 0.8;
        if(vel < 0.1) vel = 0;
        this.dx = Math.cos(angle) * vel;
        this.dy = Math.sin(angle) * vel;
    }
}


var spaceship2 = {
    width: 40,
    height: 40,
    xPos: (gameScreen.width / 2 + 65),
    yPos: 500,
    dx: 0,
    dy: 0,
    draw: function() {
        ctx.drawImage(buddyShip, this.xPos, this.yPos, this.width, this.height);
    },
    update: function() {
        //Collision Detection w/ Asteroids & Bullets
        for(i = 0; i < asteroids.length; i++) {
            for(k = 0; k < bullets.length; k++) {
                if(bullets[k].xPos < asteroids[i].xPos + asteroids[i].width && bullets[k].xPos + bullets[k].width > asteroids[i].xPos && bullets[k].yPos < asteroids[i].yPos + asteroids[i].height && bullets[k].yPos + bullets[k].height > asteroids[i].yPos) {
                    explode.play();
                    bullets.splice(k, 1);
                    k--;
                    asteroids.splice(i, 1);
                    break;
                }
            }
        }
        //Collision detection between Enemy Bullets & Spaceship
        for(i = 0; i < enemybullets.length; i++) {
            if(this.xPos < enemybullets[i].xPos + enemybullets[i].width && this.xPos + this.width > enemybullets[i].xPos && this.yPos < enemybullets[i].yPos + enemybullets[i].height && this.yPos + this.height > enemybullets[i].yPos) {
                if(lives < 2) {
                    healthbar.width = 100;
                }
                lives--;
                asteroids = [];
                enemybullets = [];
                bullets = [];
                break;
            }
        }
        //Collision detection between Asteroids & Spaceship
        for(i = 0; i < asteroids.length; i++) {
            if(this.xPos < asteroids[i].xPos + asteroids[i].width && this.xPos + this.width > asteroids[i].xPos && this.yPos < asteroids[i].yPos + asteroids[i].height && this.yPos + this.height > asteroids[i].yPos) {
                if(lives < 2) {
                    healthbar.width = 100;
                }
                lives--;
                asteroids = [];
                enemybullets = [];
                bullets = [];
                break; 
            }
        }
        var up = 0;
        var right = 0;
        if(this.goUp && this.yPos > 5) up--;
        if(this.goDown && this.yPos < gameScreen.height - this.height - 19) up++;
        if(this.goLeft && this.xPos > 0 + 21) right--;
        if(this.goRight && this.xPos < gameScreen.width - this.width) right++;
        if(!(up == 0 && right == 0)) {
            var acel = 1;
            var angle_acel = Math.atan2(up, right);
            this.dx += Math.cos(angle_acel) * acel;
            this.dy += Math.sin(angle_acel) * acel;
        }
        this.xPos += this.dx;
        this.yPos += this.dy;
        var angle = Math.atan2(this.dy, this.dx);
        var vel = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        vel *= 0.8;
        if(vel < 0.1) vel = 0;
        this.dx = Math.cos(angle) * vel;
        this.dy = Math.sin(angle) * vel;
    }
}

//Create Enemy Spaceship Object
var moveAlien = 0;
var alien = {
    width: 80,
    height: 80,
    xPos: (gameScreen.width / 2) - 40,
    yPos: 30,
    goRight: true,
    goLeft: false,
    draw: function() {
        ctx.drawImage(terror, this.xPos, this.yPos, this.width, this.height);
    },
    move: function() {
        moveAlien++
        this.xPos = 475 * Math.sin(moveAlien * ((2 * Math.PI) / 400)) + (gameScreen.width / 2);
        this.yPos = 55 * Math.sin(moveAlien * ((2 * Math.PI) / 300)) + 50;
        //When player's bullets hits the enemy spaceship.
        for(i = 0; i < bullets.length; i++) {
            if(this.xPos < bullets[i].xPos + bullets[i].width && this.xPos + this.width > bullets[i].xPos && this.yPos < bullets[i].yPos + bullets[i].height && this.yPos + this.height > bullets[i].yPos) {
                score++;
                healthbar.width-=0.5;
                bullets.splice(i, 1);
                explode.play();
            }
        }
    },
}

var healthbar = {
    xPos: 1230,
    yPos: 44,
    width: 100,
    height: 20,
    draw: function() {
        ctx.beginPath();
        ctx.fillStyle = healthbarcolor;
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
}

//Stars (Background)

    function Star() {
        this.xPos = Math.random() * gameScreen.width;
        this.yPos = Math.random() * gameScreen.height;
        this.color = "white";
        this.draw = function() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.moveTo(this.xPos + 1, .9 * Math.random(), this.yPos);
            ctx.arc(this.xPos, this.yPos, .9 * Math.random(), 0, 2 * Math.PI);
            ctx.fill();
        }
    }
var stars = [];

function EnemyBullet() {
    this.xPos = alien.xPos + 28;
    this.yPos = alien.height - 20;
    this.width = 1;
    this.height = 10;
    this.update = function() {
        this.yPos += 9;
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
}
var enemybullets = [];

class Bullet{

    constructor(var2){

        if(var2 == 2){
            this.xPos = spaceship2.xPos + 20;
            this.yPos = spaceship2.yPos - spaceship2.height + 35;
            this.width = 1;
            this.height = 10;
        }

        else{
            this.xPos = spaceship.xPos + 20;
            this.yPos = spaceship.yPos - spaceship.height + 35;
            this.width = 1;
            this.height = 10;
        }
        
    }

    update = function() {
        this.yPos -= 9;
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.strokeStyle = "#58F9EB";
        ctx.stroke();
    }
}

var bullets = [];

function missle() {
    this.xPos = Math.random() * gameScreen.width;
    this.yPos = 0;
    this.width = 70;
    this.height = 70;
    this.update = function() {
        this.yPos += 6;
        ctx.beginPath();
        ctx.drawImage(asteroid, this.xPos, this.yPos, this.width, this.height);
    }
}
var asteroids = [];

//Keydown Keyboard Event
document.addEventListener("keydown", function(evt) {
    //Arrow Keys
    if(evt.keyCode === 37) {
        spaceship.goLeft = true;
    }
    if(evt.keyCode === 38) {
        spaceship.goUp = true;
    }
    if(evt.keyCode === 39) {
        spaceship.goRight = true;
    }
    if(evt.keyCode === 40) {
        spaceship.goDown = true;
    }
    //W-A-S-D
    if(evt.keyCode === 65) {
        spaceship2.goLeft = true;
    }
    if(evt.keyCode === 87) {
        spaceship2.goUp = true;
    }
    if(evt.keyCode === 68) {
        spaceship2.goRight = true;
    }
    if(evt.keyCode === 83) {
        spaceship2.goDown = true;
    }

    //Shoot Spacebar
    if(evt.keyCode === 32) {
        //if(cooldown > 3) {
            bullets.push(new Bullet());
            //shoot.play();
            cooldown = 0;
        //}
    }

    //Shoot Key V
    if(evt.keyCode === 86) {
        //if(cooldown > 3) {
            bullets.push(new Bullet(2));
            //shoot.play();
            cooldown = 0;
        //}
    }
})

//Keyup Keyboard Event
document.addEventListener("keyup", function(evt) {
    //Arrow Keys    
    if(evt.keyCode === 37) {
        spaceship.goLeft = false;
    }
    if(evt.keyCode === 38) {
        spaceship.goUp = false;
    }
    if(evt.keyCode === 39) {
        spaceship.goRight = false;
    }
    if(evt.keyCode === 40) {
        spaceship.goDown = false;
    }
    //W-A-S-D
    if(evt.keyCode === 65) {
        spaceship2.goLeft = false;
    }
    if(evt.keyCode === 87) {
        spaceship2.goUp = false;
    }
    if(evt.keyCode === 68) {
        spaceship2.goRight = false;
    }
    if(evt.keyCode === 83) {
        spaceship2.goDown = false;
    }
})
//gameLoop function. Updates every frame
var name;
function askName() {
    name = prompt("What is your name voyager?");
}

function askName2() {
    name = prompt("What is your team name voyagers?");
}

function beginGame() {

    document.body.removeChild(document.getElementById("wrapper"));
    askName();
    gameLoop();
}

function beginGame2() {

    document.body.removeChild(document.getElementById("wrapper"));
    askName2();
    gameLoop2();
}

function gameLoop() {

    //Code handling object drawing and logic
    drawLogic();
        
    //Draw & Update the Spaceship    
    spaceship.update();
    spaceship.draw();

    healthbar.draw();
    alien.move();
    if(Math.random() > 0.953) enemybullets.push(new EnemyBullet());
    alien.draw();
    window.requestAnimationFrame(gameLoop);
}

function gameLoop2() {

    //Code handling object drawing and logic
    drawLogic();
        
    //Draw & Update the Spaceship    
    spaceship.update();
    spaceship.draw();

    spaceship2.update();
    spaceship2.draw();

    healthbar.draw();
    alien.move();
    if(Math.random() > 0.953) enemybullets.push(new EnemyBullet());
    alien.draw();
    window.requestAnimationFrame(gameLoop2);
}

function drawLogic(){

    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    ctx.beginPath();
    cooldown++;

    //Font stuff
    ctx.font = "25px pixel";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + lives, 10, 40);
    ctx.font = "25px pixel";
    ctx.fillStyle = "white";
    ctx.fillText("score: " + score, 10, 65);
    ctx.font = "25px pixel";
    ctx.fillStyle = "white";
    ctx.fillText("Voyager: " + name, 10, 90);    
    ctx.font = "25px pixel";
    ctx.fillStyle = "white";
    ctx.fillText("Boss Health", 1200, 30);
    ctx.font = "23px pixel";
    ctx.fillStyle = "white";

    //End of font stuff
    //If asteroid's y position is greater than the height of the window, remove it from the array.
    for(i = 0; i < asteroids.length; i++) {
        if(asteroids[i].yPos > gameScreen.height) {
            asteroids.splice(asteroids[i], 1);
        }
    }
    //Draw and create background stars.
    for(i = 0; i < stars.length; i++) {
        stars[i].draw();
    }
    if(stars.length < 20){
        stars.push(new Star());
    }
    //Removing bullets when it's off the screen.
    for(i = 0; i < bullets.length; i++) {
        if(bullets[i].yPos < 0) {
            bullets.splice(bullets[i], 1);
        }
    }
    if(score < 5) {
        if(Math.random() > 0.994) asteroids.push(new missle());
        for(i = 0; i < asteroids.length; i++) {
            asteroids[i].update();
        }
    } else if(score < 20) {
        if(Math.random() > 0.99) asteroids.push(new missle());
        for(i = 0; i < asteroids.length; i++) {
            asteroids[i].update();
        }
    } else if(score < 40) {
        if(Math.random() > 0.97) asteroids.push(new missle());
        for(i = 0; i < asteroids.length; i++) {
            asteroids[i].update();
        }
    } else if(score < 70) {
        if(Math.random() > 0.95) asteroids.push(new missle());
        for(i = 0; i < asteroids.length; i++) {
            asteroids[i].update();
        }
    } else if(score < 100 || score > 99) {
        if(Math.random() > 0.90) asteroids.push(new missle());
        for(i = 0; i < asteroids.length; i++) {
            asteroids[i].update();
        }
    }
    for(i = 0; i < bullets.length; i++) {
        bullets[i].update();
    }
    for(i = 0; i < enemybullets.length; i++) {
        enemybullets[i].update();
    }
    if(lives < 1) {
        death.play();
        alert("You died! Final score:" + score);
        lives = 3;
        score = 0;
        enemybullets = [];
        bullets = [];
        asteroids = [];
    }
    //Draw Spaceship health
    if(lives < 2) {
        ctx.drawImage(health1, 115, 8, 52, 56);
    } else if(lives < 3) {
        ctx.drawImage(health1, 115, 8, 52, 56);
        ctx.drawImage(health2, 150, 8, 52, 56);
    } else if(lives < 4) {
        ctx.drawImage(health1, 115, 8, 52, 56);
        ctx.drawImage(health2, 150, 8, 52, 56);
        ctx.drawImage(health3, 185, 8, 52, 56);
    }
    
    //Creating a border for the healthbar
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.rect(1230, 44, 100, 20);
    ctx.stroke();
    ctx.closePath();
    
    
    if(healthbar.width < 50) {
        healthbarcolor = "orange";
    } else if (healthbar.width < 23) {
        healthbarcolor = "red";
    } else if (healthbar.width < 2) {
        alert("You win! Your score is" + score);
    } else {
        healthbarcolor = "green";
    }
    
}