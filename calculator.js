//variables
var opflag = false;
var op = '';
var num1 = "";
var num2 = "";

//basic math functions
function add(leftVal, rightVal) {
    return leftVal + rightVal;
}

function subtract(leftVal, rightVal) {
    return leftVal - rightVal;
}

function multiply(leftVal, rightVal) {
    return leftVal * rightVal;
}

function divide(leftVal, rightVal) {
    return leftVal / rightVal;
}
function clearInput(){
    document.getElementById("in").value = "";
}

//keyboard listener
document.getElementById("in").addEventListener('keydown', (event) => {;
    var name = event.key;
    var code = event.code;

    if (name === 'Enter') {
        //find operator and print to output
        switch (op) {
            case 'A':
                document.getElementById("out").textContent = add(parseFloat(num1), parseFloat(num2));
                break;
            case 'S':
                document.getElementById("out").textContent = subtract(parseFloat(num1), parseFloat(num2));
                break;
            case 'M':
                document.getElementById("out").textContent = multiply(parseFloat(num1), parseFloat(num2));
                break;
            case 'D':
                document.getElementById("out").textContent = divide(parseFloat(num1), parseFloat(num2));
                break;
            default:
                console.log('No Operation');
        }
        //log output
        document.getElementById("history").innerHTML += 
            document.getElementById("in").value + ' = ' + document.getElementById("out").textContent + '<br/>';
        clearInput();
        num1 = "";
        num2 = "";
        opflag = false;
        op = '';
        return;
    }
    else if((name >= 0 && name <= 9)|| name === '.'){
        if(opflag){
            num2 += name;
            console.log(num2);
        }
        else{
            num1 += name;
            console.log(num1);
        }
    }
    else if(name === "+"){
        opflag = true;
        op = 'A';
        console.log(opflag);
    }
    else if(name === "-"){
        opflag = true;
        op = 'S';
        console.log(opflag);
    }
    else if(name === "*"){
        opflag = true;
        op = 'M';
        console.log(opflag);
    }
    else if(name === "/"){
        opflag = true;
        op = 'D';
        console.log(opflag);
    }
    else if(name === "Shift"){

    }
    else {
        num1 = "";
        num2 = "";
        opflag = false;
        op = ''; 
        return;
    }
}, false);

document.getElementById("in").addEventListener('keyup', (event) => {;
    var name = event.key;
    var code = event.code;

    if (name === 'Enter') {
    }
    else if((name >= 0 && name <= 9)|| name === '.'){
    }
    else if(name === "+"){
    }
    else if(name === "-"){
    }
    else if(name === "*"){
    }
    else if(name === "/"){
    }
    else if(name === "Shift"){
    }
    else{
        alert(`Invalid Input: Key Pressed ${name}`);
        clearInput();
    }
}, false);

//console tests
console.log(add("1","1"));
console.log(add(-1,1));
console.log(add(1.1,1));
console.log(add(1.1,1.2));

console.log(subtract(1,1));
console.log(subtract(-1,1));
console.log(subtract(1.1,1));
console.log(subtract(1.1,1.2));

console.log(multiply(1,1));
console.log(multiply(-1,1));
console.log(multiply(1.1,1));
console.log(multiply(1.1,1.2));

console.log(divide(1,1));
console.log(divide(-1,1));
console.log(divide(1.1,1));
console.log(divide(1.1,1.2));


