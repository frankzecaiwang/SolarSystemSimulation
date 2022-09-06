class AstroObject
{
    constructor(mass, radius, pos_x, pos_y, color, name)
    {
    
      this.color = color;
      this.mass = mass;
      this.radius = radius; //object display size in pixle
      this.pos_x = pos_x;
      this.pos_y = pos_y;
  
      
      this.Velocity = p5.Vector.random2D();
      this.Acc = createVector(0, 0);
      this.Force = createVector(0, 0);
      
      this.name = name;
    
    }
  
  update(ObjArray)
  {
    let d = 0;
    
    this.Force.set(0,0);
    
    
    //calculate gravitational force from other objects.
    for(let obj of ObjArray)
    {
      if(this == obj) continue;
      
      
      
      d = dist(this.pos_x, this.pos_y, obj.pos_x, obj.pos_y);
      
      //universal gravitational force magnitude
      
      let f = 0;
      
      if(d!=0) 
      {
        f = G*this.mass*obj.mass/d/d;
      }
      else
      {
          f = 0;
      }
      
      //universal gravitational force direction
      let temp_v = createVector(obj.pos_x-this.pos_x, obj.pos_y-this.pos_y);
      
      temp_v.normalize();
      
      //set the force magnitude
      temp_v.setMag(f);
      
      //sum up force vectors
      this.Force.add(temp_v);
      
      /*
      //if(obj.name=="Sun" && this.name=="Earth")
      //  {
      //    print(d);
      //  }
      */
      
    }
    
    //calculate acceleration by newton's 2nd law : f=ma
    this.Acc = this.Force;
    
    this.Acc.setMag(this.Force.mag()/this.mass);
    
    //integrate acceleration over time to get velocity. delta_vel = acceleration * delat_time.
    //after this step, acceleration is not valid anymore.
    this.Velocity.add(this.Acc.setMag(this.Acc.mag() * Timer_len/1000*Time_expedite_rate));
   
    
    //integrate velocity over time to get placement. delta_placement = velocity * delat_time.
    //Time_expedite_rate makes the time fly faster
    //Velocity value is still valid after below steps.
    
    this.pos_x += (this.Velocity.x * Timer_len/1000*Time_expedite_rate);
    
    this.pos_y += (this.Velocity.y * Timer_len/1000*Time_expedite_rate);
    
    
  }
  
}