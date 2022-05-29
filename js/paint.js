

const CLOUDINARY_URL='https://api.cloudinary.com/v1_1/test-26272/image/upload'
const CLOUDINARY_UPLOAD_PRESET='ybmx6ztv'

var colour = '#fff'
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");

context.fillStyle = "#000";
context.fillRect(0, 0, 350, 350);
var lastEvent;
var mouseDown = false;

var brushSize=40

// On mouse events on the canvas
$canvas.mousedown(function (e) {
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    // Draw lines
    if (mouseDown) {
        context.beginPath();
        
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = colour;
        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.stroke();
       
        lastEvent = e;
    }
}).mouseup(function () {
    mouseDown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});


document.getElementById('clear').addEventListener('click',
 clear_canvas_width
)


document.getElementById('revealColorSelect').addEventListener('click',
 download
)

var slider = document.getElementById("myRange");
slider.oninput = function() {
    console.log(this.value)
    brushSize=this.value
  }

// Clear the canvas when button is clicked
function clear_canvas_width() {
    var s = document.getElementById("mainCanvas");
    var w = s.width;
    s.width = 10;
    s.width = w;
    context.fillStyle = "#000";
context.fillRect(0, 0, 350, 350);
}



function download(){
    
    var canvas = document.getElementById('mainCanvas');

    canvas.toBlob(function(blob) {
     

       var formData=new FormData()
       formData.append('file',blob,'image.png')
       formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
       console.log(formData.get('file'))
       axios({
            url:CLOUDINARY_URL,
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            data:formData,
        })
        .then(function(res){
            console.log(res)
            clear_canvas_width()
            var msg=document.getElementById("message")
            msg.innerHTML='<p class="success" >Thank You, please write more</p>'
        })
        .catch(function(err){
            console.log(err)
            var msg=document.getElementById("message")
            msg.innerHTML='<p class="error" >Failed: Please Write Again</p>'
        });


    });



}  
  









