var canvas, ctx, currentObject;
var displayButton = document.querySelector('#displayButton');
var downloadButton = document.querySelector("#downloadButton");
var canvasConverted = document.querySelector('#canvasConverted');

var objects = [{
    x:0, y:0,
    width: 111,
    height: 100,
    id: 'image1',
    zindex: 0,
    scale: 0.5
}, {
    x:300, y:150,
    width: 100,
    height: 80,
    id: 'image2',
    zindex: 0,
    scale: 0.5
}, {
    x:100, y:100,
    width: 120,
    height: 63,
    id: 'image3',
    zindex: 0,
    scale: 0.5
}];

var startX = 0;
var startY = 0;


function redrawCanvas() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 500, 500);
    for(let i = 0; i < objects.length; i++) {
        let image = document.querySelector(`#${objects[i].id}`);
        ctx.drawImage(image, objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
    }
    // This is the area to remove items from canvas on mouseup event (). See canvas.onmouseup function at the bottom of the code
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.rect(400, 400, 100, 100);
    ctx.stroke();
}

window.onload = function() {
    canvas = document.querySelector('#myCanvas');
    ctx = canvas.getContext("2d");
    var canvasCoords = canvas.getBoundingClientRect();
    var canvasEndY = canvasCoords.bottom;
    var canvasEndX = canvasCoords.right;

    redrawCanvas();

    canvas.onmousedown = function(event) {
        for(let i = 0; i < objects.length; i++) {
            if(objects[i].x < event.clientX
                && (objects[i].width + objects[i].x > event.clientX)
                && objects[i].y < event.clientY
                && (objects[i].height + objects[i].y > event.clientY)) {
                    currentObject = objects[i];
                    currentObject.zindex = 100;
                    // Defining startY and startX prevent strange movement of the clicked object (anchor point) when dragging it
                    startX = event.clientX - objects[i].x;
                    startY = event.clientY - objects[i].y;
                }
            }

    };

    canvas.onmousemove = function(event) {
        if(currentObject != null) {
            // currentObject.x and currentObject.y prevent strange movement of the clicked object (anchor point) when dragging it
            currentObject.x = event.clientX - startX;
            currentObject.y = event.clientY - startY;
            // this console.log(currentObject.zindex) verifies that the moving object will be drawn on top of the other objects
            //console.log(currentObject.zindex);
            objects = objects.sort(function(a,b){return a.zindex-b.zindex});
            redrawCanvas();
        }
    };

    canvas.onmouseup = function(event) {
        if ((event.clientX > canvasEndX - 100) && (event.clientX < canvasEndX)
        && (event.clientY > canvasEndY - 100) && (event.clientY < canvasEndY)) {
            console.log("entered the remove area");
            let index = objects.indexOf(currentObject);
            objects.splice(index, 1);
            // --- Verify that the item has been removed
            // console.log(objects);
            redrawCanvas();
            currentObject = null;
        }
        currentObject = null;
        for(let i = 0; i < objects.length; i++) {
            objects[i].zindex = 0;
        }
    };
};

//This function make it possible add items to the canvas by clicking on them
var items = document.querySelectorAll('.draggable');
for (let i = 0; i < items.length; i ++) {
    items[i].addEventListener('click', function() {
        objects.push({
            x:10, y:10,
            width: items[i].width,
            height: items[i].height,
            id: items[i].id,
            zindex: 0,
            scale: 0.5
        });
        console.log(`${items[i].id} has been clicked`);
        redrawCanvas();
    });
}


//Further functionality to get image data on dataURI and to download canvas as an image.
//Keep in mind that display and download Buttons will give following error "Tainted canvases may not be exported."
// This error was solved when serving the project from a localhost server, serving the images from cloudinary and setting crossorigin='anonymous'
// on the images elements in the HTML
// displayButton.addEventListener('click', function() {
//     var dataURI = canvas.toDataURL();
//     canvasConverted.src = dataURI;
//     console.log(dataURI);
// });

downloadButton.addEventListener('click', function() {
    // Explorer Edge Support (PNG only)
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "miancheta.png");
    }
    var a = document.createElement("a");
    console.log(a);
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.download = "miregalo.png";
    a.click();
    document.body.removeChild(a);
});
