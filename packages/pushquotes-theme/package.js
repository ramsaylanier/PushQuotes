Package.describe({
  name: 'pushquotes:pushquotes-theme',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use([
     'ramsay:react-components-core'
  ], 'client');

  api.addFiles([
    'icons.jsx',
    'settings.jsx',
    'triggers.jsx',
    'animations.jsx'
  ], 'client');

  api.export(['Settings', 'Icons', 'Triggers'], 'client');
});