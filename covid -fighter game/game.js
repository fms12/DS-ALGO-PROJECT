// first load the image then initialize the object on the game then draw and update loop run infnite time till the gmae is over  

function load_images() {
    // player,vrius,gems imagess
    enemy_image = new Image;
    enemy_image.src = "Assets/emeny.jpg";

    player_img = new Image;
    player_img.src = "Assets/superhero.png";

    gem_img = new Image;
    gem_img.src = "Assets/gemm.png"
}

function init() {
    // define the object that will be used in the game
    canvas = document.getElementById('mycanvas')
    W= 700
    H = 400
    gameover = false
    

    canvas.width = W;
    canvas.height = H;
    //  create a context to draw on the canvas

    pen = canvas.getContext('2d');
    // console.log(pen)

    // box = {
    //     x: 150,
    //     y: 50,
    //     w: 60,
    //     h: 60,
    //     speed:10,
    // };
    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20,
    };
    e2 = {
        x: 300,
        y: 150,
        w: 60,
        h: 60,
        speed: 30,
    };
    e3 = {
        x: 450,
        y: 20,
        w: 60,
        h: 60,
        speed: 40,
    };

    // console.log(box)
    enemy = [e1, e2, e3];


    player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
        moving  : false,
        health : 100,
	};
    
	gem = {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
    };
    

    // listen the to events on the canvas

    canvas.addEventListener('mousedown', function () {
        // console.log('mouse press');
        player.moving = true;

    })
    canvas.addEventListener('mouseup', function () {
        // console.log('mouse press');
        player.moving = false;

    })
    
}

function iSColliding(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
         return true
         }
         
         return false;
}

function draw() {
    // clear the canvas area for the old frame
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = 'red'
    // pen.fillRect(box.x, box.y, box.w, box.h);
    // pen.drawImage(enemy_image,box.x, box.y, box.w, box.h);
    
    // for the player image 
    pen.drawImage(player_img, player.x, player.y, player.w, player.h);
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    // for enemy image
    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(enemy_image,enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }


}

// update: use to give the movment of the box
function update() {

    // // move the box downword
    // box.y += box.speed;
    // console.log(box.y)

    // //  when y exceeded the widthcoordinates
    // // if (box.y>=H-box.h || box.y<0) {
    // //     box.speed*=-1
    // // }

    // update each enemy by the same logic

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed;
        if (enemy[i].y > H - enemy[i].h || enemy[i].y < 0) {
            enemy[i].speed*=-1
        }
        
    }

    // if player is moving towards
    if (player.moving == true) {
        player.x+=player.speed
    }

    //overlapping checing or collinsion

    if (iSColliding(player, gem)) {
        console.log('you won')
        alert('you won Game');
        gameover = true;
        return
    }
    for (let i = 0; i < enemy.length; i++) {

        if (iSColliding(player, enemy[i])) {
            player.health -= 10;
            if (player.health < 0) {
                console.log(player.health);
                gameover = true;
                player.health = 0;
                alert('Game Over' + player.health)
            }
        }
    }
    pen.fillStyle = 'white';
    pen.fillText('Score: '+ player.health,10,10)
}

function gameloop() {
    if (gameover == true) {
        clearInterval(f);
        
    }

    draw();
    update();
    // console.log('gameloop')
}

load_images();
init();
var f = setInterval(gameloop,100)