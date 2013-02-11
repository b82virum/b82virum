// See README file.

function show_1_random_post_body_cb(json) {

  var i = Math.floor((Math.random()*1000)) % json.feed.openSearch$totalResults.$t;

  document.write(''
    + '<p>'
    + json.feed.entry[i].content.$t
    + '</p>'
  );

}    

function show_1_random_post_body(label) {

  document.write('<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results=255&callback=show_1_random_post_body_cb" type="text/javascript"></script>');

}

function show_1_random_sponsor(label) {

  show_1_random_post_body(label);

}

function show_post_body(json) {

  for (var i=0;i < json.feed.openSearch$totalResults.$t;i++) {

    document.write(''
      + '<p>'
      + json.feed.entry[i].content.$t
      + '</p>'
    );
    
  }

}    

function show_all_post_body(label) {

  document.write('<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results=255&callback=show_post_body" type="text/javascript"></script>');

}

function show_all_sponsor(label) {

  show_all_post_body(label);

}

function show_intro(label) {

  show_all_post_body(label);

}

function show_extra(label) {

  show_all_post_body(label);

}

function show_header(label) {

  show_all_post_body(label);

}

function show_footer(label) {

  show_all_post_body(label);

}

function show_post(json) {

  for (var i=0;i < json.feed.openSearch$totalResults.$t;i++) {
  
    var link;  
    for (var j=0; j < json.feed.entry[i].link.length; j++) {
      if (json.feed.entry[i].link[j].rel == 'alternate') {
        link = json.feed.entry[i].link[j].href;
        break;
      }
    }

    document.write(''
      + '<a href="'
      + link
      + '">'
      + '<h3>'
      + json.feed.entry[i].title.$t
      + '</h3>'
      + '</a>'
      + '<p>'
      + json.feed.entry[i].content.$t
      + '</p>'
    );
    
  }

}    

function show_hilite_cb(json) {

  document.write(''
    + '<h2>'
    + 'Glimt'
    + '</h2>'
  );

  show_post(json);
  
}

function show_hilite(label) {

  document.write(''
    + '<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results='
    + 5
    + '&callback=show_hilite_cb" type="text/javascript"></script>'
  );

}

function show_leader_cb(json) {

  document.write(''
    + '<h2>'
    + 'Holdledere'
    + '</h2>'
  );

  show_post(json);
  
}

function show_leader(label) {

  document.write(''
    + '<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results='
    + 255
    + '&callback=show_leader_cb" type="text/javascript"></script>'
  );

}

function show_coach_cb(json) {

  document.write(''
    + '<h2>'
    + 'Trænere'
    + '</h2>'
  );

  show_post(json);
  
}

function show_coach(label) {

  document.write(''
    + '<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results='
    + 255
    + '&callback=show_coach_cb" type="text/javascript"></script>'
  );

}

function show_board_cb(json) {

  document.write(''
    + '<h2>'
    + 'Bestyrelsen'
    + '</h2>'
  );

  show_post(json);
  
}

function show_board(label) {

  document.write(''
    + '<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results='
    + 255
    + '&callback=show_board_cb" type="text/javascript"></script>'
  );

}

function show_shop_people_cb(json) {

  document.write(''
    + '<h2>'
    + 'Shoppen'
    + '</h2>'
  );

  show_post(json);
  
}

function show_shop_people(label) {

  document.write(''
    + '<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results='
    + 255
    + '&callback=show_shop_people_cb" type="text/javascript"></script>'
  );

}

function show_graphic_cb(json) {

  document.write(''
    + '<h2>'
    + 'Grafik'
    + '</h2>'
  );

  show_post(json);
  
}

function show_graphic(label) {

  document.write(''
    + '<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results='
    + 255
    + '&callback=show_graphic_cb" type="text/javascript"></script>'
  );

}

