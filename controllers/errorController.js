module.exports = (err, req,res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    let error = {... err}
    error.message = err.message
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    })
}