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



function test_feed_blog() {
}
function test_feed_label() {
}

function test_feed(label,max) {

  $.ajax({
    url: feed(label,max),
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      var posturl = "";
      var htmlcode = '<ul>';
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
        htmlcode += '<li><div><a href="'+posturl+'" target="_blank">'+posttitle+'</a></div><div>'+postcontent+'</div></li>';
      }
      htmlcode += '</ul>';
      document.getElementById('result').innerHTML = htmlcode;
    }
  });

}
