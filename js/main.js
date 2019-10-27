var num = "";
var reverseNumber = false;  // true = user has pressed reverse button

function swapCoordinates (num1, num2, gap) {

    num1.style.left = gap + "px";
    num2.style.left = (gap * -1) + "px";

    // var num1Left = tempLeft = num1.getBoundingClientRect().left;

}

function reverseButtonClicked () {
    reverseNumber = true;
    console.log ("Button click");

    let button = document.getElementsByClassName("button");
    let buttonText = button[0].getElementsByTagName("span");

    button[0].removeEventListener("click", reverseButtonClicked);
    button[0].addEventListener("click", playAgainButtonClicked);

    buttonText[0].innerHTML = "Play Again";

    let numbers = document.getElementsByClassName("numbers");

    // go through half the numbers and swap with the other half of numbers
    let high = numbers[0].children.length;

    // Because getBoundingClientRect doesn't return the actual coordinates of the elements
    // but only their coordinates relative to the full screen,
    // I need to move them based on the elements' distance from each other:
    // When there are an EVEN number of numbers, the gap is 140
    // when there are an ODD number of numbers, the gap is 280
    let half = high / 2;
    let gap = 140 + (140 * high % 2); // 140 if even amount of numbers, 280 if odd

    half = Math.floor(half); // get rid of the decimal if there are an odd number of numbers
    high--; // the number of numbers will be 0 to (length - 1)

    for (var low=0; low < half; low++) {
        // if even (ex. 4 numbers), then gap of 140 & swap 0 with 3, 1 with 2
        // if odd (ex. 5 numbers), then gap of 280 & swap 0 with 5, 1 with 4
        swapCoordinates(numbers[0].children[low], numbers[0].children[(high)], ((high-low) * gap));
        high--;
    }
}

function playAgainButtonClicked () {
    reverseNumber = false;

    document.removeEventListener('keydown', acceptKeystokes);
    
    setTimeout(function() {
        let instructions = document.getElementsByClassName("instructions");
        instructions[0].classList.remove("hideInstructions");
        
        document.addEventListener('keydown', acceptKeystokes);
    }, 300);

    let button = document.getElementsByClassName("button");
    let buttonText = button[0].getElementsByTagName("span");

    button[0].removeEventListener("click", playAgainButtonClicked);

    let numbers = document.getElementsByClassName("numbers");
    for (i = 1; i <= numbers[0].children.length; i++) {
        let number = document.getElementById("numbers"+i);
        number.style.opacity = "0";
        setTimeout(function(){
            number.parentNode.removeChild(number);
        }, 100);
    }

    button[0].classList.remove("showButton");
    buttonText[0].innerHTML = "Reverse!";

    num = "";
}

function setBackgroundColor () {

    let colors = ["blue", "purple", "green", "blueviolet", "darkslateblue", "brown", "chocolate", "darkblue",
    "darkgreen", "darkred", "firebrick", "indigo", "sienna"];

    return colors[Math.floor((Math.random() * colors.length))];
}

function acceptKeystokes () {
    if (!reverseNumber) {  // only track keypresses when not displaying reversed number

        let key = event.key;   // record what key was pressed

        // only accept '-' as the first character,
        // and only accept '0' when it is not the first character, or not immediately after the '-'
        if (((key >= 1 && key <= 9) || (key == '-' && num.length == 0) || ( key == 0 && num[0] != '-' && num.length > 0 ) || ( key == 0 && num[0] == '-' && num.length != 1)) && (num.length < 9)) {
            num += key;

            let numbers = document.getElementsByClassName("numbers");  // locate the numbers class elements in the DOM
    
            let node = document.createElement("span");   // create a new <span> element
            var textnode = document.createTextNode(key);  // add key as text for the node
            node.appendChild(textnode);  // append (add) the text to the new <span> element
            node.style.opacity = "0";  // hide the number until it is fully styled
    
            // give the new node a unique ID which is "numbers" + the current number of <span> nodes
            let numNodes = numbers[0].childElementCount;
            let newNodeId = "numbers"+(numNodes+1);
            node.setAttribute("id", newNodeId);
    
            numbers[0].appendChild(node);  // add the new node <span> into the numbers class elements
            numbers[0].children[numNodes].style.position = "relative";  // allow us to change its position in swapCoordinates
            numbers[0].children[numNodes].style.left = "0";
            numbers[0].children[numNodes].style.transitionProperty = "left, opacity";
            numbers[0].children[numNodes].style.transitionDuration = "2s, 0.3s";
            numbers[0].children[numNodes].style.backgroundColor = setBackgroundColor ();
    
            // add class "numberInCircle" to the new <span> element
            let numbersSpans = document.getElementById(newNodeId);
            numbersSpans.classList.add("numberInCircle");
            
            // reveal the number now that all its properties are set
            setTimeout(function(){
                node.style.opacity = "1";
            }, 10);

            if (numNodes == 0) {  // user entered a number, hide the instructions
                let instructions = document.getElementsByClassName("instructions");
                instructions[0].classList.add("hideInstructions");
            }
            
            if (numNodes == 1) {  // now there are 2 numbers, show the reverse button
                let button = document.getElementsByClassName("button");
                button[0].classList.add("showButton");
                button[0].addEventListener("click", reverseButtonClicked);

            }
            
        } else if (key == 'Backspace') {
            let numbers = document.getElementsByClassName("numbers");  // locate the numbers class elements in the DOM
            numbers[0].removeChild(numbers[0].lastChild);  // remove the last number
            num = num.slice(0, num.length-1)  // update the var of the digits entered

            if (num.length == 1) {  // only one number left on the screen, remove the Reverse button
                let button = document.getElementsByClassName("button");
                button[0].classList.remove("showButton");
                button[0].removeEventListener("click", reverseButtonClicked);
            }

            if (num.length == 0) {  // no numbers left on the screen, show the instructions}
                document.getElementsByClassName("instructions")[0].classList.remove("hideInstructions");
            }
        } else if (key == 'Enter') {  // as if they clicked the Reverse button
            reverseButtonClicked ();
        }    
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', acceptKeystokes);
});