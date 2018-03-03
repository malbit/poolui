'use strict';

angular.module('pool.globals', [])

.factory('GLOBALS', function() {
	return {
		pool_name: "supportetn.eu",
		api_url : 'https://supportetn.eu/api',
		api_refresh_interval: 5000,
		app_update_interval: 5*60000
	};
});
