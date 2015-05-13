(function ($) {

  // Intro container

  var letters = $('#intro')
    .lettering()
    .find('span');

  var lettersRemaining = letters.length;
  letters.each(function (i, e) {
    setTimeout(function () {
      $(e).addClass('viz');
      lettersRemaining--;
      if (lettersRemaining === 0) {
        showScrollIndicator();
      }
    }, i * 100);
  });

  function showScrollIndicator() {
    $('#scroll-container').addClass('viz');
  }

  // Second container

  var controller = $.superscrollorama();

  controller.addTween('#secondary-content',
    TweenMax.fromTo($('#scroll-wrapper'), 1, 
      { css: { opacity: 1 } },
      { css: { opacity: 0 } } ),
    100,
    100
  );

  controller.addTween('#secondary-content',
    TweenMax.fromTo($('#wis-1'), 1, 
      { css: { opacity: 0 } },
      { css: { opacity: 1 } } ),
    50,
    200
  );

  controller.addTween('#secondary-content',
    TweenMax.fromTo($('#wis-1'), 1, 
      { css: { top: 0 } },
      { css: { top: 100 } } ),
    0,
    200
  );

  controller.addTween('#secondary-content',
    TweenMax.fromTo($('#wis-2'), 1, 
      { css: { opacity: 0 } },
      { css: { opacity: 1 } } ),
    50,
    300
  );

  controller.addTween('#secondary-content',
    TweenMax.fromTo($('#wis-2'), 1, 
      { css: { top: 0 } },
      { css: { top: 100 } } ),
    0,
    300
  );

  controller.addTween('#secondary-content',
    TweenMax.fromTo($('#wis-3'), 1, 
      { css: { opacity: 0 } },
      { css: { opacity: 1 } } ),
    50,
    400
  );

  controller.addTween('#secondary-content',
    TweenMax.fromTo($('#wis-3'), 1, 
      { css: { top: 0 } },
      { css: { top: 100 } } ),
    0,
    400
  );

  controller.addTween('#photo-1',
    TweenMax.fromTo($('#photo-1'), 1, 
      { css: { opacity: 0, rotation: 10, left: '20px', top: '-50px', scale: 1.1 } },
      { css: { opacity: 1, rotation: -4, left: 0, top: 0, scale: 1 } } ),
    0,
    0
  );

  controller.addTween('#photo-2',
    TweenMax.fromTo($('#photo-2'), 1, 
      { css: { opacity: 0, rotation: -2, top: '-50px', scale: 1.1 } },
      { css: { opacity: 1, rotation: 2, top: 0, scale: 1 } } ),
    0,
    0
  );

  controller.addTween('#photo-3',
    TweenMax.fromTo($('#photo-3'), 1, 
      { css: { opacity: 0, rotation: -10, right: '20px', top: '-50px', scale: 1.1 } },
      { css: { opacity: 1, rotation: 4, right: 0, top: 0, scale: 1 } } ),
    0,
    0
  );

  controller.addTween('#tertiary-content',
    TweenMax.fromTo($('#ijwt-1'), 1, 
      { css: { opacity: 0 } },
      { css: { opacity: 1 } } ),
    50,
    0
  );
  
  controller.addTween('#tertiary-content',
    TweenMax.fromTo($('#ijwt-1'), 1, 
      { css: { top: 0 } },
      { css: { top: 100 } } ),
    0,
    0
  );

  controller.addTween('#tertiary-content',
    TweenMax.fromTo($('#ijwt-2'), 1, 
      { css: { opacity: 0 } },
      { css: { opacity: 1 } } ),
    50,
    200
  );

  controller.addTween('#tertiary-content',
    TweenMax.fromTo($('#ijwt-2'), 1, 
      { css: { top: 0 } },
      { css: { top: 100 } } ),
    0,
    200
  );

  controller.addTween('#tertiary-content',
    TweenMax.fromTo($('#ijwt-3'), 1, 
      { css: { opacity: 0 } },
      { css: { opacity: 1 } } ),
    50,
    400
  );

  controller.addTween('#tertiary-content',
    TweenMax.fromTo($('#ijwt-3'), 1, 
      { css: { top: 0 } },
      { css: { top: 100 } } ),
    0,
    400
  );

  controller.addTween('#photo-4',
    TweenMax.fromTo($('#photo-4'), 1, 
      { css: { opacity: 0, rotation: 10, left: '20px', top: '-50px', scale: 1.1 } },
      { css: { opacity: 1, rotation: -4, left: 0, top: 0, scale: 1 } } ),
    0,
    0
  );

}(window.jQuery));