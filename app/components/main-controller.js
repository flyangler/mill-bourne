app.controller('MainController', function ($scope, CardService) {
    var mc = this;
    function Game(options) {
        $scope.deck = CardService.getDeck();
        $scope.players = [new Player("John", "black"), new Player("Sara", "peru"), new Player("Tim", "red")];  // {name:"John", color:"black"},{name:"Sara", color:"Peru"},{name:"Jake", color:"green"}
        $scope.activePlayerIndex = 0;
        var playerCount = options.totalPlayers
        // while (playerCount) {
        //     $scope.players.push(new Player(prompt("Player Name"), prompt("WHAT IS YOUR FAVORITE COLOR?")));
        //     playerCount--;
        // }

        deal();
        $scope.startTurn();
    }

    $scope.startTurn = function () {
        $scope.readyNext = false;
        $scope.activePlayer = $scope.players[$scope.activePlayerIndex];
        $scope.activePlayer.hand.push(takeCard());
    }

    $scope.playCard = function () {
        $scope.effectError = '';
        if (!mc.activeCard && !mc.currentTarget) {
            return;
        }
        
        var effect = mc.activeCard.effect(mc.currentTarget);
        if(effect){
            return;
        }
        
        for (var i = 0; i < $scope.activePlayer.hand.length; i++) {
            var card = $scope.activePlayer.hand[i];
            if (mc.activeCard === card) {
                $scope.activePlayer.hand.splice($scope.activePlayer.hand.indexOf(card), 1)
            }
        }
        mc.activeCard = '';
        mc.currentTarget = '';
        mc.discard = '';
        nextPlayer();
    }

    function nextPlayer() {
        $scope.activePlayerIndex++;
        if ($scope.activePlayerIndex > $scope.players.length - 1) {
            $scope.activePlayerIndex = 0;
        }
        $scope.nextPlayer = $scope.players[$scope.activePlayerIndex]
        $scope.readyNext = true
    }

    $scope.discard = function () {
        for (var i = 0; i < $scope.activePlayer.hand.length; i++) {
            var card = $scope.activePlayer.hand[i];
            if (mc.activeCard === card) {
                $scope.activePlayer.hand.splice($scope.activePlayer.hand.indexOf(card), 1)
            }
        }
        nextPlayer();
    }




    function victory(trip) {
        for (var i = 0; i < $scope.players.length; i++) {
            var currentPlayer = $scope.players[i];
            if (currentPlayer.distance >= trip) {
                $scope.winner = currentPlayer;
                return true;
            }
        }
    }

    function takeCard() {
        if ($scope.deck.length > 0) {
            return $scope.deck.pop();
        }
    }
    
    // game.isValidPlay(card, player)
    
    function deal() {
        for (var i = 0; i < $scope.players.length; i++) {
            var currentPlayer = $scope.players[i];
            while (currentPlayer.hand.length < 6) {
                currentPlayer.hand.push(takeCard());
            }
        }
    }


    function Player(name, color) {
        var player = this;
        player.name = name;
        player.color = color;
        player.immunities = {};
        player.hazards = {};
        player.limit = false;
        player.distance = 0;
        player.isStopped = true;
        player.hand = [];
        player.score = 0;

        player.setImmunity = function (type) {
            player.immunities[type] = true;
        }

        player.addPenalty = function (value) {
            player.score -= value;
        }

        player.move = function (distance) {
            for (var hazard in player.hazards) {
                if (player.hazards[hazard]) {
                    $scope.effectError = { error: 'You must fix your hazards before attempting to move' }; 
                    return true
                }
            }
            if (player.isStopped) {
                $scope.effectError = { error: 'You must play a Go Card before rolling again' };
                return true
            }
            if (player.limit && distance > 50) {
                $scope.effectError = { error: 'You cannot exceed the 50km Speed Limit' }; 
                return true;
            }
            player.distance += distance;
        }

        player.setHazard = function (type) {
            if (player.immunities[type]) {
                $scope.effectError = { error: 'Player is immune to your tricks' }; 
                return true;
            }
            player.hazards[type] = true;
        }

        player.removeHazard = function (type) {
            if (!player.hazards[type]) {
                if(!player.immunities[type]){
                    $scope.effectError = { error: 'You cannot fix a problem you don\'t have' };
                    return true 
                } else {
                    $scope.effectError = { error: 'You are already immune' };
                    return true
                }
            }
            delete player.hazards[type];
        }

        player.stopped = function (value) {
            if (player.immunities['right-of-way'] && value) {
                $scope.effectError = { error: 'Sorry this Player is immune to Red Lights' };
                return true
            }
            if (player.isStopped && value && mc.activeCard.title === 'Red Light') {
                $scope.effectError = { error: 'Umm the player is already stopped. Don\'t waste your card' }
                return true;
            }
            for (var hazard in player.hazards) {
                if ( player.hazards[hazard] && !value) {
                    $scope.effectError = { error: 'You must fix your hazards before playing a go card' }; 
                    return true;
                }
            }
            if(!player.isStopped && !value){
                $scope.effectError = { error: 'You are already rolling'};
                return true;
            }
            player.isStopped = value;
        }

        player.speedLimit = function (value) {
            if (player.immunities['right-of-way'] && value) {
                $scope.effectError = { error: 'Sorry this Player is immune to Speed Limits' };
                return true;
            }
            if (player.limit && value) {
                $scope.effectError = { error: 'You can\'t stack multiple speed limits' };
                return true
            }
            if(!player.limit && !value){
                $scope.effectError = { error: 'You are not in a limit zone'};
                return true;
            }
            player.limit = value;
        }
    }


    new Game({
        totalPlayers: 3
    })

});
app.service('CardService', function () {
    var base = 'assets/img/cards/'
    // var cardback = base + 'back.png';
    var cards = [{
        title: '100 Miles',
        effect: function (player) {
           return player.move(100);
        },
        img: base + '100-mile.png',
        quantity: 12
    }, {
            title: '200 Miles',
            effect: function (player) {

                var effect = player.move(200);
                if (effect) {
                    return effect;
                }

                player.addPenalty(300);
            },
            img: base + '200-mile.png',
            quantity: 4
        }, {
            title: '50 Miles',
            effect: function (player) {
                return player.move(50);
            },
            img: base + '50-mile.png',
            quantity: 10
        }, {
            title: '75 Miles',
            effect: function (player) {
                return player.move(75);
            },
            img: base + '75-mile.png',
            quantity: 10
        }, {
            title: '25 Miles',
            effect: function (player) {
                return player.move(25);
            },
            img: base + '25-mile.png',
            quantity: 10
        }, {
            title: 'Accident',
            effect: function (player) {
                var effect = player.setHazard('accident');
                if (effect) {
                    return effect;
                }
                player.stopped(true);
            },
            img: base + 'accident.png',
            quantity: 3
        }, {
            title: 'Out of Gas',
            effect: function (player) {
                var effect = player.setHazard('out-of-gas'); 
                if (effect) {
                    return effect;
                };
                player.stopped(true);
            },
            img: base + 'out-of-gas.png',
            quantity: 3
        }, {
            title: 'Flat Tire',
            effect: function (player) {
                var effect = player.setHazard('flat-tire'); 
                if (effect) {
                    return effect;
                }
                player.stopped(true);
            },
            img: base + 'flat-tire.png',
            quantity: 3
        }, {
            title: 'Speed Limit',
            effect: function (player) {
                return player.speedLimit(true);
            },
            img: base + 'speed-limit.png',
            quantity: 4
        }, {
            title: 'Red Light',
            effect: function (player) {
                return player.stopped(true);
            },
            img: base + 'stop.png',
            quantity: 5
        }, {
            title: 'End of Limit',
            effect: function (player) {
                return player.speedLimit(false);
            },
            img: base + 'end-of-limit.png',
            quantity: 6
        }, {
            title: 'Green Light',
            effect: function (player) {
                return player.stopped(false);
            },
            img: base + 'go.png',
            quantity: 14
        }, {
            title: 'Spare Tire',
            effect: function (player) {
                return player.removeHazard('flat-tire');
            },
            img: base + 'spare-tire.png',
            quantity: 6
        }, {
            title: 'Gasoline',
            effect: function (player) {
                return player.removeHazard('out-of-gas');
            },
            img: base + 'gasoline.png',
            quantity: 6
        }, {
            title: 'Repairs',
            effect: function (player) {
                return player.removeHazard('accident');
            },
            img: base + 'repairs.png',
            quantity: 6
        }, {
            title: 'Extra Tank',
            effect: function (player) {
                player.setImmunity('out-of-gas');
                player.removeHazard('out-of-gas');
            },
            img: base + 'extra-tank.png',
            quantity: 1
        }, {
            title: 'Puncture Proof',
            effect: function (player) {
                player.setImmunity('flat-tire');
                player.removeHazard('flat-tire');
            },
            img: base + 'puncture-proof.png',
            quantity: 1
        }, {
            title: 'Driving Ace',
            effect: function (player) {
                player.setImmunity('accident');
                player.removeHazard('accident');
            },
            img: base + 'driving-ace.png',
            quantity: 1
        }, {
            title: 'Right of Way',
            effect: function (player) {
                player.setImmunity('right-of-way');
                player.stopped(false);
                player.speedLimit(false);
            },
            img: base + 'right-of-way.png',
            quantity: 1
        }];

    var Card = function (card) {
        this.title = card.title;
        this.effect = card.effect;
        this.img = card.img;
    }

    this.getDeck = function () {
        var deck = [];
        for (var i = 0; i < cards.length; i++) {
            var currentCard = cards[i];
            for (var j = 0; j < currentCard.quantity; j++) {
                deck.push(new Card(currentCard));
            }
        }

        var shuffled = shuffle(deck, 6);

        return shuffled;
    }


    function shuffle(deck, timesToShuffle) {
        while (timesToShuffle) {
            for (var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
            timesToShuffle--;
        }
        return deck;
    }

})