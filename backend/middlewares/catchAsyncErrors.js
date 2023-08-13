const asyncWrapper = (callback) => {
    return (req, res, next) => {
        return Promise.resolve(callback(req, res, next))
            .catch(next)
    }
}

module.exports = asyncWrapper