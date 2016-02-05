Reference all instructions (below) were obtained from Wikipedia. The came rules and overview can be found at:

       https://en.wikipedia.org/wiki/Mille_Bornes


Objective
--------------------
The premise of Mille Bornes is that the players are in a road race. Each race—or hand—is usually 700 miles (or kilometers) long,
but the first player to complete that distance exactly has the option to declare an extension in which case the race becomes 1,000 miles.
Other times the game is played up to 1000 miles first, and then the first player to complete that distance
has the option to declare an "extension" for 1,200 miles. Mille Bornes is played with a special deck of cards. 

There are hazard, remedy, safety, and distance cards. 
Each hazard is corrected by a corresponding remedy, 
and is actually prevented from happening in the first place by a corresponding safety. 

The target distance is reached by playing distance cards.

below is a List of cards: and the # of individual cards cards in the deck. (106 total cards)
the folder /Assets/Img contains an image for the face of each available card.  A shuffle function will need to compile the necessary 
copies of each card to assemble the deck.  I have not chosen an image for the back of the cards.

--------------------
Hazards: 
--------------------
    Accident:3
    Out of Gas:3
    Flat Tire:3
    Stop:5
    Speed Limit:4
--------------------
Remedies:
--------------------
    Repairs:6
    Gasoline:6
    Spare Tire:6
    Go Roll:14
    End of Limit:6
--------------------
Safeties:
--------------------
    Driving Ace:1
    Extra Tank:1
    Puncture Proof:1
    Right of Way:1
--------------------
Distance:
--------------------
    25 Mile:10
    50 Mile:10
    75 Mile:10
    100 Mile:12
    200 Mile:4

Also included in the deck are nonplayable cards that list the playable cards and summarize the scoring.


Typical Mille Bornes Tableau. The player has traveled 725 km, has a Roll and a Speed Limit in effect, and has played the Driving Ace and Extra Tank safeties, the latter as a coup-fourré.

--------------------
Play
--------------------
The deck is shuffled and six cards are dealt to each player; the remainder becomes a draw pile and a discard pile forms next to it (side of the road). 
Each player's turn begins with a draw of one card and a play of one card, so that each player always holds 6 cards at the end of his turn. 
If a player cannot play that player must discard (any card in hand). Discarded cards are dead and cannot be taken for any reason.

--------------------
The Dashboard  The example on wikipedia shows a typical tableau midway through a game.  
I would like to see a modern dashboard with indicators showing progress bars for examples
--------------------
To set the game up we need to build one tableau for both the user and the computer. The tableau for both players is divided into:
     battle, = [Hazard cards and Remedies]
     speed,  = [Stop/ Go] ; [Speed limit, End of limit]  
              In the actual card game battle and speed areas are stacked so that only the top card shows. 
              in the app game battle and speed areas can easily be replicated by showing instrument icons for truthy and falsy, or ??? lets get creative here!!!
     
     distance, and 
     safety areas; 
             In the actual card game distance cards are usually fanned out so your opponent can see how close you are to finish. Additionally, each player 
             must obtain a go card after a player stops them either with a stop card or by invoking a hazard by an opponent.  This area essentially displays the players current state
             to all other players.  at a quick glance I should be able to determine if and how the computer can be stopped or slowed down.
             for example is the computer or player showing a GO card? or it in need of a go card after playing a remedy to a hazard recently imposed on it.
              
             In the app game distance and safety areas can easily be replicated by ng-show commands altering the state of instrument icons, or card faces.  lets get creative here!!!
             It is important to know the scorng implications of playing one of the four safety cards (see scoring below).  when a safety is played as a counter to a hazard additional points are 
             scored.  the app tableau should enhance the safety card in a manner to display they earned the additional points during the game
     

Hazards and remedies (with the exception of Speed Limit and End of Limit) are played in the battle area, where a Roll card is shown in the example. 
Speed Limit and End of Limit cards are played separately in the speed area. Distance cards are played according to value; it is common to play the 200-mile cards distinctly, rather than fanned. 
Safety cards are played along the top of the tableau; note that the horizontal placement of the Extra Tank card in the example has a special significance.  
the app tableau should enhance the safety card in a manner to display they earned the additional points during the game

In turn, a player may choose to play one of the following:

    A distance card on his own tableau if a Roll card is showing in his battle area.
    A remedy on top of the corresponding hazard if one is showing in his battle area.
    An End of Limit on top of a Speed Limit if one is showing in his speed area.
    An Accident, Out of Gas, Flat Tire, or Stop hazard in his opponent's battle area if it is not empty.
    A Speed Limit hazard in his opponent's speed area if it is empty or showing an End of Limit. 
            (This is the only hazard that can be played against an opponent who has not yet played a Roll card in his own battle area.)
    A safety in his own safety area (at any time).
    A Roll card in his own battle area if a Stop or remedy is showing, or if his battle area is empty.
    
