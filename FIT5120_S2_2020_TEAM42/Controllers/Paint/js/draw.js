// Variable initialisation
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var linePoints = [];
var toolMode = 'draw';
var toolSize = 2;
var timestamp;
var toolAlpha = 1;
var toolColor = rgb;
console.log(rgb);
// var toolColorAlpha = rgb.substr(1);
var canvasState = [];
var undoButton = document.querySelector('#undo');
var array=[];
var startedFlag = false;
var timer_clear;
var timer_popup;
var brushWidth = 9;
var currSpeed;
for(var i=0; i<20; i++){
    array[i]=[];
    for(var j = 0; j<959; j++){
        array[i].push(Math.random()*10);
    }
}
// var array2=[];
// // var randomFlag = true;
// for(i=0; i<50; i++){
//     array2.push(Math.random()*10);
// }
// Defaults
context.strokeStyle = "#ED4645";
context.lineWidth = 2;


// Event listeners
canvas.addEventListener('mousedown', draw);
canvas.addEventListener('touchstart', draw);
window.addEventListener('mouseup', stop);
window.addEventListener('touchend', stop);
// document.querySelector('#tools').addEventListener('click', selectTool);
// document.querySelector('#colors').addEventListener('click', selectTool);
window.addEventListener( 'resize', resizeCanvas );

resizeCanvas();
// Functions
function clearCanvas() {

    // var result = confirm('Are you still drawing ?');
    // if (result) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvasState.length = 0;
        undoButton.classList.add('disabled');
    $('#my_popup').popup('hide');
    // console('clear',timer_popup);
    clearTimeout(timer_popup);


    // }
    // var notification = new Notification("Hi there!", {body: "some text"});
}

function popUp(){
    // $('#my_popup').popup('show');
   timer_clear = setTimeout(clearCanvas,10000);
   // console.log(timer_clear);
    $('#my_popup').popup('show');

}

$(document).ready(function() {
    $('#my_popup').popup({
        onclose:function () {
            clearTimeout(timer_clear);
            clearTimeout(timer_popup);
            timer_popup=setTimeout(popUp,30*1000);
            // console.log(timer_clear,timer_popup);
        }
    });


});

