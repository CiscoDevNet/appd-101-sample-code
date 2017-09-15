const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/secure', function (req, res) {
    if (req.query.username && req.query.password && req.query.username == 'foo' && req.query.password == 'bar') {
        res.send('Valid Authenticated User!')
        console.log('Valid Authenticated User') 
    }
    else {
        res.status(401).send('Unauthenticated User')
        console.log('Unauthenticated User') 
    }   
})

app.get('/404', function (req, res) {
    res.status(404).send('404')
    console.log('404 Error')
})

app.get('/500', function (req, res) {
    res.status(500).send('500 Internal Server Error')
    console.log('500 Internal Server Error')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
