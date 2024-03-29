var chooseState = {};

chooseState.count = 0;
chooseState.index = 0;
chooseState.page = 0;
chooseState.max_page = 4;
chooseState.heroName;
chooseState.frame;
chooseState.figure;
chooseState.button;
chooseState.leftGroup;
chooseState.head = [];
chooseState.black;
chooseState.activeHeadTween;
chooseState.activeHeadTimer;
chooseState.transLeftTween = [];
chooseState.transLeftTimer;

chooseState.preload = function(){
  for (i = 1 ; i < 11 ; ++i)
  {
    // load head
    game.load.image('head'+i,'../assets/scene_class/class_command_'+i+'.png')
    // load frame
    game.load.image('chooseFrame_'+i, '../assets/scene_class/class_window_'+i+'.png');
    // load name
    game.load.image('name'+i,'../assets/scene_class/name_'+i+'.png');
    // load figure
    game.load.image('figure'+i, '../assets/scene_class/figure_'+i+'.png');
  }
  // load other
  game.load.image('background', '../assets/scene_choose/map_back.png')
  game.load.image('chooseButton','../assets/scene_class/enter_command.png')
  game.load.image('chooseHeroName','../assets/scene_class/class_name_window.png')
  game.load.image('shadow','../assets/scene_class/shadow.png')

  game.load.image('upArrow', '../assets/scene_class/arrow_up.png');
  game.load.image('downArrow', '../assets/scene_class/arrow_down.png');
  
}

chooseState.create = function() {
  console.log('----chooseState----');

  /*****send message to server*****/
    playerInfo.playerState = 4;
    Client.sendUpdateInfo();
  /********************************/
  
  // set the background picture.
  chooseState.bg = chooseState.add.sprite(0, 0, 'background');
  chooseState.bg.scale.setTo(scaleX, scaleY);
  chooseState.black = chooseState.add.sprite(0, 0, 'shadow');
  chooseState.black.scale.setTo(scaleX, scaleY);
  chooseState.black.position.x = width * 0.59;
  chooseState.black.position.y = 0;
  chooseState.black.blendMode = PIXI.blendModes.MULTIPLY;
  chooseState.black.alpha = 0.75;
  // add the hero name
  chooseState.heroName = chooseState.add.sprite(0, 0, 'name1');
  chooseState.heroName.scale.setTo(scaleX, scaleY);
  chooseState.heroName.position.x = width * 0.22;
  chooseState.heroName.position.y = height * 0.06;
  // add the class information frame in the state. 
  chooseState.frame = chooseState.add.sprite(0, 0, 'chooseFrame_1');
  chooseState.frame.scale.setTo(scaleX, scaleY);
  chooseState.frame.position.x = width * 0.03;
  chooseState.frame.position.y = height * 0.18; 
  // add the class figure
  chooseState.figure = chooseState.add.sprite(0, 0, 'figure1');
  chooseState.figure.scale.setTo(scaleX, scaleY);
  chooseState.figure.anchor.x = 0.5;
  chooseState.figure.anchor.y = 0.55;
  chooseState.figure.position.x = width * 0.2;
  chooseState.figure.position.y = height * 0.65;
   // add the button of choose the class.
  chooseState.button = chooseState.add.sprite(0, 0, 'chooseButton');
  chooseState.button.scale.setTo(scaleX, scaleY);
  chooseState.button.position.x = chooseState.frame.position.x + chooseState.frame.width - chooseState.button.width * 1.6;
  chooseState.button.position.y = chooseState.frame.position.y + chooseState.frame.height - chooseState.button.height * 2.5;
  // add the up & down arrow button
  chooseState.upArrow = chooseState.add.sprite(width * 0.73, height * 0.03, 'upArrow');
  chooseState.upArrow.inputEnabled = true;
  chooseState.upArrow.scale.setTo(scaleX, scaleY);
  chooseState.upArrow.events.onInputDown.add(chooseState.prevPage, {n:chooseState.page});
  chooseState.downArrow = chooseState.add.sprite(width * 0.89, height * 0.86, 'downArrow');
  chooseState.downArrow.scale.setTo(scaleX, scaleY);
  chooseState.downArrow.inputEnabled = true;
  chooseState.downArrow.events.onInputDown.add(chooseState.nextPage, {n:chooseState.page});
  // add hero head command
  chooseState.createHeroHead();
  game.world.bringToTop(chooseState.upArrow);
  game.world.bringToTop(chooseState.downArrow);
  // set the active head tween
  chooseState.activeTween = game.add.tween(chooseState.head[chooseState.index].scale).to({x:scaleX*0.95, y:scaleY*0.95}, 500, Phaser.Easing.Linear.None, true, 0, 1, true);
  chooseState.activeTimer = game.time.events.add(Phaser.Timer.SECOND * 1, chooseState.addTween, this);
  // group the left information to a group.
  chooseState.leftGroup = game.add.group();
  chooseState.leftGroup.add(chooseState.frame);
  chooseState.leftGroup.add(chooseState.heroName);
  chooseState.leftGroup.add(chooseState.button);
  chooseState.leftGroup.add(chooseState.figure);
}

chooseState.createHeroHead = function() {
  var base_x = width * 0.79;
  var base_y = height * 0.172;
  // add the class head.
  for (i = 0 ; i < 10 ; ++i)
  {
    chooseState.head[i] = chooseState.add.sprite(base_x + width*0.11*((i+1)%2), base_y + i * height * 0.22, 'head'+(i+1));
    chooseState.head[i].scale.setTo(scaleX * 0.9, scaleY * 0.9);
    chooseState.head[i].anchor.x = 0.5;
    chooseState.head[i].anchor.y = 0.5;
    chooseState.head[i].inputEnabled = true;
    chooseState.head[i].events.onInputDown.add(chooseState.heroInfoRefresh, {n:i});
    if (i > 3)
      chooseState.head[i].alpha = 0;
    chooseState.count += 1;
  }

}

