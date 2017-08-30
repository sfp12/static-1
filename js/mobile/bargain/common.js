var env = 1;//生产环境
var envPara = {};
if(env == 1){
  envPara.appid = "wx89ec32df46e0fb16";
  envPara.host = "http://www.smartalle.com/";
  envPara.hostimg = "http://www.smartalle.com/frontend/";
}else{
  envPara.appid = "wx89ec32df46e0fb16";
  envPara.host = "http://www.smartalle.com/";
  envPara.hostimg = "http://www.smartalle.com/frontend/";
}

var openid_url = envPara.host + "user/openid";

//获取url后的参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//获取用户的openid
function getOpenid(){
  var access_code = GetQueryString("code");
  if(access_code == null) {
    var fromurl = location.href;
    console.log(fromurl+' '+encodeURIComponent(fromurl));
    debugger
//    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx79d9b9a0aef8ed1b&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ envPara.appid +'&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
    location.href = url;
  } 
  cookie.set("access_code",access_code);
  //用code换取用户的openid
  $.ajax({
    type:"get",
    url:openid_url,
    data:{
      code:access_code
    },
    timeout:10000,//设置超时时间
    beforeSend:function(){
      // $(".loading").show();
    },
    complete:function(jqXHR){
      // $(".loading").hide();
      // if(jqXHR.status == 408){
      //   $.toast("服务器繁忙请稍候","text");
      // }
    },
    success:function(d){
      var d = JSON.parse(d);
      var err = d.error;
      var errCode = err.errno;
      var errMsg = err.errmsg;
      var data = d.data;
      // console.log(d);
      // console.log(data);
      if(errCode == 200){
        console.log("openId=" + data.openid);
        console.log("wxState=" + data.wxstate);
        cookie.set("openId",data.openid);
        cookie.set("wxstate",data.wxstate);
        getToken();
      }else{
        console.log(errMsg);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
//      alert("XHR=" + JSON.stringify(jqXHR) + "\ntextStatus=" + textStatus + "\nerrorThrown=" + errorThrown);        
    }
  });
}

//用户是否关注公众号
function getWxstate(){
  var openId = cookie.get("openId");
  if(openId == '' || openId == null || openId == undefined){
    //code换取openid和wxstate;
    getOpenid();
    return; 
  }
  //openid换取wxstate
  $.ajax({
    type:"get",
    url:user_state_url,
    data:{openid:openId},
    timeout:10000,//设置超时时间
    beforeSend:function(){
      // $(".loading").show();
    },
    complete:function(jqXHR){
      // $(".loading").hide();
      // if(jqXHR.status == 408){
      //   $.toast("服务器繁忙请稍候","text");
      // }
    },
    success:function(d){
      var d = JSON.parse(d);
      var err = d.error;
      var errCode = err.errno;
      var errMsg = err.errmsg;
      var data = d.data;
      // console.log(d);
      // console.log(data);
      if(errCode == 200){
        console.log("wxstate="+data.wxstate);
        cookie.set("wxstate",data.wxstate);
        getToken();
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("XHR=" + JSON.stringify(jqXHR) + "\ntextStatus=" + textStatus + "\nerrorThrown=" + errorThrown);        
    }
  });
}

//token验证
function getToken(){
  var wxstate = cookie.get("wxstate");
//  alert("getTokne时wxstate="+wxstate);
  console.log("wxstate="+wxstate);
  if(wxstate == '' || wxstate == null || wxstate == undefined){
    getWxstate();
    return;
  }
  switch(wxstate){
    case "1":
      // $.toast("请您先关注公众号","text");
      cookie.set("wxstate","");
      setTimeout(function(){
        window.location.href="guide_attention.html";
      },1000);
      break;
    case "2":
      // $.toast("请您先绑定手机号","text");
      setTimeout(function(){
        window.location.href="bound_mobile.html";
      },1000);
      break;
    case "3":
      // $.toast("请您重新登录","text");
      setTimeout(function(){
        window.location.href = "login.html";
      },1000);
      break;
  }
}