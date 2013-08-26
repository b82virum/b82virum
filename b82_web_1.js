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

function show_feed(div,label,max,header,footer,show_title,show_link,show_content,link_hl) {

  $.ajax({
    url: feed(label,max),
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      
      // First/last post
      var fi = 0;
      var li = data.feed.entry.length;
      // If random +++
      
      // If any, show header
      if (fi < li) {
        document.getElementById(div).innerHTML += header;
      }
      
      for (var i = fi; i < li; i++) {
        
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
        
        // +++title+link

        // content
        if (show_content == 1) {
          document.getElementById(div).innerHTML += '<p>' + content + '</p>';
        }  
        
      }

      // If any, show footer
      if (fi < li) {
        document.getElementById(div).innerHTML += footer;
      }

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

