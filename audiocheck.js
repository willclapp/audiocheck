// Locate audio files
// Each file consists of two tones. Key is:
//    IO = in-phase, out-of-phase
//    IQ = regular, quiet
//    OI = out-of-phase, in-phase
//    QI = quiet, regular.
let preload_audiocheck = [
    'audio/IO.wav',
    'audio/IQ.wav',
    'audio/OI.wav',
    'audio/QI.wav',
    'audio/silence.wav'
];

// Reset variables for second round
let audio_check_reset = {
    type: 'html-keyboard-response',
    stimulus: " ",
    trial_duration: 10,
    on_finish: function() {
        wrong_phase = 0;
        correct_quiet = 0;
    }
}

// Evaluate results. Pass if participant selected out-of-phase audio
// over in phase audio once or fewer and higher amplitude over lower
// amplitude at least three times.
let audio_check_evaluate = {
    type: 'html-keyboard-response',
    stimulus: " ",
    trial_duration: 10,
    on_finish: function() {
        if (wrong_phase <= 1 && correct_quiet >= 3) {
            pass = true;
        }
        wrong_phase = 0;
        correct_quiet = 0;
    }
}

let audio_check_second_evaluate = {
    type: 'html-keyboard-response',
    stimulus: " ",
    trial_duration: 10,
    on_finish: function() {
        if (!pass) {
            if (wrong_phase <= 1 && correct_quiet >= 3) {
                pass = true;
            }
        }
        wrong_phase = 0;
        correct_quiet = 0;
    }
}

// If participant fails the first round, provide instructions for second round. 
// Otherwise, this trial has duration of 0.
let audio_check_between = {
    type: 'html-keyboard-response',
    stimulus: `<div class="gen_ins"><p>The results of the audio check suggest you may not be wearing headphones, as is required for participation in this experiment. If you'd like put on headphones and continue, or believe you're getting this message in error, please try the audio check again. Otherwise, please return to Prolific.<br><br>When you're ready, press the space bar to restart audio check again.</p></div>`,
    choices: ['space'],
    trial_duration: function() {
        if (pass) {
            return 0;
        } else {
            return 1000000000;
        }
    },
    on_finish: function() {
        if (wrong_phase <= 1 && correct_quiet >= 3) {
            pass = true;
        }
    }
}

// If participant fails twice, they get stuck in this limbo. Otherwise, duration 0.
let audio_check_after_bad = {
    type: 'html-keyboard-response',
    stimulus: `<div class="gen_ins"><p>The results of the audio check suggest that you're not wearing headphones, as is required for participation in this experiment.<br><br>Please close this window and return to Prolific.</p></div>`,
    choices: [],
    trial_duration: function() {
        if (pass) {
            return 0;
        } else {
            return 1000000000;
        }
    },
    stimulus_duration: function() {
        if (pass) {
            return 0;
        } else {
            return 1000000000;
        }
    }
}

// Success message
let audio_check_after_good = {
    type: 'html-keyboard-response',
    stimulus: `<div class="gen_ins"><p>Thank you for completing the audio check. Please press the space bar to continue to the experiment.</p></div>`,
    choices: ['space']
}

// HTML to populate screen on trials
let html_content = '<div class="quietest-container"><div><p class="quietest">Which sound was the quietest?</p></div><div class="yes-no"><div class="quietest_option"><p>FIRST</p><p>Press 1</p></div><div class="quietest_option"><p>SECOND</p><p>Press 2</p></div><div class="quietest_option"><p>NONE</p><p>Press 0</p></div></div></div>'


// Each trial consists of an audio file playing followed by a response phase. These
// are coded separately for each audio combination here.
let io_audio = {
    type: 'audio-keyboard-response', 
    stimulus: function() {
        if (!pass) {
            return 'audio/IO.wav'
        } else {
            return 'audio/silence.wav'
        }
    },   
    prompt: function() {
        if (!pass) {
            return html_content;
        } else {
            return " ";
        }
    },
    trial_ends_after_audio: true, 
    post_trial_gap: 0, 
    response_allowed_while_playing: false
}

let io_response = {
    type: 'html-keyboard-response', 
    stimulus: function() {
        if (!pass) {
            return html_content;
        } else {
            return " ";
        }
    },
    choices: ['1', '2', '0'],
    trial_duration: function() {
        if (!pass) {
            return 5000;
        } else {
            return 0;
        }
    },
    post_trial_gap: function() {
        if (!pass) {
            return 1000;
        } else {
            return 0;
        }
    }, 
    on_finish: function(data) {
        if (data.key_press == 50) {
            wrong_phase++;
        }
        console.log(wrong_phase);
    }
}

