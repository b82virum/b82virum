// See README file.

var show_done = false;

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
    + '</style>'
  );

//  // strange .png
//  document.write(''
//    + '<div style="position: fixed; left: 50%; margin-left: -480px; top: 0px; z-index: 255;">'
//    + '<img style="border-style: none; background-color: transparent;" border="0" src="https://lh6.googleusercontent.com/-viTn7BuAhK8/T_C5WooraDI/AAAAAAAAC3M/QhybnVT1HBM/s150/Logo.RedbaseWhitebackTrans.png"/>'
//    + '</div>'
//  );
  // .gif
  document.write(''
    + '<div style="position: fixed; left: 50%; margin-left: -480px; top: 0px; z-index: 255;">'
    + '<img style="border-style: none; background-color: transparent;" border="0" src="https://lh4.googleusercontent.com/-5hPn0z4lDbk/UAhftYWGw2I/AAAAAAAAC5g/iuK42-bN1vw/s150/Logo.RedbaseWhitebackTrans.png"/>'
    + '</div>'
  );

//  var myWidth = 0;
//  var myHeight = 0;
//  if( typeof( window.innerWidth ) == 'number' ) {
//    //Non-IE
//    myWidth = window.innerWidth;
//    myHeight = window.innerHeight;
//  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
//    //IE 6+ in 'standards compliant mode'
//    myWidth = document.documentElement.clientWidth;
//    myHeight = document.documentElement.clientHeight;
//  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
//    //IE 4 compatible
//    myWidth = document.body.clientWidth;
//    myHeight = document.body.clientHeight;
//  }
//
//  var mySize = myHeight;
//  if (myWidth < mySize)
//    mySize = myWidth;
//  var mySize = Math.floor(mySize*0.9);
//  var myMargin = Math.floor(mySize / 2);
//
//  document.write(''
//    + '<div style="position: fixed; left: 50%; top: 50%; margin-top: -'
//    + myMargin
//    + 'px; margin-left: -'
//    + myMargin
//    + 'px; z-index: 255;">'
//    + '<img style="border-style: none; background-color: transparent; opacity: 0.05; filter: alpha(opacity=5);" border="0" src="https://lh6.googleusercontent.com/-viTn7BuAhK8/T_C5WooraDI/AAAAAAAAC3M/QhybnVT1HBM/s'
//    + mySize
//    + '/Logo.RedbaseWhitebackTrans.png"/>'
//    + '</div>'
//  );

}

function show_1_random_post_body_cb(json) {

  var i = Math.floor((Math.random()*1000)) % json.feed.openSearch$totalResults.$t;

  document.write(''
    + '<p>'
    + json.feed.entry[i].content.$t
    + '</p>'
  );

  show_done = true;
  
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

function show_n_post(label,n) {

  document.write(''
    + '<script src="http://blog.b82.dk/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results='
    + n
    + '&callback=show_post" type="text/javascript"></script>'
  );

}

function show_people(label) {

  show_n_post(label,255);

}

function show_news(label) {

  show_n_post(label,5);

}

var scriptAtest = 0;
function testA() {scriptAtest++;
if (show_done) {

// code dependent on script A goes here

} else if (scriptAtest < 10) setTimeout(testA,100);
}

function show_team(label,name) {

  document.write(''
    + '<h1>'
    + name
    + '</h1>'
  );

  show_intro(label+'%20Intro');

  show_1_random_sponsor(label+'%20Sponsor');
  testA();

  document.write(''
    + '<h2>'
    + 'Holdledere'
    + '</h2>'
  );

  show_people(label+'%20Holdleder');

  document.write(''
    + '<h2>'
    + 'Trænere'
    + '</h2>'
  );

  show_people(label+'%20Træner');

  document.write(''
    + '<h2>'
    + 'Glimt'
    + '</h2>'
  );

  show_news(label+'%20Glimt');

  show_extra(label+'%20Extra');

}
