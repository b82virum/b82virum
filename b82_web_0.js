// See README file.

function show_products(json) {

  var bgn_title = '<b>';
  var end_title = '</b><br/>';

  var bgn_price = '<b>Pris: ';
  var end_price = ' Kr.</b><br/>';

  var bgn_description = '';
  var end_description = '<br>';

  var bgn_photo = '<img src="';
  var end_photo = '"/><br>';

  var bgn_row = '<tr><td><br/>';
  var end_row = '<br/></td></tr>';

  var bgn_cart_view = bgn_row;
  var end_cart_view = end_row;

  var paypal_id = 'JU24PYRGKMZCW';

  //var paypal_buy_now_1 = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="';
  //var paypal_buy_now_2 = '"><input type="hidden" name="lc" value="DK"><input type="hidden" name="item_name" value="';
  //var paypal_buy_now_3 = '"><input type="hidden" name="amount" value="';
  //var paypal_buy_now_4 = '"><input type="hidden" name="currency_code" value="DKK"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="cn" value="Add special instructions to the seller"><input type="hidden" name="no_shipping" value="2"><input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"></form>';

  var paypal_cart_add_1 ='<form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"><input type="hidden" name="business" value="';
  var paypal_cart_add_2 ='"><input type="hidden" name="lc" value="DK"><input type="hidden" name="item_name" value="';
  var paypal_cart_add_3 ='"><input type="hidden" name="amount" value="';
  var paypal_cart_add_4 ='"><input type="hidden" name="currency_code" value="DKK"><input type="hidden" name="button_subtype" value="products"><input type="hidden" name="no_note" value="0"><input type="hidden" name="cn" value="Add special instructions to the seller"><input type="hidden" name="no_shipping" value="2"><input type="hidden" name="add" value="1"><input type="hidden" name="bn" value="PP-ShopCartBF:btn_cart_LG.gif:NonHosted"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"></form>';

  var paypal_cart_view_1 ='<form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"><input type="hidden" name="business" value="';
  var paypal_cart_view_2 ='"><input type="hidden" name="display" value="1"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_viewcart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"></form><br/><img src="https://www.paypal.com/en_US/i/bnr/horizontal_solution_PPeCheck.gif" border="0"/><br/>';

  //var paypal_part1 = paypal_buy_now_1;
  //var paypal_part2 = paypal_buy_now_2;
  //var paypal_part3 = paypal_buy_now_3;
  //var paypal_part4 = paypal_buy_now_4;

  var paypal_part1 = paypal_cart_add_1;
  var paypal_part2 = paypal_cart_add_2;
  var paypal_part3 = paypal_cart_add_3;
  var paypal_part4 = paypal_cart_add_4;

  var len = json.feed.entry.length;

  for (var i=0; i<len; i++) {

    if (json.feed.entry[i].gsx$available.$t != 'Y') {
      continue;
    }

    document.write(bgn_row);

    document.write(bgn_title +
                   json.feed.entry[i].gsx$title.$t +
                   end_title);

    document.write(bgn_photo +
                   json.feed.entry[i].gsx$photo.$t +
                   end_photo);

    document.write(bgn_description +
                   json.feed.entry[i].gsx$description.$t +
                   end_description);

    document.write(bgn_price +
                   json.feed.entry[i].gsx$price.$t +
                   end_price);

    var product = json.feed.entry[i].gsx$title.$t;
    product = product.replace('æ','ae');
    product = product.replace('ø','oe');
    product = product.replace('å','aa');
    product = product.replace('Æ','AE');
    product = product.replace('Ø','OE');
    product = product.replace('Å','AA');
    
    document.write(paypal_part1 +
                   paypal_id +
                   paypal_part2 +
                   product +
                   paypal_part3 +
                   json.feed.entry[i].gsx$price.$t +
                   paypal_part4);

    document.write(end_row);

  }

  document.write(bgn_cart_view);
  document.write(paypal_cart_view_1 +
                 paypal_id +
                 paypal_cart_view_2);
  document.write(end_cart_view);

}   

function show_webshop() {

  document.write('<script src="https://spreadsheets.google.com/feeds/list/0Akm30OX8lPv2dEVvZ2xWaE5Zb3VnbUFwRU1hQWN0MHc/2/public/values?alt=json-in-script&callback=show_products" type="text/javascript"></script>');

}

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

function logobig(x)
{
x.style.height="960px";
x.style.width="960px";
}

function logonorm(x)
{
x.style.height="150px";
x.style.width="150px";
}


function page_start() {

  document.write('webmaster tester lige nu, så det kan være intet virker! 00<br/>'
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
    + '<div style="position: fixed; left: 50%; margin-left: -485px; top: 0px; z-index: 255;">'
    + '<img onmouseover="logobig(this)" onmouseout="logonorm(this)" width="150px" height="150px" style="border-style: none; background-color: transparent;" border="0" src="https://lh6.googleusercontent.com/-viTn7BuAhK8/T_C5WooraDI/AAAAAAAAC3M/QhybnVT1HBM/s960/Logo.RedbaseWhitebackTrans.png"/>'
    + '</div>'
  );
  */
  
  document.write(''
    + '<div style="position: fixed; left: 50%; margin-left: -485px; top: 0px; z-index: 255;">'
    + '<img width="150px" height="150px" style="border-style: none; background-color: transparent;" border="0" src="https://lh6.googleusercontent.com/-viTn7BuAhK8/T_C5WooraDI/AAAAAAAAC3M/QhybnVT1HBM/s960/Logo.RedbaseWhitebackTrans.png"/>'
    + '</div>'
  );
  
  show_header('B82%20Header');
  
}

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
