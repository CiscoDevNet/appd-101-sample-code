var Promise = require('bluebird')
var request = require('request-promise')
var Bottleneck = require('bottleneck')

var limiter = new Bottleneck(1, 2000)

var server = 'http://localhost:3000'

function apiCall(path) {
  console.log('Executing', path)
  return request(server + path)
}

var promises = []

function simpleTest() {
  return new Promise(function(resolve, reject) {
    console.log("starting")
    limiter.schedule(apiCall, '/secure?username=foo&password=bar')
    limiter.schedule(apiCall, '/secure')
    limiter.schedule(apiCall, '/thanks')
    limiter.schedule(apiCall, '/404')
    limiter.schedule(apiCall, '/500')
    limiter.schedule(apiCall, '/load')
    limiter.schedule(apiCall, '/slow')
  })
}

for (var i = 0; i < 1; i++) {
  console.log("Adding promises")
  promises.push(simpleTest())
}

Promise.all(promises)
  .then(function(result) {
  console.log("Done")
}).catch(function(error) {
  console.log("Error")
})
