$(function(){

  let getRandomNum = (min, max) => {   
    let _range = max - min;   
    let _rand = Math.random();   
    return (min + Math.round(_rand * _range));   
  }   

  let initMoneyPhone = () => {
    let _money = getRandomNum(3, 20) * 100;
    let _phone = getRandomNum(1000, 9999);
    $('#flash-content').text(`131****${_phone}在发薪贷成功借款${_money}元`)
  }

  let computedRecommendHeight = () => {
    let window_height = window.innerHeight;
    let banner_height = $('#banner-con').height();
    let fns_height = 1.03 * 100;
    let flash_height = .33 * 100;
    let hr_height = .1 * 100;
    let title_height = .41 * 100;
    let footer_height = .45 * 100;

    let recommend_height = window_height - banner_height - fns_height - flash_height - hr_height - title_height - footer_height;
    $('#recommend-list').height(recommend_height);
  }

  let clickEvent = () => {

  }


  let init = () => {

    initMoneyPhone();
    computedRecommendHeight();
    
  }

  init();
})