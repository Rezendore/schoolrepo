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