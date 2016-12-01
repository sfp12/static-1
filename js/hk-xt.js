$(function($){

  $('#fullpage').fullpage({
    'navigation': true
  });

  $('.page-3 .list .item').hover(function(){
    $(this).stop(true).animate({'backgroundSize': '115%'}, 100, 'easeInOutQuad');
  }, function(){
    $(this).stop(true).animate({'backgroundSize': '100%'}, 100, 'easeInOutQuad');
  })

  $('.page-6 .list .item').mouseenter(function(){
    var that = this;
    $(this).find('.img-wrap').stop(true).fadeOut(100, function(){
      $(that).find('.text-wrap').stop(true).fadeIn(100);
    });
  })

  $('.page-6 .list .item').mouseleave(function(){
    var that = this;
    $(this).find('.text-wrap').stop(true).fadeOut(100, function(){
      $(that).find('.img-wrap').stop(true).fadeIn(100);
    });
  })



});