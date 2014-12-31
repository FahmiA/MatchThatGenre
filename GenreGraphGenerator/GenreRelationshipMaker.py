import math

class TagLink:

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

class GenreRelationshipMaker:

    def __init__(self, tagArtistWeights):
        self._tagArtistWeights = tagArtistWeights

        self._tags = []
        self._tagLinks = []

    def process(self):
        tags = self._tagArtistWeights.getTags()
        self._tags = tags

        for i in range(0, len(tags)):
            fromTag = tags[i]
            fromArtistWeights = self._tagArtistWeights.getArtistsWeights(fromTag)

            for j in range(i + 1, len(tags)):
                toTag = tags[j]
                toArtistWeights = self._tagArtistWeights.getArtistsWeights(toTag)

                distance = self._calculateDistance(fromArtistWeights, toArtistWeights)

                if(self._acceptDistance(distance)):
                    #print(fromTag, fromArtistWeights, toTag, toArtistWeights, distance)
                    self._tagLinks.append(TagLink(fromTag, toTag, i, j, distance))

    def _calculateDistance(self, fromArtistWeights, toArtistWeights):
        fromWeights = []
        toWeights = []

        for fromArtist, fromArtistWeight in fromArtistWeights.items():
            if fromArtist in toArtistWeights:
                fromWeights.append(fromArtistWeight)
                toWeights.append(toArtistWeights[fromArtist])

        if len(fromWeights) > 0:
            return self._cosineDistance(fromWeights, toWeights)
        else:
            return -1

    def _cosineDistance(self, a, b):
        # Souce: http://stackoverflow.com/questions/1823293/optimized-method-for-calculating-cosine-distance-in-python
        assert len(a) == len(b)
        ab_sum, a_sum, b_sum = 0, 0, 0
        for ai, bi in zip(a, b):
            ab_sum += ai * bi
            a_sum += ai * ai
            b_sum += bi * bi
        return 1 - ab_sum / math.sqrt(a_sum * b_sum)

    def _acceptDistance(self, distance):
        return distance < 0.3 and distance > -0.3

    def getTags(self):
        return self._tags

    def getTagLinks(self):
        return self._tagLinks
