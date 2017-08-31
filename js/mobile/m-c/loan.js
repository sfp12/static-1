$(function(){

  let computedLoanHeight = () => {
    let window_height = window.innerHeight;
    let header_height = $('#header').height();
    let html_size = +$('html').css('fontSize').replace('px', '');
    let main_top = .2 * html_size;
    let form_height = .6 * html_size;
    let identity_height = .7 * html_size;
    let list_loan_top = .4 * html_size;
    let footer_height = 1 * html_size;

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