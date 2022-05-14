img1 = ""
img2 = ""
img3 = ""
img4 = ""
img5 = ""
status1 = ""
imgF = ""
Objects = []

function preload() {
    img1 = loadImage("playground.jpg")
    img2 = loadImage("bedroom.jpg")
    img3 = loadImage("school.jpg")
    img4 = loadImage("lab.jpg")
    img5 = loadImage("jungle.jpg")
}

function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()
    objD = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status : detecting object"
}

function modelLoaded() {
    console.log("model Loaded")
    status1 = true

}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        Objects = results
    }
}

function draw() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log(page);
    if (page == "index1.html") {
        img = img1
    } else if (page == "index2.html") {
        img = img2
    } else if (page == "index3.html") {
        img = img3
    } else if (page == "index4.html") {
        img = img4
    } else if (page == "index5.html") {
        img = img5
    }
    imgF = img
    objD.detect(img, gotResults)
    image(imgF, 0, 0, 500, 500)
    if (status1 != "") {
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected"
            fill("red")
            perc = floor(Objects[i].confidence * 100)
            text(Objects[i].label + " " + perc + "%", Objects[i].x, Objects[i].y)
            noFill()
            stroke("red")
            rect(Objects[i].x - 30, Objects[i].y, Objects[i].width, Objects[i].height)
        }
    }

    /*
    text("dog", 45, 45)
    fill("red")
    noFill()
    stroke("brown")
    rect(30, 60, 250, 350)
    text("cat", 220, 45)
    fill("red")
    noFill()
    stroke("brown")
    rect(200, 60, 250, 350)
    */
}