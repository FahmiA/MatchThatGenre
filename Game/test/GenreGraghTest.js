var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,

    baseUrl: 'src'
});

var chai = requirejs('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

fetch = requirejs('node-fetch');

var promise = requirejs('promise');
fetch.Promise = promise;

var GenreGraph = requirejs('model/GenreGraph');

describe('GenreGraph', function() {
    var url = 'testGenreGraph.json';
    var genreGraph = null;

    beforeEach(function() {
        genreGraph = new GenreGraph();
    });

    it('should not fail when loading existing JSON graph', function() {
        expect(genreGraph.load(url)).to.eventually.be.fulfilled;
    });

    it('should nfail when loading non-existent JSON graph', function() {
        var invalidURL = "someOtherURL";
        expect(genreGraph.load(invalidURL)).to.eventually.be.rejectedWith(Error);
    });
});

