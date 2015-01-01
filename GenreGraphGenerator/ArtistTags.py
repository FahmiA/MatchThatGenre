
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
