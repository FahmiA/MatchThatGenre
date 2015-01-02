class TagLink:
    """
    A link between two tags. Has a distance.
    """

    def __init__(self, fromTag, toTag, fromTagIndex, toTagIndex, distance):
        self._fromTag = fromTag
        self._fromTagIndex = fromTagIndex
        self._toTag = toTag
        self._toTagIndex = toTagIndex
        self._distance = distance

    def getFrom(self):
        return self._fromTag

    def getFromIndex(self):
        return self._fromTagIndex

    def getTo(self):
        return self._toTag

    def getToIndex(self):
        return self._toTagIndex

    def getDistance(self):
        return self._distance

    def __repr__(self):
        return '"%s" (%d) -> "%s" (%d) -> %0.3f' % (self._fromTag, self._fromTagIndex, self._toTag, self._toTagIndex, self._distance)

    def __eq__(self, obj):
        return isinstance(obj, TagLink) and \
               obj.getFrom() == self._fromTag and obj.getFromIndex() == self._fromTagIndex and \
               obj.getTo() == self._toTag and obj.getToIndex() == self._toTagIndex and \
               obj.getDistance == self._distance

    def __ne__(self, obj):
        return not self == obj

