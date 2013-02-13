// See README file.

function feed(label,max) {
  var dmax = 255;
  var r = '';
  r = r + 'http://blog.b82.dk/feeds/posts/default';
  if (label != '') {
    r = r + '/-/' + label;
  }
  if (max != '') {
    dmax = max;
  }
  r = r + '?alt=json-in-script&max-results=' + dmax + '&callback=?';
  return r;
}

function test_feed_blog() {
}
function test_feed_label() {
}