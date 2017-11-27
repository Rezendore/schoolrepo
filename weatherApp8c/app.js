"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var weatherWidget = new WeatherWidget($("#weather-widget"), "YourApiKey");
	var version = "v1.3";
	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		var $widget = ("#weather-widget");
		WeatherWidget = new WeatherWidget($widget);
		$("#getWeather").click(function() { WeatherWidget.update(); });
	};
} // end MyApp

$(function() {
	window.app = new MyApp();
	window.app.start();
});

