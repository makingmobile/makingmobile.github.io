(function() {
  var CLOUND_EL_ID, options;

  CLOUND_EL_ID = '__cloundcanvas__';

  options = {
    weight: true,
    weightFrom: 'data-weight',
    weightMode: 'both',
    weightSizeMin: 10,
    weightSizeMax: 30,
    stretchX: 2,
    shadowBlur: 2,
    shadowOffset: [1, 1],
    zoomMin: 0.5
  };

  if (!$('#' + CLOUND_EL_ID).tagcanvas(options)) {
    $('.canvascontainer').hide();
    $('.fallbackcontainer').show();
  }

}).call(this);
