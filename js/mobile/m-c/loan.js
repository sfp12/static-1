$(function(){

  let computedLoanHeight = () => {
    let window_height = window.innerHeight;
    let header_height = $('#header').height();
    let main_top = .1 * 100;
    let form_height = .3 * 100;
    let identity_height = .3 * 100;
    let list_loan_top = .2 * 100;
    let footer_height = .45 * 100;

    let list_loan_height = window_height - header_height - main_top - form_height - identity_height - list_loan_top - footer_height;
    $('#list-loan').height(list_loan_height);
  }

  let pageLoanEvent = () => {

    $('.js-btn').on('click', (e) => {
      $(e.target).addClass('active').siblings('.active').removeClass('active');
    })

  }

  let init = () => {

    computedLoanHeight();
    pageLoanEvent();
    
  }

  init();
  
})