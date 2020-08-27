// segment: an array of xy coordinates, at least has two point
//eg [{x:21,y:22},{x:44,y:56}]
var previous_angle;
var currentAngle;
function line(segment, distance){
    var point1 = segment[0];
    var point2 = segment[1];
    var x0 = point1.x;
    var y0 = point1.y;
    var x1 = point2.x;
    var y1 = point2.y;
    var moveDistance = Math.sqrt(Math.pow((x0-x1),2) + Math.pow((y0-y1),2));
    if(x0 === x1){
        if(y0>y1){  //dowm
            return[x0+distance,y0,x1-distance,y1,moveDistance]
        }
        else if(y0<y1){        //up
            return[x1-distance,y1,x0+distance,y0,moveDistance]
        }
    }
    else if(y0 === y1){
        if(x0>x1){      //left
            return[x0,y0-distance,x1,y1+distance,moveDistance]
        }
        else if(x0<x1){         //right
            return[x1,y1+distance,x0,y0-distance,moveDistance]
        }
    }
    else{
        var slope = (y1-y0)/(x1-x0);
        // var currentAngle = Math.atan(slope)*180/Math.PI;
        currentAngle = (Math.atan2(x1-x0,y1-y0)*180/Math.PI) + 180;
        // console.log(currentAngle);
        // if(currentAngle>-90 && currentAngle<0){
        //     currentAngle = currentAngle + 180
        // }
        // if(typeof previous_angle !== "undefined"){
        //     var angle_change = Math.abs(currentAngle - previous_angle);
        //     previous_angle = currentAngle;
        // }
        // else{
        //     previous_angle = currentAngle;
        // }
        // console.log(cu);
        var pSlope = -(1/slope);  //perpendicular to slope
        var intercept = y0 - pSlope*x0;
        var x2 = (Math.sqrt(-sq(intercept) + intercept*(2*y0 - 2*pSlope*x0) + sq(distance*pSlope)+sq(distance)-sq(y0-(pSlope*x0))) - intercept*pSlope + pSlope*y0+x0)/(sq(pSlope)+1);
        var y2 = pSlope*x2+intercept;
        var x3 = (-Math.sqrt(-sq(intercept) + intercept*(2*y0 - 2*pSlope*x0) + sq(distance*pSlope)+sq(distance)-sq(y0-(pSlope*x0))) - intercept*pSlope + pSlope*y0+x0)/(sq(pSlope)+1);
        var y3 = pSlope*x3+intercept;
        if(currentAngle >90 && currentAngle<270){
            return [x3,y3,x2,y2,moveDistance];
        }
        if(currentAngle)
        // else if(currentAngle < 90 && currentAngle > 270){
        //     return[x2,y2,x3,y3]
        // }

            return[x2,y2,x3,y3,moveDistance]
    }

}
function sq(n) { return Math.pow(n, 2); }
function nextPoint(x1,y1,x2,y2){
    var distanceX = x1 - x2;
    var distanceY = y2 - y1;
    return [distanceX,distanceY]
}