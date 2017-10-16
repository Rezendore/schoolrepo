"use strict";

// using a function contructor form to create an object
var guess = -1;
var answer = 0;
var count = 0;

function MakeGuess()
{
	count++;
	guess = parseInt(document.getElementById("guess").value);
	answer = parseInt(document.getElementById("answer").value);
	
	if(guess=-1)
	{
		document.getElementById("result").innerHTML="Make A Guess!";
	}else if(guess === answer)
	{
		document.getElementById("result").innerHTML="Correct!";
		document.getElementById("result").innerHTML.append(" It took " + count + " guesses.");
	}else if(guess > answer)
	{
		document.getElementById("result").innerHTML="Too high!";
	}
	else
	{
		document.getElementById("result").innerHTML="Too low!";
	}
	
}
	
function MyApp()
{
	MakeGuess();
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
