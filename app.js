/** Simple demo Express app. */
"use strict";
const express = require("express");
const stats = require("./stats");
const {convertStrNums} = require("./utils")
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { query } = require("express");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get("/mean", function(req,res) {
  let query = req.query.nums;

  if (!query) {
    throw new BadRequestError("nums are required");
  }
  let queryArr = query.split(",")//["1","3","5","7"]
  let resultArr = convertStrNums(queryArr);
  let ans = stats.findMean(resultArr);

  let resultObj = {
    operation: "mean",
    value: ans
  }
  console.log(resultObj);

  return res.json(resultObj);

});


/** Finds median of nums in qs: returns {operation: "median", result } */

app.get("/median", function(req,res) {
  let query = req.query.nums;

  if (!query) {
    throw new BadRequestError("nums are required");
  }

  let queryArr = query.split(",")//["1","3","5","7"]
  let resultArr = convertStrNums(queryArr);
  let ans = stats.findMedian(resultArr);

  let resultObj = {
    operation: "median",
    value: ans
  }
  console.log(resultObj);

  return res.json(resultObj);

});


/** Finds mode of nums in qs: returns {operation: "mean", result } */

app.get("/mode", function(req,res) {
  let query = req.query.nums;

  if (!query) {
    throw new BadRequestError("nums are required");
  }

  let queryArr = query.split(",")//["1","3","5","7"]
  let resultArr = convertStrNums(queryArr);
  let ans = stats.findMode(resultArr);

  let resultObj = {
    operation: "mode",
    value: ans
  }
  console.log(resultObj);

  return res.json(resultObj);

});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;