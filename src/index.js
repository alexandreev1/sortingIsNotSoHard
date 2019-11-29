let arr = [];
let optionValue = "shell";
let rangeValue = 10;

let input = document.getElementById("textInput");
let select = document.getElementById("way");
let range = document.getElementById("speed");
let button = document.getElementById("applyButton")

input.addEventListener("change", (e) => {
    arr = e.target.value.split(/[, ]/g);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }
});

select.addEventListener("change", (e) => {
    optionValue = e.target.value;
});

range.addEventListener("change", (e) => {
    rangeValue = parseInt(e.target.value);
});

