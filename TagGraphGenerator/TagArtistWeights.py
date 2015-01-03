
class TagArtistWeights:
    """ Stores artists with their weights against their tags"""
    
    def __init__(self):
        # Dictionary from tag to dictionary of Artist to artist weight
        self._artistWeights = {}

    def add(self, tag, artist, weight):
        if tag in self._artistWeights:
            self._artistWeights[tag][artist] = weight
        else:
            self._artistWeights[tag] = {artist: weight}

    def isEmpty(self):
        return len(self._artistWeights) == 0

    def getTags(self):
        return self._artistWeights.keys()

    def getTagCount(self):
        return len(self._artistWeights)

    def hasTag(self, tag):
        return tag in self._artistWeights

    def hasArtist(self, tag, artist):
        return tag in self._artistWeights and artist in self._artistWeights[tag]

    def getWeight(self, tag, artist):
        return self._artistWeights[tag][artist]

    def getArtistsWeights(self, tag):
        return self._artistWeights[tag]

