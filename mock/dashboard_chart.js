function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [20, 40, 74, 12, 34, 34];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
