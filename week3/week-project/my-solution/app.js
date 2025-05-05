let count = 0;
let counterDisplay = document.querySelector(".counter-display");
const min = -10;
const max = 10;

const increment = () => {
  if (count >= max) {
    alert("Maximum limit reached");
    return;
  } else {
    count++;
    console.log(count);
    counterDisplay.textContent = count;
  }
};

const decrement = () => {
  if (count <= min) {
    alert("Minimum limit reached");
    return;
  } else {
    count--;
    console.log(count);
    counterDisplay.textContent = count;
  }
};

const reset = () => {
  count = 0;
  console.log(count);
  counterDisplay.textContent = count;
};
