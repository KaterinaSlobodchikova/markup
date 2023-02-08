import "./styles.scss";

window.onload = () => {
  const container = document.getElementById("animate__article");
  const maxXPosition = container.getBoundingClientRect().width - 10;
  let square = document.getElementById("animatejs");
  const containerPad = getComputedStyle(container, null)
    .getPropertyValue("padding-right")
    .replace(/px/gi, "");
  const squareWidth = square.getBoundingClientRect().width;
  timeoutAnimate(maxXPosition, containerPad, squareWidth);
  frameAnimate(maxXPosition, containerPad, squareWidth);
};

function timeoutAnimate(maxXPosition, containerPad, squareWidth) {
  let fps = 60;
  const refreshRate = 1000 / fps;
  let block = document.getElementById("animate");
  let speedX = 3;
  let positionX = 0;

  window.setInterval(() => {
    positionX = positionX + speedX;
    if (
      positionX > maxXPosition - +containerPad - squareWidth ||
      positionX < 0
    ) {
      speedX = speedX * -1;
    }
    block.style.transform = `translateX(${positionX}px)`;
  }, refreshRate);
}

function frameAnimate(maxXPosition, containerPad, squareWidth) {
  let square = document.getElementById("animatejs");
  let prevTime = 0;
  let position = 0;
  let speed = 50;
  function startAnimation(time) {
    if (!prevTime) {
      prevTime = time;
    }
    position += speed * (prevTime / 1000);
    // debugger;
    square.style.transform = `translateX(${position}px)`;
    if (position > maxXPosition - +containerPad - squareWidth || position < 0) {
      speed = speed * -1;
    }

    window.requestAnimationFrame(startAnimation);
  }
  window.requestAnimationFrame(startAnimation);
}

// Массив с большим количеством options
// const Options = [
//   { value: "value1", text: "text1" },
//   { value: "value1", text: "text2" },
// ];

const Options_new = new Array(1000);

Options_new.fill({
  value: 2,
  text: "Lorem ipsum",
});

Options_new.forEach((option) => {
  let option_new = document.createElement("option");
  option_new.text = option.text;
  option_new.value = option.value;
  let select = document.getElementById("select");
  select.appendChild(option_new);
});

// input с выпадающим списком, который можно фильтровать

const Options = new Array(10);

Options.fill(
  {
    value: "map",
  },
  0,
  3
);

Options.fill(
  {
    value: "sunrise",
  },
  3,
  5
);

Options.fill(
  {
    value: "ocean",
  },
  5,
  8
);

Options.fill(
  {
    value: "ice-cream",
  },
  8,
  10
);

// Options.forEach((o) => {
//   let opt = document.createElement("li");
//   console.log(opt);
//   opt.textContent = o.value;
//   //добавить классы к новым options, чтобы они были скрыты
//   opt.classList.add("hide__option");
//   let ul = document.querySelector(".drop");
//   ul.appendChild(opt);
// });

const dropInput = document.getElementById("input__drop");
dropInput.addEventListener("input", show);
dropInput.addEventListener("blur", hide);

function hide() {
  const li = document.querySelectorAll(".option");
  li.forEach((item) => {
    item.classList.add("hide__option");
  });
}

function show() {
  let inputText = document.getElementById("input__drop").value;

  let parent = document.getElementById("drop");
  while (parent.lastElementChild) {
    parent.removeChild(parent.lastElementChild);
  }
  if (inputText.length == 0) return;

  const filteredOptions = Options.filter((option) =>
    option.value.toLowerCase().includes(inputText)
  ).slice(0, 10);

  filteredOptions.forEach((item) => {
    let opt = document.createElement("li");
    opt.textContent = item.value;
    opt.classList.add("option");
    let ul = document.querySelector(".drop");
    ul.appendChild(opt);
  });
}
