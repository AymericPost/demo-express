import { Router } from "express";

import jokeRouter from "./jokeController";
import notFound from "../middlewares/not_found";

export default Router()
    .get("/", (request, response) => {
        response.send({
            message: "It works!"
        })
    })
    .use("/jokes", jokeRouter)
    .use(notFound);