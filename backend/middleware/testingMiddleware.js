const testingMiddleware = (req, res, next) => {
    req.testProperty = "this is the test property very very good"
    next()
}

module.exports = testingMiddleware