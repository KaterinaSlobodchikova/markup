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
  showFourCharacters();
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
  let speed = 10;
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

//rickandmortyapi

// перехватить code=200 и вывести в консоль success

const axios = require("axios");

axios.interceptors.request.use(
  function (response) {
    console.log("Success");
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// axios({
//   method: "get",
//   url: "https://rickandmortyapi.com/api/character",
// }).then(function (response) {
//   console.log(response.data.results);
// });

let characters;

const getCharacters = async () => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    characters = response.data.results;
  } catch (error) {
    console.log(error);
  }
};
getCharacters();

// const Options_new = new Array(100);

// Options_new.fill({
//   text: "Lorem ipsum",
// });

// Options_new.forEach((option) => {
//   let option_new = document.createElement("option");
//   option_new.text = option.text;
//   option_new.value = option.value;
//   let select = document.getElementById("select");
//   select.appendChild(option_new);
// });

// input с выпадающим списком, который можно фильтровать

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
// dropInput.addEventListener("blur", hide);

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

  const filteredOptions = characters
    .filter((option) =>
      option.name.toLowerCase().includes(inputText.toLowerCase())
    )
    .slice(0, 10);

  console.log(filteredOptions);

  filteredOptions.forEach((item) => {
    let listElement = document.createElement("li");
    listElement.textContent = item.name;
    listElement.dataset.image = item.image;
    listElement.classList.add("option");
    let ul = document.querySelector(".drop");
    ul.appendChild(listElement);
  });
  addEvent();
}

//выбрать персонажа и отобразить о нем информацию

function addEvent() {
  const lis = document.querySelectorAll(".option");
  lis.forEach((link) => {
    link.addEventListener("click", () => {
      dropInput.value = link.textContent;
      removeInfo();

      let paragraph = document.createElement("p");
      paragraph.textContent = link.textContent;
      paragraph.classList.add("character__p");
      let img = document.createElement("img");
      img.classList.add("character__img");
      img.src = link.dataset.image;
      const article = document.getElementById("article__character");
      article.appendChild(img);
      article.appendChild(paragraph);
    });
  });
}

function removeInfo() {
  const article = document.getElementById("article__character");
  const img = article.querySelector(".character__img");
  const p = article.querySelector(".character__p");
  if (img) article.removeChild(img);
  if (p) article.removeChild(p);
}

// отобразить 4 героя сразу

let fourCharacters;

const getFourCharacters = async () => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character/125,259, 543, 810"
    );
    fourCharacters = response.data;
    console.log(fourCharacters);
  } catch (error) {
    console.log(error);
  }
};
getFourCharacters();

function showFourCharacters() {
  let article_four = document.querySelectorAll(".article__four");
  article_four.forEach((item, index) => {
    let paragraph = document.createElement("p");
    paragraph.textContent = fourCharacters[index].name;
    let paragraphSpecies = document.createElement("p");
    paragraphSpecies.textContent = fourCharacters[index].species;
    let paragraphStatus = document.createElement("p");
    paragraphStatus.textContent = fourCharacters[index].status;
    let img = document.createElement("img");
    img.src = fourCharacters[index].image;
    item.append(paragraph);
    item.append(paragraphSpecies);
    item.append(paragraphStatus);
    item.append(img);
  });
}
