var boxes = startGame()[0];
var bankerOffers = startGame()[1];
var player = {hasBox: false,
              boxesOpened: 0,
              box: 0};

for (var boxId = 0; boxId < 16; boxId++) {
    var box = document.getElementById(boxId.toString());
    box.setAttribute('class', 'closedBox');
    boxes.innerText = boxId;

    //Add play function to the boxes
    box.addEventListener('click', function(boxId){
        //Checks if the player has already a box
        if (player.hasBox == false) {
            boxes[boxId].isPlayers = true;
            box.setAttribute('class', 'playersBox');
            box.setAttribute('disabled', 'disabled');
            player.hasBox = true;
            player.box = boxId;
        } else {
            //If the player has opened less than 2 boxes they can open another one
            if (player.boxesOpened < 2){
                player.boxesOpened += 1;
                box.removeAttribute('class');
                box.setAttribute('class', 'openedBox');
                box.innerText = boxes[boxId].prize;
                delete boxes[boxId];
            }

            //Check if on the field is left only one box - means end of the game
            if (boxes.length == 1) {

            }

            //Banker offers if the player has opened 2 boxes
            if (player.boxesOpened == 2) {
                player.boxesOpened = 0;
                var offerField = document.getElementById('offerField');
                offerField.removeAttribute('class');
                offerField.setAttribute('class', 'offerFieldVisible');
                var offerFieldText = offerField.getElementById('text');
                var restPrisezWeight = 0;
                for(var prize in prisez){
                    restPrisezWeight = prisez[prize].points;
                }
                restPrisezWeight = restPrisezWeight * 0.70;
                var closestPoints = 0;
                var smallestDifference = 200;
                var offerKey;
                for (var i = 0; i < bankerOffers.length; i++) {
                    var currentDiff = Math.abs(bankerOffers[i].points - restPrisezWeight);
                    if (currentDiff < smallestDifference) {
                        closestPoints = banker[i].points;
                        offerKey = i;
                    }
                }
                offerFieldText.innerText = bankerOffers[offerField].prize;
                var deal = document.getElementById('deal');
                var noDeal = document.getElementById('no-deal');
                deal.addEventListener('click', function(){
                    offerField.innerText = 'You just swapped ' + boxes[playerObj.box].prize + ' for '
                        + bankerOffers[offerKey].prize;
                });
                noDeal.addEventListener('click', function(){
                    offerField.removeAttribute('class');
                    offerField.setAttribute('class', 'hiddenField');
                });
            }
        }
    })
}


