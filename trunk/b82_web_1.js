// See README file.

function blog_feed(labels,max) {
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

function show_blog_feed(div,labels,max,random,header,show_title,show_content) {

  $.ajax({
    url: feed(labels,max),
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      
      // First/last post
      var fi = 0;
      var li = data.feed.entry.length;
      
      // If random
      if (random) {
        if (fi < li) {
          fi = Math.floor((Math.random()*1000)) % li;
          li = fi+1;
        }
      }
      
      // If any, show header
      if (fi < li) {
        document.getElementById(div).innerHTML += '<h2>' + header + '</h2>';
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
        
        // title+link
        if (show_title == 1) {
          document.getElementById(div).innerHTML += '<a href="' + href + '">' + '<h3>' + title + '</h3>' + '</a>';
        }

        // content
        if (show_content == 1) {
          document.getElementById(div).innerHTML += '<p>' + content + '</p>';
        }  
        
      }

    }

  });

}

function show_posts(div,labels,header) {
  
  show_blog_feed(div,labels,'','',header,1,1);

}
