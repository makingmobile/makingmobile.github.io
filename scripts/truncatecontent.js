(function() {
  var $contentBlocks;

  $contentBlocks = $('.truncate-content');

  $contentBlocks.each(function() {
    var date, href, html_date, html_more, title;

    href = $(this).attr('url');
    title = $(this).attr('title');
    date = $(this).attr('date');
    html_date = "<div class='date'>" + date + "</div>";
    html_more = "<div class='link'><a href=" + href + " title=" + title + ">...详细内容</a></div>";
    return $(this).append("<div class='more'>" + html_date + " " + html_more + "</div>");
  });

}).call(this);
