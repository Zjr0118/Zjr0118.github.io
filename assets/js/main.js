/* 主题切换 + 回到顶部 + 代码复制 */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---- 深浅色切换 ---- */
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncGiscus(next);
    });
  }

  /* 未手动选择过主题时，跟随系统变化 */
  try {
    if (!localStorage.getItem('theme') && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        syncGiscus(e.matches ? 'dark' : 'light');
      });
    }
  } catch (e) {}

  /* giscus 评论区跟随主题 */
  function syncGiscus(theme) {
    var frame = document.querySelector('iframe.giscus-frame');
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } } },
      'https://giscus.app'
    );
  }

  /* ---- 回到顶部 ---- */
  var toTop = document.getElementById('to-top');
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 560) toTop.classList.add('show');
      else toTop.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- 代码块复制按钮 ---- */
  var blocks = document.querySelectorAll('.prose pre');
  Array.prototype.forEach.call(blocks, function (pre) {
    if (pre.querySelector('code') === null) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = '复制';
    btn.addEventListener('click', function () {
      var text = pre.querySelector('code').innerText;
      var done = function () {
        btn.textContent = '已复制';
        btn.classList.add('is-done');
        setTimeout(function () {
          btn.textContent = '复制';
          btn.classList.remove('is-done');
        }, 1600);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
    var host = pre.closest('.highlight') || pre;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.appendChild(btn);
  });
})();
