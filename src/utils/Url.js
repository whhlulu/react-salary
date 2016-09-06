export function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
/*输入月份0-11，输出{a:月份-2,b：月份}，列：输入3，输出{a:‘02’，b：‘04’}*/
export function MonthToString(n) {
  function toString(num) {
    if(num < 10) {
      return '0' + num
    } else {return '' + num}
  }
  if(n == 0) {
    return {
      a: toString(n + 1),
      b: toString(n + 1)
    }
  } else if(n == 1) {
    return {
      a: toString(n),
      b: toString(n + 1)
    }
  } else {
    return {
      a: toString(n - 1),
      b: toString(n + 1)
    }
  }
};
