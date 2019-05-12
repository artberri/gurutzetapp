var ghpages = require('gh-pages');

ghpages.publish('platforms/browser/www', (err) => console.error(err));
