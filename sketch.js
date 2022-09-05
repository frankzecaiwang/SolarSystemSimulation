var cr = 100; //screen refresh rate, number per second

var Timer_len = 10;  //timer to drive the model caculation. unit: ms

var Time_expedite_rate = 30;  //fast time mode. times of real time.

var G = 6.6743 * 0.000000001; //6.6743 × 10-11 m3 kg-1 s-2

var Canvas_height = 2000;
var Canvas_width   = 2000;

var Scalar_d = 0; // will be reset in setup function.

var ObjArray=[]; //contain objects

var Obiting_path_display = 1; //1: display; 0: don't display

var sun_earth_d_pixle = 400;

function setup() {
  
  //Canvas_width   = windowWidth, 
  //Canvas_height = windowHeight;
  
  createCanvas(Canvas_width, Canvas_height);
  
  //sun_earth_d_pixle = Canvas_height/2 - 100;
  
  background(0);
  frameRate(cr);
  
  G = 6.6743 * pow(10, -11);  //6.6743 × 10-11 m3 kg-1 s-2
  
  Scalar_d = 150.85*pow(10, 6)/sun_earth_d_pixle/sqrt(2); //150.85 million km(sun-earth)/400 pixles
  
  
  //create the Sun at the center with initial velocity 0
  ObjArray.push(new AstroObject(1.989*pow(10,30), 50, 0, 0,   color(255,255,0), "Sun"));
  
  
  //create the Earth, at (400, 400) pixle.
  ObjArray.push(new AstroObject(5.972*pow(10,27), 15, sun_earth_d_pixle*Scalar_d, sun_earth_d_pixle*Scalar_d, color(50,100,255),"Earth"));
  
  //set the Earth Initial Velocity, don't know why the velocity is larger than C....?????????
  ObjArray[1].Velocity.set(80.78*10000,-60.78*10000);
  
  //create the Moon at (412, 412) pixles
  ObjArray.push(new AstroObject(7.34*pow(10,22), 5, (sun_earth_d_pixle+12)*Scalar_d, (sun_earth_d_pixle+12)*Scalar_d, color(255,255,255), "Moon"));
  
  //set the Moon initial Velocity, let it perpendicular with the Moon and The Earth direction.
  ObjArray[2].Velocity.set(200000,-200000);
  
  ObjArray[2].Velocity.add(ObjArray[1].Velocity);
  
  //create the Mercury and set initial velocity for it
  ObjArray.push(new AstroObject(3.285*pow(10,24), 10, -sun_earth_d_pixle/4*Scalar_d, -sun_earth_d_pixle/4*Scalar_d, color(170,170,170), "Mercury"));
  ObjArray[3].Velocity.set(200*10000,-100*10000);
  
  //create the Comet and set initial velocity for it
  ObjArray.push(new AstroObject(3.285*pow(10,20), 10, -sun_earth_d_pixle/8*Scalar_d, -sun_earth_d_pixle/8*Scalar_d, color(170,0,0), "Comet"));
  ObjArray[4].Velocity.set(345*pow(10,4),-100*pow(10,4));
  
  
  //start timer to drive model calculation
  setInterval(update_obj, Timer_len);
  
}

function update_obj()
{
   for(let obj of ObjArray)
    {
        obj.update(ObjArray);
    } 
}

function draw() {
  
  if(Obiting_path_display==0) background(0);
  
  
  for(let obj of ObjArray)
  {
    
    fill(obj.color);
    
    ellipse(obj.pos_x/Scalar_d + Canvas_width/2, obj.pos_y/Scalar_d + Canvas_height/2, obj.radius, obj.radius);

  }
  
  
  
}



function doubleClicked() {
  
  if (Obiting_path_display == 0) 
  {
    Obiting_path_display = 1;
  } else 
  {
    Obiting_path_display = 0;
  }
}