import argparse

from TagSimilarityCalc import TagSimilarityCalc
from GenreRelationshipMaker import GenreRelationshipMaker
from GenreGraphFormatter import GenreGraphFormatter

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

    genreRelationshipMaker = GenreRelationshipMaker(tagToArtistWeights)
    genreRelationshipMaker.process()
    
    genreGraphFormatter = GenreGraphFormatter(genreRelationshipMaker.getTags(), genreRelationshipMaker.getTagLinks())
    output = genreGraphFormatter.formatFlatJSON()

    print(output)

