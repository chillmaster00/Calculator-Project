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
//error checking flags
var opflag = true;
var numflag = false;
var parenflag = false;
var paren2flag = false;
var decimalQuota = false;

//error checking counters
var openP = 0;
var closeP = 0;
var opsCounter = 0;

//Calculator element trackers
var ops = new LinkedList();
var nums = new LinkedList();
var parens = new LinkedList();

//multple digit number store
var nextNum = "";

//answer and total stores
var ans = null;
var total = 0;

//parenthesis Offset for correcting for finished operations
var parenOffset = 0;

//Fire/Ice mode check
var isFire = true;


//changes style from ice to fire or vice versa
function changeStyle(){
    //if fire change atributes to ice
    if(isFire){
        document.getElementById("b").setAttribute("class","ice");
        document.getElementById("out").setAttribute("class","ice");
        document.getElementById("history").setAttribute("class","ice");
        document.getElementById("fi").innerHTML = "Ice <br> Mode <br> 🥶";

        //reset fire flag
        isFire = false;
    }
    //else remove attributes for ice
    else{
        document.getElementById("b").removeAttribute("class","ice");
        document.getElementById("out").removeAttribute("class","ice");
        document.getElementById("history").removeAttribute("class","ice");
        document.getElementById("fi").innerHTML = "Fire <br> Mode <br> 🥵";

        //activate fire flag
        isFire = true;
    }
}

//Digital button implementer
//When given a button uses a dispatchEvent to virtually activate that button to reuse later code
function buttonPress(button){
    //checks for various buttons
    if(button === 'Backspace'){
        //activate button
        document.getElementById("in").dispatchEvent(new KeyboardEvent('keydown', {
            'key': button
        }));
        //update text display
        document.getElementById("in").value = document.getElementById("in").value.slice(0, document.getElementById("in").value.length - 1);
    }
    //recursively calls buttons to add pi
    else if(button === 'p'){
        buttonPress('3');
        buttonPress('.');
        buttonPress('1');
        buttonPress('4');
        buttonPress('1');
        buttonPress('5');
        buttonPress('9');
    }
    //recursively calls buttons to add c constant
    else if(button === 'c'){
        buttonPress('2');
        buttonPress('9');
        buttonPress('9');
        buttonPress('7');
        buttonPress('9');
        buttonPress('2');
        buttonPress('4');
        buttonPress('5');
        buttonPress('8');

    }
    //adds previous answer to the calculator
    else if(button === 'a'){
        //if ans does not exist yet, alert
        if(ans === null){
            alert("No previous answer!");
        }
        else{
            // else recursively call previous answers buttons
            for(k = 0; k < ans.length; k++){
                console.log(ans[k]);
                buttonPress(ans[k]);
            }

        }
    }
    //Mimics a key press both up and down and updates the text field
    else if(button !== 'Enter' && button !== 'C'){
        //Dispatch specific keydown
        document.getElementById("in").dispatchEvent(new KeyboardEvent('keydown', {
            'key': button
        }));
        //update value
        document.getElementById("in").value += button;
        //Dispatch specific keyup
        document.getElementById("in").dispatchEvent(new KeyboardEvent('keyup', {
            'key': button
        }));
    }
    //Enters or clears the screen
    else {
        document.getElementById("in").dispatchEvent(new KeyboardEvent('keydown', {
            'key': button
        }));
    }
}

//records the history and outputs answer
function history(){
    //display answer fixed to 5 decimal places
    document.getElementById("out").textContent = total.toFixed(5);
    
    //Display previous result at bottom
    document.getElementById("history").innerHTML += 
        document.getElementById("in").value + ' = ' + document.getElementById("out").textContent + '<br/>';
}

//Resets everything
function clearInput(){
    document.getElementById("in").value = '';
    opflag = true;
    numflag = false;
    parenflag = false;
    paren2flag = false;
    openP = 0;
    closeP = 0;
    ops = new LinkedList();
    nums = new LinkedList();
    parens = new LinkedList();
    opsCounter = 0;
    parenOffset = 0;
    nextNum = "";
    total = 0;
}

