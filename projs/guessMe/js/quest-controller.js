'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show();
}

function renderQuest() {
    $('.quest h2').html(getCurrQuest());
    $('.quest h2').show();
}

function onUserResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            showCorrectMessage();
            $('button').hide();
            setTimeout(() => {
                $('.alert').removeClass('alert-success');
                onRestartGame();
            }, 2000);
            // TODO: improve UX
        } else {
            showFalseMessage();
            // TODO: hide and show new-quest section
            $('.new-quest').show();
            $('.quest').hide();
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(gLastRes);
        renderQuest();
    }
}

function onAddGuess() {
    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    var guess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();
    addGuess(newQuest, guess, gLastRes);
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.quest').hide();
    $('.game-start').show();
    $('.alert').hide();
    $('.alert').removeClass('alert-danger');
    $('button').show();
    gLastRes = null;
    gCurrQuest = getQuestTree();
}

function showCorrectMessage() {
    $('.alert').html('Yes I Did It!');
    $('.alert').addClass("alert-success");
    $('.alert').show();
}

function showFalseMessage() {
    $('.alert').html('Ok, I Gave Up...');
    $('.alert').addClass("alert-danger");
    $('.alert').show();
}