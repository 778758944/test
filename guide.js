function getUrlParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURI(result[2]) : null;
}
var launchUrl = 'dingtalk://dingtalkclient/page/link?url=' + window.location.href;
var downloadUrl = 'https://h5.dingtalk.com/base/download.html';
var ua = window.navigator.userAgent;
var isIos = /iphone|ipod|ipad/ig.test(ua);
var isUC = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/);
var isChrome = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/);
var isQQ = ua.match(/MQQBrowser\/([\d\.]+)/);
var isDingTalk = ua.indexOf('DingTalk') !== -1;
var isWechat = ua.indexOf('MicroMessenger') !== -1;

//参数
var sn = getUrlParam('sn') || 'VNC3J00017';
var serviceId = getUrlParam('serviceId') || '22';

var appUrl = 'https://h5.dingtalk.com/cloudprinter/index.html#/printerfilelist?sn='+sn+'&serviceId='+serviceId;

//在钉钉打开

if (isDingTalk && window.dd) {
    if (window.dd.compareVersion('4.2.6', window.dd.version, true)) {
        window.location.href = appUrl;
    } else {
        window.location.href = downloadUrl;
    }
}

window.onload = function() {
  var btn = document.createElement('div');
  var btnWrap = document.createElement('div');
  btnWrap.className = 'bottom-btn-wrap';
  btn.className = 'bottom-btn';
  btn.innerHTML = '开启钉钉安全云打印';
  document.body.appendChild(btnWrap);
  btnWrap.appendChild(btn);
  // var btn = document.getElementById('downLoadBtn');
  btn.onclick = function() {
    if (isWechat) {
      var guideWrap = document.createElement('div');
      var guideClose = document.createElement('div');
      guideWrap.className = 'wechat-guide-wrap';
      guideClose.className = 'wechat-guide-close';
      guideWrap.style.height = document.documentElement.clientHeight + 'px';
      document.body.appendChild(guideWrap);
      guideWrap.appendChild(guideClose);
      guideClose.onclick = function() {
        document.body.removeChild(guideWrap);
      }
      return false;
    }
    else if (isIos) {
        window.location.href = launchUrl;
    } else {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';

        if (!isUC && (isChrome || isQQ)) {
            iframe.src = launchUrl.replace('dingtalk://', 'intent://') + '#Intent;scheme=dingtalk;package=com.alibaba.android.rimet;end';
        } else {
            iframe.src = launchUrl;
        }

        document.body.appendChild(iframe);
        time = 1000;
    }

    setTimeout(function () {
        if (!isWechat && !document.hidden) {
            window.location.href = downloadUrl;
        }
    }, time);
    return false;
  }

}