Once an Accident, Out of Gas, or Flat Tire hazard has been played, and the appropriate remedy card played as a counter, the player must next play a Roll card in order to get moving again. 
A hazard can be played onto an opponent's battle area even if another one is already showing, but only the topmost hazard needs to be corrected before that player can use a Roll card. 
Playing a Roll against a Stop hazard corrects it and allows the player to start moving; a second Roll is not needed.

Playing a safety corrects the corresponding hazard and also protects against future hazards of this type. However, when the safety is played normally, 
a Roll must still be played before any distance cards. Whenever the safety is played, the same player draws another card immediately and plays again. 
It is possible to play consecutive safeties on one turn, each time drawing a card before playing again.

A player whose speed is limited (as shown in the example) may only play 25 and 50 km cards. No more than two 200 km cards may be played by any player or team in a single hand.

Whenever a hazard is played, any player holding the corresponding safety may immediately play it and declare a coup-fourré. 
This may be done whether or not the player holding the safety was the one attacked by the hazard. 
The safety is laid down horizontally in the safety area, and the player draws a new card and takes his/her normal turn, 
skipping all players between the attacker and him/herself. In addition, if he/she was attacked with the hazard, it is moved to the discard pile.

The Right of Way card both remedies and protects against Stop and Speed Limit hazards. If a player uses this safety, 
he/she need not play a Roll card in order to get moving again; any Stop or Speed Limit cards showing in the battle/speed areas are moved to the discard pile. 
However, the player is still vulnerable to other hazards.

If an uncorrected hazard is revealed in the battle area due to the Right of Way or a coup-fourré being played, and the corresponding safety is not in effect, 
the hazard must be corrected (and a Roll played, if necessary) in order to start moving again.

Players may always discard, even if they have a legal play available. A player who cannot play in any other way must discard.

Under no circumstances may a distance card be played that would put the player's total over the race goal of 700 or 1000 km.

Play continues until either:

    one player (or team) reaches exactly 1000 km in total distance cards, or
    all players have played or discarded all their cards.
    Note that play continues after the draw pile is exhausted, each player playing or discarding one card per turn. 
    Once both players run out of cards in their hand with a depleted draw pile, play ends.
    
--------------------
Scoring
--------------------

Scores are tallied at the end of the hand as follows:

Scored by each side
    Distance	1	per km traveled
    Each safety	100	however played
    All 4 safeties	700	bonus in addition to the 400 for playing the safeties individually
    Coup-fourré	300	bonus in addition to the 100 for playing that safety
 
Scored only by side that completes trip
    Trip completed	400	for being the winner
    Delayed action	300	for completing the trip after the draw pile is exhausted
    Safe trip	300	for completing the trip without playing any 200 km cards
    Extension	200	for completing the trip after calling for an Extension
    Shutout	500	for completing a trip before the opponent has played any Distance cards
    In a 2-player game, the maximum score that can be made in one hand is 4,600 points. In a standard 4-player game there is no extension,
    so the maximum score is 4,400. In a 3-player or 6-player game, two shutout bonuses are achievable, yielding a perfect score of 5,100.

Note that some points are scored even if a side does not complete a trip; it is possible for the completing side to score fewer points than their opponents. 
If the hand ends by exhaustion rather than by completion, each side still scores its distance and safety points.

According to the printed rules distributed by Parker Brothers, a game continues until one or both sides reaches a cumulative point total of 5,000. 
If both sides go over 5,000 during the same hand, the higher point total wins the game. When the game is played for fun the exact point total is irrelevant, 
so long as one is higher. Note that it is possible for the game to end in a tie, in which case the rules are silent.

If the game is played for money, then generally the point difference is paid from the loser to the winner, and every point is significant.




create Variables
Stop/Roll Status: boolean
Speed Limit Status: boolean
Safety Status:
    Driving Ace:
    Extra Tank:
    Puncture Proof:
    Right of Way:



Create Functions:
--------------------
Game Setup
    setup and clear tableau (dashboard)
    create shuffle function
    deal 6 cards on setup
    draw single card during play
    create logic to select a card from the players hand and chose a method to dicard it: (a) discard, (b) invoke a hassard, or (c) player's tableau 
    update dashboard
    
    
Check Victory

Show topcard in discard pile (push to side of road) 
create button to Exit Game

Play hinderances on opponent
1. record "Stop" card
2. Update speed limit
3. Record Hazards/
4. Reject Coupe Fore`
5. Check Victory
6. ???

Track Points and progress
1. Play "GO" card
2. Update Miles Driven
3. Remedy
4. Hazards/Delays
5. Play trump card
6. Check Victory

Create a dashboard to track:
--------------------
Cards played
Miles traveled
Points Scored: (see above) 
  
    

