onmessage = function (message) {
  let sum = 0;
  for (let i = 0; i < 2000000000; i++) sum += i;
  postMessage(sum);
};
