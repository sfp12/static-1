$(function(){

  let computedDetailHeaderHeight = () => {
    $('#header').height(window.innerWidth * 260 / 750)
  }

  let init = () => {

    computedDetailHeaderHeight();
    
  }

  init();
})