/* 首页专属交互 */
(function(){'use strict';
  var links = document.querySelectorAll('a[href^="#services"]');
  links.forEach(function(a){ a.addEventListener('click', function(e){
    var t = document.querySelector('#services'); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
  });});
})();
