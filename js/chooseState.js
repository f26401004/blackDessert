var chooseState = {};

chooseState.count = 0;
chooseState.index = 0;
chooseState.page = 0;
chooseState.count = 0;
chooseState.max_page = 4;
chooseState.frame;
chooseState.head = [];

chooseState.preload = function(){
  // load head
  game.load.image('head1','../assets/scene_class/class_command_1.png')
  game.load.image('head2','../assets/scene_class/class_command_2.png')
  game.load.image('head3','../assets/scene_class/class_command_3.png')
  game.load.image('head4','../assets/scene_class/class_command_4.png')
  game.load.image('head5','../assets/scene_class/class_command_5.png')
  game.load.image('head6','../assets/scene_class/class_command_6.png')
  game.load.image('head7','../assets/scene_class/class_command_7.png')
  game.load.image('head8','../assets/scene_class/class_command_8.png')
  game.load.image('head9','../assets/scene_class/class_command_9.png')
  game.load.image('head10','../assets/scene_class/class_command_10.png')

  // load frame
  game.load.image('chooseFrame_0', '../assets/scene_class/class_window_0.png');
  game.load.image('chooseFrame_1', '../assets/scene_class/class_window_1.png');
  game.load.image('chooseFrame_2', '../assets/scene_class/class_window_2.png');
  game.load.image('chooseFrame_3', '../assets/scene_class/class_window_3.png');
  game.load.image('chooseFrame_4', '../assets/scene_class/class_window_4.png');
  game.load.image('chooseFrame_5', '../assets/scene_class/class_window_5.png');
  game.load.image('chooseFrame_6', '../assets/scene_class/class_window_6.png');
  game.load.image('chooseFrame_7', '../assets/scene_class/class_window_7.png');
  game.load.image('chooseFrame_8', '../assets/scene_class/class_window_8.png');
  game.load.image('chooseFrame_9', '../assets/scene_class/class_window_9.png');

  // load other
  game.load.image('background', '../assets/scene_choose/map_back.png')
  game.load.image('chooseButton','../assets/scene_class/enter_command.png')
  game.load.image('chooseHeroName','../assets/scene_class/class_name_window.png')
  game.load.image('black','../assets/black.jpg')

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
  // add the hero name
  chooseState.heroName = chooseState.add.sprite(0, 0, 'chooseHeroName');
  chooseState.heroName.scale.setTo(scaleX, scaleY);
  chooseState.heroName.position.x = width * 0.22;
  chooseState.heroName.position.y = height * 0.06;
  // add the class information frame in the state. 
  chooseState.frame = chooseState.add.sprite(0, 0, 'chooseFrame_0');
  chooseState.frame.scale.setTo(scaleX, scaleY);
  chooseState.frame.position.x = width * 0.03;
  chooseState.frame.position.y = height * 0.18; 
   // add the button of choose the class.
  chooseState.button = chooseState.add.sprite(0, 0, 'chooseButton');
  chooseState.button.scale.setTo(scaleX, scaleY);
  chooseState.button.position.x = chooseState.frame.position.x + chooseState.frame.width - chooseState.button.width * 1.5;
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
}

chooseState.createHeroHead = function() {
  var base_x = width * 0.7;
  var base_y = height * 0.03;
  // add the class head.
  for (i = 0 ; i < 10 ; ++i)
  {
    chooseState.head[i] = chooseState.add.sprite(base_x + width*0.11*((i+1)%2), base_y + i * height * 0.22, 'head'+(i+1));
    chooseState.head[i].scale.setTo(scaleX * 0.9, scaleY * 0.9);
    chooseState.head[i].inputEnbled = true;
    chooseState.head[i].events.onInputDown.add(chooseState.heroInfoRefresh, {n:i});
    if (i > 3)
      chooseState.head[i].alpha = 0;
    chooseState.count += 1;
    console.log(chooseState.head[i]);
  }

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
  var base_y = height * 0.03;
  var dy = height * 0.44;
  chooseState.page = (chooseState.page + 1) % chooseState.max_page;
  for (i = 0 ; i < 10 ; ++i)
  {
    var finalY = (chooseState.page ? chooseState.head[i].position.y - dy : base_y + i * dy / 2);
    game.add.tween(chooseState.head[i]).to({y: finalY}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    if (chooseState.page * 2 <= i && i <= chooseState.page * 2 + 3)
      game.add.tween(chooseState.head[i]).to({alpha : 1}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    else
      game.add.tween(chooseState.head[i]).to({alpha : 0}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
  }
}
chooseState.prevPage = function () {
  var base_y = height * 0.69;
  var dy = height * 0.44;
  chooseState.page = (chooseState.page + chooseState.max_page - 1) % chooseState.max_page;
  for (i = 0 ; i < 10 ; ++i)
  {
    var finalY = (chooseState.page == chooseState.max_page - 1 ? base_y - (9 - i) * dy / 2 : chooseState.head[i].position.y + dy);
    game.add.tween(chooseState.head[i]).to({y : finalY}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    if (chooseState.page * 2 <= i && i <= chooseState.page * 2 + 3)
      game.add.tween(chooseState.head[i]).to({alpha : 1}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    else
      game.add.tween(chooseState.head[i]).to({alpha : 0}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
  }
}


chooseState.update = function() {
  
}

