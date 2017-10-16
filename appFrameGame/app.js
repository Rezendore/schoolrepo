"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var guess = 0;
	var answer = Math.floor((Math.random() * 100) + 0);
	function test()
	{
		guess = document.getElementById("guess").value;
	
		if(guess == answer)
		{
			document.getElementById("result").innerHTML="Correct!";
		}else if(guess > answer)
		{
			document.getElementById("result").innerHTML="Too high!";
		}
		else
		{
			document.getElementById("result").innerHTML="Too low!";
		}
	}

	var version = "v1.0";

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
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});