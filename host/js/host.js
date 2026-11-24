/* 主机服务 · 版块独立交互 */
(function () {
  'use strict';
  if (document.body.getAttribute('data-page') !== 'host') return;
  document.body.setAttribute('data-service', 'host');
  var first = document.querySelector('.faq details');
  if (first && window.innerWidth > 767 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    first.open = true;
  }
})();
