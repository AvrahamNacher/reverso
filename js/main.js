var num = "";
var reverseNumber = false;  // true = user has pressed reverse button

function reverseNumber(num) {
    var positive = false;  // negative number needs a minus sign appended to the end
    var reverse = "";

    if (num > 0) {
        positive = true;
    } else {
        num = Math.abs(num);  // turn the negative number into a positive for the calculations
    }

    while (num != 0) {
        reverse += num % 10;
        num -= (num%10);
        num = Math.trunc(num/10);
    }

    if (!positive) {
        reverse += "-";
    }

    return reverse;
}

function swapCoordinates (num1, num2, gap) {
    // num1.style.left = "800px"

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

    // Because I can't get the actual coordinates of the elements, but only their coordinates relative to the full screen
    // I need to move them based on the elements' distance from each other
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
    //     numbers[0].children[i].classList.add ("hide");
    }
    
}

function playAgainButtonClicked () {
    reverseNumber = false;

    let button = document.getElementsByClassName("button");
    let buttonText = button[0].getElementsByTagName("span");


    button[0].removeEventListener("click", playAgainButtonClicked);
    button[0].addEventListener("click", reverseButtonClicked);

    console.log ("Again clicked");

    buttonText[0].innerHTML = "Reverse!";
}

document.getElementsByClassName("button")[0].addEventListener("click", reverseButtonClicked)

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', event => {
    
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
        
                // give the new node a unique ID which is "numbers" + the current number of <span> nodes
                let numNodes = numbers[0].childElementCount;
                let newNodeId = "numbers"+(numNodes+1);
                node.setAttribute("id", newNodeId);
        
                numbers[0].appendChild(node);  // add the new node <span> into the numbers class elements
                numbers[0].children[numNodes].style.position = "relative";  // allow us to change its position in swapCoordinates
                numbers[0].children[numNodes].style.left = "0";
                numbers[0].children[numNodes].style.transition = "all 2s";

        
                // add class "numberInCircle" t0 the new <span> element
                let numbersSpans = document.getElementById(newNodeId);
                numbersSpans.classList.add("numberInCircle");

                if (numNodes == 0) {  // user entered a number, hide the instructions
                    let instructions = document.getElementsByClassName("instructions");
                    instructions[0].classList.add("hide");
                }
                
                if (numNodes == 1) {  // now there are 2 numbers, show the reverse button
                    let button = document.getElementsByClassName("button");
                    button[0].classList.add("show");

                }
                
            } 
             
        }
    });
});