/* ============================================
   LL PINTURAS — JavaScript
   ============================================ */
(function () {
    'use strict';

    var header     = document.getElementById('header');
    var toggle     = document.getElementById('menu-toggle');
    var close      = document.getElementById('menu-close');
    var menu       = document.getElementById('mobile-menu');
    var mLinks     = document.querySelectorAll('.mobile-nav a');
    var navLinks   = document.querySelectorAll('.nav-links a');
    var sections   = document.querySelectorAll('section[id]');

    // ---- Mobile Menu ----
    function openMenu()  { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }

    if (toggle) toggle.addEventListener('click', openMenu);
    if (close)  close.addEventListener('click', closeMenu);
    mLinks.forEach(function(l){ l.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });

    // ---- Header scroll ----
    function onScroll() {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Active nav ----
    function updateNav() {
        var y = window.scrollY + 150;
        sections.forEach(function(s) {
            var top = s.offsetTop;
            var bot = top + s.offsetHeight;
            var id  = s.getAttribute('id');
            if (y >= top && y < bot) {
                navLinks.forEach(function(a) {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) a.classList.add('active');
                });
            }
        });
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // ---- Scroll animations ----
    var animated = document.querySelectorAll('[data-animate]');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) {
                    var delay = parseInt(e.target.getAttribute('data-delay')) || 0;
                    setTimeout(function(){ e.target.classList.add('visible'); }, delay);
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        animated.forEach(function(el){ obs.observe(el); });
    } else {
        animated.forEach(function(el){ el.classList.add('visible'); });
    }

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var t = document.querySelector(id);
            if (t) {
                e.preventDefault();
                window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

})();
