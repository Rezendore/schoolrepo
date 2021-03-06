"use strict";

// using a function contructor form to create an object

	
function MyApp()
{
	var guess;
	var answer;
	var count = 0;
	
	function MakeAnswer(){
		answer = parseInt(document.getElementById("answer").value);
	}
	
	function MakeGuess()
	{
		count++;
		guess = parseInt(document.getElementById("guess").value);
		
		if(guess === answer)
		{
			document.getElementById("result").innerHTML=("Correct! It took " + count + " guesses.");
		}else if(guess > answer)
		{
			document.getElementById("result").innerHTML="Too high!";
		}
		else if(guess < answer)
		{
			document.getElementById("result").innerHTML="Too low!";
		}
		else
		{}
		
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
		
		$("#answerBtn").on("click", MakeAnswer);
		$("#guessBtn").on("click", MakeGuess);
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
