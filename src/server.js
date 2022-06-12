const express = require("express");
const cors = require("cors");
const { outputResponse } = require("../express/utils/response");
const connectDb = require("../db/connection");
const app = express();

const start = async () => {
    const APP_STARTED_LOG = `
        ==== PALKI SHIVA'S OPTION CHAIN APPLICATION BACKEND =====
        ENVIRONMENT: ${process.env.ENV}
        STARTED AT: ${new Date()}
        Listening at PORT: ${process.env.PORT}
        =======\n`

    app.use(cors());
    app.use(express.json());

    // REMOVING NULL VALUES in RESPONSE
    app.set("json replacer", (k, v) => ((v === null || v === "") ? undefined : v));

    // CONFIGURE ROUTES
    const healthcheck = require("./routes/healthcheck");
    app.use(healthcheck);

    const userRoutes = require("./routes/user");
    app.use(userRoutes);
    

    // FINALLY TO FORMAT RESPONSE
    app.use((request, _, response, __) => {
        response.status(request.statusCode).json(outputResponse(request));
    });

    connectDb().then(async () => {
        app.listen(process.env.PORT, (error) => {
            if (error) console.error(error);
            console.log(APP_STARTED_LOG);
        });
    });

};

module.exports = start;