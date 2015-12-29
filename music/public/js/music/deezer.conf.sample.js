(function(){
  'use strict';

  angular.module('app.music')
    .constant('DeezerConfSample',DeezerConfSample);

  DeezerConfSample.$inject = [];

  function DeezerConfSample() {
    // Cf deezer Api
    return {
      app_id : 'your_app_id',
      channelUrl : 'your_channel_url',
      perms : 'basic_access,email,offline_access,manage_library',
      default_access_token : 'hard_coded_access_token'
    };
  }
})();
