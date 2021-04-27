export default (request, response) => {
    response.status(404);
    response.send({
        error: "NOT_FOUND",
        message: "No route."
    })
}
