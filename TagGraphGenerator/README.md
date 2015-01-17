# Tag Graph Generator

A small Python program that reads in an '''ArtistTags.dat''' - formatted data file (which associates tags to artists) and outputs a '''D3.flowchart'''-compatible json graph file which links similar tags together.

It works by calculating the tf.idf (term frequency multiplied by inverse document frequency) of artists to tags. This builds a vector of artists and artist weights for each tag. Then for each pair of tags, the cosine distance is calculated to find the similarity of any two tags.

Tags which are not often used can be pruned away. Links with a large distance can also be pruned away.

# How to run
With default options:
'''python3 main.py path outputPath'''

To get help about options:
'''python3 main.py'''

# How to run tests
There are some tests which test key functionality of the program.

To run all tests:
'''python3 -m unittest *Test.py'''


To run select tests:
```python3 ArtistWeightCalcTest.py```
```python3 TagRelationshipCalcTest.py```

