function countDown(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay * 1000);
  });
}

module.exports = { countDown };
