import { Schema, model } from "mongoose";

const JokeSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    author: String,
    joke: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default model("Joke", JokeSchema);