import 'select2';
import detectPassiveEvents from 'detect-passive-events';

function onScroll(func) {
  window.addEventListener('scroll', func, detectPassiveEvents.hasSupport ? {
    passive: true,
  } : false);
}

function initSelects() {
  $('select:not(.browser-default):not(.enable-ajax-select2):not([multiple])').material_select();
  $('select[multiple]:not(.browser-default):not(.enable-ajax-select2)').select2({width: '100%'});

  let $ajaxSelect2Elements = $('select.enable-ajax-select2');
  $ajaxSelect2Elements.each(function() {
    let $select = $(this);
    if ($select.attr('data-initial-display') &&
        $select.attr('data-initial-value')) {
      let display = $select.data('initial-display');
      let value = $select.data('initial-value');

      $select.append($('<option></option>').attr('value', value).text(display));
      $select.val(value);
    };

    let url = $select.data('url');
    $select.select2({
      ajax: {
        url: url,
        delay: 250
      },
      width: '100%',
      minimumInputLength: 2
    });
  });
}

export {
  onScroll,
  initSelects,
};
