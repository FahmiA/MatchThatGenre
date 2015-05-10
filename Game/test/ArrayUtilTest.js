var ArrayUtil = requirejs('util/ArrayUtil');

describe('ArrayUtil', function() {
	
	describe('shuffle', function() {
		it('should randomly shuffle an array', function() {
			var array = ['a', 'b', 'c', 'd', 'e'];
			
			// Repeat 10 times on the off-chance that the array is shuffled into the same order
			var shuffleSuccess = false;
			for(var i = 0; i < 10; i++) {
				var result = ArrayUtil.shuffle(array.slice());
				
				expect(result.length).to.equal(array.length);
				
				var areDifferent = false;
				for(var j = 0; j < result.length; j++) {
					if(array[j] !== result[j]) {
						areDifferent = true;
						break;
					}
				}
				
				shuffleSuccess = shuffleSuccess || areDifferent;
			}
			
			expect(shuffleSuccess).to.equal(true);
		});
		
		it('should handle case of array size 0', function() {
			var array = [];
			var result = ArrayUtil.shuffle(array);
			expect(result).to.deep.equal(array);
		});
		
		it('should handle case of array size 1', function() {
			var array = ['a'];
			var result = ArrayUtil.shuffle(array);
			expect(result).to.deep.equal(array);
		});
	});
	
	describe('unique', function() {
		it('should retrieve unique values', function() {
			var array = ['a', 'b', 'c', 'c', 'b', 'a'];
			var result = ArrayUtil.unique(array);
			expect(result).to.deep.equal(['a', 'b', 'c']);
		});
		
		it('should handle case of array size 0', function() {
			var array = [];
			var result = ArrayUtil.unique(array);
			expect(result).to.deep.equal([]);
		});
	});
	
	describe('flatten', function() {
		it('should flatten a 2D array', function() {
			var array = [['a', 'b', 'c'], [1, 2, 3]];
			var result = ArrayUtil.flatten(array);
			expect(result).to.deep.equal(['a', 'b', 'c', 1, 2, 3]);
		});
		
		it('should flatten a mixed-dimentional array', function() {
			var array = ['a', [1, 2, 3], [['!'], ['@']]];
			var result = ArrayUtil.flatten(array);
			expect(result).to.deep.equal(['a', 1, 2, 3, ['!'], ['@']]);
		})
		
		it('should do nothing for a 1D array', function() {
			var array = ['a', 'b', 'c'];
			var result = ArrayUtil.flatten(array);
			expect(result).to.deep.equal(['a', 'b', 'c']);
		});
		
		it('should hanlde an empty array', function() {
			var array = [];
			var result = ArrayUtil.flatten(array);
			expect(result).to.deep.equal([]);
		});
	});
});