var record;
function draw(e) {
    // console.log(toolColor);
    // console.log(currSpeed);
    if(typeof record === "undefined"){
        record = new Date().getMilliseconds()+ new Date().getSeconds()*1000;
    }
    // ms = new Date().getSeconds();
    // var time = Math.abs(ms - new Date().getMilliseconds());
    // console.log(time);
    var current = new Date().getMilliseconds() + new Date().getSeconds()*1000;
    // console.log(current);
    // if(current>record){
    //
    // }
    // else{
    //     change = (1000-record)+current
    // }
    var change = current-record;
    record = new Date().getMilliseconds()+ new Date().getSeconds()*1000;
    // console.log(change);
    clearTimeout(timer_popup);
    // console.log('reach');
    if (e.which === 1|| e.type === 'touchstart' || e.type === 'touchmove' ) {
        timestamp = new Date().getSeconds();
        // console.log(timestamp);

        // console.log('get1');
        window.addEventListener('mousemove', draw);
        window.addEventListener('touchmove', draw);
        var mouseX = e.pageX - canvas.offsetLeft;
        var mouseY = e.pageY - canvas.offsetTop;
        var mouseDrag = e.type === 'mousemove';
        if ( e.type === 'touchstart' || e.type === 'touchmove' ) {
            // console.log( e );
            mouseX = e.touches[0].pageX - canvas.offsetLeft;
            mouseY = e.touches[0].pageY - canvas.offsetTop;
            mouseDrag = e.type === 'touchmove';

        }

        if (e.type === 'mousedown' || e.type === 'touchstart'){

            // console.log('get2');
            saveState();
            for (i=0; i<40; i++){
                linePoints[i] = [];
            }

            // linePoints[2] = [];
        }

        linePoints[0].push({x: mouseX, y: mouseY, drag: mouseDrag, width: toolSize, color: toolColor});
        // linePoints[1].push({x: mouseX-10, y: mouseY-10, drag: mouseDrag, width: toolSize, color: toolColor});
        var distance = 1.5;
        // toolColor = toolColor + Math.random() + ")";
        if(linePoints[0].length >1){
            for (j=1; j<brushWidth; j++){
                // if(mouseX === linePoints[0][linePoints[0].length-2].x){
                //     linePoints[2*j-1].push({x: mouseX+distance+j-1, y: mouseY, drag: mouseDrag, width: toolSize, color: toolColor}); //out side
                //     linePoints[2*j-1][0].drag = false;
                //     linePoints[j*2].push({x: mouseX-(distance+j-1), y: mouseY, drag: mouseDrag, width: toolSize, color: toolColor});
                //     linePoints[j*2][0].drag = false;
                // }
                // else if(mouseY === linePoints[0][linePoints[0].length-2].y){
                //     linePoints[2*j-1].push({x: mouseX, y: mouseY+distance+j-1, drag: mouseDrag, width: toolSize, color: toolColor}); // out side
                //     linePoints[2*j-1][0].drag = false;
                //     linePoints[j*2].push({x: mouseX, y: mouseY-(distance+j-1), drag: mouseDrag, width: toolSize, color: toolColor});
                //     linePoints[j*2][0].drag = false;
                // }
                // else{
                    var points = [{x:mouseX, y:mouseY},{x:linePoints[0][linePoints[0].length-2].x,y:linePoints[0][linePoints[0].length-2].y}];
                    var parallel_point = line(points,distance+j-1);
                    // console.log(parallel_point);
                    // console.log(parallel_point[4]);
                    if(parallel_point[4] > 40){
                        toolAlpha = 0.4
                    }
                    else if(parallel_point[4]<=40 && parallel_point[4]>20){
                        toolAlpha = 0.7
                    }
                    else if(parallel_point[4]<=20 && parallel_point[4]>0){
                        toolAlpha = 1
                    }
                    linePoints[2*j-1].push({x: parallel_point[0], y: parallel_point[1], drag: mouseDrag, width: toolSize, color: toolColor, Alpha:toolAlpha});
                    linePoints[2*j-1][0].drag = false;
                    linePoints[j*2].push({x: parallel_point[2], y: parallel_point[3], drag: mouseDrag, width: toolSize, color: toolColor, Alpha:toolAlpha});
                    linePoints[j*2][0].drag = false;
                // }

            }
        }
        // var start_point = [];
        // start_point.push(new Point(mouseX,mouseY));
        // start_point.push(new Point(linePoints[0][linePoints.length-2].x,linePoints[0][linePoints.length-2].y));
        // console.log(start_point);
        // var parallel_point = parallelTrail(start_point, 10);
        // // console.log(parallel_point);
        // linePoints[1].push({x: parallel_point[0].x, y: parallel_point[0].y, drag: mouseDrag, width: toolSize, color: toolColor});
        // linePoints[2].push({x: mouseX, y: mouseY, drag: mouseDrag, width: toolSize, color: toolColor});
        // else{
        //
        // }

        updateCanvas(linePoints);

        // console.log(linePoints);
        // updateCanvas();
    }
}
function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(canvasState[0], 0, 0);
    // console.log(context);
    renderLine();
}

