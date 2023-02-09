const worker = new Worker("worker.js");

const sumButton = document.querySelector("#sumBtn");
const bgButton = document.querySelector("#bgBtn");

sumButton.addEventListener("click", (event) => {
  worker.postMessage("hello");
});

worker.onmessage = function (message) {
  alert(`The sum is ${message.data}`);
};

bgButton.addEventListener("click", (event) => {
  let header = document.getElementById("header");
  if (header.style.background !== "orange") {
    header.style.background = "orange";
  } else {
    header.style.background = "magenta";
  }
});
