/* initialize jsPsych */
var jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  },
  display_element: 'jspsych-target',
  on_load: function() {
    document.body.style.backgroundColor = '#fdfdfd';
  }
});

/* create timeline */
var timeline = [];

/* define base path for media */
const baseDir = "https://raw.githubusercontent.com/rondeline/predictability/master/";

/* define media object */
const media = {
  /*images*/
  bird: baseDir + "jspsych/img/bird.png",
  box: baseDir + "jspsych/img/box.png",
  bus: baseDir + "jspsych/img/bus.png",
  butterfly: baseDir + "jspsych/img/butterfly.png",
  car: baseDir + "jspsych/img/car.png",
  cat: baseDir + "jspsych/img/cat.png",
  convertible: baseDir + "jspsych/img/convertible.png",
  dog: baseDir + "jspsych/img/dog.png",
  fiat: baseDir + "jspsych/img/fiat.png",
  fish: baseDir + "jspsych/img/fish.png",
  frog: baseDir + "jspsych/img/frog.png",
  horse: baseDir + "jspsych/img/horse.png",
  iguana: baseDir + "jspsych/img/iguana.png",
  ladybug: baseDir + "jspsych/img/ladybug.png",
  lion: baseDir + "jspsych/img/lion.png",
  minivan: baseDir + "jspsych/img/minivan.png",
  octopus: baseDir + "jspsych/img/octopus.png",
  pickup: baseDir + "jspsych/img/pickup.png",
  pig: baseDir + "jspsych/img/pig.png",
  seahorse: baseDir + "jspsych/img/seahorse.png",
  suv: baseDir + "jspsych/img/suv.png",
  tractor_truck: baseDir + "jspsych/img/tractor_truck.png",
  tractor: baseDir + "jspsych/img/tractor.png",
  truck: baseDir + "jspsych/img/truck.png",
  turtle: baseDir + "jspsych/img/turtle.png",
  whale: baseDir + "jspsych/img/whale.png",
  collin: baseDir + "jspsych/img/collin.png",
  room: baseDir + "jspsych/img/room.png",

  /*audio*/
  uphorn: baseDir + "jspsych/mp3/up_horn_5snr.mp3",
  phorn: baseDir + "jspsych/mp3/p_horn_5snr.mp3",
  target: baseDir + "jspsych/mp3/target.mp3"

};

/* preload images */
var img_preload = {
  type: jsPsychPreload,
  show_progress_bar: true,
  message: '<p>Loading pictures...</p>',
  images: Object.values(media)
};
timeline.push(img_preload);

/* preload audio */
var aud_preload = {
  type: jsPsychPreload,
  show_progress_bar: true,
  message: '<p>Loading audio...</p>',
  audio: Object.values(media)
};
timeline.push(aud_preload);

/* welcome trial */
var welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 'Welcome! Press "next" to continue.',
  choices: ['Next'],
  post_trial_gap: 500,
  clear_display: true
};
timeline.push(welcome);

/* consent form */
var consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h2>Informed Consent</h2>
    <p>By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology. If you have
    questions about this research, please contact Michael C. Frank at mcfrank@stanford.edu. If you are not satisfied with how this study is being conducted, or if you have
    any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to
    someone independent of the research team at irbnonmed@stanford.edu. Your participation in this research is voluntary. You may decline to answer any or all of the 
    following questions. You may decline further participation, at any time, without adverse consequences. Your confidentiality is assured; the researchers who have requested 
    your participation will not receive any personal information about you.</p>
  `,
  choices: ['I Consent', 'I Do Not Consent'],
  post_trial_gap: 500,
  clear_display: true,
  on_finish: function (data) {
    if (data.response === 1) {
      jsPsych.endExperiment('Consent not given. Exiting.');
    }
  }
};
timeline.push(consent);

/* instructions */
var instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h2>Instructions</h2>
  `,
};

/* define all trials as timeline variables */
var trial_variables = [
  { stimulus_image: media.bird },
  { stimulus_image: media.bus },
  { stimulus_image: media.butterfly },
  { stimulus_image: media.car },
  { stimulus_image: media.cat },
  { stimulus_image: media.convertible },
  { stimulus_image: media.dog },
  { stimulus_image: media.fiat },
  { stimulus_image: media.fish },
  { stimulus_image: media.frog },
  { stimulus_image: media.horse },
  { stimulus_image: media.iguana },
  { stimulus_image: media.ladybug },
  { stimulus_image: media.lion },
  { stimulus_image: media.minivan },
  { stimulus_image: media.octopus },
  { stimulus_image: media.pickup },
  { stimulus_image: media.pig },
  { stimulus_image: media.seahorse },
  { stimulus_image: media.suv },
  { stimulus_image: media.tractor_truck },
  { stimulus_image: media.tractor },
  { stimulus_image: media.truck },
  { stimulus_image: media.turtle },
  { stimulus_image: media.whale },
  { stimulus_image: media.collin },
  { stimulus_image: media.room },
  { stimulus_audio: media.uphorn },
  { stimulus_audio: media.phorn },
  { stimulus_audio: media.target }
];

/* create the randomized timeline */
var main_timeline = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function() {
        return `
          <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <img src="${jsPsych.timelineVariable('stimulus_image')}" style="width: 40vw; max-width: 500px; height: auto; margin-bottom: 20px;">
            <div style="display: flex; justify-content: center; gap: 200px;">
              <img src="${media.box}" style="width: 12vw; max-width: 200px; height: auto;">
              <img src="${media.box}" style="width: 12vw; max-width: 200px; height: auto;">
            </div>
          </div>
        `;
      },
      choices: ['a', 'l'],
      stimulus_duration: 1200,
      trial_duration: 1200,
      response_ends_trial: true,
      post_trial_gap: 500,
      clear_display: true
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: function() {
        var last_trial = jsPsych.data.get().last(1).values()[0];
        if (last_trial.rt === null) {
          return "Too slow! Try to be faster next time.";
        } else {
          return "";
        }
      },
      choices: [],
      trial_duration: 1000,
      post_trial_gap: 500,
      clear_display: true
    }
  ],
  timeline_variables: trial_variables,
  randomize_order: true
};

/* add the randomized timeline to the main timeline */
timeline.push(main_timeline);

/* run the experiment */
jsPsych.run(timeline);

