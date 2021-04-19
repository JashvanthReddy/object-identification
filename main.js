img= "";
object: [];
status= "";


function preload(){
    img= loadImage('dog_cat.jpg');
}

function setup(){
    canvas= createCanvas(640,420);
    canvas.center();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHMTL= "status: Detecting Objects"
}



function modelLoaded(){
    console.log("modelLoaded");
    status= true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status != ""){
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML= " status : object detected ";
            fill("#6a5acd");
            stroke("#6a5acd");
            percent= floor(objects[i].confidence * 100);
            noFill();
            text(objects[i].label + "  " + percent + "%" , objects[i].x , objects[i].y);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

        }
    }
}