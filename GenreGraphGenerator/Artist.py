
class Artist:
    """ Represents a musical Artist with a name and id. """
    def __init__(self, id, name):
        self._id = id
        self._name = name

    def getId(self):
        return self._id

    def getName(self):
        return self._name

    def __repr__(self):
        return "'" + self._name + "'" 

    def __hash__(self):
        return hash(self._id)

    def __eq__(self, obj):
        return isinstance(obj, Artist) and obj.getId() == self._id and obj.getName() == self._name

    def __ne__(self, obj):
        return not self == obj


class ArtistTags:
    """ Stores the tags related to artists. """

    def __init__(self):
        # Map from tag name to a map of artist object to tag count
        self._tagToArtists = {}

        # Map from artist object to set of tags
        self._artistToTags = {}

    def add(self, artist, tag, tagCount):
        """ Associates a new artist with a tag """
        # Update the tag-artists record
        if tag in self._tagToArtists:
            artistDict = self._tagToArtists[tag]
            artistDict[artist] = tagCount
        else:
            self._tagToArtists[tag] = {artist: tagCount}

        # Update the artist-tags
        if artist in self._artistToTags:
            self._artistToTags[artist].add(tag)
        else:
            self._artistToTags[artist] = {tag}

    def getTags(self):
        return self._tagToArtists.keys()

    def getTagCount(self):
        return len(self._tagToArtists)

    def getArtistsWithTag(self, tag):
        return self._tagToArtists[tag].keys()

    def getArtistTagCount(self, artist):
        return len(self._artistToTags[artist])

    def getTagCountOfArtist(self, tag, artist):
        return self._tagToArtists[tag][artist]

    def getTotalTagCount(self, tag):
        return sum(self._tagToArtists[tag].values())


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

    def getTagCount(self):
        return len(self._artistWeights)

    def hasTag(self, tag):
        return tag in self._artistWeights

    def hasArtist(self, tag, artist):
        return tag in self._artistWeights and artist in self._artistWeights[tag]

    def getWeight(self, tag, artist):
        return self._artistWeights[tag][artist]
