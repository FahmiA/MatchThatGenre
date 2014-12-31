import unittest
import uuid

from TagSimilarityCalc import TagSimilarityCalc

class TestTagSimilarityCalc(unittest.TestCase):

    def setUp(self):
        self._tagSimilarityCalc = TagSimilarityCalc()

    def testWithNoData(self):
        tagArtistWeights = self._tagSimilarityCalc.getTagToArtistsWeights()
        self.assertTrue(tagArtistWeights.isEmpty(), 'Should be no tags')

    def testWithSingleArtist(self):
        uuid = self._makeUUID()
        artist1 = self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'Favoritos', 2)
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'funk', 1)
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'soul', 1)

        tagArtistWeights = self._tagSimilarityCalc.getTagToArtistsWeights()

        self.assertEqual(3, tagArtistWeights.getTagCount(), 'Should have all tags')

        self._testArtistWeight(tagArtistWeights, 'Favoritos', artist1, 0.0)
        self._testArtistWeight(tagArtistWeights, 'funk', artist1, 0.0)
        self._testArtistWeight(tagArtistWeights, 'soul', artist1, 0.0)

    def testWithMultipleArtists(self):
        uuid = self._makeUUID()
        artist1 = self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'Favoritos', 2)
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'funk', 1)
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'soul', 1)

        uuid = self._makeUUID()
        artist2 = self._tagSimilarityCalc.add(uuid, 'The Boomtown Rats', 'funk', 2)
        self._tagSimilarityCalc.add(uuid, 'The Boomtown Rats', 'soul', 1)
        self._tagSimilarityCalc.add(uuid, 'The Boomtown Rats', 'folk', 4)

        tagArtistWeights = self._tagSimilarityCalc.getTagToArtistsWeights()

        self.assertEqual(4, tagArtistWeights.getTagCount(), 'Should have all tags')

        self._testArtistWeight(tagArtistWeights, 'Favoritos', artist1, 0.288)
        self._testArtistWeight(tagArtistWeights, 'funk', artist1, 0.096)
        self._testArtistWeight(tagArtistWeights, 'soul', artist1, 0.144)

        self._testArtistWeight(tagArtistWeights, 'funk', artist2, 0.192)
        self._testArtistWeight(tagArtistWeights, 'soul', artist2, 0.144)

    def _testArtistWeight(self, tagArtistWeights, tag, artist, weight):
        self.assertTrue(tagArtistWeights.hasTag(tag))
        self.assertTrue(tagArtistWeights.hasArtist(tag, artist))
        self.assertAlmostEqual(weight, tagArtistWeights.getWeight(tag, artist), 3)

    def _makeUUID(self):
        return str(uuid.uuid4())


if __name__ == '__main__':
    unittest.main()

