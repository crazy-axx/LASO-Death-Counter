var B = [];

function setup(){
	var div = document.getElementById('canvasDiv');
	let canvas = createCanvas( windowWidth , windowHeight);
	canvas.position(0, 0, 'static');
	for( i = 0 ; i < 300 ; i++ ){
    B[i] = new Ball();
  }
  canvas.parent(div);
  colorMode( RGB );
}

function draw(){
   background( 20 , 38 , 11 );
  
  for( i = 0 ; i < 100 ; i++ ){
    B[i].evolve();
    
    for( v = 0 ; v < 100  ; v++ ){
      if( i != v ){
        B[i].drawBall(B[i].pos , B[v].pos);
      }
    }
  }
}

var Ball = function(){
  
  this.pos = createVector( random( 0 , width ) , random( 0 , height) );
  this.v = p5.Vector.random2D();
  this.v.mult( random( 0 , .5));
  
  this.evolve = function(){
  
     this.pos.add( this.v );
     
     if( this.pos.x <= 0 || this.pos.x >= width ){
      this.v.x*= -1;
     }
     if( this.pos.y <= 0 || this.pos.y >= height ){
       this.v.y *= -1;
     }
  };
  
  this.drawBall = function( one , two ){
    this.dis = B[i].pos.dist(B[v].pos);
    
    var mid = createVector( width*0.5 , height*0.5 );
    
    var maxDist = (width*width) + (height*height);
    
    var dist = B[i].pos.dist( mid );
    
    var C = color( dist / maxDist * 1000000 %360 , 100 , 100 );
    
    if( this.dis <= 150 ){
     // stroke( C );
       stroke( 246,171,60 );
	   strokeWeight(.5);
		line( B[i].pos.x , B[i].pos.y , B[v].pos.x , B[v].pos.y );
    }
  };
  
};