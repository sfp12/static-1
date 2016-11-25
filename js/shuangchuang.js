$(function($){

  $('.page-1 .item').on('click', function(e){
    if($(this).index() === 2){
      return false;
    }
    $(this).addClass('active').siblings('.active').removeClass('active')
  })

  $(window).scroll(function(){
    var scroll_h = $(this).scrollTop();

    if(scroll_h > 57){
      $('.hd-wrap').addClass('scrolled');  
    }else{
      $('.hd-wrap').removeClass('scrolled');
    }
    
  })

  function Sc(){
    this.start = 0;
    this.end = 0;
    this.small_finish = false;
    this.big_finish = false;
    this.small_el = '';
    this.big_el = '';
  }

  Sc.prototype.rectMove = function() {
    
    this.small_el.parents('.item').find('.content-wrap').stop(true).animate({width:"0px"},500,'swing', function(){
      
    });

    this.big_el.siblings('.content-wrap').stop(true).animate({width:"796px"},500,'swing',function(){
      
    });

  };

  Sc.prototype.small = function(el){

    var that = this;

    el.stop(true).animate({width: '58px', marginTop: '24px'}, 100, 'swing', function(){

      that.small_finish = true;

      el.parents('.item').removeClass('active');

      if(that.big_finish){
        that.rectMove();
      }

    });

  }

  Sc.prototype.big = function(el){

    var that = this;

    el.stop(true).animate({width: '64px', marginTop: '0'}, 100, 'swing', function(){

      that.big_finish = true;

      el.parents('.item').addClass('active');

      if(that.small_finish){
        that.rectMove();
      }

    });

  }

  var sc = new Sc();

  $('.page-2 .main .rect').hover(function(){

    sc.small_finish = false;
    sc.big_finish = false;


    sc.start = $(this).parents('.item').siblings('.active').index();
    if(sc.start === -1){
      return false;
    }
    sc.end = $(this).parents('.item').index();

    sc.small_el = $(this).parents('.item').siblings('').find('.rect');
    sc.big_el = $(this);

    sc.small($(this).parents('.item').siblings().find('.rect'));
    sc.big($(this));

  })
});