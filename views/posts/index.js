const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/database')

const postsRoutes = require('./routes/postsRoutes')

const app = express()
const port = 3000

app.use(express.static('public'))
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use('/posts', postsRoutes)


app.listen(port)