function page_start() {

  document.write(''
    + '<style type="text/css">'
    + '  .blogger-post-footer {'
    + '  visibility: hidden;'
    + '}'
    + 'li.f2jnag {'
    + '  display: none;'
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
    + '</style>'
  );

  /*
  document.write(''
    + '<img id="b82logo" width="960px" height="960px" style="position: fixed; left: 50%; margin-left: -485px; top: 0px; z-index: 255; border-style: none; background-color: transparent;" border="0" src="https://lh6.googleusercontent.com/-viTn7BuAhK8/T_C5WooraDI/AAAAAAAAC3M/QhybnVT1HBM/s960/Logo.RedbaseWhitebackTrans.png"/>'
  );
  */
  
  show_header('B82%20Header');
  
}

/*
$(document).ready(function(){

  $("#b82logo").animate({
    opacity:'0',
    height:'0px',
    width:'0px'
  },3000);

});
*/

function page_end() {

  show_footer('B82%20Footer');

}

var show_times_team='';
function show_times_cb(json) {

  var len = json.feed.entry.length;

  var last_season='';
  var last_day='';

  document.write('<p><table border="1" bordercolor="red">');

  for (var i=0; i<len; i++) {

    if (show_times_team != '') {
      if (json.feed.entry[i].gsx$team.$t != show_times_team) {
        continue;
      }
    }

    if (json.feed.entry[i].gsx$season.$t != last_season) {

      if (show_times_team == '') {
        document.write('<tr><th colspan="4">' +
                       '<div style="text-align: center;">' +
                       json.feed.entry[i].gsx$season.$t +
                       '</div>' +
                       '</th></tr>');
      }
      else {
        document.write('<tr><th colspan="3">' +
                       '<div style="text-align: center;">' +
                       json.feed.entry[i].gsx$season.$t +
                       '</div>' +
                       '</th></tr>');
      }

      last_season=json.feed.entry[i].gsx$season.$t;
      last_day='';

      document.write('<tr>');

      document.write('<th>' +
                     'Dag' +
                     '</th>');

      document.write('<th>' +
                     'Tid' +
                     '</th>');

      document.write('<th>' +
                     'Sted' +
                     '</th>');

      if (show_times_team == '') {

        document.write('<th>' +
                       'Hold' +
                       '</th>');

      }

      document.write('</tr>');

    }

    document.write('<tr>');

    if (json.feed.entry[i].gsx$day.$t != last_day) {

      document.write('<th>' +
                     json.feed.entry[i].gsx$day.$t +
                     '</th>');

      last_day=json.feed.entry[i].gsx$day.$t;

    }
    else {

      document.write('<td>' +
                     '</td>');

    }

    document.write('<td>' +
                   json.feed.entry[i].gsx$time.$t +
                   '</td>');

    document.write('<td>' +
                   json.feed.entry[i].gsx$place.$t +
                   '</td>');

    if (show_times_team == '') {

      document.write('<td>' +
                     json.feed.entry[i].gsx$team.$t +
                     '</td>');

    }

    document.write('</tr>');

  }

  document.write('</table></p>');

}   

function show_times(team) {

  show_times_team=team;

  document.write('<script src="https://spreadsheets.google.com/feeds/list/0Akm30OX8lPv2dFI4V24tZ19hUWxQQV9rU1hja19JZXc/2/public/values?alt=json-in-script&callback=show_times_cb" type="text/javascript"></script>');

}

function show_team_calendar(label,name,cal1,cal2) {


  var labelx = label.replace(/%20/g,'%2520');
  var namex = name.replace(/ /g,'%20');
  var cal1x = '';
  var cal2x = '';

  if (cal1 != '')
    cal1x='+' + cal1;
  if (cal2 != '')
    cal2x='+' + cal2;

  document.write(''
  + '<h2>Kalender</h2><p>'
  + '<iframe scrolling="no" frameborder="0" src="http://30boxes.com/external/widget?url=http://blog.b82.dk/feeds/posts/default/-/'
  + labelx
  + cal1x
  + cal2x
  + '+&forceTitle='
  + namex
  + '&forceTheme=%2Ftheme%2Fsmall&forceRows=5" width=712 height=590 style="border: none;"></iframe>'
  + '</p>'
  );

}

