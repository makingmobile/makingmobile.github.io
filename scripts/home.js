(function() {
  var MAX_WEIBO_NUM, URL_SUBSCRIBE, weiboList;

  $('.carousel').carousel('cycle');

  MAX_WEIBO_NUM = 2;

  weiboList = [];

  URL_SUBSCRIBE = 'http://team.makingmobile.org/siteservice/subscribe';

  $.ajax({
    url: 'https://api.weibo.com/2/statuses/user_timeline.json',
    data: 'trim_user=1&screen_name=makingmobile&source=2849184197',
    dataType: 'jsonp',
    success: function(data) {
      var datestring, delta_Dayes, delta_Hours, delta_Minutes, i, idx, now, _i, _j, _len, _ref, _results;

      if (data.code !== 1) {
        return;
      }
      _ref = data.data.statuses;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        i = _ref[idx];
        weiboList.push({
          text: i.text,
          date: new Date(i.created_at)
        });
      }
      $('#__recent-weibo__').html('');
      now = new Date();
      _results = [];
      for (i = _j = 0; 0 <= MAX_WEIBO_NUM ? _j < MAX_WEIBO_NUM : _j > MAX_WEIBO_NUM; i = 0 <= MAX_WEIBO_NUM ? ++_j : --_j) {
        if (i >= weiboList.length) {
          break;
        }
        delta_Minutes = (now - weiboList[i].date) / 1000 / 60;
        delta_Hours = delta_Minutes / 60;
        delta_Dayes = delta_Hours / 24;
        if (delta_Dayes >= 10) {
          datestring = 'n天以前';
        } else if (delta_Dayes >= 1) {
          datestring = Math.round(delta_Dayes) + '天以前';
        } else if (delta_Hours >= 1) {
          datestring = Math.round(delta_Hours) + '小时以前';
        } else if (delta_Minutes >= 5) {
          datestring = Math.round(delta_Minutes) + '分钟以前';
        } else {
          datestring = '刚刚发布';
        }
        _results.push($('#__recent-weibo__').append("<li>\n	<a href=\"http://weibo.com/makingmobile\">@makingmobile</a>&nbsp;" + weiboList[i].text + "\n	&nbsp;<a>" + datestring + "</a>\n</li>"));
      }
      return _results;
    }
  });

  $('#__subscribe-form__').on('submit', function(event) {
    var email, name;

    name = $('#__subscribe-name__').val();
    email = $('#__subscribe-email__').val();
    if (name.length > 1 && email.length > 5) {
      $.ajax({
        url: URL_SUBSCRIBE,
        data: {
          username: name,
          email: email
        },
        type: 'GET',
        error: function(xhr, status, err) {
          return console.log(status + ':' + err);
        },
        success: function(data) {
          if (data === 'success') {
            $('#__subscribe-name__').val("");
            $('#__subscribe-name__').attr('placeholder', '订阅成功');
            $('#__subscribe-email__').val("");
            $('#__subscribe-email__').attr('placeholder', '感谢关注');
          } else {
            $('#__subscribe-name__').val("");
            $('#__subscribe-name__').attr('placeholder', '订阅失败');
            $('#__subscribe-email__').val("");
            $('#__subscribe-email__').attr('placeholder', '请稍后尝试');
          }
          return console.log(data);
        }
      });
    }
    return event.preventDefault();
  });

}).call(this);
