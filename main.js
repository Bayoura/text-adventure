const text_div = document.querySelector('[data-text]');
const option_buttons = document.querySelector('[data-optionButtons]');

// state of the character depending on his decisions
let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    text_div.innerText = textNode.text;
    while (option_buttons.firstChild) {
        option_buttons.removeChild(option_buttons.firstChild);
    }

    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            option_buttons.appendChild(button);

        }
    })

}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);

}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and see a jar of blue goo near you.',
        options: [
            {
                text: 'Take the goo.',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'Leave the goo.',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword.',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield.',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant.',
                setState: { blueGoo: false, shield: true },
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle.',
                nextText: 4,


            },
            {
                text: 'Find a room to sleep at in the town.',
                nextText: 5,

            },
            {
                text: 'Find some hay in the stables to sleep in.'

            }
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fell asleep while exploring the castle and are killed by a terrible monster in your sleep.',
        options: [
            {
                text: 'Restart the Game',
                nextText: -1
            }
        ]
    }
]

startGame();