document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var scrollTopButton = document.querySelector('.scroll-top');
  var lightbox = document.querySelector('.lightbox');
  var lightboxImage = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  var closeNavigation = function () {
    if (navLinks) navLinks.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks && navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    });
  }

  if (navLinks) {
    var navLinkAnchors = navLinks.querySelectorAll('a');
    for (var i = 0; i < navLinkAnchors.length; i++) {
      navLinkAnchors[i].addEventListener('click', closeNavigation);
    }
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.site-nav')) closeNavigation();
  });

  var updateScrollState = function () {
    if (scrollTopButton) scrollTopButton.classList.toggle('visible', window.scrollY > 620);
  };

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  if (scrollTopButton) {
    scrollTopButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var lightboxTriggers = document.querySelectorAll('[data-lightbox]');
  for (var t = 0; t < lightboxTriggers.length; t++) {
    (function (trigger) {
      trigger.addEventListener('click', function () {
        if (!lightbox || !lightboxImage) return;
        var triggerImage = trigger.querySelector('img');
        lightboxImage.src = trigger.dataset.lightbox;
        lightboxImage.alt = (triggerImage && triggerImage.alt) || 'Expanded research figure';
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        if (lightboxClose) lightboxClose.focus();
      });
    })(lightboxTriggers[t]);
  }

  var closeLightbox = function () {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    if (lightboxImage) lightboxImage.src = '';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeNavigation();
      closeLightbox();
    }
  });

  var copyButtons = document.querySelectorAll('[data-copy-target]');
  for (var c = 0; c < copyButtons.length; c++) {
    copyButtons[c].addEventListener('click', function (button) {
      return function () {
        var target = document.getElementById(button.dataset.copyTarget);
        if (!target) return;

        var text = target.textContent.trim();
        var showCopied = function () {
          var label = button.querySelector('span');
          button.classList.add('copied');
          if (label) label.textContent = 'Copied';
          window.setTimeout(function () {
            button.classList.remove('copied');
            if (label) label.textContent = 'Copy';
          }, 1800);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(showCopied, function () {
            var textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            showCopied();
          });
        } else {
          var textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          textarea.remove();
          showCopied();
        }
      };
    }(copyButtons[c]));
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navigationLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));

  var sectionObserver = new IntersectionObserver(function (entries) {
    var visible = entries
      .filter(function (entry) { return entry.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
    if (!visible) return;

    navigationLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + visible.target.id);
    });
  }, { rootMargin: '-20% 0px -68% 0px', threshold: [0, 0.2, 0.6] });

  sections.forEach(function (section) { sectionObserver.observe(section); });
});
