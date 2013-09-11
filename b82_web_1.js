// See README file.

// b82uid() will return a uniq id
var b82uid = (function(){var id=0;return function(){if(arguments[0]===0)id=0;return id++;}})();

function show_html(div,html) {

  var n = b82uid();
  $('#'+div).append('<div id="' + div+n + '"></div>');
  div += n;

  $.ajax()
    // .done(function()   { alert("success");  })
    // .fail(function()   { alert("error");    })
    // .always(function() { alert("complete"); })
    .always(function() { $('#'+div).append(html); })
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

function show_blog_feed(div,labels,max,random,header,show_title,show_content,show_vcard) {

  var n = b82uid();
  $('#'+div).append('<div id="' + div+n + '"></div>');
  div += n;

  $.ajax({
    url: blog_feed(labels,max),
    type: 'get',
    dataType: 'jsonp'})
    .done(function(data) {
      
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
      
      // If any, show header, if any
      if (fi < li) {
        if (header != '') {
          $('#'+div).append('<h2>' + header + '</h2>');
        }  
      }
      
      for (var i = fi; i < li; i++) {
        
        var html;
        
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
        
        html = '<div style="page-break-inside:avoid;">';
        
        // title+link
        if (show_title == 1) {
          html += '<a href="' + href + '">' + '<h3>' + title + '</h3>' + '</a>';
        }

        // content
        if (show_content == 1) {
        
          // vcard
          if (show_vcard == 1) {
          
            var vcard;
            var name;
            var tel;
            var email;
            var n;
            
            name = title;
            n = name.lastIndexOf(' ');
            if (n != -1) {
              name = name.slice(n+1) + ';' + name.slice(0,n);
            }
            
            tel = '';
            n = content.indexOf('tel:');
            if (n != -1) {
              tel = content.slice(n+4,content.indexOf('"',n));
            }
            
            email = '';
            n = content.indexOf('mailto:');
            if (n != -1) {
              email = content.slice(n+7,content.indexOf('"',n));
            }
            
            vcard = '';
            
            vcard += '<img src="http://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0A';
            
            vcard += 'N%3A' + name + '%0A';
            
            vcard += 'ORG%3AB82%0A';
            
            if (tel != '') {
              vcard += 'TEL%3A' + tel + '%0A';
            }
            
            if (email != '') {
              vcard += 'EMAIL%3A' + email + '%0A';
            }
            
            vcard += 'END%3AVCARD%0A&size=200x200"/>';
            
            n = content.indexOf('<img ');
            if (n != -1) {
              n = content.indexOf('>',n);
              if (n != -1) {
                n++;
                content = content.slice(0,n) + vcard + content.slice(n);
              }
            }
            
          }
          
          html += '<p>' + content + '</p>';
        }  

        html += '</div>';

        $('#'+div).append(html);
        
      }

    })

  ;

}

function show_contact(div,labels,header) {
  
  show_blog_feed(div,labels,'','',header,1,1,1);

}

function show_post(div,labels,header) {
  
  show_blog_feed(div,labels,'','',header,1,1,'');

}

function show_latest_post(div,labels,header) {
  
  show_blog_feed(div,labels,1,'',header,1,1,'');

}

function show_some_post(div,labels,header) {
  
  show_blog_feed(div,labels,5,'',header,1,1,'');

}

function show_body(div,labels) {
  
  show_blog_feed(div,labels,'','','',0,1,'');

}

function show_random(div,labels) {
  
  show_blog_feed(div,labels,'',1,'',0,1,'');

}

function page_start(div) {
  var ndiv;

  $('#'+div).append(''
    + '<style type="text/css">'
    + '.blogger-post-footer {'
    + '  visibility: hidden;'
    + '}'
    + 'h1, h2, h3 {'
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
    + '#header {display:none !important;}'
    + '@media print'
    + '{'
    + '.noprint, #slideshow-wrapper, #menu-wrapper, #copyright {display:none !important;}'
    + '#main {border-style:none !important;}'
    + '}'
    + '</style>'
  );

  ndiv=div+'header';
  $('#'+div).append('<div id="' + ndiv + '" class="noprint"></div>');
  show_body(ndiv,'B82 Header');
  
}

function page_end(div) {
  var ndiv;

  $('#'+div).append('<div class="noprint"><p><div style="text-align: center;"><a href="http://www.sportyfied.com/to/vm59e9" target="_blank"><img alt="Sportyfied" border="0" height="160" src="http://www.sportyfied.com/simg/vm59e9.jpg" style="border-style:none; padding:0;" title="B82 webshop" width="920" /></a></div></p></div>');

  ndiv=div+'footer';
  $('#'+div).append('<div id="' + ndiv + '" class="noprint"></div>');
  show_body(ndiv,'B82 Footer');

}

function show_payments(div,label) {

  var n = b82uid();
  $('#'+div).append('<div id="' + div+n + '"></div>');
  div += n;

  $('#'+div).html('<p>Hvis du ikke ser kontingent her (men denne tekst), så log ind og/eller ud på <a href="http://www.google.com">google</a>!</p>');
  
  $.ajax({
    url: 'https://spreadsheets.google.com/feeds/list/0Akm30OX8lPv2dEdfOTFvbnZpdDlJb1VrLTdPMW1QZ0E/2/public/values?alt=json-in-script&callback=?',
    type: 'get',
    dataType: 'jsonp'})
    .done(function(data) {
      
      var html = '';
      var len = data.feed.entry.length;

      html += '<p><div style="text-align:center;"><table border="1" bordercolor="red"><tbody>';

      html += '<tr>';

      html += '<th>' +
              'Sæson' +
              '</th>';

      html += '<th>' +
              'Forfald' +
              '</th>';

      html += '<th>' +
              'Beløb' +
              '</th>';

      if (label == '') {

        html += '<th>' +
                'Hold' +
                '</th>';

      }

      html += '</tr>';

      for (var i=0; i<len; i++) {

        if (label != '') {
          if (data.feed.entry[i].gsx$team.$t != label) {
            continue;
          }
        }

        html += '<tr>';

        html += '<td>' +
                data.feed.entry[i].gsx$season.$t +
                '</td>';

        html += '<td>' +
                data.feed.entry[i].gsx$due.$t +
                '</td>';

        html += '<td><div style="text-align: right;">' +
                data.feed.entry[i].gsx$price.$t +
                '</div></td>';

        if (label == '') {

          html += '<td>' +
                  data.feed.entry[i].gsx$team.$t +
                  '</td>';

        }

        html += '</tr>';

      }

      html += '</tbody></table></div></p>';

      $('#'+div).html(html);

    })

  ;

}

function show_times(div,label) {

  var n = b82uid();
  $('#'+div).append('<div id="' + div+n + '"></div>');
  div += n;

  $('#'+div).html('<p>Hvis du ikke ser træningstider her (men denne tekst), så log ind og/eller ud på <a href="http://www.google.com">google</a>!</p>');
      
  $.ajax({
    url: 'https://spreadsheets.google.com/feeds/list/0Akm30OX8lPv2dFI4V24tZ19hUWxQQV9rU1hja19JZXc/2/public/values?alt=json-in-script&callback=?',
    type: 'get',
    dataType: 'jsonp'})
    .done(function(data) {
      
      var html = '';
      var len = data.feed.entry.length;

      var last_season='';
      var last_day='';

      html += '<p><div style="text-align:center;"><table border="1" bordercolor="red"><tbody>';

      for (var i=0; i<len; i++) {

        if (label != '') {
          if (data.feed.entry[i].gsx$team.$t != label) {
            continue;
          }
        }

        if (data.feed.entry[i].gsx$season.$t != last_season) {

          if (label == '') {
            html +=
              '<tr><th colspan="4">' +
              '<div style="text-align: center;">' +
              data.feed.entry[i].gsx$season.$t +
              '</div>' +
              '</th></tr>'
            ;
          }
          else {
            html +=
              '<tr><th colspan="3">' +
              '<div style="text-align: center;">' +
              data.feed.entry[i].gsx$season.$t +
              '</div>' +
              '</th></tr>'
            ;
          }

          last_season=data.feed.entry[i].gsx$season.$t;
          last_day='';

          html += '<tr>';

          html +=
            '<th>' +
            'Dag' +
            '</th>'
          ;

          html +=
            '<th>' +
            'Tid' +
            '</th>'
          ;

          html +=
            '<th>' +
            'Sted' +
            '</th>'
          ;

          if (label == '') {

            html +=
              '<th>' +
              'Hold' +
              '</th>'
            ;

          }

          html += '</tr>';

        }

        html += '<tr>';

        if (data.feed.entry[i].gsx$day.$t != last_day) {

          html +=
            '<th>' +
            data.feed.entry[i].gsx$day.$t +
            '</th>'
          ;

          last_day=data.feed.entry[i].gsx$day.$t;

        }
        else {

          html +=
            '<td>' +
            '</td>'
          ;

        }

        html +=
          '<td>' +
          data.feed.entry[i].gsx$time.$t +
          '</td>'
        ;

        html +=
          '<td>' +
          data.feed.entry[i].gsx$place.$t +
          '</td>'
        ;

        if (label == '') {

          html +=
            '<td>' +
            data.feed.entry[i].gsx$team.$t +
            '</td>'
          ;

        }

        html += '</tr>';

      }

      html += '</tbody></table></div></p>';

      $('#'+div).html(html);
      
    })
    
  ;

}

function show_join(div,join1,join2) {

  if (join1 == '') {
    return;
  }
  
  var html = '';
  
  html += '<h2>Indmeld</h2>';
  html += '<div id="joinmsg"></div>';
  html += '<p><b>Aftal med din træner/holdleder hvornår du skal melde dig ind.</b></p>';
  html += '<p>';
  html += 'I B82 bruger vi <a href="http://www.holdsport.dk">holdsport.dk</a> til medlemsregistrering og kontingentopkrævning. ';
  html += 'Se <a href="http://www.b82.dk/?id=259&c=Indmeld">Indmeld siden</a> for hjælp og vejledning.';
  html += '</p>';
  html += '<h3>Er du ny på holdsport.dk?</h3><p><button onclick="join_click(' + "'" + join1 + "'" + ')">Klik her for at oprette dig på holdsport.dk og tilmelde dig til holdet</button></p>';
  html += '<h3>Har du en allerede profil på holdsport.dk?</h3><p><button onclick="join_click(' + "'" + join2 + "'" + ')">Klik her for at knytte din profil til holdet</button></p>';

  $('#'+div).append(html);
  
}

function join_click(join) {
  $('#joinmsg').html('');
  var captcha1 = Math.floor((Math.random()*1000)) % 10;
  var captcha2 = Math.floor((Math.random()*1000)) % 10;
  var answer = prompt('Hvad er ' + captcha1 + ' plus ' + captcha2 + ' ?','');
  if (answer == captcha1 + captcha2) {
    window.location.assign('http://holdsport.dk/' + join);
    return true;
  }
  if (answer != null) {
    $('#joinmsg').html('<mark>Forkert!</mark>');    
  }
  return false;
}

function show_team_1(div,label,alias,join1,join2) {
  var ndiv;
  
  $('#'+div).append('<h1>' + alias + '</h1>');

  show_body(div,label+' Intro');

  ndiv=div+'sponsor';
  $('#'+div).append('<div id="' + ndiv + '" class="noprint"></div>');
  show_random(ndiv + 'sponsor',label+' Sponsor');

  $('#'+div).append('<h2>Træningstider</h2>');
  show_times(div,label);
  
  ndiv=div+'payment';
  $('#'+div).append('<div id="' + ndiv + '" class="noprint"></div>');
  $('#'+ndiv).append('<h2>Kontingent</h2>');
  show_payments(ndiv,label);

  ndiv=div+'join';
  $('#'+div).append('<div id="' + ndiv + '" class="noprint"></div>');
  show_join(ndiv,join1,join2);

  show_contact(div,label+' Holdleder','Holdledere');

  show_contact(div,label+' Træner','Trænere');

  show_contact(div,label+' Assistenttræner','Assistenttrænere');

  ndiv=div+'hilite';
  $('#'+div).append('<div id="' + ndiv + '" class="noprint"></div>');
  show_post(ndiv,label+' Glimt','Glimt');

  ndiv=div+'extra';
  $('#'+div).append('<div id="' + ndiv + '" class="noprint"></div>');
  show_body(ndiv,label+' Extra');

}

function show_team(div,label,alias) {
  
  show_team_1(div,label,alias,'','');

}
