let timeline = [];

let audio_check_instructions = {
    type: 'html-keyboard-response',
    stimulus: `<div class="gen_ins"><p>Before the experiment begins, we'd like to do a quick audio check. During the audio check, you'll hear two tones in a row, and then be asked to select which tone was quieter. Sometimes, the two tones will be the same.<br><br>If the first tone was quieter, press '1', and if the second tone was quieter, press '2'. If both tones seemed about the same, press '0'.<br><br>When you're ready, press the space bar to begin the audio check.</p></div>`,
    choices: ['space']
}

timeline.push(audio_check_instructions, audio_check_reset);
for (let i = 0; i < audiocheck_trials_first.length; i++) {
    timeline.push(audiocheck_trials_first[i][0]);
    timeline.push(audiocheck_trials_first[i][1]);
}

timeline.push(audio_check_evaluate, audio_check_between);

for (let i = 0; i < audiocheck_trials_second.length; i++) {
    timeline.push(audiocheck_trials_second[i][0]);
    timeline.push(audiocheck_trials_second[i][1]);
}

timeline.push(audio_check_second_evaluate, audio_check_after_bad, audio_check_after_good);

jsPsych.init({
    preload_audio: preload_audiocheck,
    timeline: timeline,
    show_progress_bar: true,
    auto_update_progress_bar: true,
    on_finish: function () {
        jsPsych.data.displayData('csv');
    }
});