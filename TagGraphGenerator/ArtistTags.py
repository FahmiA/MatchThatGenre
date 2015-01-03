
class ArtistTags:
    """ Stores the tags related to artists. """

    def __init__(self):
        # Map from tag name to a map of artist object to tag count
        self._tagToArtists = {}

        # Map from artist object to set of tags
        self._artistToTags = {}

    def add(self, artist, tag, tagCount):
        """ Associates a new artist with a tag """
        # Update the tag-artists recor. O(1) on averaged
        if tag in self._tagToArtists:
            artistDict = self._tagToArtists[tag]
            artistDict[artist] = tagCount
        else:
            self._tagToArtists[tag] = {artist: tagCount}

        # Update the artist-tag. O(1) on averages
        if artist in self._artistToTags:
            self._artistToTags[artist].add(tag)
        else:
            self._artistToTags[artist] = {tag}

    def remove(self, tag):
        artistsWithTag = self.getArtistsWithTag(tag)
        artistsWithNoTags = []

        for artist in artistsWithTag:
            tags = self._artistToTags[artist]
            tags.remove(tag)

            if len(tags) == 0:
                del self._artistToTags[artist]
                artistsWithNoTags.append(artist)

        del self._tagToArtists[tag]

        return artistsWithNoTags

    def getTags(self):
        return self._tagToArtists.keys()

    def getTagCount(self):
        return len(self._tagToArtists)

    def getArtistsWithTag(self, tag):
        return self._tagToArtists[tag].keys()

    def getTagsWithArtist(self, artist):
        return self._artistToTags[artist]

    def getArtistTagCount(self, artist):
        return len(self._artistToTags[artist])

    def hasArtist(self, artist):
        return artist in self._artistToTags

    def getTagCountOfArtist(self, tag, artist):
        return self._tagToArtists[tag][artist]

    def getTotalTagCount(self, tag):
        return sum(self._tagToArtists[tag].values())

    def generateTagIndexMap(self):
        """ Generates an index for each tag """
        indexMap = {}

        i = 0
        for tag in self._tagToArtists.keys():
            indexMap[tag] = i
            i += 1

        return indexMap

