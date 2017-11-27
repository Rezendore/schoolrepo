function getLocation()
{
	if(navigator.geologcation)
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