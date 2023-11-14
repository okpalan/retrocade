function Enum(obj) {
    return new Proxy(obj, {
        get(target, prop) {
            if (prop in target) {
                let value = target[prop];
                if (typeof value === 'object') {
                    return Enum(value);
                }
                return Object.freeze({ value: `${value}` });
            }
            return undefined;
        },
        set(target, prop, value) {
            if (typeof value === 'string') {
                target[prop] = value.split('_')[0];
                return true;
            }
            return false;
        },
    });
}

 const GAME_STATE_MACHINE = {
    currentState: 'INIT',
    STATES: new Enum({
        INIT: 'INIT',
        LOADING: 'LOADING',
        RESET: 'RESET',
        PLAYING: 'PLAYING',
        PAUSED: 'PAUSED',
        END: 'END',
    }),
    transitions: {
        INIT: {
            TLOADING: 'LOADING',
        },
        LOADING: {
            RESET: 'RESET',
            PLAYING: 'PLAYING',
        },
        RESET: {
            LOADING: 'LOADING',
        },
        PLAYING: {
            PAUSED: 'PAUSED',
        },
        PAUSED: {
            END: 'END',
        },
        END: {
            INIT: 'INIT',
        },
    },
    dispatch: function (event) {
        const currentState = this.currentState;
        const transitions = this.transitions[currentState];
        if (transitions && transitions[event]) {
            const nextState = transitions[event];
            this.changeState(nextState);
            console.log(`Transition from ${currentState} to ${nextState}`);
        } else {
            console.error(`Invalid transition from ${currentState} for event ${event}`);
        }
    },
    changeState: function (nextState) {
        if (this.STATES[nextState]) {
            this.currentState = nextState;
        } else {
            console.error(`Invalid state: ${nextState}`);
        }
    },
};

function createStateMachine(obj) {
    return Object.create(Object.assign(obj, GAME_STATE_MACHINE));
}
