

const CLOUDINARY_URL='https://api.cloudinary.com/v1_1/test-26272/image/upload'
const CLOUDINARY_UPLOAD_PRESET='ybmx6ztv'

var colour = '#fff'
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");

context.fillStyle = "#000";
context.fillRect(0, 0, 350, 350);



var brushSize=40


// =============
// == Globals ==
// =============
const canvas = document.getElementById('mainCanvas');
const canvasContext = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const state = {
  mousedown: false
};

// ===================
// == Configuration ==
// ===================
const lineWidth = brushSize;

const fillStyle = '#000';
const strokeStyle = '#fff';


// =====================
// == Event Listeners ==
// =====================
canvas.addEventListener('mousedown', handleWritingStart);
canvas.addEventListener('mousemove', handleWritingInProgress);
canvas.addEventListener('mouseup', handleDrawingEnd);
canvas.addEventListener('mouseout', handleDrawingEnd);

canvas.addEventListener('touchstart', handleWritingStart);
canvas.addEventListener('touchmove', handleWritingInProgress);
canvas.addEventListener('touchend', handleDrawingEnd);

clearButton.addEventListener('click', handleClearButtonClick);

// ====================
// == Event Handlers ==
// ====================
function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMosuePositionOnCanvas(event);
  
  canvasContext.beginPath();

  canvasContext.moveTo(mousePos.x, mousePos.y);

  canvasContext.lineWidth = brushSize;
  canvasContext.strokeStyle = strokeStyle;
  

  canvasContext.fill();
  
  state.mousedown = true;
}

function handleWritingInProgress(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    const mousePos = getMosuePositionOnCanvas(event);

    canvasContext.lineTo(mousePos.x, mousePos.y);
    canvasContext.stroke();
  }
}

function handleDrawingEnd(event) {
  event.preventDefault();
  
  if (state.mousedown) {
   

    canvasContext.stroke();
  }
  
  state.mousedown = false;
}

function handleClearButtonClick(event) {
  event.preventDefault();
  
  clearCanvas();
}

// ======================
// == Helper Functions ==
// ======================
function getMosuePositionOnCanvas(event) {
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const { offsetLeft, offsetTop } = event.target;
  const canvasX = clientX - offsetLeft;
  const canvasY = clientY - offsetTop;

  return { x: canvasX, y: canvasY };
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

















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
  









