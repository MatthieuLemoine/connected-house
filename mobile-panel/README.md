# Mobile Panel

A great mobile panel for an awesome connected house !

## Weather

The weather widget requires an API key from openweathermap.org.
To enable weather support you'll need to add a panel.config.js file as the following sample :

    (function(){
      'use strict';

      angular.module('panel')
        .constant('Weather', {
          openweather: {
            apikey: 'add8c6d6e43de3b2da630160575330ac'
          }
        });

    })();
