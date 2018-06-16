
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');




// load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth  = new Image();


let gap = 350;
let constant = pipeNorth.height + gap;

let bX = 30;
let bY = canvas.height/2;

let gravity = 1.5;

let score = 0;



// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = 'sounds/fly.mp3';
scor.src = 'sounds/score.mp3'



bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';


// on key down

document.addEventListener('keydown', moveUp);

function moveUp(){

    bY -= 20;
    fly.play();
}

//pipe coordinates

let pipe = [];

pipe[0] = {

    x : canvas.width,
    y : 0
};



// draw images

function draw(){

        context.drawImage(bg, 0, 0, 400, 600);

        for(let i = 0; i < pipe.length; i ++) {

            context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            context.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

            pipe[i].x--;

            if(pipe[i].x == 125) {

                pipe.push({

                    x : canvas.width,
                    y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                });
            }

            // detect collision

            if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height
            || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >= canvas.height - fg.height){

                location.reload();// reload the page
            }

            if(pipe[i].x == 5) {

                score++;
                scor.play();
            }
        }


        
        

        context.drawImage(fg, 0, canvas.height - fg.height, 400, fg.height);

        context.drawImage(bird, bX, bY);

        bY += gravity;

        context.fillStyle = '#000';
        context.font = '20px Verdana';
        context.fillText('Score : ' +score, 10, canvas.height-20);

        requestAnimationFrame(draw);
}

draw();