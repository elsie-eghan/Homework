
//Elsie's Fibonacci

function fibonnaciSequence() {
    let x = 1;
    console.log(0);
    console.log(1);
    while(x < 8) {
        y=0;
        z=1;
        let m = y + z;
        console.log(m);

        z=m ;
        m=z;
        x++

    }
}

//Carson's version

function fibonacci() {
    let array = [0, 1];
    for (i = 0; i < 8; i++) {
        let a = array.pop();
        let b = array.pop();
        array.push(b, a, a+b);
    }
    console.log(array);
}