function renderLine() {
    // console.log(linePoints[0]);
    for (var a=0; a<linePoints.length; a++){
        for (i = 0, length = linePoints[a].length; i < length; i++) {
            if (!linePoints[a][i].drag) {
                //context.stroke();
                // console.log(1);
                context.beginPath();
                // context.setLineDash([1,1,1]);
                context.lineWidth = linePoints[a][i].width;
                context.strokeStyle = linePoints[a][i].color;
                canvas.style.cursor = 'url( images/size'+toolSize+'.cur ), crosshair';
                context.lineJoin = "round";
                context.lineCap = "round";
                context.moveTo(linePoints[a][i].x, linePoints[a][i].y);
                context.lineTo(linePoints[a][i].x + 0.5, linePoints[a][i].y + 0.5);
            }
            else {
                context.beginPath();
                if (a === 15 || a === 13 || a === 11 || a === 9) {
                    // context.strokeStyle = linePoints[a][i].color.substr(0, linePoints[a][i] - 1).color + ',' + 1 + ')';
                    context.globalAlpha = 1;
                }
                else {
                    var random = Math.random();
                    if (random > 0.2 && random < toolAlpha) {
                        var color_array = linePoints[a][i].color.split(',');
                        // console.log(color_array);

                        context.globalAlpha = random;
                        // linePoints[a][i].color = color_array[0] + ',' + color_array[1] + ',' + color_array[2] + ',' + random + ')';
                        // console.log(linePoints[a][i].color);
                        // context.strokeStyle = linePoints[a][i].color;
                    }

                }
                var change, xchange, ychange;
                if (linePoints[a][i - 1].x === linePoints[a][i].x) {        //vertical move
                    change = linePoints[a][i].y - linePoints[a][i - 1].y;
                    if (change > 0) {
                        context.moveTo(linePoints[a][i - 1].x, linePoints[a][i - 1].y + 1.5)
                    }
                    else {
                        context.moveTo(linePoints[a][i - 1].x, linePoints[a][i - 1].y - 1.5)
                    }
                }
                else if (linePoints[a][i - 1].y === linePoints[a][i].y) {             // horizontal move
                    change = linePoints[a][i].x - linePoints[a][i - 1].x;
                    if (change > 0) {
                        context.moveTo(linePoints[a][i - 1].x + 1.5, linePoints[a][i - 1].y)
                    }
                    else {
                        context.moveTo(linePoints[a][i - 1].x - 1.5, linePoints[a][i - 1].y)
                    }
                }
                else {
                    xchange = linePoints[a][i].x - linePoints[a][i - 1].x;
                    ychange = linePoints[a][i].y - linePoints[a][i - 1].y;
                    var distance = Math.sqrt(Math.pow(xchange, 2) + Math.pow(ychange, 2));
                    // console.log(distance);
                    if (distance >= 1.5) {
                        var xdistance = xchange - xchange * (distance - 1.5) / distance;
                        var ydistance = ychange - ychange * (distance - 1.5) / distance;
                        // console.log(xdistance,ydistance);

                        context.moveTo(linePoints[a][i - 1].x + xdistance, linePoints[a][i - 1].y + ydistance);

                    }
                    else {
                        context.moveTo(linePoints[a][i - 1].x, linePoints[a][i - 1].y);
                    }


                }
                context.lineTo(linePoints[a][i].x, linePoints[a][i].y);
            }
            context.stroke();
        }

    }
    if (toolMode === 'erase') {
        context.globalCompositeOperation = 'destination-out';
    } else {
        context.globalCompositeOperation = 'source-over';
    }

    //context.stroke();

}

// function highlightButton(button) {
//     var buttons = button.parentNode.querySelectorAll('img');
//     buttons.forEach(function (element) {
//         element.classList.remove('active')
//     });
//     button.classList.add('active');
// }


function saveState() {
    canvasState.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    // console.log(context.getImageData(0, 0, canvas.width, canvas.height));
    // console.log(canvasState);
    linePoints = [];
    if (canvasState.length > 25) canvasState.length = 25;
    undoButton.classList.remove('disabled');
}

// function selectTool(e) {
//     if (e.target === e.currentTarget) return;
//     if (!e.target.dataset.action) highlightButton(e.target);
//     toolSize = e.target.dataset.size || toolSize;
//     canvas.style.cursor = 'url( images/size'+toolSize+'.cur ), crosshair';
//     toolMode = e.target.dataset.mode || toolMode;
//     toolColor = e.target.dataset.color || toolColor;
//     if (e.target === undoButton) undoState();
//     if (e.target.dataset.action === 'delete') clearCanvas();
// }

function stop(e) {
    // console.log(e.target.id);
    if(e.target.id === 'canvas'){
        timer_popup=setTimeout(popUp,30*1000);
    }

    // console.log('create',timer_popup);
    if (e.which === 1|| e.type === 'touchend') {
        window.removeEventListener('mousemove', draw);
        window.removeEventListener( 'touchmove', draw );
    }
}

function undoState() {
    // console.log(canvasState);
    context.putImageData(canvasState.shift(), 0, 0);
    if (!canvasState.length) undoButton.classList.add('disabled');
}

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    if ( canvasState.length ) updateCanvas();
}