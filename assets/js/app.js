var myElement = document.querySelector("[data-headroom]");
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement, {
  tolerance : 5
});
// initialise
headroom.init();

function adFader(_, element) {
  var elementTop = $(element).offset().top;
  var elementBottom = elementTop + $(element).outerHeight(true);

  function refresh() {
    var scrollTop = $(window).scrollTop();
    var scrollBottom = $(window).scrollTop() + $(window).height();
    var topBottomCenter = (scrollBottom - scrollTop) / 2
    var scrollCenter = scrollTop + topBottomCenter;

    if (elementTop > scrollCenter) {
      $(element).css('background-color', 'rgba(250, 250, 250, 1)')
    } else if (elementBottom < scrollCenter) {
      var blub = elementBottom - scrollTop;
      var value = 1 - Math.min(blub / topBottomCenter, 1);
      $(element).css('background-color', 'rgba(220, 220, 220 , ' + value + ')')
    } else {
      $(element).css('background-color', 'rgba(220, 220, 220, 0)')
    }
  }

  refresh()
  $(window).scroll(refresh);
}

$(document).ready(function () {
  $('[ad-fader]').each(adFader);
});

