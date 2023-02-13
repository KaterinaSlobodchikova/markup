import { AxiosResponse } from "axios";
import "./styles.scss";
import "./js/sum";

window.onload = () => {
  // setInterval(() => {
  //   new Promise(() => {
  //     for (let a = 0; a < 1000000; a++) {
  //       console.log(1);
  //     }
  //   });
  // }, 5000);

  const container = document.getElementById("animate__article") as HTMLElement;
  const maxXPosition: number = container!.getBoundingClientRect().width - 10;
  let square = document.getElementById("animatejs") as HTMLDivElement;
  const containerPad: string = getComputedStyle(container, null)
    .getPropertyValue("padding-right")
    .replace(/px/gi, "");
  const squareWidth: number = square.getBoundingClientRect().width;
  timeoutAnimate(maxXPosition, containerPad, squareWidth);
  frameAnimate(maxXPosition, containerPad, squareWidth);
};

function timeoutAnimate(
  maxXPosition: number,
  containerPad: string,
  squareWidth: number
) {
  let fps = 60;
  const refreshRate = 1000 / fps;
  let block = document.getElementById("animate") as HTMLDivElement;
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

function frameAnimate(
  maxXPosition: number,
  containerPad: string,
  squareWidth: number
) {
  let square = document.getElementById("animatejs") as HTMLDivElement;
  let prevTime = 0;
  let position = 0;
  let speed = 10;
  function startAnimation(time: number) {
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

//------------------rickandmortyapi------------//

// перехватить code=200 и вывести в консоль success

const axios = require("axios");

axios?.interceptors?.request.use((response: AxiosResponse) => {
  console.log("Success");
  return response;
});

// axios({
//   method: "get",
//   url: "https://rickandmortyapi.com/api/character",
// }).then(function (response) {
//   console.log(response.data.results);
// });

interface ICharacters {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
}

let characters: ICharacters[];

const getCharacters = async () => {
  try {
    const response: AxiosResponse = await axios.get(
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

const dropInput = document.getElementById("input__drop") as HTMLInputElement;
let dropInputValue = dropInput.value;

dropInput?.addEventListener("input", show);
// dropInput.addEventListener("blur", hide);

// function hide() {
//   const li = document.querySelectorAll(".option");
//   li.forEach((item) => {
//     item.classList.add("hide__option");
//   });
// }

function show() {
  let inputText = document.getElementById("input__drop") as HTMLInputElement;
  let inputTextValue = inputText.value;

  let parent: HTMLElement | null = document.getElementById("drop");
  while (parent?.lastElementChild) {
    parent.removeChild(parent.lastElementChild);
  }
  if (inputTextValue.length == 0) return;

  const filteredOptions = characters
    .filter((option) =>
      option.name.toLowerCase().includes(inputTextValue.toLowerCase())
    )
    .slice(0, 10);

  console.log(filteredOptions);

  filteredOptions.forEach((item) => {
    let listElement = document.createElement("li");
    listElement.textContent = item.name;
    listElement.dataset.image = item.image;
    listElement.classList.add("option");
    let ul = document.querySelector(".drop") as HTMLElement;
    ul.appendChild(listElement);
  });
  addEvent();
}

//выбрать персонажа и отобразить о нем информацию

function addEvent() {
  const lis = document.querySelectorAll(".option");
  lis.forEach((link: any) => {
    link.addEventListener("click", () => {
      dropInputValue = link.textContent!;
      removeInfo();

      let paragraph = document.createElement("p");
      paragraph.textContent = link.textContent;
      paragraph.classList.add("character__p");
      let img = document.createElement("img");
      img.classList.add("character__img");
      img.src = link.dataset.image;
      const article = document.getElementById(
        "article__character"
      ) as HTMLElement;
      article.appendChild(img);
      article.appendChild(paragraph);
    });
  });
}

function removeInfo() {
  const article = document.getElementById("article__character") as HTMLElement;
  const img = article.querySelector(".character__img");
  const p = article.querySelector(".character__p");
  if (img) article.removeChild(img);
  if (p) article.removeChild(p);
}

// отобразить 4 героя сразу

interface IFourCharacters {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
}

const getFourCharacters = async () => {
  let fourCharacters: Array<IFourCharacters> = [];
  const response: AxiosResponse = await axios.get(
    "https://rickandmortyapi.com/api/character/125,259, 543, 810"
  );
  console.log(fourCharacters);
  fourCharacters = response.data;
  showFourCharacters(fourCharacters);
};

getFourCharacters();

function showFourCharacters(fourCharacters: Array<IFourCharacters>) {
  const article_four = document.querySelectorAll(".article__four");
  article_four.forEach((item, index) => {
    console.log(fourCharacters[index]);
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
