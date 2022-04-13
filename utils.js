const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  res = [];
  for (let nums of strNums) {
    if (isNaN(parseInt(nums))) {
      console.log("am i here?")
      throw new BadRequestError(`${nums} is not a number`);
    }
    else {
      res.push(parseInt(nums));
    }
  }
  return res;
}


module.exports = { convertStrNums };