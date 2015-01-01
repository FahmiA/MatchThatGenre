import math

from Artist import Artist
from ArtistTags import ArtistTags
from TagArtistWeights import TagArtistWeights

class ArtistWeightCalc:
    """
    Calculates the weights of artists to tags they have been assigned to.

    For instance, artists tagged only as "funk" are weighted higher than
    artists tagged partially as "funk".
    """

    def __init__(self):
        # Map from artistId to artist object
        # Ensures uniqueness of Artist objects to save memory
        self._artists = {}

        # Stores the relationship between artists and tags
        self._artistTags = ArtistTags()

    def add(self, artistId, artistName, tag, tagCount):
        # Get the artist
        artist = None
        if artistId in self._artists:
            artist = self._artists[artistId]
        else:
            artist = Artist(artistId, artistName)
            self._artists[artistId] = artist
    
        self._artistTags.add(artist, tag, tagCount)

        return artist

    def getTagToArtistsWeights(self):
        # Dictionary from tag to (Artist, weight)
        tagArtistWeights = TagArtistWeights()

        totalTagCount = self._artistTags.getTagCount() 

        for tag in self._artistTags.getTags():
            currentTagCount = self._artistTags.getTotalTagCount(tag)

            for artist in self._artistTags.getArtistsWithTag(tag):
                artistTagCount = self._artistTags.getTagCountOfArtist(tag, artist)
                # Number of times the artist appears for the tag / number of artist songs for tag
                tf = artistTagCount / currentTagCount
                # loge(number of tags / number of tags with artist)
                idf = math.log(totalTagCount / self._artistTags.getArtistTagCount(artist))

                #print('For Artist %s with tag %s' %(artist.getName(), tag))
                #print(' tf = %d / %d = %.3f' %(artistTagCount, currentTagCount, tf))
                #print(' idf = log(%d / %d) = %.3f' %(totalTagCount, self._artistTags.getArtistTagCount(artist), idf))
                #print(' tf*idf = %.3f' %(tf * idf))

                tfidf = tf * idf

                tagArtistWeights.add(tag, artist, tfidf)

        return tagArtistWeights

    def getStatsString(self):
        return 'Stats. #artists: %d,  #tags: %d' % (len(self._artists), self._artistTags.getTagCount())