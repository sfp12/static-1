$(function(){

  let goodHeight = () => {

    let _h = $('#good-con').width() * .75; 
    $('#good-con').height(_h);
    $('#ranking-con').height(_h);
    $('#ranking-content').height(_h - 38);

  }

  let initMask = () => {

    opacity();

    $('#mask').height($('body').height());
    $('#mask').width(window.innerWidth);

  }

  let bargain = () => {

    let getRandomNum = (min, max) => {   
      let _range = max - min;   
      let _rand = Math.random();   
      return (min + Math.round(_rand * _range));   
    }  

    let movePos = (a, b, c) => {

      let _pos = b * c / a;

      $('#cur-price').css({left: _pos});
      $('#slide').css({left: _pos});
      $('#progress-inner').width(_pos);
      
    }  

    let updateRank = (_html) => {

      $('#ranking-content').scrollTop(0);
      let _h = $('#ranking-content').html();
      $('#ranking-content').html(_html+_h);

    }  

    $('#bargain').on('click', (e) => {
      $('body').addClass('freeze');
      let bargain_price = getRandomNum(1, 10).toFixed(2);
      // let bargain_price = 10;
      $('#bargain-tip-con .bargain-tip').text(`您已帮好友砍掉${bargain_price}元`);
      $('#bargain-tip-con').show();
      $('#mask').show();
      $('#bargain').addClass('disabled');
      timer();
      if($('#ranking-content').hasClass('default')){
        $('#ranking-content').removeClass('default');
        $('#ranking-content p').eq(0).remove();
      }
      updateRank(`<p>AAA帮你砍价了<span>${bargain_price}</span>元</p>`)

      setTimeout(() => {
        $('body').removeClass('freeze');
        $('#bargain-tip-con').hide();
        $('#mask').hide();

        let origin_price = +$('#origin-price').data('price');
        let cur_price = +$('#cur-price').text() - bargain_price;
        let base_price = +$('#base-price').data('price');
        if(cur_price < base_price){
          cur_price = base_price;
        } 

        movePos(origin_price - base_price, bargain_price, $('#tip-con').width());
      }, 3000);  
    })    

  }

  let opacity = () => {

    $('#opacity').on('click', (e) => {
      $('body').removeClass('freeze');
      $('#opacity').hide();
      $('#mask').hide();
      $('#detailed-con').hide();
    })

  }

  let share = () => {

    $('#invite').on('click', () => {
      $('body').scrollTop(0);
      $('body').addClass('freeze');
      $('#opacity').show();
      $('#mask').show();
      $('#arrow-con').show();
    })

  }

  let detailed = () => {

    $('#detailed').on('click', (e) => {

      $('body').addClass('freeze');
      $('#opacity').show();
      $('#detailed-con').show();
      $('#mask').show();

    })

  }

  let timer = () => {

    let _h = 72;
    let _m = 0;
    let _s = 0;
    let hours = 60*60;
    let minutes = 60;
    let set_1 = '';

    let setTime = (num, type) => {

      let id_1 = type+'-1';
      let id_2 = type+'-2';
      let val_1 = 0;
      let val_2 = 0;

      if(num < 10){
        val_1 = '0';
        val_2 = num;
      }else{
        val_1 = (''+num)[0];
        val_2 = (''+num)[1];
      }

      $('#'+id_1).text(val_1);
      $('#'+id_2).text(val_2);

    }

    let all_left = (new Date()).getTime() + _h * 60 * 60 * 1000 + _m * 60 * 1000 + _s * 1000;

    let computed = () => {

      left = Math.floor((all_left - (new Date())) / 1000);
      
      if(left < 0){
        left = 0;
      }

      let h = Math.floor(left / hours);
      setTime(h, 'h');
      left -= h*hours;

      let m = Math.floor(left / minutes);
      setTime(m, 'm');
      left -= m*minutes;
      
      s = left;      
      setTime(s, 's');

      if(h === 0 && m === 0 && s === 0){
        clearInterval(set_1);
      }
    }

    set_1 = setInterval(function(){
      computed();
    }, 1000);    

  }

  let init = () => {
    goodHeight();
    initMask();
    bargain();
    share();
    detailed();    
  }

  init();

})