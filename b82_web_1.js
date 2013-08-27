// See README file.

var b82divn = 0;

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
  // http://blog.b82.dk/feeds/posts/default?alt=json-in-script&max-results=255&callback=?
  // http://blog.b82.dk/feeds/posts/default/-/label1?alt=json-in-script&max-results=255&callback=?
  // http://blog.b82.dk/feeds/posts/default/-/label1/label2?alt=json-in-script&max-results=255&callback=?
}

function show_feed(div,labels,max,random,header,show_title,show_content) {

  $.ajax({
    url: blog_feed(labels,max),
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

function show_blog_feed(div,labels,max,random,header,show_title,show_content) {
  b82divn++;
  alert('<div id="' + div+b82divn + '"></div>');
  document.getElementById(div).innerHTML += '<div id="' + div+b82divn + '"></div>';
  show_feed(div+b82divn,labels,max,random,header,show_title,show_content);
}

function show_post(div,labels,header) {
  
  show_blog_feed(div,labels,'','',header,1,1);

}

function show_some_post(div,labels,header) {
  
  show_blog_feed(div,labels,5,'',header,1,1);

}

function show_body(div,labels) {
  
  show_blog_feed(div,labels,'','','',0,1);

}

function show_random(div,labels) {
  
  show_blog_feed(div,labels,'',1,'',0,1);

}

function show_team(div,label,name,alias,cal1,cal2,spare3,spare4) {

  document.getElementById(div).innerHTML += '<h1>' + alias + '</h1>';
  
  show_body(div,label+' Intro');

  show_random(div,label+' Sponsor');

  //document.write(''
  //  + '<h2>'
  //  + 'Træningstider'
  //  + '</h1>'
  //);
  //show_times(name);
  
  //show_price(name);
  
  //show_team_calendar(label+'%20Glimt',name,cal1,cal2);

  show_post(div,label+' Holdleder','Holdledere');

  show_post(div,label+' Træner','Trænere');

  show_post(div,label+' Glimt','Glimt');

  show_body(div,label+' Extra');

}

function page_start(div) {

  document.getElementById(div).innerHTML += 'ddd'
    + '<style type="text/css">'
    + '.blogger-post-footer {'
    + '  visibility: hidden;'
    + '}'
    + 'h1 {'
    + '  text-align: center;'
    + '}'
    + 'h1, h2, a {'
    + '  color: red;'
    + '}'
    + 'h3, h4, h5, h6 {'
    + '  color: black;'
    + '}'
    + '.mobile-photo {'
    + '  text-align: center;'
    + '}'
    + '.mobile-photo * {'
    + '  text-align: center;'
    + '}'
    + '</style>'
  ;
  
  show_body('B82 Header');
  
}

function page_end(div) {

  document.getElementById(div).innerHTML += '<p><div style="text-align: center;"><a href="http://www.sportyfied.com/to/vm59e9" target="_blank"><img alt="Sportyfied" border="0" height="160" src="http://www.sportyfied.com/simg/vm59e9.jpg" style="border-style:none; padding:0;" title="B82 webshop" width="920" /></a></div></p>';

  show_body(div,'B82 Footer');

}

