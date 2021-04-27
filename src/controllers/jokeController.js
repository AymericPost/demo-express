import { Router } from "express";

import Joke from "../models/Joke";

export default Router()
    .get("/", async (request, response) => {
        response.send(
            await Joke.find({})
        );
    })
    .get("/:title", async (request, response) => {
        response.send(
            await Joke.find({ title: request.params.title })
        );
    })
    .post("/", async (request, response) => {
        const doc = new Joke(request.body);

        response.send(
            await doc.save()
                .catch(err => {
                    if (err.code == 11000)
                        return {
                            error: "BAD_REQUEST",
                            message: "title already exists"
                        }
                    else {
                        return {
                            error: "BAD_REQUEST",
                            message: ""
                        }
                    }
                })
        );
    })