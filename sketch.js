// Classes p5.js NikhilV
// Feb 14 2018

var pagex = 1260;
var pagey = 660;
var normalvect;
var stonex =[];
var stonew=[];
var stoneh=[];
var stonex2 =[];
var stonew2=[];
var stoneh2=[];


function setup(){
    createCanvas(pagex, pagey);
    peng1 = new penguin(269,245);
    peng2 = new penguin(1064,46);
    peng3 = new penguin(613,473);
    peng3.fish=true;
    peng4 = new penguin(151,570);
    peng4.fish=true;
    peng5 = new penguin(random(0,pagex),random(0,pagey));
    peng9 = new penguin(random(0,pagex),random(0,pagey));
    peng10 = new penguin(random(0,pagex),random(0,pagey));

    peng6 = new penguin(378,597);
    peng7 = new penguin(1048,297);
    peng8 = new penguin(241,378);
    peng11 = new penguin(876,491);

    thispath = new path();

    thispath.addpt(294,197);
    thispath.addpt(47,137);
    thispath.addpt(61,53);
    thispath.addpt(pagex/2,27);
    thispath.addpt(pagex-61,53);
    thispath.addpt(pagex-47,137);
    thispath.addpt(pagex-294,197);
    thispath.addpt(pagex-283,303);
    thispath.addpt(1175,427);
    thispath.addpt(1101,615);
    thispath.addpt(pagex/2,472);
    thispath.addpt(pagex-1101,615);
    thispath.addpt(pagex-1175,427);
    thispath.addpt(283,303);
    thispath.addpt(294,197);

    wave1 = new wave(random(13,1216),random(0,180));
    // wave1=new wave(150,100);
    wave2 = new wave(random(13,1216),random(0,180));
    wave3 = new wave(random(13,1216),random(0,180));
    wave4 = new wave(random(13,1216),random(0,180));
    wave5 = new wave(random(13,1216),random(0,180));
    wave6 = new wave(random(13,1216),random(0,180));

    rocks();



}


function draw(){
    background("white")

    fill(66, 170, 244);
    rect(0, 0, pagex, pagey*.3);

    console.log(mouseX,mouseY);
   
    thispath.display();
    
    // push();
    // fill("green");
    // var fx = 627;
    // var fy = 428;
    // ellipse(fx-3,fy+2, 10,5);
    // triangle(fx+6,fy+7,fx+6,fy-3,fx-1,fy+2);
    // pop();
    // push();
    // translate(20);
    // ellipse(fx-3,fy+2, 10,5);
    // triangle(fx+6,fy+7,fx+6,fy-3,fx-1,fy+2);
    // pop();

    //rocks
    push();
    fill(107, 64, 1);
    stroke(0);
    for(var stone=0;stone<80;stone++){
        ellipse(stonex[stone],pagey*.3,stonew[stone],stoneh[stone]);
        ellipse(stonex2[stone],pagey*.3+10,stonew2[stone],stoneh2[stone]);
    }
    pop();

    wave1.display();
    wave1.move();
    wave2.display();
    wave2.move();
    wave3.display();
    wave3.move();
    wave4.display();
    wave4.move();
    wave5.display();
    wave5.move();
    wave6.display();
    wave6.move();


    peng1.display();
    peng2.display();
    peng3.display();
    peng4.display();
    peng5.display();
    peng6.display();
    peng7.display();
    peng8.display();
    peng9.display();
    peng10.display();
    peng11.display();
    
    peng1.pathfollow();
    peng2.pathfollow();
    peng3.pathfollow();
    peng4.pathfollow();
    peng5.pathfollow();
    peng9.pathfollow();
    peng10.pathfollow();

}

function normal(n,a,b){
    var an = p5.Vector.sub(n, a);
    var ab = p5.Vector.sub(b, a);

    ab.normalize();
    ab.mult(an.dot(ab));

    normalvect = p5.Vector.add(a,ab);
    return normalvect;
}

class penguin{
    constructor(tempX,tempY){
        this.x=tempX;
        this.y=tempY;
        this.loc = createVector(tempX,tempY);
        this.vel = createVector(0,0);
        this.predict = createVector(0,0);
        this.fish = false;
    }
    
