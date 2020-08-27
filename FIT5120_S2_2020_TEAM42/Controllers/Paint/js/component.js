document.querySelector('#colour-group').addEventListener('click', selectColour);
document.querySelector('#tool-group').addEventListener('click', selectTool);
document.querySelector('#paper-group').addEventListener('click',selectPaper);
var color_picker = $.farbtastic('#colorpicker');
var currentColourID = 'colour-select-1';
var hex;
var rgb;
function initialize(){
    var first_element = document.getElementById('colour-select-1');
    var currentColourValue  = (window.getComputedStyle ? getComputedStyle(first_element, null) : first_element.currentStyle).backgroundColor;
    rgb = currentColourValue;
    console.log(rgb);
    currentColourValue = currentColourValue.substr(4);
    currentColourValue = currentColourValue.substr(0,currentColourValue.length-1).split(',');
    hex = fullColorHex(parseInt(currentColourValue[0]),parseInt(currentColourValue[1]),parseInt(currentColourValue[2]));
    toolColor = rgb.substr(0,rgb.length-1) +","+1+")";
    color_picker.setColor(hex);
    color_picker.linkTo(onColorChange);
    highlightColorButton(first_element);
    // console.log(currentColourValue)
}
function selectColour(e) {
    // console.log(e.target,e.currentTarget);
    // console.log(e);
    if(e.target.className !== 'color-block' )return;
    // console.log(e);
    // $('#'+toolColourID).on('click',function () {
    //     var currentColour = $(this).css('backgroundColor');
    //     console.log(currentColour);
    // });
    var currentColour = e.target;
    currentColourID = e.target.id;
    //
    var currentColourValue  = (window.getComputedStyle ? getComputedStyle(currentColour, null) : currentColour.currentStyle).backgroundColor;
    currentColourValue = currentColourValue.substr(4);
    currentColourValue = currentColourValue.substr(0,currentColourValue.length-1).split(',');
    hex = fullColorHex(parseInt(currentColourValue[0]),parseInt(currentColourValue[1]),parseInt(currentColourValue[2]));
    toolColor = rgb.substr(0,rgb.length-1) +","+1+")";
    console.log(toolColor);
    // document.getElementById();
    color_picker.setColor(hex);
    color_picker.linkTo(onColorChange);
    highlightColorButton(e.target);
}
// $(document).ready(function(){
//     color_picker.on('change', function(e){
//         console.log(e)
//     })
// });
function onColorChange(e){
    document.getElementById(currentColourID).style.backgroundColor = e;
    toolColor = hexToRgbNew(e);
}


function highlightColorButton(button) {
    var buttons = button.parentNode.parentNode.querySelectorAll('.color-block');
    buttons.forEach(function (element) {
        element.classList.remove('active')
    });
    button.classList.add('active');
    // console.log(buttons)
}
var rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

function hexToRgbNew(hex) {
    hex = hex.substring(1,hex.length);
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);

    return "rgb("+arrByte[1] + "," + arrByte[2] + "," + arrByte[3]+")";
}
var fullColorHex = function(r,g,b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return "#"+red+green+blue;
};

function selectTool(e){
    // console.log(e.target.id);
    if(e.target.className !== 'tool' )return;
    highlightToolbutton(e.target);
    var id = e.target.id;
    if(id === 'small-brush'){
        brushWidth = 5;
    }
    else if(id === 'medium-brush') {
        brushWidth = 9;
    }
    else if(id === 'large-brush'){
        brushWidth = 18;
    }
    else if(id === 'delete'){
        clearCanvas()
    }
    else if(id === 'undo'){
        // console.log('reach');
        undoState()
    }
}

function highlightToolbutton(button){
    if(button.id !== 'delete'){
        var buttons = button.parentNode.querySelectorAll('.tool');
        buttons.forEach(function (element) {
            element.classList.remove('active')
        });
        button.classList.add('active');
    }


    if(button.id === 'undo')button.classList.remove('active');
    // if(button.id === 'delete')button.classList.remove('active');
}

function selectPaper(e){
    if(e.target.className !== 'paper')return;
    var temp = e.target.src.split('/');
    // console.log(temp.pop());

    canvas.style.backgroundImage = "url('img/" + temp.pop()+"')";
}
