import { SITE } from '../site.mjs';
import { img, header, contactSection, footer, ARROW16 } from '../layout.mjs';

const links = [
  ['Home', '/', 'Back to the main stage'],
  ['Hall of fame', '/portfolio', 'The best frames from 2,132 events'],
  ...SITE.categories.map((c) => [c.name, `/portfolio/${c.slug}`, 'Portfolio']),
  ['Projects', '/projects', 'Recent work, event by event'],
  ['Blog', '/blog', 'Notes from the pit'],
  ['Contact', '/contact', 'Planning an event? Let’s talk'],
];

export const page = {
  path: '/404',
  title: 'Page not found | Martin Hols',
  description: 'This page is not in the shot. Find the portfolio, projects and contact details here.',
  noindex: true,
  body: `
  <header class="panel nf" id="main">
    ${header('')}
    ${img('tomorrowland-mainstage-fireworks.jpg', '', { priority: true, cls: 'nf-bg' })}
    <div class="nf-tx">
      <p class="t-eyebrow acc">Error 404</p>
      <h1>This page is out of focus.</h1>
      <p class="lead">I photograph 2,132 events and still lost this one. It is probably backstage, or the link has a typo. Here is where you can go instead.</p>
    </div>
  </header>

  <section class="cream nf-links" data-theme="cream" aria-labelledby="nf-h">
    <p class="t-eyebrow acc" id="nf-h">Pick a better frame</p>
    <ul>${links.map(([t, h, d]) => `<li><a href="${h}"><b>${t}</b><span>${d}</span><i aria-hidden="true">${ARROW16}</i></a></li>`).join('')}</ul>
  </section>
  ${contactSection('tomorrowland-stage-night.jpg')}
  ${footer()}`,
};
