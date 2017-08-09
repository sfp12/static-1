$(function(){

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
      $('#ranking-content p').eq(0).before(_html);

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

    let s_1_val = 0;
    let s_2_val = 0;
    let m_1_val = 0;
    let m_2_val = 0;
    let h_1_val = 0;
    let h_2_val = 0;

    let set_1 = setInterval(() => {
      s_1_val = $('#s-1').text();
      s_2_val = $('#s-2').text();
      minus1(s_1_val+s_2_val, 's');
    }, 1000);

    let minus1 = (num, type) => {

      num = +num;
      if(num > 0){
        num--;
        setTime(num, type);
      }else{
        s_1_val = $('#s-1').text();
        s_2_val = $('#s-2').text();
        m_1_val = $('#m-1').text();
        m_2_val = $('#m-2').text();
        h_1_val = $('#h-1').text();
        h_2_val = $('#h-2').text();
        if(h_1_val === '0' && h_2_val === '0' && m_1_val === '0' && m_2_val === '0' && s_1_val === '0' && s_2_val === '0'){
          clearInterval(set_1);
          $('#bargain').addClass('disabled');
          return false;
        }
        if(type !== 'h'){
          setTime(59, type);
          routerType(type);
        }
      }

    }

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

    let routerType = (type) => {

      if(type === 's'){
        type = 'm';
        m_1_val = $('#m-1').text();
        m_2_val = $('#m-2').text();
        minus1(m_1_val+m_2_val, 'm');
      }else if(type === 'm'){
        type = 'h';
        h_1_val = $('#h-1').text();
        h_2_val = $('#h-2').text();
        minus1(h_1_val+h_2_val, 'h');
      }else{

      }

    }

  }

  let init = () => {
    initMask();
    bargain();
    share();
    detailed();    
  }

  init();

})