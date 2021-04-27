export default (request, response) => {
    response.removeHeader("X-Powered-By");
    response.setHeader("X-Content-Type-Options", "nosniff");

    request.next();
}
