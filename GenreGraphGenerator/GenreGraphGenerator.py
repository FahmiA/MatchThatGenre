import argparse
import math

class Artist:
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

class TagSimilarityCalc:

    def __init__(self):
        # Map from artistId to artist object
        self._artists = {}

        # Map from tag name to a map of artist object to tag count
        self._tagToArtists = {}

        # Map from artist object to set of tags
        self._artistToTags = {}

    def add(self, artistId, artistName, tag, tagCount):
        # Get the artist
        artist = None
        if artistId in self._artists:
            artist = self._artists[artistId]
        else:
            artist = Artist(artistId, artistName)
            self._artists[artistId] = artist
    
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

    def getTagToArtistsWeights(self):
        # Dictionary from tag to (Artist, weight)
        tagToArtistWeights = dict()

        for tag, artists in self._tagToArtists.items():

            totalTagCount = sum(artists.values())

            for artist, tagCount in artists.items():
                # Number of times the artist appears for the tag / number of artist songs for tag
                tf = tagCount / totalTagCount
                # loge(number of tags / number of tags with artist)
                idf = math.log(len(self._tagToArtists) / len(self._artistToTags[artist]))
                print('For Artist %s with tag %s' %(artist.getName(), tag))
                print(' tf = %d / %d = %.3f' %(tagCount, totalTagCount, tf))
                print(' idf = log(%d / %d) = %.3f' %(len(self._tagToArtists), len(self._artistToTags[artist]), idf))
                print(' tf*idf = %.3f' %(tf * idf))

                tfidf = tf * idf

                if tag in tagToArtistWeights:
                    tagToArtistWeights[tag].append((artist, tfidf))
                else:
                    tagToArtistWeights[tag] = [(artist, tfidf)]

        return tagToArtistWeights

    def getStatsString(self):
        return 'TagSimilarityCalc (#artists: %d,  #tags: %d)' % (len(self._artists), len(self._tagToArtists))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Produce genre-similarity graph by analysing artists tags and identifying related tags.')
    parser.add_argument('--version', action='version', version='%(prog)s 0.1')
    parser.add_argument('path', help='Relative path to artist-tags file with the following format: musicbrainz-artist-id<sep>artist-name<sep>tag-name<sep>raw-tag-count')

    args = parser.parse_args()

    path = args.path

    """
    Steps:
     Create a map from tag to a list of (artist, count) pairs
     Create a map from artist to a list of tags

     For each tag:
      Calculate tf(t)
       Number of times each artist appears for tag / number of artist songs for tag
      Calculate idf(t)
       loge(number of tags / number of tags with artist)

     Remove tag-artist mappings less than a specific value

     For each tag, find closest matching tags and calculate weight/distance

     Produce output in the following format:
      tag,tag,weight

    """

    tagSimilarityCalc = TagSimilarityCalc()
    with open(path, mode='r') as csvFile:

        for line in csvFile:
            row = line.split('<sep>')
            artistId = row[0]
            artist = row[1]
            tag = row[2]
            tagCount = int(row[3])
            #print(artistId, artist, tag, tagCount)

            tagSimilarityCalc.add(artistId, artist, tag, tagCount)

    print(tagSimilarityCalc.getStatsString())
    tagToArtistWeights = tagSimilarityCalc.getTagToArtistsWeights()
    print(tagToArtistWeights)

    #tagMapGenerator = TagMapGenerator()
    #tagMapGenerator.process(tagToArtistWeights)

    #print(tagMapGenerator.asCSV())

