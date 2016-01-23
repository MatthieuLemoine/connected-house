(function(){
  'use strict';

  var DeezerConf = {
    app_id : 'your_app_id',
    channelUrl : 'your_channel_url',
    perms : 'basic_access,email,offline_access,manage_library',
    default_access_token : 'hard_coded_access_token'
  };

  angular.module('app.music')
    .constant('DeezerConfSample',DeezerConf);

})();
