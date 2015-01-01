
class Artist:
    """ Represents a song Artist with a name and id. """

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

