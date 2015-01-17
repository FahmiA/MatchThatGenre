import unittest
import uuid

from Artist import Artist
from ArtistTags import ArtistTags
from TagArtistWeights import TagArtistWeights
from TagRelationshipCalc import TagRelationshipCalc
from TagLink import TagLink

class TestTagSimilarityCalc(unittest.TestCase):

    def setUp(self):
        self._artistToTags = ArtistTags()
        self._tagArtistWeights = TagArtistWeights()
        self._tagRelationshipCalc = TagRelationshipCalc(self._artistToTags, self._tagArtistWeights)

    def testWithNoData(self):
        self._tagRelationshipCalc.process()

        tags = self._tagRelationshipCalc.getTags()
        tagLinks = self._tagRelationshipCalc.getTagLinks()

        self.assertEqual(0, len(tags), 'Should have no tags')
        self.assertEqual(0, len(tagLinks), 'Should have no tag links')

    def testWithSimpleData(self):
        artist1 = Artist(self._makeUUID(), 'artist1')
        artist2 = Artist(self._makeUUID(), 'artist2')

        self._addArtistTag(artist1, 'funk', 1, 1.0)
        self._addArtistTag(artist2, 'funk', 1, 0.5)
        self._addArtistTag(artist2, 'soul', 2, 1.0)

        self._tagRelationshipCalc.setMaxLinkDistance(2) # Accept all
        self._tagRelationshipCalc.process()

        tags = self._tagRelationshipCalc.getTags() 
        tagLinks = self._tagRelationshipCalc.getTagLinks() 

        self.assertEqual(2, len(tags), 'Should have all tags')
        self.assertEqual(1, len(tagLinks), 'Should have all tag links')

        self.assertTrue('funk' in tags, 'Tag "funk" should exist')
        self.assertTrue('soul' in tags, 'Tag "soul" should exist')

        tagLinkMap = self._asTagLinkMap(tagLinks)

        self.assertTrue(('funk', 'soul') in tagLinkMap, 'Link should exist')
        self.assertAlmostEqual(0.553, tagLinkMap[('funk', 'soul')], 3, 'Link distance should be correct')

    def testGetTags(self):
        artist1 = Artist(self._makeUUID(), 'artist1')
        artist2 = Artist(self._makeUUID(), 'artist2')

        self._addArtistTag(artist1, 'funk', 1, 1.0)
        self._addArtistTag(artist2, 'soul', 2, 1.0)

        self._tagRelationshipCalc.setMaxLinkDistance(2) # Accept all
        self._tagRelationshipCalc.process()

        tags = self._tagRelationshipCalc.getTags()
        tagLinks = self._tagRelationshipCalc.getTagLinks()

        self.assertEqual(0, len(tags), 'Should have no tags')
        self.assertEqual(0, len(tagLinks), 'Should have no tag links')

        self.assertFalse('funk' in tags, 'Tag "funk" should not exist')
        self.assertFalse('soul' in tags, 'Tag "soul" should not exist')

        tagLinkMap = self._asTagLinkMap(tagLinks)

    def _addArtistTag(self, artist, tag, tagCount, artistWeight):
        self._artistToTags.add(artist, tag, tagCount)
        self._tagArtistWeights.add(tag, artist, artistWeight)

    def _asTagLinkMap(self, tagLinks):
        tagLinkMap = {}

        for tagLink in tagLinks:
            tagLinkMap[(tagLink.getFrom(), tagLink.getTo())] = tagLink.getDistance()
            tagLinkMap[(tagLink.getTo(), tagLink.getFrom())] = tagLink.getDistance()

        return tagLinkMap

    def _makeUUID(self):
        return str(uuid.uuid4())

if __name__ == '__main__':
    unittest.main()
