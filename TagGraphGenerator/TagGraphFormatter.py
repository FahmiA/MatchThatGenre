import json

class TagGraphFormatter:
    """
    Formats a tag graph into a textual representation.
    The textual representation is fit to be consumed by other software.
    """

    def __init__(self, artistTags, tags, tagLinks):
        self._artistTags = artistTags
        self._tags = tags
        self._tagLinks = tagLinks

    def formatFlatJSON(self):
        nodes = []
        links = []
        root = {'nodes': nodes, 'links': links}

        for tag in self._tags:
            nodes.append({'name': tag, 'artistCount': len(self._artistTags.getArtistsWithTag(tag))})

        for link in self._tagLinks:
            links.append({'source': link.getFromIndex(), 'target': link.getToIndex(), 'value': link.getDistance()})

        return json.dumps(root, sort_keys = True, ensure_ascii = False, indent = 2)

