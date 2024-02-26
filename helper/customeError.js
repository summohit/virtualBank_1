class customError extends Error {
    constructor(message = 'Something went wrong', statusCode = 400) {
        super(message)
        Error.captureStackTrace(this, this.constructor);
        this.name = 'Error'
        this.statusCode = statusCode
    }

    status() {
        return this.statusCode
    }
}

module.exports = customError
