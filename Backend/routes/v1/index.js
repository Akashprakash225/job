const express = require("express");
const { userRouter } = require("./userRoutes");
const { jobsRouter } = require("./jobsRouter");
const { employerRouter } = require("./employerRoutes");
const { applicationRouter } = require("./applicationRouter");
const { savedJobRouter } = require("./savedJobRouter");

const v1Router = express.Router();
v1Router.use("/user", userRouter);
v1Router.use("/jobs", jobsRouter);
v1Router.use("/employer", employerRouter);
v1Router.use("/application", applicationRouter);
v1Router.use("/saved-jobs", savedJobRouter);

module.exports = { v1Router };
