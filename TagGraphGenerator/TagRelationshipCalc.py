import math

from TagLink import TagLink

class TagRelationshipCalc:
    """
    Calculates the distance (strength of relationship) between all provided
    tags.
    """

    DEFAULT_MAX_LINK_DIST = 0.3
    DEFAULT_MIN_LINK_DIST = 0;

    def __init__(self, artistTags, tagArtistWeights):
        self._artistTags = artistTags
        self._tagArtistWeights = tagArtistWeights

        self._usedTagsMap = {}
        self._usedTagsList = []
        self._tagLinks = []

        # Further links will be excluded
        self._maxLinkDist = TagRelationshipCalc.DEFAULT_MAX_LINK_DIST

        # Closer links will be excluded
        self._minLinkDist = TagRelationshipCalc.DEFAULT_MIN_LINK_DIST

    def setMaxLinkDistance(self, maxLinkDistance):
        self._maxLinkDistance = maxLinkDistance

    def setMinLinkDistance(self, minLinkDistance):
        self._minLinkDistance = minLinkDistance

    def process(self):
        self._usedTagsMap.clear()
        self._usedTagsList.clear()

        allTags = self._tagArtistWeights.getTags()

        #tagIndexes = self._artistTags.generateTagIndexMap() # O(n)
        exhaustedTags = set()

        i = 0
        for fromTag in allTags:
            fromArtistWeights = self._tagArtistWeights.getArtistsWeights(fromTag)

            exhaustedTags.add(fromTag)

            # Identify all related tags that haven't yet been fully processed
            artists = self._artistTags.getArtistsWithTag(fromTag)
            relatedTags = set()
            for artist in artists:
                relatedTags.update(self._artistTags.getTagsWithArtist(artist))
            relatedTags.difference_update(exhaustedTags)

            for toTag in relatedTags:
                toArtistWeights = self._tagArtistWeights.getArtistsWeights(toTag)

                distance = self._calculateDistance(fromArtistWeights, toArtistWeights)

                i += 1

                #print('%s -> %s -> %0.2f' % (fromTag, toTag, distance))
                if(self._acceptDistance(distance)):
                    self._markTagAsUsed(fromTag)
                    self._markTagAsUsed(toTag)

                    fromTagIndex = self._getUsedTagIndex(fromTag)
                    toTagIndex = self._getUsedTagIndex(toTag)

                    #print(fromTag, fromArtistWeights, toTag, toArtistWeights, distance)
                    self._tagLinks.append(TagLink(fromTag, toTag, fromTagIndex, toTagIndex, distance))
                    

        print('\tIterations:', i)

    def _markTagAsUsed(self, tag):
        if tag not in self._usedTagsMap:
            self._usedTagsMap[tag] = len(self._usedTagsList)
            self._usedTagsList.append(tag)

    def _getUsedTagIndex(self, tag):
        return self._usedTagsMap[tag]

    def _calculateDistance(self, fromArtistWeights, toArtistWeights):
        fromWeights = []
        toWeights = []

        allArtists = set()
        for artist in fromArtistWeights.keys():
            allArtists.add(artist)

        for artist in toArtistWeights.keys():
            allArtists.add(artist)

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
        return distance > abs(self._minLinkDistance) and distance < abs(self._maxLinkDistance)

    def getTags(self):
        return self._usedTagsList

    def getTagLinks(self):
        return self._tagLinks
