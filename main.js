let img="";
let stat="";
let obj=[];
function setup(){
    canvas=createCanvas(400, 380);
    canvas.center();

   video=createCapture(VIDEO);
   video.hide();
}
function preload(){
    img=loadImage("dog_cat.jpg");

}
function draw(){
    image(video, 0, 0, 400, 380);

    // fill(184, 134, 11);
    // text("Dog", 45, 75 );

    // noFill();
    // stroke(184, 134, 11);
    // rect(40, 60, 300, 350);

    // fill(139, 69, 19); 
    // text("Cat", 300, 75);

    // noFill();
    // stroke(139, 69, 19);
    // rect(295, 60, 300, 350);

    if(stat!=""){
        let r=random(255);
        let g=random(255);
        let b=random(255);
        for(i=0; i<obj.length; i++){
            document.getElementById("status").innerHTML= "Status: Detected";
           // document.getElementById("nob").innerHTML="Objects Detected: "+obj.length;
           if(obj[i].label== "person"){
            document.getElementById("nob").innerHTML="The Baby Was Detected";
           }else{
            document.getElementById("nob").innerHTML="The Baby Wasn't Detected!";
           }
            let porce=floor(obj[i].confidence*100);
            fill(r, g, b);
            text(obj[i].label+" "+porce+"%", obj[i].x, obj[i].y);
            noFill();
            stroke(r, g, b);
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);

        }
    }
}

function modelLoaded(){
    console.log(":)");
    stat=true;
    detect.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    obj=results;
}

function start(){
    detect=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Loading";
}