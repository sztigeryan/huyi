/* 服务器 · 版块独立交互 */
(function () {
  'use strict';
  if (document.body.getAttribute('data-page') !== 'server') return;
  document.body.setAttribute('data-service', 'server');
  var first = document.querySelector('.faq details');
  if (first && window.innerWidth > 767 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    first.open = true;
  }
})();
