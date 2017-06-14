let cookieOperate = {

    getsec(str){
      var str1=str.substring(1,str.length)*1;
      var str2=str.substring(0,1);
      if (str2=="s"){
        return str1*1000;
      }else if (str2=="h"){
        return str1*60*60*1000;
      }else if (str2=="d"){
        return str1*24*60*60*1000;
      }
    },

    // 获取cookie
    getCookie: (name) => {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },

    // 删除cookie
    delCookie: (name) => {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=cookieOperate.getCookie(name);
      if(cval!=null){
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      }
    },

    // 设置cookie
    setCookie: (name,value,time) => {
      var strsec = cookieOperate.getsec(time);
      var exp = new Date();
      exp.setTime(exp.getTime() + strsec*1);
      document.cookie = name + "="+ value + ";expires=" + exp.toGMTString();
    },

    

    //这是有设定过期时间的使用示例：
    //s20是代表20秒
    //h是指小时，如12小时则是：h12
    //d是天数，30天则：d30
    // setCookie("name","content","s10");
    // alert(getCookie("lucy"))  
}



export default cookieOperate;