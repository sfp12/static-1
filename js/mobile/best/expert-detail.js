
$(function(){


  // 已选择条件 start
  $('.li-wrap li').on('click', function(e){
    if($(this).hasClass('disabled')){
      return false;
    }
    $(this).addClass('disabled');
    var y = $(this).parents('.item').index();
    var x = $(this).index();
    var type = $(this).parents('.item').find('h2').text(); 
    var text = $(this).text().trim();

    $('<li/>').attr('data-x', x)
              .attr('data-y', y)
              .html('<span>'+type+text+'</span>'+'<i> × </i>')
              .appendTo($('#create-list'));
  })

  $('#create-list').delegate('i', 'click', function(e){
    var y = $(this).parent('li').data('y');
    var x = $(this).parent('li').data('x');
    console.log(x+':'+y);
    $('.item:eq('+y+') li:eq('+x+')').removeClass('disabled');
    $(this).parent('li').remove();
  })
  // 已选择条件 end
});