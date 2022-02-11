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
    console.log(state);
    showTextNode(nextTextNodeId);

}

const textNodes = [
    {
        id: 1,
        text: 'You are an adventurer who is always in search of secrets and treasures. On a wintery day, you are about to explore some ancient ruins, when you make a brief stop in a small town. There you come across an old man who has lost his beloved cat, and desperately needs someone to help find her.',

        options: [
            {
                text: 'You offer your help.',
                nextText: 2
            },
            {
                text: 'You keep going.',
                nextText: 0
            }
        ]
    },
    {
        id: 2,
        text: 'While searching for the cat, a merchant approaches you and tries to sell you his wares.',
        options: [
            {
                text: 'Trade your last gold for some sturdy rope.',
                setState: { rope: true },
                nextText: 3
            },
            {
                text: 'Trade your last gold for an iron sword.',
                setState: { sword: true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant and save your gold.',
                setState: { gold: true },
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant, you finally have narrowed down some promising spots to look for the cat. Which one will you choose?',
        options: [
            {
                text: 'A very deep and old looking well in a secluded area outside of town.',
                requiredState: (currentState) => currentState.rope,
                nextText: 4
            },
            {
                text: 'A very deep and old looking well in a secluded area outside of town.',
                requiredState: (currentState) => !currentState.rope,
                nextText: 5
            },
            {
                text: 'The tall trees that are scattered all around town.',
                nextText: 6
            },
            {
                text: 'The stables at the edge of town.',
                nextText: 7
            }
        ]
    },
    {
        id: 4,
        text: 'You use your handy rope to climb down the well. After a few moments, you hear some miserable sounding meows from the bottom. You found the cat! When you bring it back to its owner, the overjoyed man gives you some carrots and a weird looking potion to show his gratitude.',
        options: [
            {
                text: 'You are glad you could help and finally continue your adventure.',
                setState: { carrots: true, potion: true },
                nextText: 9
            }
        ]
    }, 
    {
        id: 5,
        text: 'Somehow, you manage to scramble down the well without breaking all your bones. At the bottom, you find the cat, but also realise that you are stuck. It\'s impossible to climb back out without any help. You end up freezing to death the very next night.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You spend hours searching and climbing the trees in town. Sadly, you have no luck and return to the man empty-handed. He is clearly disappointed, but thanks you anyway for trying.',
        options: [
            {
                text: 'You feel sorry for him, but decide to continue your adventure.',
                nextText: 9
            }
        ]
    },
    {
        id: 7,
        text: 'At the stables, you don\'t find the cat, but you stumble upon a hidden potion. It looks kind of suspicious and is very sparkly.',
        options: [
            {
                text: 'Take it.',
                setState: { potion: true },
                nextText: 8
            },
            {
                text: 'Leave it.',
                nextText: 8
            }
        ]
    },
    {
        id: 8,
        text: 'After having no luck in finding his cat, you return to the man empty-handed, He is clearly disappointed, but thanks you anyway for trying.',
        options: [
            {
                text: 'You feel sorry for him, but decide to continue your adventure.',
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text: 'You go on and finally arrive at the ancient ruins. You venture deeper inside and find a chest! After opening it, you see that there is only one thing inside: a very old and fragile looking scroll.',
        options: [
            {
                text: 'Take it with you. Who knows what secrets it holds?',
                setState: { scroll: true },
                nextText: 10
            },
            {
                text: 'It looks dangerous, maybe it\'s cursed. Better leave it there.',
                nextText: 10
            }
        ]
    },
    {
        id: 10,
        text: 'You go deeper and deeper into the ruins. After a while, you stumble across something weird. Strange looking symbols are carved in a circular pattern in the floor. Scattered in the room are a few odd looking stone statues. How curious...',
        options: [
            {
                text: 'You step into the circle and, on a whim, decide to read the scroll out loud.',
                requiredState: (currentState) => currentState.scroll,
                nextText: 11
            },
            {
                text: 'You have a very bad feeling about this and make wide berth around the circle.',
                nextText: 12
            },
            {
                text: 'You don\'t want to take any risks, and decide to retreat to safety.',
                text: 13
            }
        ]
    },
    {
        id: 11,
        text: `As soon as you have spoken the last words aloud, an enormous monster appears!! It growls something in a terrifying voice, but the only words you can make out are 'guardian' and 'trespasser'. The monster slowly approaches you...`,
        options: [
            {
                text: 'You are glad to have bought the sword earlier, and decide to attack the monster!',
                requiredState: (currentState) => currentState.sword,
                nextText: 14
            },
            {
                text: 'You are panicking, and decide to drink the potion you found earlier.',
                requiredState: (currentState) => currentState.potion,
                nextText: 15
            },
            {
                text: 'Without thinking, you throw the potion at the monster.',
                requiredState: (currentState) => currentState.potion,
                nextText: 16
            },
            {
                text: 'You look at your sturdy rope and suddenly have an idea: You will use it as a lasso to tame the monster!',
                requiredState: (currentState) => currentState.rope,
                nextText: 17
            },
            {
                text: 'Paralysed by fear, you can think of nothing else than to offer the monster some carrots.',
                requiredState: (currentState) => currentState.carrots,
                nextText: 18
            },
            {
                text: 'You turn on the spot and run for your life.',
                nextText: 19
            }
        ]
    },
    {
        id: 14,
        text: 'The monster reacts viciously to your attack, and you are barely able to defend yourself. You realise you stand no chance and manage to escape death narrowly. Frightened by this near-death experience, you decide to quit adventuring for the time being.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 15,
        text: 'As soon as you swallow the potion, you know you made a big mistake. The potion is full of magic and definitely not made for drinking! Quickly, you succumb to its deathly effect.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 16,
        text: 'As the content of the potion explodes all over the monster, the effect is almost instantaneous: The monster starts writhing and slowly and painfully succumbs to the deathly potion. Even though you emerge victorious, you feel really guilty about using such a terrible weapon. You are in no mood to continue your adventure, and leave the ruins without looking back.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 17,
        text: 'It doesn\'t take long for you to realise that you have not the fainted idea how to use a lasso. The monster realises that too, and regret is the last thing you feel before you are turned to stone.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 18,
        text: 'Already resigned to dying a horrible death, you are surprised to see that the monster accepted your offering! Munching happily, it doesn\'t look so frightening anymore. After finishing your exploration, you cannot wait for your next big adventure.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 19,
        text: 'You sprint towards the entrance, the growls of the monster still loud in your ear. You don\'t dare to ever come back to these ruins, and decide to take things a little slower in the future.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 12,
        text: 'Trying very hard not to step in the circle, you become oblivious to your surroundings and knock over an ancient looking vase. As if awakened by the loud crash, the statues surrounding you come to life. You can see in their stony faces that they mean harm.',
        options: [
            {
                text: 'You feel like you have no chance to escape, so you offer them your gold.',
                requiredState: (currentState) => currentState.gold,
                nextText: 20
            },
            {
                text: 'You draw your sword and are ready to fight for your life.',
                requiredState: (currentState) => currentState.sword,
                nextText: 21
            },
            {
                text: 'Even though you have a bad feeling about it, you try to talk your way out of this.',
                nextText: 22
            },
            {
                text: 'You immediately bolt.',
                nextText: 23
            },
            {
                text: 'You are panicking, and decide to drink the potion you found earlier.',
                requiredState: (currentState) => currentState.potion,
                nextText: 15
            },
            {
                text: 'Without thinking, you throw the potion at the statues.',
                requiredState: (currentState) => currentState.potion,
                nextText: 24
            },
        ]
    },
    {
        id: 20,
        text: 'The statues don\'t even glance at your offering, and mercilessly strike you down.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 21,
        text: 'You successfully defend yourself against the statues! After defeating them, you venture deeper into the ruins, but only find some more old vases. Slightly disappointed, you retreat.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 22,
        text: 'The statues don\'t even stop for one second to listen to your words. They strike you down mercilessly.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 23,
        text: 'You barely manage to escape with your life. Frightened by this near-death experience, you decide to quit adventuring for the time being.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 24,
        text: 'As soon as the statues come into contact with the potion, they suddenly turn back into real people! Grateful, that you lifted the curse, they each reward you generously. You can\'t wait for your next big adventure.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 13,
        text: 'You return home safe and sound, but are secretly frustrated with your underwhelming experience. You promise yourself to be more brave in your next adventure.',
        options: [
            {
                text: 'Restart your adventure',
                nextText: -1
            }
        ]
    }

]

startGame();