//Implements a backspace while keeping all counters and flags correct
function backspace(){
    //"part" is the element being deleted while "newEnd" is the new end of the text input string
    var part = document.getElementById("in").value.substr(document.getElementById("in").value.length - 1);
    var newEnd = document.getElementById("in").value.substr(document.getElementById("in").value.length - 2, 1)
    console.log("newEnd:" + newEnd);
    console.log("part:" + part);

    //reset if chain
    if((part >= 0 && part <= 9)|| part === '.'){
        //if decimal reset quota
        if(part === '.'){
            decimalQuota = false;
        }
        //if new number delete number
        if(nums.size - opsCounter >= 2){
            nums.removeFrom(nums.size - 1);
        }
        //resets nextNum
        nextNum = nextNum.slice(0, nextNum.length - 1)
        console.log(nextNum);
    }
    else if(part === "+" || part === "-" || part === "*" || part === "/"){
        //remove operation and reset counter
        ops.removeFrom(ops.size - 1);
        opsCounter--;
    }
    else if(part === "("){
        //remove operation and reset counter
        parens.removeFrom(parens.size - 1);
        openP--;
    }
    else if(part === ")"){
        //remove operation and reset counter
        parens.removeFrom(parens.size - 1);
        closeP--;
    }
    // else return
    else {
        return;
    }

    //resets according to newEnd and flags
    if((newEnd >= 0 && newEnd <= 9)|| newEnd === '.'){

        numflag = true;
        opflag = false;
        parenflag = false;
        paren2flag = false;

    }
    else if(newEnd === "+" || newEnd === "-" || newEnd === "*" || newEnd === "/"){

        numflag = false;
        parenflag = false;
        opflag = true;
        paren2flag = false;

    }
    else if(newEnd === "("){

        numflag = false;
        parenflag = false;
        opflag = false;
        paren2flag = true;

    }
    else if(newEnd === ")"){

        numflag = false;
        parenflag = true;
        opflag = false;
        paren2flag = false;

    } else{
        console.log("i shouldn't be here");
    }

    //if only one value left reset everything
    if(document.getElementById("in").value.length === 1){
        clearInput();
    }
}

//flags any operator errors (ie 2 operators in a row or an operater after an open parenthesis)
//backspaces if error occurs
function opsCheck(){
    if(opflag || paren2flag){
        alert("Illegal operation placement");
        buttonPress('Backspace');
    }
}

//Functions simply receives two numbers and an operator and performs the opperation
function performCalc(num1, num2, op){
    //find operator and print to output
    switch (op) {
        case 'A':
            total = parseFloat(num1) + parseFloat(num2);
            break;
        case 'S':
            total = parseFloat(num1) - parseFloat(num2);
            break;
        case 'M':
            total = parseFloat(num1) * parseFloat(num2);
            break;
        case 'D':
            total = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            console.log('No Operation');
        }
}

//This is a recursive function that takes all three linked list and performs operations in the correct order

