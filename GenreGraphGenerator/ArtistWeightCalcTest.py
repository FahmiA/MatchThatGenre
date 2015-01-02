import unittest
import uuid

from ArtistWeightCalc import ArtistWeightCalc

class TestTagSimilarityCalc(unittest.TestCase):

    def setUp(self):
        self._artistWeightCalc = ArtistWeightCalc()

    def testWithNoData(self):
        tagArtistWeights = self._artistWeightCalc.getTagToArtistsWeights()
        self.assertTrue(tagArtistWeights.isEmpty(), 'Should be no tags')

    def testWithSingleArtist(self):
        uuid = self._makeUUID()
        artist1 = self._artistWeightCalc.add(uuid, 'Funk Brothers', 'Favoritos', 2)
        self._artistWeightCalc.add(uuid, 'Funk Brothers', 'funk', 1)
        self._artistWeightCalc.add(uuid, 'Funk Brothers', 'soul', 1)

        tagArtistWeights = self._artistWeightCalc.getTagToArtistsWeights()

        self.assertEqual(3, tagArtistWeights.getTagCount(), 'Should have all tags')

        self._testArtistWeight(tagArtistWeights, 'Favoritos', artist1, 0.0)
        self._testArtistWeight(tagArtistWeights, 'funk', artist1, 0.0)
        self._testArtistWeight(tagArtistWeights, 'soul', artist1, 0.0)

    def testWithMultipleArtists(self):
        uuid = self._makeUUID()
        artist1 = self._artistWeightCalc.add(uuid, 'Funk Brothers', 'Favoritos', 2)
        self._artistWeightCalc.add(uuid, 'Funk Brothers', 'funk', 1)
        self._artistWeightCalc.add(uuid, 'Funk Brothers', 'soul', 1)

        uuid = self._makeUUID()
        artist2 = self._artistWeightCalc.add(uuid, 'The Boomtown Rats', 'funk', 2)
        self._artistWeightCalc.add(uuid, 'The Boomtown Rats', 'soul', 1)
        self._artistWeightCalc.add(uuid, 'The Boomtown Rats', 'folk', 4)

        tagArtistWeights = self._artistWeightCalc.getTagToArtistsWeights()

        self.assertEqual(4, tagArtistWeights.getTagCount(), 'Should have all tags')

        self._testArtistWeight(tagArtistWeights, 'Favoritos', artist1, 0.288)
        self._testArtistWeight(tagArtistWeights, 'funk', artist1, 0.096)
        self._testArtistWeight(tagArtistWeights, 'soul', artist1, 0.144)

        self._testArtistWeight(tagArtistWeights, 'funk', artist2, 0.192)
        self._testArtistWeight(tagArtistWeights, 'soul', artist2, 0.144)

    def testPruneRemovesTags(self):
        self._artistWeightCalc.setMinTagCount(2)

        uuid = self._makeUUID()
        artist1 = self._artistWeightCalc.add(uuid, 'Funk Brothers', 'funk', 1)
        self._artistWeightCalc.add(uuid, 'Funk Brothers', 'soul', 1)
        uuid = self._makeUUID()
        artist2 = self._artistWeightCalc.add(uuid, 'The Boomtown Rats', 'funk', 2)

        self._artistWeightCalc.pruneTags()

        tagArtistWeights = self._artistWeightCalc.getTagToArtistsWeights()

        self.assertEqual(1, tagArtistWeights.getTagCount(), 'Should have all tags used at least once')
        self.assertTrue(tagArtistWeights.hasTag('funk'), 'Should keep tag "funk"')
        self.assertFalse(tagArtistWeights.hasTag('soul'), 'Should remove tag "soul"')

    def testPruneRemovesArtists(self):
        self._artistWeightCalc.setMinTagCount(2)
        uuid = self._makeUUID()
        artist1 = self._artistWeightCalc.add(uuid, 'Funk Brothers', 'funk', 1)

        self._artistWeightCalc.pruneTags()

        tagArtistWeights = self._artistWeightCalc.getTagToArtistsWeights()
        self.assertEqual(0, tagArtistWeights.getTagCount(), 'Should have all tags used at least once')

        self.assertEqual(0, len(self._artistWeightCalc.getArtists()), 'No artists should exist')

        artistTags = self._artistWeightCalc.getArtistTags()
        self.assertFalse(artistTags.hasArtist(artist1), 'No artists should exist')


    def _testArtistWeight(self, tagArtistWeights, tag, artist, weight):
        self.assertTrue(tagArtistWeights.hasTag(tag))
        self.assertTrue(tagArtistWeights.hasArtist(tag, artist))
        self.assertAlmostEqual(weight, tagArtistWeights.getWeight(tag, artist), 3)

    def _makeUUID(self):
        return str(uuid.uuid4())


if __name__ == '__main__':
    unittest.main()