let oi_audio = {
    type: 'audio-keyboard-response', 
    stimulus: function() {
        if (!pass) {
            return 'audio/OI.wav'
        } else {
            return 'audio/silence.wav'
        }
    }, 
    prompt: function() {
        if (!pass) {
            return html_content;
        } else {
            return " ";
        }
    },
    trial_ends_after_audio: true, 
    post_trial_gap: 0, 
    response_allowed_while_playing: false
}

let oi_response = {
    type: 'html-keyboard-response', 
    stimulus: function() {
        if (!pass) {
            return html_content;
        } else {
            return " ";
        }
    },
    choices: ['1', '2', '0'],
    trial_duration: function() {
        if (!pass) {
            return 5000;
        } else {
            return 0;
        }
    },
    post_trial_gap: function() {
        if (!pass) {
            return 1000;
        } else {
            return 0;
        }
    },  
    on_finish: function(data) {
        if (data.key_press == 49) {
            wrong_phase++;
        }
        console.log(wrong_phase);
    }
}

let iq_audio = {
    type: 'audio-keyboard-response', 
    stimulus: function() {
        if (!pass) {
            return 'audio/IQ.wav'
        } else {
            return 'audio/silence.wav'
        }
    }, 
    prompt: function() {
        if (!pass) {
            return html_content;
        } else {
            return " ";
        }
    },
    trial_ends_after_audio: true, 
    post_trial_gap: 0, 
    response_allowed_while_playing: false
}

let iq_response = {
    type: 'html-keyboard-response', 
    stimulus: function() {
        if (!pass) {
            return html_content;
        } else {
            return " ";
        }
    },
    choices: ['1', '2', '0'],
    trial_duration: function() {
        if (!pass) {
            return 5000;
        } else {
            return 0;
        }
    },
    post_trial_gap: function() {
        if (!pass) {
            return 1000;
        } else {
            return 0;
        }
    },  
    on_finish: function(data) {
        if (data.key_press == 50) {
            correct_quiet++;
        }
        console.log(correct_quiet);
    }
}

let qi_audio = {
    type: 'audio-keyboard-response', 
    stimulus: function() {
        if (!pass) {
            return 'audio/QI.wav'
        } else {
            return 'audio/silence.wav'
        }
    }, 
    prompt: function() {
        if (!pass) {
            return html_content;
        } else {
            return " ";
        }
    },
    trial_ends_after_audio: true, 
    post_trial_gap: 0, 
    response_allowed_while_playing: false
}

let qi_response = {
    type: 'html-keyboard-response', 
    stimulus: function() {
        if (!pass) {
            return html_content;
        } else {
            return " ";
        }
    },
    choices: ['1', '2', '0'],
    trial_duration: function() {
        if (!pass) {
            return 5000;
        } else {
            return 0;
        }
    },
    post_trial_gap: function() {
        if (!pass) {
            return 1000;
        } else {
            return 0;
        }
    },  
    on_finish: function(data) {
        if (data.key_press == 49) {
            correct_quiet++;
        }
        console.log(correct_quiet);
    }
}

let audiocheck_polarity = [
    [io_audio, io_response],
    [io_audio, io_response],
    [io_audio, io_response],
    [io_audio, io_response],
    [oi_audio, oi_response],
    [oi_audio, oi_response],
    [oi_audio, oi_response],
    [oi_audio, oi_response]
]
let audiocheck_volume = [
    [iq_audio, iq_response],
    [iq_audio, iq_response],
    [iq_audio, iq_response],
    [iq_audio, iq_response],
    [qi_audio, qi_response],
    [qi_audio, qi_response],
    [qi_audio, qi_response],
    [qi_audio, qi_response]
]

// Util function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
} 

// Shuffle all the trials and populate the experiment. 
audiocheck_polarity = shuffle(audiocheck_polarity);
audiocheck_volume = shuffle(audiocheck_volume);
let audiocheck_trials_first = [];
let audiocheck_trials_second = [];
for (let i = 0; i < 4; i++) {
    audiocheck_trials_first.push(audiocheck_polarity[i]);
    audiocheck_trials_first.push(audiocheck_volume[i]);
    audiocheck_trials_second.push(audiocheck_polarity[i+4]);
    audiocheck_trials_second.push(audiocheck_volume[i+4]);
}
audiocheck_trials_first = shuffle(audiocheck_trials_first);
audiocheck_trials_second = shuffle(audiocheck_trials_second);
