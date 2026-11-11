// CarLog: القائمة على الجوال، والقسم الحالي في فهرس الصفحة، والتواريخ الحية في بطاقات الوثائق.
(function () {
  var btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // «تنتهي بعد 19 يوماً»: التاريخ من اليوم، بالميلادي والهجري (أم القرى) بلغة الصفحة
  var ar = document.documentElement.lang === 'ar';
  document.querySelectorAll('[data-days]').forEach(function (el) {
    var d = new Date(Date.now() + parseInt(el.getAttribute('data-days'), 10) * 864e5);
    try {
      var g = new Intl.DateTimeFormat(ar ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
      var h = new Intl.DateTimeFormat(ar ? 'ar-SA-u-ca-islamic-umalqura-nu-latn' : 'en-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
      var gEl = el.querySelector('.g'), hEl = el.querySelector('.h');
      if (gEl) gEl.textContent = g;
      if (hEl) hEl.textContent = h;
    } catch (e) { /* يبقى النص المكتوب في الصفحة */ }
  });

  // الفهرس الجانبي: يبرز القسم الظاهر
  var links = document.querySelectorAll('.toc a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (a) { a.classList.remove('on'); });
          map[e.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
