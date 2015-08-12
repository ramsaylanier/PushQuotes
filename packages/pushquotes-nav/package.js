Package.describe({
  name: 'pushquotes:pushquotes-nav',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'pushquotes:pushquotes-dependencies@0.0.1'
  ], 'client');


  api.addFiles('pushquotes-nav.jsx', 'client');

  api.export(['NavList', 'SubNavList', 'NavItem', 'Navs'], 'client');
});
