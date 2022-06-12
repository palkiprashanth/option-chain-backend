const express = require("express");
const router = express.Router({});

router.get("/healthcheck", async (request, response) => {
    try {
        const healthcheck = {
            message: "OK",
            uptime: process.uptime(),
            cpuUsage: process.cpuUsage(),
            memoryUsage: process.memoryUsage(),
            timestamp: Date.now()
        };
        response.status(200).json(healthcheck);
    } catch(e) {
        response.status(500).json("Something went wrong!");
    };
});

module.exports = router;