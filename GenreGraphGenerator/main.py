import argparse

from ArtistWeightCalc import ArtistWeightCalc
from TagRelationshipCalc import TagRelationshipCalc
from TagGraphFormatter import TagGraphFormatter

"""
GenreGraphGenerator

By: Fahmi Abdulhamid
Date: December 2014 / January 2015
Purpose:
    To read in data about tags assigned to artists and produce a textual
    representation of a graph representing tag similarity. The nodes are
    tags and the edges are calculated distanced between the tags.
Algorithm:
    Part 1: Calculate tag weights
     1. Create a map from tag to a list of (artist, count) pairs
     2. Create a map from artist to a list of tags
     3. For each artist calculate it's tfidf weight based on
        assigned tags:
         1. Calculate tf(t): Number of times each artist appears for tag /
            number of artist songs for tag.
         2. Calculate idf(t):
            loge(number of tags / number of tags with artist)
    Part 2: Calculate tag distances
     1. Calculate the cosine distance between all tags based on the weight
        of artists with those tags. 
    Part 3: Format graph
     1. Prune far distances.
     2. Turn the remaining distances into a graph with nodes as tags and edges as distances.
     3. Output the formatted graph as text.
"""

if __name__ == '__main__':
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description='Produce genre-similarity graph by analysing artists tags and identifying related tags.')
    parser.add_argument('--version', action='version', version='%(prog)s 0.1')
    parser.add_argument('path', help='Relative path to artist-tags file with the following format: musicbrainz-artist-id<sep>artist-name<sep>tag-name<sep>raw-tag-count')

    args = parser.parse_args()

    path = args.path

    artistWeightCalc = ArtistWeightCalc()
    with open(path, mode='r') as csvFile:

        for line in csvFile:
            row = line.split('<sep>')
            artistId = row[0]
            artist = row[1]
            tag = row[2]
            tagCount = int(row[3])

            artistWeightCalc.add(artistId, artist, tag, tagCount)

    print(artistWeightCalc.getStatsString())

    tagToArtistWeights = artistWeightCalc.getTagToArtistsWeights()

    tagRelationshipCalc = TagRelationshipCalc(tagToArtistWeights)
    tagRelationshipCalc.process()
    
    tagGraphFormatter = TagGraphFormatter(artistWeightCalc.getArtistTags(), tagRelationshipCalc.getTags(), tagRelationshipCalc.getTagLinks())
    output = tagGraphFormatter.formatFlatJSON()

    print(output)

