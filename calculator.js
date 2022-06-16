//node class
class Node {
    // constructor
    constructor(element) {
        this.element = element;
        this.next = null
    }
}
// linkedlist class
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
 
    // adds an element at the end
    // of list
    add(element) {
        // creates a new node
        var node = new Node(element);
 
        // to store current node
        var current;
 
        // if list is Empty add the
        // element and make it head
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
 
            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }
 
            // add node
            current.next = node;
        }
        this.size++;
    }
 
    // insert element at the position index
    // of the list
    insertAt(element, index) {
        if (index < 0 || index > this.size)
            return console.log("Please enter a valid index.");
        else {
            // creates a new node
            var node = new Node(element);
            var curr, prev;
 
            curr = this.head;
 
            // add the element to the
            // first index
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                var it = 0;
 
                // iterate over the list to find
                // the position to insert
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // adding an element
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }
 
    // removes an element from the
    // specified location
    removeFrom(index) {
        if (index < 0 || index >= this.size)
            return console.log("Please Enter a valid index");
        else {
            var curr, prev, it = 0;
            curr = this.head;
            prev = curr;
 
            // deleting first element
            if (index === 0) {
                this.head = curr.next;
            } else {
                // iterate over the list to the
                // position to removce an element
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // remove the element
                prev.next = curr.next;
            }
            this.size--;
 
            // return the remove element
            return curr.element;
        }
    }
 
    // removes a given element from the
    // list
    removeElement(element) {
        var current = this.head;
        var prev = null;
 
        // iterate over the list
        while (current != null) {
            // comparing element with current
            // element if found then remove the
            // and return true
            if (current.element === element) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }
 
 
    // finds the index of element
    indexOf(element) {
        var count = 0;
        var current = this.head;
 
        // iterate over the list
        while (current != null) {
            // compare each element of the list
            // with given element
            if (current.element === element)
                return count;
            count++;
            current = current.next;
        }
 
        // not found
        return -1;
    }
 
    // checks the list for empty
    isEmpty() {
        return this.size == 0;
    }
 
    // gives the size of the list
    size_of_list() {
        console.log(this.size);
    }
 
 
    // prints the list items
    printList() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element + " ";
            curr = curr.next;
        }
        console.log(str);
    }
 
}



//variables
var opflag = false;
var ops = new LinkedList();
var nums = new LinkedList();
var parens = new LinkedList();
var opsCounter = 0;
var nextNum = "";
var total = 0;

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

function performCalc(num1, num2, op){
    //find operator and print to output
    switch (op) {
        case 'A':
            total = add(parseFloat(num1), parseFloat(num2));
            break;
        case 'S':
            total = subtract(parseFloat(num1), parseFloat(num2));
            break;
        case 'M':
            total = multiply(parseFloat(num1), parseFloat(num2));
            break;
        case 'D':
            total = divide(parseFloat(num1), parseFloat(num2));
            break;
        default:
            console.log('No Operation');
        }
}

function PMDAS(allOps, allNums, allParens){

    while(opsCounter !== 0){
        var indexM = allOps.indexOf("M");
        var indexD = allOps.indexOf("D");
        var indexOp = 0;
    
        if(indexM === -1 && indexD === -1){
            indexOp = 0;
        }
        else if(indexM === -1){
            indexOp = indexD;
        }
        else if(indexD === -1){
            indexOp = indexM;
        }
        else if(indexM < indexD){
            indexOp = indexM;
        }
        else{
            indexOp = indexD;
        }

        console.log("nextOp " + indexOp);

        var number1 = nums.removeFrom(indexOp + 1);
        var number2 = nums.removeFrom(indexOp + 1);
        var operation = ops.removeFrom(indexOp);

        console.log(number1 + " " + operation + " " + number2);

        performCalc(number1, number2, operation);

        nums.insertAt(total, indexOp + 1);

        nums.printList();
        ops.printList();
        opsCounter--;
    }

}

//keyboard listener
document.getElementById("in").addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;

    if (name === 'Enter') {
        //log output
        nums.add(nextNum);
        nums.printList();
        ops.printList();

        PMDAS(ops, nums, parens);

        document.getElementById("out").textContent = total.toFixed(5);
        document.getElementById("history").innerHTML += 
            document.getElementById("in").value + ' = ' + document.getElementById("out").textContent + '<br/>';
        clearInput();
        opflag = false;
        ops = new LinkedList();
        nums = new LinkedList();
        parens = new LinkedList();
        opsCounter = 0;
        nextNum = "";
        total = 0;
        return;
    }
    else if((name >= 0 && name <= 9)|| name === '.'){
       if (opsCounter === nums.size){
            nums.add(nextNum);
            nextNum = "" + name;
        }

        else{
            nextNum += name;
            console.log(nextNum);
        }
    }
    else if(name === "+"){
        opflag = true;
        ops.add('A');
        opsCounter++;
    }
    else if(name === "-"){
        opflag = true;
        ops.add('S');
        opsCounter++;
    }
    else if(name === "*"){
        opflag = true;
        ops.add('M');
        opsCounter++;
    }
    else if(name === "/"){
        opflag = true;
        ops.add('D');
        opsCounter++;
    }
    else if(name === "("){
        parens.add({
            open: true,
            index: nums.size-1
        });
    }
    else if (name === ")"){
        parens.add({
            open: false,
            index: nums.size-1
        });
    }
    else if(name === "Shift"){

    }
    else {
        opflag = false;
        ops = new LinkedList();
        nums = new LinkedList();
        parens = new LinkedList();
        opsCounter = 0;
        nextNum = "";
        total = 0;
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



