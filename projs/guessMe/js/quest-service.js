'use-strict'

const QUEST_KEY = 'quests'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    gQuestsTree = loadFromStorage(QUEST_KEY);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi')
        gQuestsTree.no = createQuest('Rita')

    }

    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveToStorage(QUEST_KEY, gQuestsTree);
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    res === 'yes' ? gCurrQuest = gCurrQuest.yes : gCurrQuest = gCurrQuest.no
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = createQuest(gCurrQuest.txt);
    gPrevQuest[lastRes] = newQuest;
    saveToStorage(QUEST_KEY, gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest.txt;
}

function getQuestTree() {
    return gQuestsTree;
}