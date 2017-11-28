function WeatherWidget($widget)
{
	this.update=function()
	{
		$(".results", $widget).hide();
		$(".results", $widget).show();
		getWeatherReport(43.22,-71.53);
		getLocation();
	};
	
	function getWeatherReport(lat, lon)
	{
		var coords = lat+","+lon;
			 $.ajax({ url: "https://api.weather.gov/points/43.22,-71.53/forecast"
			 //url: "https://api.weather.gov/points/" + coords + ".json",
			 //dataType : "json"
			 })
			.done(function(data) 
			{ populateWeather(data); })
				.fail(function(jqXHR, textStatus, errorThrown) 
				{ /*showError(errorThrown); */});
	}
	function getCurrentWeather()
	{
		var lat=$("#latitude").val();
		var lon=$("#longitude").val();
		if(lat&&lon)
		{
			$("#weather-widget").fadeIn();
			weatherWidget.update(lat,lon);
		}
	}
	function populateWeather(data)
	{
		var observation = data.properties.periods[0];
		//$(".results header img", $widget).attr("src", observation.icon);
		$(".location>span", $widget)
			.text(observation.name);
		
		$(".conditions>span").each(function(i, e)
		{
			
			var $span = $(this);
			var field = $span.data("field");
			if(observation[field] != null)
				{ $(this).text(observation[field]); }
			else
				{ $(this).text("0"); }
		});
		
		$(".results footer img", $widget).attr("src", observation.image);
		
		$(".loading", $widget).fadeOut(function ()
		{
			$(".results", $widget).fadeIn();
		});
	}
	function getLocation()
	{
		if(navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(function(position)
			{
				$("#latitude").val(position.coords.latitude);
				$("#longitude").val(position.coords.longitude);
			},
			function(error)
			{
				$("#controls .error")
				.text("ERROR: " + error.message)
				.slideDown();
			});
		}
	}
}

