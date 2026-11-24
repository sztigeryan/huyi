/* ==========================================================================
   虎翼网络 · 全站交互
   无依赖原生 JS，兼容 Edge / Chrome 及主流浏览器
   ========================================================================== */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var backTop = document.querySelector('.back-to-top');
  var toggle = document.querySelector('.nav__toggle');
  var drawer = document.querySelector('.mobile-nav');
  var scrim = document.querySelector('.nav-scrim');
  var closeBtn = document.querySelector('.mobile-nav__close');

  /* 滚动状态：页头阴影 + 返回顶部 */
  var ticking = false;
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 12);
    if (backTop) backTop.classList.toggle('is-visible', y > 480);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 移动端导航抽屉 */
  function setDrawer(open) {
    if (!drawer || !scrim) return;
    drawer.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-locked', open);
    if (drawer) drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (toggle) toggle.addEventListener('click', function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  if (scrim) scrim.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setDrawer(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1180) setDrawer(false);
  });

  /* 滚动进入视口时渐显 */
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.06 });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* FAQ：同一组内只允许展开一个 */
  document.querySelectorAll('.faq').forEach(function (group) {
    group.addEventListener('toggle', function (e) {
      if (e.target.tagName !== 'DETAILS' || !e.target.open) return;
      group.querySelectorAll('details[open]').forEach(function (item) {
        if (item !== e.target) item.open = false;
      });
    }, true);
  });

  /* 联系表单：静态站点通过邮件客户端发送 */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var company = (data.get('company') || '').toString().trim();
      var contact = (data.get('contact') || '').toString().trim();
      var need = (data.get('need') || '').toString().trim();
      var message = (data.get('message') || '').toString().trim();

      if (!name || !contact || !message) {
        var status = form.querySelector('.form-status');
        if (status) {
          status.textContent = '请先填写姓名、联系方式和需求描述。';
          status.style.background = '#fdeee9';
          status.style.color = '#a4401e';
          status.classList.add('is-visible');
        }
        return;
      }

      var subject = '【虎翼网络】业务咨询 - ' + (company || name);
      var body = [
        '姓名：' + name,
        '公司：' + company || '—',
        '联系方式：' + contact,
        '咨询方向：' + need || '—',
        '',
        '需求描述：',
        message
      ].join('\n');
      window.location.href = 'mailto:info@huyi.com.cn?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      var ok = form.querySelector('.form-status');
      if (ok) {
        ok.textContent = '正在唤起邮件客户端，请确认发送。也可直接致信 info@huyi.com.cn。';
        ok.style.background = '';
        ok.style.color = '';
        ok.classList.add('is-visible');
      }
    });
  }

  /* 当前导航项标记（供多页共用导航使用） */
  var page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('.nav__link[data-nav]').forEach(function (link) {
      if (link.getAttribute('data-nav') === page) {
        link.closest('.nav__item').classList.add('is-current');
      }
    });
  }
})();
