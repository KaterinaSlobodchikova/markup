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
