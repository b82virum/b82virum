// See README file.

function feed(labels,max) {
  var dmax = 255;
  var r = '';
  r = r + 'http://blog.b82.dk/feeds/posts/default';
  if (labels != '') {
    r = r + '/-/' + labels;
  }
  if (max != '') {
    dmax = max;
  }
  r = r + '?alt=json-in-script&max-results=' + dmax + '&callback=?';
  return r;
  // http://blog.b82.dk/feeds/posts/default?alt=json-in-script&max-results=255&callback=x
  // http://blog.b82.dk/feeds/posts/default/-/label1/label2?alt=json-in-script&max-results=255&callback=x
}

function show_feed(div,label,max) {

  $.ajax({
    url: feed(label,max),
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      
      // ... before list
      
      // For each post
      for (var i = 0; i < data.feed.entry.length; i++) {
        
        // href
        var href = '';
        for (var j=0; j < data.feed.entry[i].link.length; j++) {
          if (data.feed.entry[i].link[j].rel == 'alternate') {
            href = data.feed.entry[i].link[j].href;
            break;
          }
        }
        
        // title
        var title = data.feed.entry[i].title.$t;

        // content
        var content = '';
        if ('content' in data.feed.entry[i]) {
          content = data.feed.entry[i].content.$t;
        } else if ('summary' in data.feed.entry[i]) {
          content = data.feed.entry[i].summary.$t;
        }
        
        ...
        
      }

      // ... before list

    }

  });

}

// document.getElementById(div).innerHTML += '</ul>';

function test_feed_blog(div) {
  test_feed('','3',div);
}
function test_feed_label(div) {
  test_feed('Årgang%202006%20Glimt','',div);
}

