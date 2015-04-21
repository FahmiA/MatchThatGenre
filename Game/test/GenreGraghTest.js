var GenreGraph = requirejs('model/GenreGraph');

describe('GenreGraph', function() {
    var url = TEST_URL + 'testGenreGraph.json';
    var genreGraph = null;

    beforeEach(function() {
        genreGraph = new GenreGraph();
    });

    it('should not fail when loading existing JSON graph', function() {
        return expect(genreGraph.load(url)).to.eventually.be.fulfilled;
    });

    it('should fail when loading non-existent JSON graph', function() {
        var invalidURL = "someOtherURL";
        return expect(genreGraph.load(invalidURL)).to.eventually.be.rejectedWith(Error);
    });
});

