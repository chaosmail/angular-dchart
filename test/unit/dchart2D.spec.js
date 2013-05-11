describe('_dchart2D', function(){

  var chart = new _dchart2D();

  describe('#constructor()', function(){
    it('should be instance of _dchart', function(){
        expect(chart).to.be.an.instanceof(_dchart);
    });
  });

  describe('#parseDataSet()', function(){
    it('should respond to method', function(){
      expect(chart).to.respondTo('parseDataSet');
    });
  });

  describe('#parseData()', function(){
    it('should respond to method', function(){
      expect(chart).to.respondTo('parseData');
    });
  });

  describe('#parseAxis()', function(){
    it('should respond to method', function(){
      expect(chart).to.respondTo('parseAxis');
    });
  });

  describe('#parseAxisAttributes()', function(){
    it('should respond to method', function(){
      expect(chart).to.respondTo('parseAxisAttributes');
    });
  });

  describe('#initializeAxis()', function(){
    it('should respond to method', function(){
      expect(chart).to.respondTo('initializeAxis');
    });
  });

  describe('#initializeData()', function(){
    it('should respond to method', function(){
      expect(chart).to.respondTo('initializeData');
    });
  });

  describe('#drawAxis()', function(){
    it('should respond to method', function(){
      expect(chart).to.respondTo('drawAxis');
    });
  });
});