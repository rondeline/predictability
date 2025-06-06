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
  images: [
    media.bird, media.box, media.bus, media.butterfly, media.car, media.cat,
    media.convertible, media.dog, media.fiat, media.fish, media.frog, media.horse,
    media.iguana, media.ladybug, media.lion, media.minivan, media.octopus,
    media.pickup, media.pig, media.seahorse, media.suv, media.tractor_truck,
    media.tractor, media.truck, media.turtle, media.whale, media.collin, media.room
  ],
  on_error: function(file) {
    console.error('Error loading image:', file);
  },
  on_success: function(file) {
    console.log('Successfully loaded image:', file);
  }
};
timeline.push(img_preload);

/* preload audio */
var aud_preload = {
  type: jsPsychPreload,
  show_progress_bar: true,
  message: '<p>Loading audio...</p>',
  audio: [
    media.uphorn, media.phorn, media.target
  ]
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

/* directions */
var directions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h2>Directions</h2>
    <p>In this study, you will be shown a picture of a person and a sound. Your task is to predict whether the person will move or not. If you think the person will move, press "a". If you think the person will not move, press "l".</p>
    <p>Press "next" to continue.</p>
  `,
  choices: ['Next'],
  post_trial_gap: 500,
  clear_display: true
};
timeline.push(directions);

var instructions_silence = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
      <div id="dynamic-image-container" style="display: flex; justify-content: center; gap: 80px;">
        <img id="image1" src="" style="width: 0;" />
        <img id="image2" src="" style="width: 0;" />
      </div>
    `;
  },
  choices: [],
  trial_duration: 30000,
  on_load: function () {
    // Start audio
    let audio = new Audio(media.target);
    audio.play();

    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');

    const trialStart = performance.now();

    const updateImage = () => {
      const elapsed = performance.now() - trialStart;

      if (elapsed >= 5000 && elapsed < 13000) {
        image1.src = media.collin;
        image2.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
      } else if (elapsed >= 14000 && elapsed < 18000) {
        image1.src = media.room;
        image2.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
      } else if (elapsed >= 19000 && elapsed < 23000) {
        image1.src = media.collin;
        image2.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
      } else if (elapsed >= 25000) {
        image1.src = media.box;
        image2.src = media.box;
        image1.style.width = "20vw";
        image2.style.width = "20vw";
      } else {
        image1.src = '';
        image2.src = '';
        image1.style.width = "0";
        image2.style.width = "0";
      }
    };

    const interval = setInterval(updateImage, 100);
    setTimeout(() => clearInterval(interval), 40000);
  },
  response_ends_trial: false,
  post_trial_gap: 500,
  clear_display: true
};

timeline.push(instructions_silence);

/* create the randomized timeline */
var main_timeline = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function() {
        const imageUrl = jsPsych.timelineVariable('stimulus_image');
        console.log('Attempting to display image:', imageUrl);
        return `
          <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <img src="${imageUrl}" style="width: 40vw; max-width: 500px; height: auto; margin-bottom: 20px;" 
                 onerror="console.error('Error loading image:', this.src)"
                 onload="console.log('Image loaded successfully:', this.src)">
            <div style="display: flex; justify-content: center; gap: 200px;">
              <img src="${media.box}" style="width: 12vw; max-width: 200px; height: auto;" 
                   onerror="console.error('Error loading box image:', this.src)"
                   onload="console.log('Box image loaded successfully:', this.src)">
              <img src="${media.box}" style="width: 12vw; max-width: 200px; height: auto;" 
                   onerror="console.error('Error loading box image:', this.src)"
                   onload="console.log('Box image loaded successfully:', this.src)">
            </div>
          </div>
        `;
      },
      choices: ['a', 'l'],
      stimulus_duration: 1200,
      trial_duration: 1200,
      response_ends_trial: true,
      post_trial_gap: 500,
      clear_display: true,
      on_load: function() {
        console.log('Trial loaded with image:', jsPsych.timelineVariable('stimulus_image'));
      }
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

