/*
JS - Jokenpo
@autor Iago Alves Oliveira
Date: 15/08/2023
*/

const options = ['rock', 'paper', 'scissors'];
var hand_selected = null;

function refreshImages() {
    //Page icon
    document.getElementById('icon-page').href = images.scissors;
    //Buttons
    document.getElementById('img-rock').src = images.rock;
    document.getElementById('img-paper').src = images.paper;
    document.getElementById('img-scissors').src = images.scissors;
    //Profiles
    document.getElementById('img-profile-user').src = images.user;
    document.getElementById('img-profile-bot').src = images.bot;
}

function  play() {
    //Clear the result
    setResult('');
        
    if(!hand_selected) {
        setResult('Choose!', 'black');
    }
    else {
        
        let img_hand_bot = document.getElementById('img-hand-bot');
        let img_hand_user = document.getElementById('img-hand-user');
        //Load gifs
        img_hand_bot.style.transform = '';
        img_hand_bot.src = images.loading;
        img_hand_user.src = images.loading;
        
        let hand_bot = options[Math.floor(Math.random()*options.length)];

        //Wait some seconds, then show the hands
        setTimeout(function() {
            img_hand_user.src = images[hand_selected]
            img_hand_bot.src = images[hand_bot];
            img_hand_bot.style.transform = 'scaleX(-1)'; //Bot has fliped hand

            setTimeout(function() {
                //User wins
                if ((hand_selected == 'scissors' && hand_bot == 'paper') ||
                    (hand_selected == 'paper' && hand_bot == 'rock' ) ||
                    (hand_selected == 'rock' && hand_bot == 'scissors')
                ) {
                    setResult('You win!', 'green');
                }
                //Bot wins
                else if (
                    (hand_selected == 'scissors' && hand_bot == 'rock') ||
                    (hand_selected == 'paper' && hand_bot == 'scissors') ||
                    (hand_selected == 'rock' && hand_bot == 'paper')
                ) {
                    setResult('You lose!', 'red');
                }
                //EMPATE
                else {
                    setResult('Both win', 'black');
                }
                unselectHand();
            }, 100);
        }, 800);
        
    }
}

function selectHand(hand) {
    let last_hand_selected = hand_selected;
    let option_element = document.getElementById(hand);

    unselectHand();

    if(last_hand_selected != hand) {
        option_element.className += ' selected';
        hand_selected = hand;
    }
}

function unselectHand() {
    let option_element = document.getElementById(hand_selected);

    if(option_element) {
        option_element.className = option_element.className.replace('selected', '')
        hand_selected = null; //unselect
    }
}

function setResult(text, class_name='black') {
    let label_result = document.getElementById('result');
    label_result.innerText = text;
    label_result.className = class_name;
}