chooseState.heroInfoRefresh = function() {
  //chooseState.titleName.text = 'HERO ' + this.n
  // remove all effect on frame.
  game.time.events.remove(chooseState.transLeftTimer);
  game.tweens.remove(chooseState.transLeftTween);
  chooseState.leftGroup.position.x = 0;
  chooseState.transLeftTween[0] = game.add.tween(chooseState.leftGroup.position).to({x:chooseState.leftGroup.position.x-100}, 500, Phaser.Easing.Exponential.Out, true, 0, 0, true);
  chooseState.transLeftTween[1] = game.add.tween(chooseState.leftGroup).to({alpha: 0}, 500, Phaser.Easing.Exponential.Out, true, 0, 0, true);
  chooseState.transLeftTimer = game.time.events.add(Phaser.Timer.SECOND*0.5, chooseState.leftChange, this);
   // remove all tween effect on head.
  game.tweens.remove(chooseState.activeTween);
  game.time.events.remove(chooseState.activeTimer);
  chooseState.index = this.n;
  for (i = 0 ; i < 10 ; ++i)
    chooseState.head[i].scale.setTo(scaleX*0.9, scaleY*0.9);
  chooseState.activeTween = game.add.tween(chooseState.head[chooseState.index].scale).to({x:scaleX*0.95, y:scaleY*0.95}, 500, Phaser.Easing.Linear.None, true, 0, 1, true);
  chooseState.activeTimer = game.time.events.add(Phaser.Timer.SECOND * 1, chooseState.addTween, this);
}

chooseState.addTween = function() {
  // remove all other head state.
  //game.tweens.removeAll();
  //game.time.events.removeAll();
  for (i = 0 ; i < 10 ; ++i)
    chooseState.head[i].scale.setTo(scaleX*0.9, scaleY*0.9);
  chooseState.activeTween = game.add.tween(chooseState.head[chooseState.index].scale).to({x:scaleX*0.95, y:scaleY*0.95}, 500, Phaser.Easing.Linear.None, true, 0, 1, true);
  //game.add.tween(chooseState.head[chooseState.index].scale).to({x:scaleX*0.95, y:scaleY*0.95}, 500, Phaser.Easing.Linear.None, true, 0, 1, true);
  chooseState.activeTimer = game.time.events.add(Phaser.Timer.SECOND * 1, chooseState.addTween, this);
}

chooseState.leftChange = function () {
  chooseState.frame.loadTexture('chooseFrame_' + (this.n + 1)); 
  chooseState.figure.loadTexture('figure'+ (this.n + 1));
  chooseState.heroName.loadTexture('name' + (this.n + 1));
  // reset the anchor point
  switch (this.n)
  {
    case 0:
    case 6:
    case 9:
      chooseState.figure.anchor.x = 0.5;
      chooseState.figure.anchor.y = 0.55;
      break;
 case 8:
      chooseState.figure.anchor.x = 0.3;
      chooseState.figure.anchor.y = 0.55;
      break;
    default:
      chooseState.figure.anchor.x = 0.5;
      chooseState.figure.anchor.y = 0.3;
      break;
  }
  chooseState.leftGroup.position.x += 200;
  chooseState.transLeftTween[0] = game.add.tween(chooseState.leftGroup.position).to({x:chooseState.leftGroup.position.x-100}, 500, Phaser.Easing.Exponential.Out, true, 0, 0, true);
  chooseState.transLeftTween[1] = game.add.tween(chooseState.leftGroup).to({alpha: 1}, 500, Phaser.Easing.Exponential.Out, true, 0, 0, true);
}
chooseState.nextPage = function () {
  var base_y = height * 0.172;
  var dy = height * 0.44;
  chooseState.page = (chooseState.page + 1) % chooseState.max_page;
  for (i = 0 ; i < 10 ; ++i)
  {
    var finalY = (chooseState.page ? chooseState.head[i].position.y - dy : base_y + i * dy / 2);
    game.add.tween(chooseState.head[i]).to({y: finalY}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    if (chooseState.page * 2 <= i && i <= chooseState.page * 2 + 3)
      game.add.tween(chooseState.head[i]).to({alpha : 1}, 500, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    else
      game.add.tween(chooseState.head[i]).to({alpha : 0}, 500, Phaser.Easing.Exponential.Out, true, 0, 0, false);
  }
}
chooseState.prevPage = function () {
  var base_y = height * 0.83;
  var dy = height * 0.44;
  chooseState.page = (chooseState.page + chooseState.max_page - 1) % chooseState.max_page;
  for (i = 0 ; i < 10 ; ++i)
  {
    var finalY = (chooseState.page == chooseState.max_page - 1 ? base_y - (9 - i) * dy / 2 : chooseState.head[i].position.y + dy);
    game.add.tween(chooseState.head[i]).to({y : finalY}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    if (chooseState.page * 2 <= i && i <= chooseState.page * 2 + 3)
      game.add.tween(chooseState.head[i]).to({alpha : 1}, 500, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    else
      game.add.tween(chooseState.head[i]).to({alpha : 0}, 500, Phaser.Easing.Exponential.Out, true, 0, 0, false);
  }
}


chooseState.update = function() {
}

