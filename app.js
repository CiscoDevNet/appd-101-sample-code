require("appdynamics").profile({
  controllerHostName: 'localhost',
  controllerPort: 8090,
  accountName: 'customer1',
  accountAccessKey: 'ab1fd789-c035-47dd-bfd6-aff7599ddbcb',
  applicationName: 'devnet-sample-app',
  tierName: 'backend',
  nodeName: 'process' // The controller will automatically append the node name with a unique number
});

const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/thanks', function (req, res) {
    res.send('Thanks for buying $1,000,000 of stuff!')
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
    throw new Error('It\'s all broken!')
})

app.get('/slow', function (req, res) {
    setInterval(function() {
      res.status(200).send('Whew, that took a while!')
      console.log('Slow transaction')
    }, 2000)

})

function blockCpuFor(ms) {
	var now = new Date().getTime();
	var result = 0
	while(true) {
		result += Math.random() * Math.random();
		if (new Date().getTime() > now +ms)
			return;
	}
}

app.get('/load', function (req, res) {
    blockCpuFor(20000)
    res.status(200).send('Man, I\'m tired!')
    console.log('Block CPU transaction')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

module.exports = app; // For tests
