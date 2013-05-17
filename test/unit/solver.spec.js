describe('_solver', function(){

  var solver = new _solver();

  describe('#solve()', function(){
    it('should respond to method', function(){
      expect(solver).to.respondTo('solve');
    });
  });
});