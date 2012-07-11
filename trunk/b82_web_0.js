// See README file.

function show_products(json) {

  var bgn_row = '<tr><td><br/>';
  var end_row = '<br/></td></tr>';

  var bgn_title = '<b>';
  var end_title = '</b><br/>';

  var bgn_price = '<b>Pris: ';
  var end_price = ' Kr.</b><br/>';

  var bgn_description = '';
  var end_description = '<br>';

  var bgn_photo = '<img src="';
  var end_photo = '"/><br>';

  var paypal_id = 'JU24PYRGKMZCW';

  var paypal_part1 = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="';
  var paypal_part2 = '"><input type="hidden" name="lc" value="DK"><input type="hidden" name="item_name" value="';
  var paypal_part3 = '"><input type="hidden" name="amount" value="';
  var paypal_part4 = '"><input type="hidden" name="currency_code" value="DKK"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="cn" value="Add special instructions to the seller"><input type="hidden" name="no_shipping" value="2"><input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"></form>';

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
//    product = product.replace('æ','ae');
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

}   

function show_webshop() {

  document.write('<script src="https://spreadsheets.google.com/feeds/list/0Akm30OX8lPv2dEVvZ2xWaE5Zb3VnbUFwRU1hQWN0MHc/2/public/values?alt=json-in-script&callback=show_products" type="text/javascript"></script>');

}