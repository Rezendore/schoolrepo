function Game()
{
	var currentDeck;
	
	function newDeck()
	{
		var New = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6";
		var id = "";
		$.ajax({ url: New })
			.done(function(data) 
			{
				id=data.deck_id;
				$("dev").append("," + id);			// display deck id
				drawCard(id, 2, "player");
				//drawCard(2, "AI");
				//drawCard(2, null);
			})
			.fail(function(jqXHR, textStatus, errorThrown) 
				{
					/*$(".error").text(errorThrown)*/
				});
	}
	function drawCard(id, count, who)
	{
		$.ajax({ url: "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=" + count })
		.done(function(data)
			{})
			.fail(function(jqXHR, textStatus, errorThrown) 
			{ /*$(".error").text(errorThrown)*/ });
		
		//
	}
	
}

// - - - - - - - - - - 

function app()
{
		$("footer").append("v1.0");		// display app version
		this.start = function()
		{
			var $newGame = ("#game");
			
			Game = new Game($newGame);
			$("#startGame").click(function(){ 
				$(".pregame").hide();
				Game.newDeck;
				
				$(".game").css({ "visibility": "visible",
					"height": "400px",
					"width": "400px" });
				$("footer").css( "width", "400px" );	
				
				});
		}
		
		
}

// - - - - - - - - - - 

$(function() {
	window.game = new app();
	window.game.start();
});
