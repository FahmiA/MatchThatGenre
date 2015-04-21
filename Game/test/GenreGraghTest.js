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
    
    it('should return direct neighbours', function() {
        return genreGraph.load(url)
            .then(function() {
                var neighbours = genreGraph.getNeighbours('a', 1);
                neighboursEqual(neighbours, ['b', 'c', 'd']);
            });
    });
    
    it('should return neighbours at distance 2', function() {
         return genreGraph.load(url)
            .then(function() {
                var neighbours = genreGraph.getNeighbours('a', 2);
                neighboursEqual(neighbours, ['e', 'f']);
            });
    });
    
    it('should return no neighbours at distance 0', function() {
        return genreGraph.load(url)
            .then(function() {
                var neighbours = genreGraph.getNeighbours('a', 0);
                neighboursEqual(neighbours, []);
            });
    });
    
    it('should return no neighbours at distance -1', function() {
        return genreGraph.load(url)
            .then(function() {
                var neighbours = genreGraph.getNeighbours('a', -1);
                neighboursEqual(neighbours, []);
            });
    });
    
    it('should throw exception for genre that dsoesn\'t exist', function() {
        var promise = genreGraph.load(url)
           .then(function() {
                genreGraph.getNeighbours('nonexistentGenre', 1);
            });
        
        return expect(promise).to.eventually.be.rejectedWith(Error);
    });
        
    function neighboursEqual(genreNodes, actualGenres) {
        expect(genreNodes).to.be.defined;
        
        var retrievedGenres = genreNodes.map(function(genreNode) {
            return genreNode.genre;
        });
        
        expect(retrievedGenres).to.deep.equal(actualGenres);
    }
});

