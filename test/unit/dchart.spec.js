describe('_dchart', function(){

  var chart = new _dchart();

  describe('#constructor()', function(){
    it('should have property restrict E', function(){
        expect(chart).to.have.property('restrict').and.equal('E');
    });

    it('should have property transclude true', function(){
        expect(chart).to.have.property('transclude').and.equal(true);
    });

    it('should have property scope', function(){
        expect(chart).to.have.property('scope').that.is.an('object');
    });

    it('should have property scope w', function(){
        expect(chart).to.have.property('scope').that.is.an('object').with.property('w').and.equal('=width');
    });

    it('should have property scope h', function(){
        expect(chart).to.have.property('scope').that.is.an('object').with.property('h').and.equal('=height');
    });
  });

  describe('#getRandomColor()', function(){
    it('should respond to method', function(){
      expect(_dchart).to.respondTo('getRandomColor');
    });
  });

  describe('#getMinMaxValues()', function(){
    it('should respond to method', function(){
      expect(_dchart).to.respondTo('getMinMaxValues');
    });
  });

  describe('#parseTransclude()', function(){
    it('should respond to method', function(){
      expect(_dchart).to.respondTo('parseTransclude');
    });
  });

  describe('#createSvg()', function(){
    it('should respond to method', function(){
      expect(_dchart).to.respondTo('createSvg');
    });
  });

  describe('#ngCompile()', function(){
    it('should respond to method', function(){
      expect(_dchart).to.respondTo('ngCompile');
    });
  });

  describe('#ngLink()', function(){
    it('should respond to method', function(){
      expect(_dchart).to.respondTo('ngLink');
    });
  });

  describe('#ngWatch()', function(){
    it('should respond to method', function(){
      expect(_dchart).to.respondTo('ngWatch');
    });
  });

  describe('#compile()', function(){
    it('should respond to method', function(){
      expect(_dchart).to.respondTo('compile');
    });
  });

});