import { Router } from "express";

import Joke from "../models/Joke";

export default Router()
    .get("/", async (request, response) => {
        response.send(
            await Joke.find({})
        );
    })
    .get("/:title", async (request, response) => {
        const searchTerm = request.params.title
            .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\{\}]/g, "");

        response.send(
            await Joke.find({ title: new RegExp(searchTerm) })
        );
    })
    .post("/", async (request, response) => {
        const doc = new Joke(request.body);

        response.send(
            await doc.save()
                .catch(err => {
                    response.status(400)

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
    .put("/", async (request, response) => {
        if (!request.body._id) {
            response.status(400)
            response.send({
                error: "BAD_REQUEST",
                message: "No ID provided"
            });
        }

        const doc = await Joke.findById(request.body._id)
            .then(doc => {
                if (!doc) {
                    response.status(404);
                    response.send({
                        error: "NOT_FOUND",
                        message: "No entity found at provided ID"
                    });
                } else
                    return doc;
            });

        Object.keys(request.body)
            .filter(key => {
                return Object.keys(doc._doc).includes(key)
                && !["_id", "created_at", "__v"].includes(key);
            }).forEach(key => {
                doc[key] = request.body[key];
            });

        response.send(
            await doc.save()
                .catch(err => {
                    response.status(400)

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