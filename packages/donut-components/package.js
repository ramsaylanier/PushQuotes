Package.describe({
  summary: 'Reusable UI Components you can sink your teeth into',
  version: '0.0.1',
  name: 'donut-components'
});

Package.onUse(function (api) {

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  // automatic (let the package specify where it's needed)

  api.use([                
    'iron:router'                   
  ]);

  api.use([
    'jquery',                   
    'underscore',                
    'templating',
    'reactive-var',
    'percolate:velocityjs',
    'fourseven:scss@2.0.0'        
  ], ['client']);

  api.add_files([
    'lib/routes.js',
  ], ['client', 'server']);

  api.add_files([
    'lib/client/components/header/donut_header.html',
    'lib/client/components/header/donut_header.js',
    'lib/client/components/nav/donut_nav.html',
    'lib/client/components/nav/donut_nav.js',
    'lib/client/components/card/donut_card.html',
    'lib/client/components/modal/donut_modal.html',
    'lib/client/components/modal/donut_modal.js',
    'lib/client/components/page/donut_page.html',
    'lib/client/components/page/donut_page.js',
    'lib/client/components/list/donut_list.html',
    'lib/client/components/list/donut_list.js',
    'lib/client/components/item/donut_item.html',
    'lib/client/components/item/donut_item.js',    
    'lib/client/components/shelf/donut_shelf.html',
    'lib/client/components/shelf/donut_shelf.js',   
    'lib/client/components/toggle/donut_toggle.html',
    'lib/client/components/toggle/donut_toggle.js',   
    'lib/client/animations.js',
    'lib/client/states.js',
    'lib/client/helpers.js',

    //stylesheets
    'lib/client/stylesheets/_vars.scss',
    'lib/client/stylesheets/_toggles.scss',
    'lib/client/stylesheets/_page.scss',
    'lib/client/stylesheets/_shelf.scss',
    'lib/client/stylesheets/_cards.scss',
    'lib/client/stylesheets/_nav.scss',
    'lib/client/stylesheets/_modal.scss',
    'lib/client/stylesheets/_zindex.scss',
    'lib/client/stylesheets/donut.scss'
  ], ['client']);

  api.export([
    'donutAnimation', 'donutTransition', 'addToTransitions', 'getDefaultPageOptions', 'donutStates'
  ]);

});