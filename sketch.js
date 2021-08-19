const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;
var shelf;
var bubble,bubbleImg;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  bubbleImg = loadImage('bubble.png');

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if(isMobile){

  canW = displayWidth;
  canH = displayHeight;
  createCanvas(canW,canH);

}else{

  canW = windowWidth;
  canH = windowHeight;
 createCanvas(canW,canH);

}
  
  frameRate(80);

  //bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(10,canH-200);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(200,canH-330);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 


  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(3,{x:30,y:canH-200});
  rope2 = new Rope(4,{x:210,y:canH-310});
  

  ground = new Ground(200,canH,600,20);
  shelf = new Ground(350,150,100,10);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(320,90,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  bubble = createSprite(299,canH-210,100,100);
  bubble.scale = 0.1;

  bubble.addImage("bubble",bubbleImg);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();
  shelf.show();
  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    bunny.changeAnimation('eating');
    fruit = null;
    rope.break();
    rope2.break();
    bubble.visible=false;
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=canH-50)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit = null;
    rope.break();
    rope2.break();
     
   }
   
   if(collide(fruit,bubble,50) == true)
   {
     engine.world.gravity.y = -1;
     bubble.position.x = fruit.position.x;
     bubble.position.y = fruit.position.y;
   }


}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}





function collide(body,sprite,distance)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=distance)
            {
              World.remove(engine.world,fruit);

              return true;
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


