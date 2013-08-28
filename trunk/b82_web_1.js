// See README file.

// b82uid() will return a uniq id
var b82uid = (function(){var id=0;return function(){if(arguments[0]===0)id=0;return id++;}})();

function show_html(div,html) {

  var n = b82uid();
  document.getElementById(div).innerHTML += '<div id="' + div+n + '"></div>';
  $('#'+div).append('<div id="' + div+n + '"></div>');
  div += n;

  $.ajax()
    // .done(function()   { alert("success");  })
    // .fail(function()   { alert("error");    })
    // .always(function() { alert("complete"); })
    .always(function() { document.getElementById(div).innerHTML += html; })
  ;
  
}

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

function show_blog_feed(div,labels,max,random,header,show_title,show_content) {

  var n = b82uid();
  document.getElementById(div).innerHTML += '<div id="' + div+n + '"></div>';
  div += n;

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

function page_start(div) {

  document.getElementById(div).innerHTML += 'bbb'
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
  
  show_body(div,'B82 Header');
  
}

function page_end(div) {

  document.getElementById(div).innerHTML += '<p><div style="text-align: center;"><a href="http://www.sportyfied.com/to/vm59e9" target="_blank"><img alt="Sportyfied" border="0" height="160" src="http://www.sportyfied.com/simg/vm59e9.jpg" style="border-style:none; padding:0;" title="B82 webshop" width="920" /></a></div></p>';

  show_body(div,'B82 Footer');

}

function show_times(div,team) {

  var n = b82uid();
  document.getElementById(div).innerHTML += '<div id="' + div+n + '"></div>';
  div += n;

  $.ajax({
    url: 'https://spreadsheets.google.com/feeds/list/0Akm30OX8lPv2dFI4V24tZ19hUWxQQV9rU1hja19JZXc/2/public/values?alt=json-in-script&callback=?',
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      
      var len = data.feed.entry.length;

      var last_season='';
      var last_day='';

      document.getElementById(div).innerHTML += '<p><table border="1" bordercolor="red">';

      for (var i=0; i<len; i++) {

        if (team != '') {
          if (data.feed.entry[i].gsx$team.$t != team) {
            continue;
          }
        }

        if (data.feed.entry[i].gsx$season.$t != last_season) {

          if (team == '') {
            document.getElementById(div).innerHTML +=
              '<tr><th colspan="4">' +
              '<div style="text-align: center;">' +
              data.feed.entry[i].gsx$season.$t +
              '</div>' +
              '</th></tr>';
          }
          else {
            document.getElementById(div).innerHTML +=
              '<tr><th colspan="3">' +
              '<div style="text-align: center;">' +
              data.feed.entry[i].gsx$season.$t +
              '</div>' +
              '</th></tr>';
          }

          last_season=data.feed.entry[i].gsx$season.$t;
          last_day='';

          document.getElementById(div).innerHTML += '<tr>';

          document.getElementById(div).innerHTML +=
            '<th>' +
            'Dag' +
            '</th>';

          document.getElementById(div).innerHTML +=
            '<th>' +
            'Tid' +
            '</th>';

          document.getElementById(div).innerHTML +=
            '<th>' +
            'Sted' +
            '</th>';

          if (team == '') {

            document.getElementById(div).innerHTML +=
              '<th>' +
              'Hold' +
              '</th>';

          }

          document.getElementById(div).innerHTML += '</tr>';

        }

        document.getElementById(div).innerHTML += '<tr>';

        if (data.feed.entry[i].gsx$day.$t != last_day) {

          document.getElementById(div).innerHTML +=
            '<th>' +
            data.feed.entry[i].gsx$day.$t +
            '</th>';

          last_day=data.feed.entry[i].gsx$day.$t;

        }
        else {

          document.getElementById(div).innerHTML +=
            '<td>' +
            '</td>';

        }

        document.getElementById(div).innerHTML +=
          '<td>' +
          data.feed.entry[i].gsx$time.$t +
          '</td>';

        document.getElementById(div).innerHTML +=
          '<td>' +
          data.feed.entry[i].gsx$place.$t +
          '</td>';

        if (team == '') {

          document.getElementById(div).innerHTML +=
            '<td>' +
            data.feed.entry[i].gsx$team.$t +
            '</td>';

        }

        document.getElementById(div).innerHTML += '</tr>';

      }

      document.getElementById(div).innerHTML += '</table></p>';
      
    }
    
  });

}

function show_team(div,label,name,alias,cal1,cal2,spare3,spare4) {

  document.getElementById(div).innerHTML += '<h1>' + alias + '</h1>';
  
  show_body(div,label+' Intro');

  show_random(div,label+' Sponsor');

  document.getElementById(div).innerHTML += '<h2>Træningstider</h2>';
  show_times(div,label);
  
  //show_price(name);
  
  //show_team_calendar(label+'%20Glimt',name,cal1,cal2);

  show_post(div,label+' Holdleder','Holdledere');

  show_post(div,label+' Træner','Trænere');

  show_post(div,label+' Glimt','Glimt');

  show_body(div,label+' Extra');

}