function PMDAS(allOps, allNums, allParens){
    //resets start and end
    var start = 0;
    var end = 0;

    //parenthesis case
    //if parenthesis exist go here
    if(allParens.size !== 0){
        //removes parenthesis info from linked list
        var paren = allParens.removeFrom(0);
        console.log("open:" + paren.open + " index:" + paren.index);
        
        //if parenthesis is open
        if(paren.open){
            //prep for recursion
            //creates three empty linked lists
            var newOps = new LinkedList();
            var newNums = new LinkedList();
            var newParens = new LinkedList();
            console.log(parenOffset);

            //find start and end for parenthesis and offset the value
            //Note: start and end values are based on the index value of the last operator done before the parenthesis was pressed
            start = paren.index - parenOffset;
            //recursive case where it returns the end value for this open parenthesis
            end = PMDAS(allOps, allNums, allParens) - parenOffset;

            console.log("B-E: " + start + "-" + end);

            //Do nothing if start and end are the same
            if(start === end){
            } 
            //else prepare an isolated equation 
            else{
                //prepare new isolated nums and ops for recursion
                //add 1st number to the new nums linked list
                newNums.add(""); //Note: The nums linked list has a bit of a quirk where the first value is always a blank "", It just works better this way trust me
                newNums.add(allNums.removeFrom(start + 2));

                //Until the end is reached add new operations
                for(i = start; i < end; i++){
                    newOps.add(allOps.removeFrom(start + 1));
                    newNums.add(allNums.removeFrom(start + 2));

                    //increment offset for future parenthesis
                    parenOffset++;
                }
                //just for testing
                newNums.printList();
                newOps.printList();
                
                //pushes the recursive case and inserts the total hopefully correctly
                PMDAS(newOps, newNums, newParens);
                allNums.insertAt(total, (start + 2));
                
                //another test
                allNums.printList();
            }

        }
        //else is a closed parenthesis and returns the index for the end
        else{
            console.log(parenOffset);
            return paren.index;
        }
    }
    //if there are still more parenthesis 
    if(allParens.size !== 0 ){
        console.log("found the multiple parenthesis case");
        //only the nested case will use the returned value
        //starts another loop for side by side case
        return PMDAS(allOps,allNums, allParens);
    }

    //No More Parenthesis (base case)
    //while there are more operations continue 
    while(allOps.size !== 0){
        //Finds next instance of Multiplication and Division
        var indexM = allOps.indexOf("M");
        var indexD = allOps.indexOf("D");
        
        //Keeps track of where the next operation needs to take place
        var indexOp = 0;

        //if there are no instances of Multiplication and Division start at beginning
        if(indexM === -1 && indexD === -1){
            indexOp = 0;
        }
        //else if only Multiplication exists next operation is that index
        else if(indexM === -1){
            indexOp = indexD;
        }
        //else if only Division exists next operation is that index
        else if(indexD === -1){
            indexOp = indexM;
        }
        //else if multiply index is smaller than division index start with multiplication index
        else if(indexM < indexD){
            indexOp = indexM;
        }
        //else use division index
        else{
            indexOp = indexD;
        }

        console.log("nextOp " + indexOp);

        //Once the next operation is found remove the numbers surround that operation and the operation itself 
        //create variables for these values
        var number1 = allNums.removeFrom(indexOp + 1);
        var number2 = allNums.removeFrom(indexOp + 1);
        var operation = allOps.removeFrom(indexOp);

        console.log(number1 + " " + operation + " " + number2);

        //give performCalc the numbers and operation
        performCalc(number1, number2, operation);

        //finish by inserting that total back into the nums array
        allNums.insertAt(total, indexOp + 1);

        allNums.printList();
        allOps.printList();

        //decrement opsCounter (pointless I believe but I'm too scared to delete)
        opsCounter--;
    }
}

