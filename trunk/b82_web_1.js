// See README file.

function feed(label,max) {
  var dmax = 255;
  var r = '';
  r = r + 'http://blog.b82.dk/feeds/posts/default';
  if (label != '') {
    r = r + '/-/' + label;
  }
  if (max != '') {
    dmax = max;
  }
  r = r + '?alt=json-in-script&max-results=' + dmax + '&callback=?';
  return r;
}

function test_feed_blog(div) {
  test_feed('','',div);
}
function test_feed_label(div) {
  test_feed('Årgang%202006%20Glimt','3',div);
}

function test_feed(label,max,div) {
  //var html = 'hello<'+feed(label,max)+'>';
  var html = 'hellox';

  $.ajax({
    url: feed(label,max),
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      var posturl = "";
      html += '<ul>';
      for (var i = 0; i < data.feed.entry.length; i++) {
        for (var j=0; j < data.feed.entry[i].link.length; j++) {
          if (data.feed.entry[i].link[j].rel == "alternate") {
            posturl = data.feed.entry[i].link[j].href;
            break;
          }
        }
        if ("content" in data.feed.entry[i]) {
          var postcontent = data.feed.entry[i].content.$t;
        } else if ("summary" in data.feed.entry[i]) {
          var postcontent = data.feed.entry[i].summary.$t;
        } else {
          var postcontent = "";
        }
        var posttitle = data.feed.entry[i].title.$t;
        html += '<li><div><a href="'+posturl+'" target="_blank">'+posttitle+'</a></div><div>'+postcontent+'</div></li>';
      }
      html += '</ul>';
    }
  });

  document.getElementById(div).innerHTML = html;
}
