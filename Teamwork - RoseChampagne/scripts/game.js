//Initialization all variables needed

//Boxes and bankerOffers are the main arrays used in the game
// They contain all the prizes - these for the banker's offers and on the game field
var startGameArray = startGame();
var boxes = startGameArray[0];
var bankerOffers = startGameArray[1];

//Create player object
var player = {hasBox: false,
              boxesOpened: 0,
              box: 0};

//These are the variables for the field components
const BOXES_COUNT = 16;
var boxesLeftOnField = BOXES_COUNT;
var bankerField = document.getElementById('offerField');
var bankerOffer = '';
var deal = document.getElementById('deal');//rules-btn
var noDeal = document.getElementById('no-deal');//rules-btn
var soundPlayer = document.getElementById('player');
var sound = document.getElementById('sound');
var soundSource = '';
var question;
question = document.getElementById('question');
question.innerText = 'Choose your box';


//Here we need to sort the prizes by points and then to add them to the aside fields
//Sort
var prize;
var prizesSorted = [];
for (var prizeIndex = 0; prizeIndex < BOXES_COUNT; prizeIndex++) {
    prizesSorted.push(boxes[prizeIndex]);
}
prizesSorted.sort(function(previousPrize, currentPrize){
    return previousPrize.points - currentPrize.points;
});
//Add each prize to its field
for (var index = 0; index < BOXES_COUNT; index++) {
    prize = document.getElementById('prize' + (index + 1));
    prize.innerText = prizesSorted[index].prize;
}

//Add rules-btn to open rules field
var rulesButton = document.getElementById('btn-rules');
var buttonRulesClicks = 1;
var rulesField = document.getElementById('rulesField');
var closeRulesButton = document.getElementById('closeRules');
rulesButton.addEventListener('click', function(){
    if (buttonRulesClicks == 1) {
        rulesField.setAttribute('class', 'visible');
        buttonRulesClicks = 2;
        disableBoxes(true);
        deal.setAttribute('disabled', 'disabled');
        noDeal.setAttribute('disabled', 'disabled');
    } else {
        rulesField.setAttribute('class', 'hidden');
        buttonRulesClicks = 1;
        if (bankerField.className == 'offerFieldVisible') {
            disableBoxes(true);
            deal.removeAttribute('disabled');
            noDeal.removeAttribute('disabled');
        } else {
            disableBoxes(false);
            deal.setAttribute('disabled', 'disabled');
            noDeal.setAttribute('disabled', 'disabled');
        }
    }
});
closeRulesButton.addEventListener('click', function(){
    rulesField.setAttribute('class', 'hidden');
    buttonRulesClicks = 1;
    if (bankerField.className == 'offerFieldVisible') {
        disableBoxes(true);
        deal.removeAttribute('disabled');
        noDeal.removeAttribute('disabled');
    } else {
        disableBoxes(false);
        deal.setAttribute('disabled', 'disabled');
        noDeal.setAttribute('disabled', 'disabled');
    }
});

//Add story-btn to open story field
var storyButton = document.getElementById('story');
var buttonStoryClicks = 1;
var storyField = document.getElementById('storyField');
var closeStoryButton = document.getElementById('closeStory');
storyButton.addEventListener('click', function(){
    if (buttonStoryClicks == 1) {
        storyField.setAttribute('class', 'visible');
        buttonStoryClicks = 2;
        disableBoxes(true);
        deal.setAttribute('disabled', 'disabled');
        noDeal.setAttribute('disabled', 'disabled');
    } else {
        storyField.setAttribute('class', 'hidden');
        buttonStoryClicks = 1;
        if (bankerField.className == 'offerFieldVisible') {
            disableBoxes(true);
            deal.removeAttribute('disabled');
            noDeal.removeAttribute('disabled');
        } else {
            disableBoxes(false);
            deal.setAttribute('disabled', 'disabled');
            noDeal.setAttribute('disabled', 'disabled');
        }
    }
});
closeStoryButton.addEventListener('click', function(){
    storyField.setAttribute('class', 'hidden');
    buttonStoryClicks = 1;
    if (bankerField.className == 'offerFieldVisible') {
        disableBoxes(true);
        deal.removeAttribute('disabled');
        noDeal.removeAttribute('disabled');
    } else {
        disableBoxes(false);
        deal.setAttribute('disabled', 'disabled');
        noDeal.setAttribute('disabled', 'disabled');
    }
});

//Add about-btn to open about field
var aboutButton = document.getElementById('about');
var buttonAboutClicks = 1;
var aboutField = document.getElementById('aboutField');
var closeAboutButton = document.getElementById('closeAbout');
aboutButton.addEventListener('click', function(){
    if (buttonStoryClicks == 1) {
        aboutField.setAttribute('class', 'visible');
        buttonAboutClicks = 2;
        disableBoxes(true);
        deal.setAttribute('disabled', 'disabled');
        noDeal.setAttribute('disabled', 'disabled');
    } else {
        aboutField.setAttribute('class', 'hidden');
        buttonAboutClicks = 1;
        if (bankerField.className == 'offerFieldVisible') {
            disableBoxes(true);
            deal.removeAttribute('disabled');
            noDeal.removeAttribute('disabled');
        } else {
            disableBoxes(false);
            deal.setAttribute('disabled', 'disabled');
            noDeal.setAttribute('disabled', 'disabled');
        }
    }
});
closeAboutButton.addEventListener('click', function(){
    aboutField.setAttribute('class', 'hidden');
    buttonAboutClicks = 1;
    if (bankerField.className == 'offerFieldVisible') {
        disableBoxes(true);
        deal.removeAttribute('disabled');
        noDeal.removeAttribute('disabled');
    } else {
        disableBoxes(false);
        deal.setAttribute('disabled', 'disabled');
        noDeal.setAttribute('disabled', 'disabled');
    }
});

//Main game logic
//First we add class 'closedBox' to all boxes on the field
//Then we add event listener to detect when a box is clicked
for (var boxId = 0; boxId < BOXES_COUNT; boxId++) {
    var box = document.getElementById(boxId.toString());
    //Add event listener
    box.addEventListener('click', function(){
        //From the current box clicked we get the number inside - this the prize number
        var boxId = Number(this.id);
        var box = document.getElementById(boxId + '');
        //Checks if the player has already a box
        if (player.hasBox == false) {
           choosePlayersBox(boxes, box, boxId, player, question);
        } else {
            //If the player has opened less than 2 boxes they can open another one
            if (player.boxesOpened < 2){
                openNewBox(player, boxes, box, boxId, question, prizesSorted);
                boxesLeftOnField -= 1;
            }
            //Check if on the field is left only one box - means end of the game
            if (boxesLeftOnField == 2) {
                disableBoxes(true);
                endGame(boxes, player, question, bankerField, bankerOffer, deal, noDeal);
                return;
            }
            //Banker offers if the player has opened 2 boxes
            if (player.boxesOpened == 2) {
                offer(boxes, bankerOffers, player, question, bankerField, bankerOffer, deal, noDeal);
            }
        }
    })
}



