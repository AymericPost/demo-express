import express from "express";
import mongoose from "mongoose"
import cors from "cors";

import header from "./middlewares/headers";
import rootRouter from "./controllers"

const app = express();

app
    .set("etag", false)
    .use(cors())
    .use(header)
    .use(express.json())
    .use(rootRouter)


app.listen(8000, "localhost", () => {
    console.log("Server is up !");

    mongoose.connect(
        "mongodb://localhost/web",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, (err) => {
            if(err) {
                console.error(err);
                process.exit(1);
            } else {
                console.log("Connexion to database established");
            }
        }
    );
});