/* Use "RequireJs" and not "require" (which is built into Node).
 * This ensures that module loading is identical to the client.
 */
requirejs = require('requirejs');

requirejs.config({
    // Pass the top-level main.js/index.js require
    // function to requirejs so that node modules
    // are loaded relative to the top-level JS file.
    nodeRequire: require,

    baseUrl: 'src'
});

/* Set up Chai for unit testing. */
chai = requirejs('chai');
expect = chai.expect;

/* Add the Chai promise plugin to make testing promises easier. */
chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

/* Polyfil the "fetch" API. */
fetch = requirejs('node-fetch');

/* Polyfil the "Promise" API. */
Promise = requirejs('promise');
fetch.Promise = Promise;

/* Start a staic http server for serving test files. */
var static = requirejs("node-static");
var fileServer = new static.Server('./test');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(8080);

TEST_URL = 'http://127.0.0.1:8080/';