    display(){
        fill("black");
        ellipse(this.loc.x, this.loc.y, 30, 40);
        
        fill("white");
        ellipse(this.loc.x-5,this.loc.y - 12,4,4);
        ellipse(this.loc.x+5,this.loc.y - 12,4,4);

        ellipse(this.loc.x, this.loc.y+6, 19, 25);
        
        fill("orange");
        triangle(this.loc.x-4,this.loc.y-8,this.loc.x+4,this.loc.y-8,this.loc.x,this.loc.y+2);

        fill("brown");
        noStroke();
        ellipse(this.loc.x-7, this.loc.y+20, 10,3);
        ellipse(this.loc.x+7, this.loc.y+20, 10,3);

        if(this.loc.y<120 || this.fish==true){
            this.fish=true;
            fill("green")
            ellipse(this.loc.x-3,this.loc.y+2, 10,6);
            triangle(this.loc.x+6,this.loc.y+7,this.loc.x+6,this.loc.y-3,this.loc.x-1,this.loc.y+2);
        }

        if(this.loc.x>992-5 && this.loc.x<992+5 && this.loc.y>312-5 && this.loc.y<312+5 && peng7.fish==false && this.fish==true){
            peng7.fish=true;
            this.fish=false;
        }

        if(this.loc.x>249 && this.loc.x<470 && this.loc.y>520 && this.loc.y<587 && peng6.fish==false && this.fish==true){
            peng6.fish=true;
            this.fish=false;
        }

        if(this.loc.x>118 && this.loc.x<272 && this.loc.y>310 && this.loc.y<406 && peng8.fish==false && this.fish==true){
            peng8.fish=true;
            this.fish=false;
        }

        if(this.loc.x>741 && this.loc.x<965 && this.loc.y>504 && this.loc.y<576 && peng11.fish==false && this.fish==true){
            peng11.fish=true;
            this.fish=false;
        }
    }

    follow(target){
        var goal = p5.Vector.sub(target,this.loc);
        goal.normalize();
        goal.mult(2);
        var dir = p5.Vector.sub(goal,this.vel);
        this.vel.add(dir);
        this.vel.limit(1);
        this.loc.add(this.vel);
        dir.mult(0);
    }

    pathfollow(){
        var target;
        var weight = 1000000;

        var futurept = this.vel.copy();
        futurept.normalize();
        futurept.mult(25);
    
        this.predict = p5.Vector.add(this.loc,futurept);

        for(var i=0; i<thispath.pts.length-1; i++){
            var a = thispath.pts[i];
            var b = thispath.pts[i+1];

            var norm = normal(this.predict,a,b);
            if(norm.x<min(a.x,b.x) || norm.x>max(a.x,b.x)){
                norm = b.copy();
            }

            var dista = p5.Vector.dist(this.predict, norm);

            if(dista < weight){
                weight = dista;
                target = norm.copy();
            }
        }
        this.follow(target);
    }


}


class path{
    constructor(){
        this.radius = 20;
        this.pts = [];
    }

    addpt(x,y){
        this.pts.push(createVector(x,y));
    }
    
    display(){
        push();
        stroke(206, 206, 206);
        strokeWeight(5)
        // noStroke();
        noFill();
        beginShape();
        for (var i=0; i<this.pts.length; i++) {
          vertex(this.pts[i].x, this.pts[i].y);
        }
        endShape();
        pop();
    }
    
}

class wave{
    constructor(wavex,wavey){
        this.x=wavex;
        this.y=wavey;
    }
    display(){
        push();
        noFill();
        stroke(255);
        arc(this.x, this.y, 40, 20, 0, PI / 2.0);
        arc(this.x+40, this.y, 40, -20, 0.75*2*PI, PI);
    
        push();
        translate(35,0);
        arc(this.x, this.y, 40, 20, 0, PI / 2.0);
        arc(this.x+40, this.y, 40, -20, 0.75*2*PI, PI);
        pop();

        push();
        translate(70,0);
        arc(this.x, this.y, 40, 20, 0, PI / 2.0);
        arc(this.x+40, this.y, 40, -20, 0.75*2*PI, PI);
        pop();
        pop();
    }
    move(){
        this.y -= 0.5;
        if(this.y<=0){
            this.y = random(195);
            this.x = random(13,1216);
        }
    }
}

function rocks(){
    stonex[0]=10;
    stonew[0]=20;
    stoneh[0]=15;
    for(var stone=1;stone<80;stone++){
        if(stone%2==0){
            stonew[stone]=20;
            stonex[stone]=stonex[stone-1]+stonew[stone-1]+2;
        }
        else{
            stonew[stone]=15;
            stonex[stone]=stonex[stone-1]+stonew[stone-1]-3;
        }
        
        stoneh[stone]=stonew[stone]-5;
        
    }

    stonex2[0]=10;
    stonew2[0]=15;
    stoneh2[0]=10;
    for(var stone=1;stone<80;stone++){
        if(stone%2==0){
            stonew2[stone]=15;
            stonex2[stone]=stonex2[stone-1]+stonew2[stone-1]-3;
        }
        else{
            stonew2[stone]=20;
            stonex2[stone]=stonex2[stone-1]+stonew2[stone-1]+2;
        }
        
        stoneh2[stone]=stonew2[stone]-5;
        
    }
}

class fishpile{
    constructor(){
        this.count=0;
    }
    display(){
    if(this.count==1){

    }
}

}