import math

class TagLink:
    """
    A link between two tags. Has a distance.
    """

    def __init__(self, fromTag, toTag, fromTagIndex, toTagIndex, distance):
        self._fromTag = fromTag
        self._fromTagIndex = fromTagIndex
        self._toTag = toTag
        self._toTagIndex = toTagIndex
        self._distance = distance

    def getFrom(self):
        return self._fromTag

    def getFromIndex(self):
        return self._fromTagIndex

    def getTo(self):
        return self._toTag

    def getToIndex(self):
        return self._toTagIndex

    def getDistance(self):
        return self._distance

class TagRelationshipCalc:
    """
    Calculates the distance (strength of relationship) between all provided
    tags.
    """

    def __init__(self, artistTags, tagArtistWeights):
        self._artistTags = artistTags
        self._tagArtistWeights = tagArtistWeights

        self._tags = []
        self._tagLinks = []

    def process(self):
        tags = self._tagArtistWeights.getTags()
        self._tags = tags

        exhaustedTags = set()

        i = 0
        for fromTag in tags:
            fromArtistWeights = self._tagArtistWeights.getArtistsWeights(fromTag)

            artists = self._artistTags.getArtistsWithTag(fromTag)
            relatedTags = set()
            for artist in artists:
                relatedTags.update(self._artistTags.getTagsWithArtist(artist))
            relatedTags.difference_update(exhaustedTags)

            for toTag in relatedTags:
                toArtistWeights = self._tagArtistWeights.getArtistsWeights(toTag)

                distance = self._calculateDistance(fromArtistWeights, toArtistWeights)

                i += 1

                if(self._acceptDistance(distance)):
                    #print(fromTag, fromArtistWeights, toTag, toArtistWeights, distance)
                    self._tagLinks.append(TagLink(fromTag, toTag, 0, 0, distance))

            exhaustedTags.add(fromTag)

        print('\tIterations:', i)

    def _calculateDistance(self, fromArtistWeights, toArtistWeights):
        fromWeights = []
        toWeights = []

        allArtists = set(fromArtistWeights.keys())
        toArtists = set(toArtistWeights.keys())
        allArtists.update(toArtists)

        for artist in allArtists:
            fromWeights.append(fromArtistWeights.get(artist, 0))
            toWeights.append(toArtistWeights.get(artist, 0))

        if len(fromWeights) > 0:
            return self._cosineDistance(fromWeights, toWeights)
        else:
            return -1 # The furthest cosine distance

    def _cosineDistance(self, a, b):
        # Souce: http://stackoverflow.com/questions/1823293/optimized-method-for-calculating-cosine-distance-in-python
        assert len(a) == len(b)
        ab_sum, a_sum, b_sum = 0.0, 0.0, 0.0
        for ai, bi in zip(a, b):
            ab_sum += ai * bi
            a_sum += ai * ai
            b_sum += bi * bi
        return 1.0 - ab_sum / math.sqrt(a_sum * b_sum)

    def _acceptDistance(self, distance):
        return distance < 0.3 and distance > -0.3

    def getTags(self):
        return self._tags

    def getTagLinks(self):
        return self._tagLinks
