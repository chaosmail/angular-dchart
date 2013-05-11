describe('_dchartHisto', function(){

  var chart = new _dchartHisto();

  describe('#constructor()', function(){
    it('should be instance of _dchart2D', function(){
        expect(chart).to.be.an.instanceof(_dchart2D);
    });
  });

  describe('#drawData()', function(){
    it('should respond to method', function(){
      expect(chart).to.respondTo('drawData');
    });
  });
});