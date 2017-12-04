					// initialize app
$(function() {
	window.game = new app();
	window.game.start();
});
					// app
function app()
{
		$("footer").append("v2.2 ");		// display app version
		this.start = function()
		{
			console.log("arrived at app start");
			
			var game = new Game();	
			$("#hit").click(function(){
				game.gameState='d' });
			$("#stay").click(function(){
				game.gameState='s' });
			$("#startGame").click(function(){ 
				$(".pregame").css({"visibility": "hidden",
					"height":"0px",
					"width":"0px"});
				
				$(".game").css({ "visibility": "visible",
					"height": "400px",
					"width": "400px"});
				$("footer").css( "width", "400px" );
				$(".main").css({ "height" : "300px", "width" : "400px"});
				});
		}
}
					// creates a character
function character(Name)
{
	var name = Name;
	var hand = new hand();
	var score = getScore();
	var bet = 0;
	
	this.getScore = function()
	{
		var tempScore=0;
		for( i = 0; i<hand.cards.length;i++)
		{
			switch(hand.cards[i])
			{
				case "ACE":
					if(tempScore>11)
						tempScore=tempScore+1;
					else
						tempScore=tempScore+11;
					break;
				case "2":
					tempScore=tempScore+2;
					break;
				case "3":
					tempScore=tempScore+3;
					break;
				case "4":
					tempScore=tempScore+4;
					break;
				case "5":
					tempScore=tempScore+5;
					break;
				case "6":
					tempScore=tempScore+6;
					break;
				case "7":
					tempScore=tempScore+7;
					break;
				case "8":
					tempScore=tempScore+8;
					break;
				case "9":
					tempScore=tempScore+9;
					break;
				case "10":
					tempScore=tempScore+10;
					break;
				default:
					tempScore=tempScore+10;
					break;
			}
		}
		
		if(name="player")
		{
			if(tempScore>21)
			{
				game.setGameState('l');
			}
			else if(tempScore=21)
			{
				game.setGameStatus('w');
			}
			
			return tempScore;
		}
	}
}
					// creates a hand
function hand()
{
	var cards = [];
	var tempCards [];
	
	this.newCard = function(cardID)
	{
		tempCards = cards;
		for(var i=0;i<(cards.length+1); i++)
		{
		if(i<cards.length)
			cards[i]=tempcards[i];
		else
			cards[i]=cardID;
		}
	}
	
}
					// draws a card and returns it
function drawCard()
{
	$.ajax({ 
		url: "https://deckofcardsapi.com/api/deck/" + 
		deckID + "/draw/?count=1"})
			.done(function(data)
			{
				return data.cards[0].value;
				$("#dev").text(data.cards[0].image);
			})
				.fail(function(jqXHR, textStatus, errorThrown) 
				{ $(".error").text(errorThrown) });	
}
					// initialize and operate game
function game()
{
	var dealer = new character("dealer");
	var player = new character("player");
	var betPool = 0;
	var gameState = 'p';
	
	newDeck();
	
	this.setGameState = function(state)
	{
		gameState=state;
		switch(state)
		{
			case 's':
				dealer.hand.newCard(drawCard());
				$("#playerCards").append("<li> <img style=" + "height:100%"
					+ " src=" + $("#dev").text() + " /> </li>");
				gameState='p';
				break;
			case 'd':
				player.hand.newCard(drawCard());
				$("#dealerCards").append("<li> <img style=" + "height:100%"
					+ " src=" + $("#dev").text() + " /> </li>");
				gameState='p';
				break;
			case 'w':
				break;
			case 'l':
				break;
			default:
				break;
		}
	}
}

function newDeck()
{
	var New = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2";
	$.ajax({ url: New })
		.done(function(data) 
		{
			game.dealer.hand.newCard(drawCard());
			game.dealer.hand.newCard(drawCard());
			game.player.hand.newCard(drawCard());
			game.player.hand.newCard(drawCard());
		})
		.fail(function(jqXHR, textStatus, errorThrown) 
			{
				$(".error").text(errorThrown)
			});
}