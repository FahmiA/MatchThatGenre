var GenreGraph = requirejs('model/GenreGraph');

describe('GenreGraph', function() {
    var genreListURL = TEST_URL + 'testGenreList.json';
    var genreProfileURL = TEST_URL + 'testGenreProfile.json';
    var genreSimilarityListURL = TEST_URL + 'testGenreSimilarityList.json';
    var genreGraph = null;

    beforeEach(function() {
        genreGraph = new GenreGraph();
    });

    it('should not fail when loading existing JSON graph', function() {
        return expect(genreGraph.loadFromURL(genreListURL)).to.eventually.be.fulfilled;
    });

    it('should fail when loading non-existent JSON graph', function() {
        var invalidURL = "someOtherURL";
        return expect(genreGraph.loadFromURL(invalidURL)).to.eventually.be.rejectedWith(Error);
    });
    
    it('should return genre list', function() {
        return genreGraph.loadFromURL(genreListURL)
            .then(function(genres) {
                var retrievedGenres = Object.keys(genres);
                var expectedGenres =  ['a cappella',
                                       'abstract',
                                       'abstract hip hop',
                                       'abstract idm',
                                       'accordion',
                                       'acid house',
                                       'acid jazz',
                                       'acid techno',
                                       'acousmatic',
                                       'acoustic blues'];
                expect(retrievedGenres).to.deep.equal(expectedGenres);
            });
    });
    
    it('should get information about a genre', function() {
        return genreGraph.getGenreFromURL(genreProfileURL)
            .then(function(genreNode) {
                expect(genreNode).to.deep.equal({
                    name: 'acousmatic',
                    urls: {
                        wikipedia_url: "http://en.wikipedia.org/wiki/Acousmatic_music"
                    },
                    description: 'Acousmatic is electroacoustic music that is meant to be played on loudspeakers instead of by live performers. Acousmatic music exists as audio recordings and can contain both recognizable and unrecognizable sounds, manipulated using digital effects.'
                });
            });
    });
    
    it('should fail when loading information about an invalid genre', function() {
        return expect(genreGraph.getGenreFromURL('my-fake-url')).to.eventually.be.rejectedWith(Error);
    });
    
    it('should return neighbours with similarity 0.5', function() {
        var expectedGenres = ['hip house',
                              'detroit techno',
                              'techno',
                              'electronic',
                              'intelligent dance music'];
        return matchNeighbours('acid house',  0.5, expectedGenres);
    });
    
    it('should return no neighbours with similarity 0', function() {
        var expectedGenres = [];
        return matchNeighbours('acid house',  0.0, expectedGenres);
    });
    
    it('should return no neighbours with similarity -1', function() {
        var expectedGenres = [];
        return matchNeighbours('acid house',  -0.5, expectedGenres);
    });
    
    it('should throw exception for genre that dsoesn\'t exist', function() {
        var promise = genreGraph.loadFromURL(genreListURL)
           .then(function() {
                return genreGraph.getNeighboursFromURL(genreSimilarityListURL, 'a fake genre', -0.5);
            });
        
        return expect(promise).to.eventually.be.rejectedWith(Error);
    });
    
    function matchNeighbours(genre, similarity, expectedGenres) {
        return genreGraph.loadFromURL(genreListURL)
            .then(function() {
                return genreGraph.getNeighboursFromURL(genreSimilarityListURL, genre, similarity);
            })
            .then(function(genreNeighbourNodes) {
                var retrievedGenres = genreNeighbourNodes.map(function(node) {
                    return node.name;
                });
             
                expect(retrievedGenres).to.deep.equal(expectedGenres);
            });
    }
});

