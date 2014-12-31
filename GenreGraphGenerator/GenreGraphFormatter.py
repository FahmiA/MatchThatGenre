import json

class GenreGraphFormatter:

    def __init__(self, tags, tagLinks):
        self._tags = tags
        self._tagLinks = tagLinks

    def formatFlatJSON(self):
        nodes = []
        links = []
        root = {'nodes': nodes, 'links': links}

        for tag in self._tags:
            nodes.append({'name': tag})

        for link in self._tagLinks:
            links.append({'source': link.getFromIndex(), 'target': link.getToIndex(), 'value': link.getDistance()})

        return json.dumps(root, sort_keys = True, ensure_ascii = False, indent = 2)

