const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// ➕ Add Job
router.post("/add", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.send("Job added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 📄 Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;