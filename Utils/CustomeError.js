class CustomeError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode || 500;
        this.status = statusCode>=400 && statusCode < 500 ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = CustomeError;