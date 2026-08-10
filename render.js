/* Renders window.SITE into the page. Do not edit content here — use content.js. */
(function () {
  var S = window.SITE;
  if (!S) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function el(id) {
    return document.getElementById(id);
  }

  function setHTML(id, html) {
    var node = el(id);
    if (node) node.innerHTML = html;
  }

  /* ---- Nav ---- */
  setHTML(
    'nav-links',
    (S.nav || [])
      .map(function (n) {
        return '<li><a href="' + esc(n.href) + '">' + esc(n.label) + '</a></li>';
      })
      .join('')
  );

  /* ---- Hero ---- */
  var H = S.hero || {};
  setHTML('hero-eyebrow', esc(H.eyebrow || ''));
  setHTML(
    'hero-name',
    '<span class="first">' +
      esc(H.firstName || '') +
      '</span><span class="last">' +
      esc(H.lastName || '') +
      '</span>'
  );
  setHTML('hero-tagline', esc(H.tagline || ''));
  setHTML(
    'hero-buttons',
    (H.github
      ? '<a href="' + esc(H.github) + '" target="_blank" rel="noopener" class="btn btn-primary">View GitHub</a>'
      : '') +
      (H.linkedin
        ? '<a href="' + esc(H.linkedin) + '" target="_blank" rel="noopener" class="btn btn-ghost">View LinkedIn</a>'
        : '')
  );

  /* ---- About ---- */
  var A = S.about || {};
  setHTML('about-label', esc(A.label || 'About Me'));
  setHTML('about-headline', A.headlineHtml || '');
  setHTML(
    'about-headshot',
    A.photo
      ? '<img src="' + esc(A.photo) + '" alt="' + esc(A.photoAlt || '') + '" width="356" height="356">'
      : ''
  );
  setHTML(
    'about-body',
    (A.paragraphs || [])
      .slice(0, 2)
      .map(function (p) {
        return '<p>' + esc(p) + '</p>';
      })
      .join('')
  );
  setHTML(
    'about-rest',
    (A.paragraphs || [])
      .slice(2)
      .map(function (p) {
        return '<p>' + esc(p) + '</p>';
      })
      .join('') +
      '<div class="about-tags">' +
      (A.tags || [])
        .map(function (tag) {
          return '<span class="tag">' + esc(tag) + '</span>';
        })
        .join('') +
      '</div>'
  );

  /* ---- Education ---- */
  setHTML(
    'education-track',
    (S.education || [])
      .map(function (e) {
        var lines = [];
        if (e.diploma) lines.push(esc(e.diploma));
        if (e.coursework) lines.push('AP Coursework: ' + esc(e.coursework));
        if (e.activities) lines.push('Activities: ' + esc(e.activities));
        return (
          '<div class="edu-node">' +
          '<div class="edu-dot ' +
          (e.current ? 'current' : 'past') +
          '"></div>' +
          '<div class="edu-year">' +
          esc(e.year || '') +
          '</div>' +
          '<div class="edu-school">' +
          esc(e.school || '') +
          '</div>' +
          '<div class="edu-degree"><span style="color:rgba(var(--text-rgb),.78);font-size:.82rem;">' +
          (lines[0] || '') +
          '</span>' +
          (lines.length > 1
            ? '<br><span style="color:rgba(var(--text-rgb),.42);font-size:.8rem;">' +
              lines.slice(1).join('<br>') +
              '</span>'
            : '') +
          '</div>' +
          (e.badge
            ? '<span class="edu-badge" style="border-color:rgba(154,106,208,.3);color:var(--purple);">' +
              esc(e.badge) +
              '</span>'
            : '') +
          '</div>'
        );
      })
      .join('')
  );

  /* ---- Experience ---- */
  var E = S.experience || {};
  setHTML('experience-label', esc(E.label || 'Experience & Research'));
  setHTML(
    'experience-focus',
    E.focus
      ? '<div class="research-focus-label">Focus</div><p>' + esc(E.focus) + '</p>'
      : ''
  );
  setHTML(
    'experience-grid',
    (E.items || [])
      .map(function (c) {
        return (
          '<div class="research-card reveal">' +
          '<div class="card-number">' +
          esc(c.number || '') +
          '</div>' +
          '<h3 class="card-title">' +
          esc(c.title || '') +
          '</h3>' +
          '<p class="card-body">' +
          esc(c.body || '') +
          '</p>' +
          '<div class="card-advisor">' +
          esc(c.org || '') +
          (c.dates ? ' &middot; <span>' + esc(c.dates) + '</span>' : '') +
          '</div>' +
          (c.tag ? '<span class="card-tag">' + esc(c.tag) + '</span>' : '') +
          '</div>'
        );
      })
      .join('')
  );

  /* ---- Articles + Writings ---- */
  setHTML(
    'articles-list',
    (S.articles || [])
      .map(function (a) {
        var title = a.url
          ? '<a href="' + esc(a.url) + '" target="_blank" rel="noopener">' + esc(a.title) + '</a>'
          : esc(a.title);
        return (
          '<div class="pub-item">' +
          '<div><div class="pub-title">' +
          title +
          '</div><div class="pub-authors">' +
          esc(a.authors || '') +
          '</div></div>' +
          '<div><div class="pub-journal">' +
          esc(a.journal || '') +
          '</div><div class="pub-year">' +
          esc(a.year || '') +
          '</div></div></div>'
        );
      })
      .join('')
  );

  setHTML(
    'oeuvre-list',
    (S.writings || [])
      .map(function (w, i) {
        return (
          '<div class="pub-item">' +
          '<button type="button" class="oeuvre-open" data-writing="' +
          i +
          '">' +
          '<div class="pub-title">' +
          esc(w.title) +
          '</div>' +
          '<div class="pub-authors"><span class="pub-me">Shaikh A</span>. ' +
          esc(w.excerpt || '') +
          '</div>' +
          '<div class="oeuvre-hint">Tap to read full</div>' +
          '</button>' +
          '<div><div class="pub-journal">Medium</div><div class="pub-year">' +
          esc(w.year || '') +
          '</div></div></div>'
        );
      })
      .join('')
  );

  /* ---- Projects ---- */
  var P = S.projects || {};
  function talkItem(item) {
    var title = item.url
      ? '<a href="' +
        esc(item.url) +
        '" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;border-bottom:1px solid rgba(111,61,173,.2);">' +
        esc(item.title) +
        '</a>'
      : esc(item.title);
    return (
      '<div class="talk-item ' +
      esc(item.kind || '') +
      '">' +
      '<div class="talk-type">' +
      esc(item.type || '') +
      '</div>' +
      '<div class="talk-title">' +
      title +
      '</div>' +
      '<div class="talk-venue">' +
      esc(item.venue || '') +
      '</div></div>'
    );
  }
  setHTML('builds-list', (P.builds || []).map(talkItem).join(''));
  setHTML('presentations-list', (P.presentations || []).map(talkItem).join(''));

  /* ---- Awards ---- */
  setHTML(
    'awards-grid',
    (S.awards || [])
      .map(function (a) {
        return (
          '<div class="award-card reveal">' +
          '<div class="award-year">' +
          esc(a.year || '') +
          '</div>' +
          '<div class="award-title">' +
          esc(a.title || '') +
          '</div>' +
          '<div class="award-body">' +
          esc(a.body || '') +
          '</div></div>'
        );
      })
      .join('')
  );

  /* ---- Artwork (optional) ---- */
  var artSection = el('artwork');
  var artDivider = el('artwork-divider');
  if (!S.artwork || !S.artwork.length) {
    if (artSection) artSection.hidden = true;
    if (artDivider) artDivider.hidden = true;
  } else {
    if (artSection) artSection.hidden = false;
    if (artDivider) artDivider.hidden = false;
    setHTML(
      'art-gallery',
      S.artwork
        .map(function (a, i) {
          var cls = 'art-item' + (a.feature ? ' feature' : '') + (a.tall ? ' tall' : '');
          return (
            '<button type="button" class="' +
            cls +
            '" data-art="' +
            i +
            '" aria-label="View artwork ' +
            (i + 1) +
            '">' +
            '<img src="' +
            esc(a.src) +
            '" alt="' +
            esc(a.alt || a.title || '') +
            '" loading="lazy">' +
            '<div class="art-meta"><span>' +
            esc(a.title || '') +
            '</span></div></button>'
          );
        })
        .join('')
    );
  }

  /* ---- Nonprofits ---- */
  setHTML(
    'nonprofits-grid',
    (S.nonprofits || [])
      .map(function (n) {
        var link = n.url
          ? '<a href="' + esc(n.url) + '" target="_blank" rel="noopener" style="color:inherit;">' +
            esc(n.urlLabel || n.url) +
            '</a>'
          : esc(n.urlLabel || '');
        return (
          '<div class="research-card">' +
          '<div class="card-number">' +
          esc(n.role || '') +
          '</div>' +
          '<h3 class="card-title">' +
          esc(n.title || '') +
          '</h3>' +
          '<p class="card-body">' +
          esc(n.body || '') +
          '</p>' +
          '<div class="card-advisor">' +
          link +
          (n.dates ? ' &middot; <span>' + esc(n.dates) + '</span>' : '') +
          '</div>' +
          (n.tag ? '<span class="card-tag">' + esc(n.tag) + '</span>' : '') +
          '</div>'
        );
      })
      .join('')
  );

  /* ---- Volunteering ---- */
  setHTML(
    'volunteering-grid',
    (S.volunteering || [])
      .map(function (v) {
        return (
          '<div class="award-card">' +
          '<div class="award-year">' +
          esc(v.year || '') +
          '</div>' +
          '<div class="award-title">' +
          esc(v.title || '') +
          '</div>' +
          '<div class="award-body">' +
          esc(v.body || '') +
          '</div></div>'
        );
      })
      .join('')
  );

  /* ---- Footer ---- */
  var foot = S.footer || '';
  var nameMatch = foot.match(/^(.*?)(\s+)([A-Za-z].*)$/);
  if (nameMatch) {
    setHTML(
      'site-footer',
      '<p>' + esc(nameMatch[1]) + ' <span class="fg">' + esc(nameMatch[3]) + '</span></p>'
    );
  } else {
    setHTML('site-footer', '<p>' + esc(foot) + '</p>');
  }

  /* ---- Writings modal ---- */
  var writings = S.writings || [];
  var modal = el('writing-modal');
  var titleEl = el('writing-modal-title');
  var bodyEl = el('writing-modal-body');
  var closeBtn = el('writing-modal-close');
  var lastFocus = null;

  function openWriting(i) {
    var w = writings[i];
    if (!w || !modal) return;
    lastFocus = document.activeElement;
    titleEl.textContent = w.title || '';
    bodyEl.innerHTML = w.html || '';
    modal.hidden = false;
    requestAnimationFrame(function () {
      modal.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }
  function closeWriting() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!modal.classList.contains('open')) modal.hidden = true;
    }, 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll('.oeuvre-open').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openWriting(+btn.getAttribute('data-writing'));
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', closeWriting);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeWriting();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeWriting();
  });

  /* ---- Artwork lightbox (only if items exist) ---- */
  if (S.artwork && S.artwork.length) {
    var arts = Array.prototype.slice.call(document.querySelectorAll('.art-item[data-art]'));
    var lb = el('art-lightbox');
    var img = el('art-lightbox-img');
    var cap = el('art-lightbox-caption');
    var idx = 0;
    function openAt(i) {
      if (!arts.length || !lb) return;
      idx = (i + arts.length) % arts.length;
      var thumb = arts[idx].querySelector('img');
      var meta = arts[idx].querySelector('.art-meta span');
      img.src = thumb.src;
      img.alt = thumb.alt;
      cap.textContent = meta ? meta.textContent : '';
      lb.hidden = false;
      requestAnimationFrame(function () {
        lb.classList.add('open');
      });
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      if (!lb) return;
      lb.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(function () {
        if (!lb.classList.contains('open')) lb.hidden = true;
      }, 300);
    }
    arts.forEach(function (a) {
      a.addEventListener('click', function () {
        openAt(+a.getAttribute('data-art'));
      });
    });
    var close = el('art-close');
    var prev = el('art-prev');
    var next = el('art-next');
    if (close) close.addEventListener('click', closeLb);
    if (prev)
      prev.addEventListener('click', function () {
        openAt(idx - 1);
      });
    if (next)
      next.addEventListener('click', function () {
        openAt(idx + 1);
      });
    if (lb)
      lb.addEventListener('click', function (e) {
        if (e.target === lb) closeLb();
      });
    document.addEventListener('keydown', function (e) {
      if (!lb || !lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') openAt(idx - 1);
      if (e.key === 'ArrowRight') openAt(idx + 1);
    });
  }

  /* ---- Mobile nav ---- */
  var toggle = el('nav-toggle');
  var links = el('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }
})();
