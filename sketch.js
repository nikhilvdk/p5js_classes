// Classes p5.js NikhilV
// Feb 14 2018

var pagex = 1260;
var pagey = 660;
var normalvect;


function setup(){
    createCanvas(pagex, pagey);
    peng1 = new penguin(269,245);
    peng2 = new penguin(random(0,pagex),random(0,pagey));
    peng3 = new penguin(random(0,pagex),random(0,pagey));
    peng4 = new penguin(random(0,pagex),random(0,pagey));
    peng5 = new penguin(random(0,pagex),random(0,pagey));

    peng6 = new penguin(378,597);
    peng7 = new penguin(1048,297);
    peng8 = new penguin(241,378);

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

}


function draw(){
    background("white")

    fill(66, 170, 244);
    rect(0, 0, pagex, pagey*.3);

    console.log(mouseX,mouseY);
   
    thispath.display();

    peng1.display();
    peng2.display();
    peng3.display();
    peng4.display();
    peng5.display();
    peng6.display();
    peng7.display();
    peng8.display();
    

    peng1.pathfollow();
    peng2.pathfollow();
    peng3.pathfollow();
    peng4.pathfollow();
    peng5.pathfollow();

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
            ellipse(this.loc.x-3,this.loc.y+2, 10,5);
            triangle(this.loc.x+6,this.loc.y+6,this.loc.x+6,this.loc.y-4,this.loc.x-1,this.loc.y+2);
        }

        if(this.loc.x>992-5 && this.loc.x<992+5 && this.loc.y>312-5 && this.loc.y<312+5 && peng7.fish==false && this.fish==true){
            peng7.fish=true;
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

// class path{
//     constructor(){
//         this.radius = 20;
//         this.start = createVector(100,pagey/2);
//         this.end = createVector(200,(3/4)*pagey);
//     }

//     display(){
//         strokeWeight(this.radius*3);
//         stroke(0,100);
//         line(this.start.x,this.start.y,this.end.x,this.end.y);
//         strokeWeight(1);
//         stroke(0);
//         line(this.start.x,this.start.y,this.end.x,this.end.y);
//     }
    

// }

class path{
    constructor(){
        this.radius = 20;
        this.pts = [];
    }

    addpt(x,y){
        this.pts.push(createVector(x,y));
    }
    
    display(){
        stroke(0);
        noFill();
        beginShape();
        for (var i=0; i<this.pts.length; i++) {
          vertex(this.pts[i].x, this.pts[i].y);
        }
        endShape();
    }
    
}

