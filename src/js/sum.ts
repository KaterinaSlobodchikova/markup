const worker = new Worker("worker.js");

const sumButton: HTMLButtonElement | null = document.querySelector("#sumBtn");
const bgButton = document.querySelector("#bgBtn") as HTMLElement;

sumButton?.addEventListener("click", (event: Event): void => {
  worker.postMessage("hello");
});

worker.onmessage = function (message) {
  alert(`The sum is ${message.data}`);
};

bgButton?.addEventListener("click", (event: Event): void => {
  let header = document.getElementById("header") as HTMLElement;
  if (header?.style.background !== "orange") {
    header.style.background = "orange";
  } else {
    header.style.background = "magenta";
  }
});
