
window.best = {};

$(function(){

  // head list start
  $('.head-list-wrap').on('mouseover', function(){
    $('.head-list-wrap .t-u-list').show();
  })

  $('.head-list-wrap').on('mouseout', function(){
    $('.head-list-wrap .t-u-list').hide();
  })
  // head list end

  //左侧列表 start
  if($('.nav-list').length > 0) {

    $('.submenu').hide();

    if($('.nav-list').css('display') !== 'none'){


      $('.expert-detail .nav-tabs-justified > li').hover(function() {
          
      });

      $('.expert-detail .nav-tabs-justified > li').click(function() {
          $(this).find('.submenu').toggle();
          $(this).find('.glyphicon-plus').toggle();
          $(this).find('.glyphicon-minus').toggle();
      });      
      
    }else{     

      $('.header .nav-tabs-justified > li').click(function() {
          $(this).find('.submenu').toggle(200);
          $(this).find('.glyphicon-plus').toggle();
          $(this).find('.glyphicon-minus').toggle();          
      }); 

    }

    $('.firstsub').show();
      
  }
  //左侧列表 end

  // 移动端 start
  $('#user-list').on('click', function(){
    $('.header > .t-u-list').toggle(200);
    $('.header > .nav-tabs-justified').hide();
  })

  $('#menu-list').on('click', function(){
    $('.header > .nav-tabs-justified').toggle(200);
    $('.header > .t-u-list').hide();
  })


  // 移动端 end

  //==============组件======================
  var emailValidate = function(){
    if(!validator.isEmail($('#email').val())){
      $('#email-tip').css('visibility', 'visible');
      return false;
    }else{
      $('#email-tip').css('visibility', 'hidden');
      return true;
    }
  }

  //
  var phoneValidate = function(){
    if(!validator.isMobilePhone($('#phone-number').val(), 'zh-CN')){
      $('#phone-tip').css('visibility', 'visible');
      return false;
    }else{
      $('#phone-tip').css('visibility', 'hidden');
      return true;
    }
  }

  //###############组件########################

  // foot width start
  $('.footer').css('width', $('.header').width());

  var w_h = $(document).innerHeight();
  var c_h = $('.container').height();
  if(c_h + 75 > w_h){
    $('.footer').css('position', 'static');
  }else{
    $('.container').css('height', $(document).innerHeight());
  }

  $('.footer').show();
  // foot width end

  // 分页 处理 start
  if($('.pagination').length>0){
    $('.pagination').addClass('pagination-sm');
  }
  // 分页 处理 end

  // 基本信息 start
  var userDetail = function(){
    // hide all
    $('#test').find('.glyphicon').hide();

    // submit
    $('#submit').on('click', function(e){
      // 验证email
      emailValidate()   
    })

    // 出生日期
    $('#birth-date').datetimepicker({
      format: 'YYYY.MM.DD',
      locale: 'zh-cn'
    });
  }
  // 基本信息 end

  // 忘记密码 start
  var pwReset = function(){
    $('#submit').on('click', function(){

      // 验证email
      emailValidate();

      // 验证手机号
      phoneValidate();
    })
  }
  // 忘记密码 end

  // 重置密码 start
  var resetPw = function(){
    $('#submit').on('click', function(){

      if($('#new-pw').val() !== $('#repeat-pw').val()){
        $('#repeat-tip').css('visibility', 'visible');
        return false;
      }else{
        $('#repeat-tip').css('visibility', 'hidden');
        return true;
      }
    })
  }
  // 重置密码 end

  // 用户注册 start
  var userReg = function(){
    $('#submit').on('click', function(){

      emailValidate();

      phoneValidate();
    })
  }
  // 用户注册 end

  // 附件 js
  var attachMent = function(){

    $('#upload').on('click', function(e){
      $('#upload-modal').modal('show');
    })

    $('#upload-confirm').on('click', function(e){
      
      var result = $('#upload-modal input[type=checkbox]:checked');
      var str = '';

      result.map(function(i, e){
        str += $(this).data('id')
        if(i !== result.length-1){
          str += ',';
        }
      })

      $('#attachment').val(str);
    })
    
  }

  // 删除 btn js
  var delBtn = function(){
    $('.del-btn').on('click', function(e){
      $('#del-modal').modal('show');
    })
  }

  // 最新加入的专家 start
  var joinedExpert = function(){    
    
  }
  // 最新加入的专家 end



  var init = function(){
    // 基本信息
    if($('#user-detail').length > 0){
      userDetail();
    }

    // 附件 js
    if($('#upload').length > 0){
      attachMent();
    }

    // 删除 js
    if($('.del-btn').length > 0){
      delBtn();
    }

    // 重置密码
    if($('#reset-pw').length > 0){
      resetPw();
    }

    // 忘记密码
    if($('#pw-reset').length > 0){
      pwReset();
    }

    // 用户注册
    if($('#user-reg').length > 0){
      userReg();
    }

    // index 最近加入的专家
    if($('#joined-exports')){
      joinedExpert();
    }
  }

  init();


});