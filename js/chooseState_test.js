var chooseState = {};

chooseState.count = 0;
chooseState.index = 0;
chooseState.page = 0;
chooseState.max_page = 3;
chooseState.frame;
chooseState.head = [];

chooseState.preload = function(){

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
  // add the button of choose the class.
  chooseState.button = chooseState.add.sprite(0, 0, 'chooseButton');
  chooseState.button.scale.setTo(scaleX, scaleY);
  chooseState.button.position.x = chooseState.frame.position.x + chooseState.frame.width - chooseState.button.width * 1.5;
  chooseState.button.position.y = chooseState.frame.position.y + chooseState.frame.height - chooseState.button.height * 2.5;
  // add the hero name
  chooseState.heroName = chooseState.add.sprite(0, 0, 'chooseHeroName');
  chooseState.heroName.scale.setTo(scaleX, scaleY);
  chooseState.heroName.position.x = 426;
  chooseState.heroName.position.y = 64;
  // add the class information frame in the state. 
  chooseState.frame = chooseState.add.sprite(0, 0, 'chooseFrame_0');
  chooseState.frame.scale.setTo(scaleX, scaleY);
  chooseState.frame.position.x = 56;
  chooseState.frame.position.y = 205; 
  // add the up & down arrow button
  chooseState.upArrow = chooseState.add.sprite(1400, 32, 'upArrow');
  chooseState.upArrow.inputEnabled = true;
  chooseState.upArrow.events.onInputDown.add(chooseState.prevPage, {n:chooseState.page});
  chooseState.downArrow = chooseState.add.sprite(1714, 924, 'downArrow');
  chooseState.downArrow.inputEnabled = true;
  chooseState.downArrow.events.onInputDown.add(chooseState.nextPage, {n:chooseState.page});
}

chooseState.createHeroHead = function() {
  var base_x = 1340;
  var base_y = 30;
  // add the class head.
  chooseState.head[chooseState.count] = chooseState.add.sprite(base_x + 212*((chooseState.count+1)%2), base_y + chooseState.count * 234);
  chooseState.head[chooseState.count].scale.setTo(scaleX, scaleY);
  chooseState.head[chooseState.count].inputEnbled = true;
  chooseState.head[chooseState.count].events.onInputDown.add(chooseState.heroInfoRefresh, {n:chooseState.count});
  if (chooseState.count > 3)
    chooseState.head[chooseState.count].alpha = 0;
  chooseState.count++;

}

chooseState.heroInfoRefresh = function() {
  chooseState.titleName.txt = 'HERO ' + this.n
  chooseState.frame.loadtexture('chooseFrame_' + this.n)
  // remove all tween effect on head.
  for (i = 0 ; i < 10 ; ++i)
    game.tween.removeFrom(chooseState.head[i]);
  game.add.tween(chooseState.head[this.n]).to({tint : 0xffffff}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, true);
}

chooseState.nextPage = function () {
  var base_y = 30;
  chooseState.page = (chooseState.page + 1) % chooseState.max_page;
  for (i = 0 ; i < 10 ; ++i)
  {
    var finalY = (chooseState.page ? chooseState.head[i].position.y - 234 : base_y + i * 234);
    game.add.tween(chooseState.head[i]).to({y: finalY}, 500, Phaser.Easing.Exponential.In, true, 0, 0, false);
    if (chooseState.page * 2 <= i && i <= chooseState.page * 2 + 3)
      game.add.tween(chooseState.head[i]).to({alpha : 1}, 500, Phaser.Easing.Exponential.In, true, 0, 0, false);
    else
      game.add.tween(chooseState.head[i]).to({alpha : 0}, 500, Phaser.Easing.Exponential.In, true, 0, 0, false);
  }
}
chooseStaet.prevPage = function () {
  var base_y = 966;
  chooseState.page = (chooseState.page + chooseState.max_page - 1) % chooseState.max_page;
  for (i = 0 ; i < 10 ; ++i)
  {
    var finalY = (chooseState.page == chooseState.max_page ? chooseState.head[i].position.y + 234 : base_y - (9 - i) * 234);
    game.add.tween(chooseState.head[i]).to({y : finlaY}, 500, Phaser.Easing.Exponential.In, true, 0, 0, false);
    if (chooseState.page * 2 <= i && i <= chooseState.page * 2 + 3)
      game.add.tween(chooseState.head[i]).to({alpha : 1}, 500, Phaser.Easing.Exponential.In, true, 0, 0, false);
    else
      game.add.tween(chooseState.head[i]).to({alpha : 0}, 500, Phaser.Easing.Exponential.In, true, 0, 0, false);
  }
}


chooseState.update = function() {
  
}

