"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";
	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		var $weather = ("#weather-widget");
		WeatherWidget = new WeatherWidget();
		$("#getWeather").click(function() { WeatherWidget.update(); });
		$("#app>header").append(version);
		setStatus("ready");
	};
} // end MyApp

$(function() {
	window.app = new MyApp();
	window.app.start();
});