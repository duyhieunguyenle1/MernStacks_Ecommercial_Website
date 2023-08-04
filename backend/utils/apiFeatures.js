class APIFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        const removeFields = ['keyword', 'limit', 'page']

        removeFields.forEach(field => delete queryCopy[field])

        // advanced filter for number
        let queryString = JSON.stringify(queryCopy)
        queryString = queryString.replace(/\b(lte|lt|gte|gt)/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryString))
        return this;
    }

    pagination(resPerPage) {
        const curPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (curPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this;
    }
}

module.exports = APIFeatures