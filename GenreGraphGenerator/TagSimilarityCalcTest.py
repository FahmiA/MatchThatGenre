import unittest
import uuid

import GenreGraphGenerator

class TestTagSimilarityCalc(unittest.TestCase):

    def setUp(self):
        self._tagSimilarityCalc = GenreGraphGenerator.TagSimilarityCalc()

    def testWithNoData(self):
        tagToArtistWeights = self._tagSimilarityCalc.getTagToArtistsWeights()
        self.assertEqual(0, len(tagToArtistWeights), 'Should be no tags')

    def testWithSingleArtist(self):
        uuid = self.makeUUID()
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'Favoritos', 2)
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'funk', 1)
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'soul', 1)

        tagToArtistWeights = self._tagSimilarityCalc.getTagToArtistsWeights()

        self.assertEqual(3, len(tagToArtistWeights), 'Should have all tags')

        self.assertTrue('Favoritos' in tagToArtistWeights)
        self.assertEqual('Funk Brothers', tagToArtistWeights['Favoritos'][0][0].getName())
        self.assertAlmostEqual(1.386, tagToArtistWeights['Favoritos'][0][1], 3)

        self.assertTrue('funk' in tagToArtistWeights)
        self.assertEqual('Funk Brothers', tagToArtistWeights['funk'][0][0].getName())
        self.assertAlmostEqual(1.386, tagToArtistWeights['funk'][0][1], 3)

        self.assertTrue('soul' in tagToArtistWeights)
        self.assertEqual('Funk Brothers', tagToArtistWeights['soul'][0][0].getName())
        self.assertAlmostEqual(1.386, tagToArtistWeights['soul'][0][1], 3)

    def testWithMultipleArtists(self):
        uuid = self.makeUUID()
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'Favoritos', 2)
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'funk', 1)
        self._tagSimilarityCalc.add(uuid, 'Funk Brothers', 'soul', 1)

        uuid = self.makeUUID()
        self._tagSimilarityCalc.add(uuid, 'The Boomtown Rats', 'funk', 2)
        self._tagSimilarityCalc.add(uuid, 'The Boomtown Rats', 'soul', 1)
        self._tagSimilarityCalc.add(uuid, 'The Boomtown Rats', 'folk', 4)

        tagToArtistWeights = self._tagSimilarityCalc.getTagToArtistsWeights()

        self.assertEqual(4, len(tagToArtistWeights), 'Should have all tags')

        self.assertTrue('Favoritos' in tagToArtistWeights)
        self.assertEqual('Funk Brothers', tagToArtistWeights['Favoritos'][0][0].getName())
        self.assertAlmostEqual(0.288, tagToArtistWeights['Favoritos'][0][1], 3)

        self.assertTrue('funk' in tagToArtistWeights)
        self.assertEqual('Funk Brothers', tagToArtistWeights['funk'][0][0].getName())
        self.assertAlmostEqual(0.096, tagToArtistWeights['funk'][0][1], 3)
        self.assertEqual('The Boomtown Rats', tagToArtistWeights['funk'][1][0].getName())
        self.assertAlmostEqual(0.288, tagToArtistWeights['funk'][1][1], 3)

        self.assertTrue('soul' in tagToArtistWeights)
        self.assertEqual('Funk Brothers', tagToArtistWeights['soul'][0][0].getName())
        self.assertAlmostEqual(1.386, tagToArtistWeights['soul'][0][1], 3)
        self.assertEqual('The Boomtown Rats', tagToArtistWeights['soul'][1][0].getName())
        self.assertAlmostEqual(1.386, tagToArtistWeights['soul'][1][1], 3)

        self.assertTrue('folk' in tagToArtistWeights)
        self.assertEqual('The Boomtown Rats', tagToArtistWeights['folk'][0][0].getName())
        self.assertAlmostEqual(1.386, tagToArtistWeights['folk'][0][1], 3)

    def makeUUID(self):
        return str(uuid.uuid4())


if __name__ == '__main__':
    unittest.main()

