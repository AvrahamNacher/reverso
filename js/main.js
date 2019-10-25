var num = 1;

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

while (0 != (num = prompt("Enter a number to reverse ... even negative! \nType 0 to end"))) {
    alert(reverseNumber(num));
};