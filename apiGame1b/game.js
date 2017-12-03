function Game()
{
	console.log("arrived at game: ");
	var deckID;
	var currentDeck = new Deck();
	var pHand = {};
	var dHand = {};
	var pHandSize=0;
	var dHandSize=0;
	var pScore=0;
	var dScore=0;
	
	$("#hit").click(function(){
		drawCard(1,"player")
		});
	$("#stay").click(function(){
		endGame();
		});
	
	function Deck()
	{
		console.log("arrived at newDeck");
		var New = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6";
		$.ajax({ url: New })
			.done(function(data) 
			{
				deckID=data.deck_id;
				$(".dev").append("," + deckID);			// display deck id
				drawCard(2, "dealer");
				drawCard(2, "player");
				
				//drawCard(2, "AI");
			})
			.fail(function(jqXHR, textStatus, errorThrown) 
				{
					$(".error").text(errorThrown)
				});
	}
	function drawCard(count, who)
	{
		console.log("arrived at drawCard");
		$.ajax({ url: "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=" + count })
		.done("slow", function(data)
			{
				for(var i=0;i<count;i++)
				{
					switch(who)
					{
						case "player":
							$("#playerCards").append(
								"<li> <img style=" + "height:100%" + 
								" src=" + data.cards[i].image + " /> </li>")
								pHand[pHandSize++]=data.cards[i].value;
								console.log("New card drawn: " + data.cards[i].value);
								pScore=score(pHand);
							$("#pScore").text(pScore);
							break;
						case "AI":
							break;
						case "dealer":
							$("#dealerCards").append(
								"<li> <img style=" + "height:100%" + 
								" src=" + data.cards[i].image + " /> </li>")
								dHand[dHandSize++]=data.cards[i].value;
								console.log("New card drawn: " + data.cards[i].value);
								dScore=score(dHand);
							$("#dScore").text(dScore);
							break;
						default:
							break;
					}
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) 
			{ $(".error").text(errorThrown) });	
		//
	}
	function endGame()
	{
		console.log("arrived at endGame");
		/*$(".preGame").css({"visibility":"visible",
			"width": "50%",
			"height": "parent"});
		$(".game").css({ "visibility": "hidden",
			"height": "0", "width": "0"});
		$("footer").css( "width", "50%" );
		*/
		pScore = score(pHand);
		dScore = score(dHand);
		
		if(pScore<=21)
		{
			/*if(dScore<pScore && dScore<21)
			{
				drawCard(1,"dealer");
				
			}*/
			if(dScore>21)
			{	//dealer defaults
				alert("Dealer defaulted, you win.");
			}
			else if(dScore>=pScore)
			{	//dealer beats player
				alert("Dealer wins");
			}
			else
				alert("You win");
		}
		else
		{	// player defaults
			alert("You have defaulted");
		}
	}
	function score(currentHand)
	{
		console.log("arrived at score");
		if(currentHand==pHand)
			var handSize=pHandSize;
		else
			var handSize=dHandSize;
		
		var tempScore = 0;
		for(i=0;i<handSize;i++)
		{
			switch(currentHand[i])
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
		if(tempScore>21)
		{
			for(i=0;i<handSize;i++)
			{
				if(currentHand[i]=="ACE")
				{
					tempScore=tempScore-10;
				}
			}
		}
		console.log("reached score end: " + tempScore);
		return tempScore;
	}
	
}

// - - - - - - - - - - 

function app()
{
		$("footer").append("v2.0");		// display app version
		this.start = function()
		{
			console.log("arrived at app start");
			
			var game = new Game();
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

// - - - - - - - - - - 

$(function() {
	window.game = new app();
	window.game.start();
});