var show_price_team='';
function show_price_cb(json) {

  var len = json.feed.entry.length;

  document.write('<p><table border="1" bordercolor="red">');

  document.write('<tr>');

  document.write('<th>' +
                 'Sæson' +
                 '</th>');

  document.write('<th>' +
                 'Forfald' +
                 '</th>');

  document.write('<th>' +
                 'Beløb' +
                 '</th>');

  if (show_price_team == '') {

    document.write('<th>' +
                   'Hold' +
                   '</th>');

  }

  document.write('</tr>');

  for (var i=0; i<len; i++) {

    if (show_price_team != '') {
      if (json.feed.entry[i].gsx$team.$t != show_price_team) {
        continue;
      }
    }

    document.write('<tr>');

    document.write('<td>' +
                   json.feed.entry[i].gsx$season.$t +
                   '</td>');

    document.write('<td>' +
                   json.feed.entry[i].gsx$due.$t +
                   '</td>');

    document.write('<td><div style="text-align: right;">' +
                   json.feed.entry[i].gsx$price.$t +
                   '</div></td>');

    if (show_price_team == '') {

      document.write('<td>' +
                     json.feed.entry[i].gsx$team.$t +
                     '</td>');

    }

    document.write('</tr>');

  }

  document.write('</table></p>');

}   

function show_price(team) {

  show_price_team=team;

  document.write('<h2>Kontingent</h2>'); 

  document.write('<script src="https://spreadsheets.google.com/feeds/list/0Akm30OX8lPv2dEdfOTFvbnZpdDlJb1VrLTdPMW1QZ0E/2/public/values?alt=json-in-script&callback=show_price_cb" type="text/javascript"></script>');

}

function show_vcard(fn,photo,tel_str,role_str,email_str,note) {

  var tel=new Array();
  tel=tel_str.split(',');

  var role=new Array();
  role=role_str.split(',');

  var email=new Array();
  email=email_str.split(',');

  var i;
  var s;
  var qrimg='';

  // document.write('<h3>' + fn + '</h3>');

  document.write('<div style="float: left">'
               + '<img src="' + photo + '"/>'
               + '</div>');

  qrimg=qrimg + 'BEGIN:VCARD' + '\n';

  qrimg=qrimg + 'FN:B82 ' + fn + '\n';

  if (tel.length > 0) {
    qrimg=qrimg + 'TEL:' + tel[0] + '\n';
  }

  if (email.length > 0) {
    qrimg=qrimg + 'EMAIL:' + email[0] + '\n';
  }

  qrimg=qrimg + 'END:VCARD' + '\n';

  qrimg=escape(qrimg);

  qrimg='http://api.qrserver.com/v1/create-qr-code/?data='
      + qrimg
      + '&#38;size=200x200';

  document.write('<div style="float: left">'
               + '<img src="' + qrimg + '"/>'
               + '</div>');

  document.write('<div style="clear: both"></div>');

  s='';
  for (i in role) {
    document.write(s
                 + role[i]
                 + ' ('
                 + '<a href="mailto:' + email[i] + '">' + email[i] + '</a>'
                 + ').');
    s='<br/>';
  }
  for (i in tel) {
    document.write(s
                 + 'tlf <a href="tel:' + tel[i] + '">' + tel[i] + '</a>'
                 + '.');
    s='<br/>';
  }

}

function show_team(label,name,alias,cal1,cal2,spare3,spare4) {

  document.write(''
    + '<h1>'
    + alias
    + '</h1>'
  );

  show_intro(label+'%20Intro');

  show_1_random_sponsor(label+'%20Sponsor');

  document.write(''
    + '<h2>'
    + 'Træningstider'
    + '</h1>'
  );
  show_times(name);
  
  show_price(name);
  
  // show_team_calendar(label+'%20Glimt',name,cal1,cal2);

  show_leader(label+'%20Holdleder');

  show_coach(label+'%20Træner');

  show_hilite(label+'%20Glimt');

  show_extra(label+'%20Extra');

}
