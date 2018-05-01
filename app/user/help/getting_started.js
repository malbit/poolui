'use strict';

app.controller('GettingStartedCtrl', function($scope, $mdDialog, dataService) {
	$scope.portsList = {};
	$scope.selected = [];

	$scope.promise = dataService.getData("/pool/ports", function(data){
		$scope.portsList = data;
	});

	$scope.viewPorts = function(ev){
		$mdDialog.show({
			controller: "PortsModalCtrl",
			templateUrl: 'user/help/portsmodal.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: $scope.menuOpen // Only for -xs, -sm breakpoints.
		})
		.then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
	}

	$scope.samples=[
	{
		type: 'Username',
		sample: 'G8hadFpRhGVL2R5spTFYqs82neoqDo8mAdLUti23EcaXas83Scc4N8HNeEcfn5nDpsPugDea4wgPKFqwr5GKHB4g82NFR2Q',
		desc: 'Standard wallet address (Monero CLI wallet/Monero GUI wallet/MyMonero wallet)',
		valid: true
	},
	{
		type: 'Username',
		sample: 'G8hadFpRhGVL2R5spTFYqs82neoqDo8mAdLUti23EcaXas83Scc4N8HNeEcfn5nDpsPugDea4wgPKFqwr5GKHB4g82NFR2Q+3500',
		desc: 'Standard wallet address with fixed difficulty of 3500 for the worker',
		valid: true
	},
	{
		type: 'Username',
		sample: 'GMPHYf5KRkcAyik7Jw9oHRfJtUdw2Kj5f4VTFJ25AaFVYxofetir8Cnh7S76Q854oMXzwaguL8p5KEz1tm3rn1SA6kN3mkM7cuf4t4W53m',
		desc: 'Integrated address, good for withdrawing to an exchange (eg. Poloniex, Kraken, TuxExchange), or if you want to use an integrated address',
		valid: true
	},
	{
		type: 'Username',
		sample: 'G8hadFpRhGVL2R5spTFYqs82neoqDo8mAdLUti23EcaXas83Scc4N8HNeEcfn5nDpsPugDea4wgPKFqwr5GKHB4g82NFR2Q.6FEBAC2C05EDABB16E451D824894CC48AE8B645A48BD4C4F21A1CC8624EB0E6F',
		desc: 'Standard address with paymentID, good for withdrawing to an exchange that does not use an integrated address, or if you want to use a specific paymentID',
		valid: true
	},
	/*{ // BTC withdrawal not allowed
		type: 'Username',
		sample: '1KEJ7EJvfD2bpL6vA9nJpTEgoS9P5jdyce',
		desc: 'BTC Withdrawal (Will process through xmr.to or shapeshift.io automatically)',
		valid: false // this seems to make no difference? The configuration is displayed whether this is set to true or false
	},*/
	/*{ // BTC withdrawal not allowed
		type: 'Username',
		sample: '1KEJ7EJvfD2bpL6vA9nJpTEgoS9P5jdyce+100000',
		desc: 'BTC Withdrawal w/ fixed diff (Good for NiceHash)',
		valid: true
	},*/
	{
		type: 'Password',
		sample: 'Steve',
		desc: 'Miner identifier of Steve',
		valid: true
	},
	{
		type: 'Password',
		sample: 'Steve:test@e-mail.com',
		desc: 'Miner identifier of Steve, and register an account with the e-mail address as password',
		valid: true
	},
	/*{ // removed because it may confuse people
		type: 'Password',
		sample: 'test@e-mail.com',
		desc: 'Will register the e-mail address as the worker ID',
		valid: true
	}*/
	]

});