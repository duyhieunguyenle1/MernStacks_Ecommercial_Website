const mongoose = require('mongoose')

const connectDatabase = (uri) => {
    return mongoose.connect(uri)
        .then(con => {
            console.log(`MongoDB Database connected with HOST:${con.connection.host}`)
        })
}

module.exports = connectDatabase