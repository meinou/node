// var rect = {
//     perimeter: (x,y) => (2*(x+y)),
//     area: (x,y) => (x*y)
// }

 var rect = require('./rectangle');

function solveRect(l,b) {
   // console.log("Solving for rect with l = " + l + " and b = " + b);

    rect (l, b, (err, rectangle) => {
        if (err) {
                console.log(err.message);
            }
        else {
            console.log(rectangle.area() + " - area and perimeter is " + rectangle.perimeter());
            //            console.log("The area of the rectangle of dimensions l = "
            //     + l + " and b = " + b + " is " + rectangle.area());
            // console.log("The perimeter of the rectangle of dimensions l = "
            //     + l + " and b = " + b + " is " + rectangle.perimeter());
        }
    });
    console.log("sflj");
}


// function solveRect(l,b) {
//     console.log("Solving for rectangle with l = "
//                 + l + " and b = " + b);
//     rect(l,b, (err,rectangle) => {
//         if (err) {
// 	        console.log("ERROR: ", err.message);
// 	    }
//         else {
//             console.log("The area of the rectangle of dimensions l = "
//                 + l + " and b = " + b + " is " + rectangle.area());
//             console.log("The perimeter of the rectangle of dimensions l = "
//                 + l + " and b = " + b + " is " + rectangle.perimeter());
//         }
//     });
//     console.log("This statement after the call to rect()");
// };

solveRect(2,4);
solveRect(5,3);
solveRect(0, 8);