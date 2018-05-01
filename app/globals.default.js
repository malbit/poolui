'use strict';

angular.module('pool.globals', [])

.factory('GLOBALS', function() {
	return {
		pool_name: "graft.pw",
		api_url : 'https://api.graft.pw',
		api_refresh_interval: 5000,
		app_update_interval: 30*60000
	};
});
