var classSlider = classSlider || {};

classSlider = function (game) {

  var _this = this;
  game.classSlider = this;
  _this.game = game;
  _this.locked = false;
  _this.index = 0;
  _this.max_index = 2;
  _this.slider_timer = 0;
  _this.tweenObj = {};

  game.load.image('UParrow', '../assets/scene_class/arrow_up.png');
  game.load.image('DWarrow', '../assets/scene_class/arrow_down.png');

  _this.goToNextPage = function() {
    
    _this.locked = true;

    var finalY;
    if (_this.options._mode === "vertical-from-top")
      finalY = _this.sliderMainGroup.y + (_this.options._height);
    else if (_this.options._mode === "vertical-from-bottom")
      finalY = _this.sliderMainGroup.y + (_this.options._height * -1);

    if (_this.index >= _this.max_index && _this.options.autoAnimate === false)
    {
      _this.stopSlider();
      return false;
    }

    if (_this.options.autoAnimate === true)
    {
      if (_this.page >= _this.max_page)
      {
        _this.page = 0;
        _this.sliderMainGroup.y = _this.option._y;
        _this.locked = false;
        return true;
      }
    }
    
    _this.tweenObj = game.add.tween(_this.sliderMainGroup).to({
      y: finalY}, _this.options.animationDuration, _this.options.animationEasing, true, 0, 0, false);
    
    _this.tweenObj.onComplete.add(function(){
      this.locked = false;
      this.page += 1;
      if (_this.options.autoAnimate === false && this.page >= _this.max_page)
      {
        if (_this.options._showHandles === true)
        {
          this.sliderControlsGroup.children[0].alpha = 0;
        }
      }
      if (_this.options._showHandles === true)
      {
        this.sliderControlsGroup.children[1].alpha = 1;
      }
    }, _this);

  };

  _this.goToPrevPage = function() {
    
    _this.locked = true;

    var finalY;
    if (_this.options._mode === "vertical-from-top")
      finalY = _this.sliderMainGroup.y + (_this.options._height * -1);
    else if (_this.options._mode === "vertical-from-bottom")
      finalY = _this.sliderMainGroup.y + (_this.options._height);

    if (_this.index <= 0 && _this.options.autoAnimate === false)
    {
      _this.stopSlider();
      return false;
    }
    
    _this.tweenObj = game.add.tween(_this.sliderMainGroup).to({
      y: finalY}, _this.options.animationDuration, _this.options.animationEasing, true, 0, 0, false);
    
    _this.tweenObj.onComplete.add(function(){
      this.locked = false;
      this.page -= 1;
      if (this.page < 0) this.page = 0;
      if (_this.options.autoAnimate === false && this.page <= 0)
      {
        if (_this.options._showHandles === true)
        {
          this.sliderControlsGroup.children[1].alpha = 0;
        }
      }
      if (_this.options._showHandles === true)
      {
        this.sliderControlsGroup.children[0].alpha = 1;
      }
    }, _this);

  };

  _this.startSlider = function() {
    var _timer = game.time.create(false);
    _timer.start();
    _timer.loop(Phaser.Timer.SECOND * _this.options.animationDelay, _this.goToNextPage, _this);
    _this.slider_timer = _timer;
  };

  _this.stopSlider = function () {
    if (_this.slider_timer != null)
    {
      _this.slider_timer.stop(true);
      _this.slider_timer = null;
    }
    else return false;
  };

  _this.moveToPage = function (index, animate) {

    

  };




};