//keyboard listener
document.getElementById("in").addEventListener('keydown', (event) => {
    //finds the key pressed and the code for that key (code is useless)
    var name = event.key;
    var code = event.code;

    //If chain determines which key was pressed and what to do with it
    //if enter is pressed
    if (name === 'Enter') {
        //check whether open and close parenthesis are equal
        if(openP !== closeP){
            alert("Unclosed Parenthesis!");
        } 
        //check if there is enough info (there needs to be at least 1 operator and enough numbers to operate on)
        else if(opsCounter === 0 || nums.size !== opsCounter + 1){
            alert("Not enough info!");
        }
        else {
            //add the last number to the nums linked list
            nums.add(nextNum);

            //log linked lists
            nums.printList();
            ops.printList();

            //hand over PMDAS the goods
            PMDAS(ops, nums, parens, 0); //Wow I handed over 4 parameters to a 3 parameter function! How quirky!

            //record history
            history();

            //store previous answer in text format
            ans = `${total}`;

            //clear everything and return nothing!
            clearInput();
            return;
        }
    }
    //if a number or decimal point
    else if((name >= 0 && name <= 9)|| name === '.'){
        //implicit multiply check
        //if previous value was close parenthesis
        if(parenflag){
            //force a * press
            buttonPress('*');
        }

        //update flags
        numflag = true;
        opflag = false;
        parenflag = false;
        paren2flag = false;

        //if the number of operations matched the amount of numbers add and reset nextNum
        if (opsCounter === nums.size){
            nums.add(nextNum);
            nextNum = "" + name;

            //reset decimalQuota
            decimalQuota = false;
        }
        //else continue to concatenate the next number
        else{
            nextNum += name;
            console.log(nextNum);
        }
    }
    //if an operator is pressed
    //update a couple flags, add operator to linked list, and increment counter
    else if(name === "+"){
        numflag = false;
        parenflag = false;

        ops.add('A');
        opsCounter++;
    }
    else if(name === "-"){
        numflag = false;
        parenflag = false;

        ops.add('S');
        opsCounter++;
    }
    else if(name === "*"){
        numflag = false;
        parenflag = false;

        ops.add('M');
        opsCounter++;
    }
    else if(name === "/"){
        numflag = false;
        parenflag = false;

        ops.add('D');
        opsCounter++;
    }
    //if open parenthesis is pressed
    else if(name === "("){
        //implicit multiply check
        //if previous value was a close parenthesis or number
        if(parenflag || numflag){
            //force a * press
            buttonPress('*');
        }

        //update counter and flags
        openP++;
        numflag = false;
        parenflag = false;
        opflag = false;
        paren2flag = true;

        //add parenthesis to linkedlist with type info and where the last operation was
        parens.add({
            open: true,
            index: ops.size-1
        });
    }
    else if (name === ")"){
        //update counter and flags
        closeP++;
        numflag = false;
        parenflag = true;
        opflag = false;

        //add parenthesis to linkedlist with type info and where the last operation was
        parens.add({
            open: false,
            index: ops.size-1
        });
        
    }
    //if 'C' is pressed clear everything
    else if (name === "C"){
        clearInput();
    }
    //if backspace is pressed call backspace function
    else if (name === "Backspace"){
        backspace();
    }
    //Do nothing for shift
    else if(name === "Shift"){

    }
    //else do nothing
    else {
        console.log(name + " " + code)
        return;
    }
}, false);

//Listener for keyup actions
// I pretty much needed this listener because my input text field wouldn't listen to me when I wanted to delete 
// I use this portion to delete so it gets rid of the right characters
document.getElementById("in").addEventListener('keyup', (event) => {;
    //same as before
    var name = event.key;
    var code = event.code;

    //many of these are dummy if statements that do nothing
    if (name === 'Enter') {
    }
    // if a number is pressed
    else if((name >= 0 && name <= 9)|| name === '.'){
        //Check decimal
        //if decimalQuota is met and a decimal is pressed
        if(decimalQuota && name === '.'){
            //backspace and alert the dummy who did it
            alert("Too many decimals!");
            buttonPress('Backspace');
        }
        //if decimal update the Quota
        if(name === '.'){
            decimalQuota = true;
        }
    }
    //if an operation is pressed
    //Use opsCheck to see whether the operation was placed legally and reset the flags relient on that check
    else if(name === "+"){
        opsCheck();
        opflag = true;
        paren2flag = false;
    }
    else if(name === "-"){
        opsCheck();
        opflag = true;
        paren2flag = false;
    }
    else if(name === "*"){
        opsCheck();
        opflag = true;
        paren2flag = false;
    }
    else if(name === "/"){
        opsCheck();
        opflag = true;
        paren2flag = false;
    }
    else if(name === "("){
    }
    //if a close parenthesis is pressed
    else if(name === ")"){
        //stop my idiot user from putting too many close parenthesis
        if(openP < closeP){
            alert("Too many close parenthesis!");
            buttonPress('Backspace');
        }
        //if for some reason decided it was a good idea to make an empty parenthesis
        if(paren2flag){
            alert("Empty Parenthesis");
            buttonPress('Backspace');
        }
        //reset flag reliant on these checks
        paren2flag = false;
    }
    else if(name === "Shift"){
    }
    else if (name === "Backspace"){
    }
    //else call the user out for trying to do algebra in my baby calculator
    else{
        alert("I ain't doing algebra, you think I'm that smart?");
        buttonPress('Backspace');
    }
}, false);

//console tests



