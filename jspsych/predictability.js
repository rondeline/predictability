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
  animals: baseDir + "jspsych/img/animals.png",
  vehicles: baseDir + "jspsych/img/vehicles.png",
  green: baseDir + "jspsych/img/green.png",
  cupcake: baseDir + "jspsych/img/cupcake.png",

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
    media.tractor, media.truck, media.turtle, media.whale, media.collin, media.room,
    media.cupcake
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
  { image: media.car },
  { stimulus_image: media.cat },
  { stimulus_image: media.convertible },
  { image: media.dog },
  { stimulus_image: media.fiat },
  { stimulus_image: media.fish },
  { image: media.frog },
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
  { image: media.collin },
  { image: media.room },
  { stimulus_audio: media.uphorn },
  { stimulus_audio: media.phorn },
  { stimulus_audio: media.target },
  { image: media.animals },
  { image: media.vehicles },
  { image: media.green }
];

/* directions */
var directions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <div style="text-align: center; font-size: 24px; max-width: 60%; margin-bottom: 30px;">
          <h2>Directions</h2>
          <p>In this study, you will use the 'A' and 'L' keys to sort images into two boxes. Press 'A' if you 
          think the image should go in the box on the left, and press 'L' if you think the image should go
          in the right box.</p>
          <p>Press the spacebar to continue.</p>
        </div>
        <div style="display: flex; justify-content: center; gap: 100px;">
          <img src="${media.box}" style="width: 15vw;">
          <img src="${media.box}" style="width: 15vw;">
        </div>
      </div>
    `;
  },
  choices: [' '],
  post_trial_gap: 500
};
timeline.push(directions);

var cupcake_example = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <img src="${media.cupcake}" style="width: 20vw; margin-bottom: 30px;">
        <div style="display: flex; justify-content: center; gap: 100px;">
          <img src="${media.box}" style="width: 15vw;">
          <img src="${media.box}" style="width: 15vw;">
        </div>
      </div>
    `;
  },
  choices: ['a', 'l'],
  response_ends_trial: true,
  post_trial_gap: 500,
  on_finish: function(data) {
    if (data.key_press !== 65) { // 65 is the keycode for 'a'
      jsPsych.endCurrentTimeline();
      jsPsych.addNodeToCurrentTimeline(cupcake_example);
    }
  }
};

/* create the three instruction conditions */
var instructions_silence = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; box-sizing: border-box; overflow: hidden;">
        <img id="image3" src="" style="width: 0; max-width: 60vw; max-height: 25vh; margin-bottom: 3vh;" />
        <div id="dynamic-image-container" style="display: flex; justify-content: center; align-items: center; gap: 10vw; max-width: 90vw; max-height: 50vh; flex-wrap: nowrap; overflow: hidden; box-sizing: border-box;">
          <img id="image1" src="" style="width: 0; max-width: 30vw; max-height: 100%; height: auto;" />
          <img id="image2" src="" style="width: 0; max-width: 30vw; max-height: 100%; height: auto;" />
        </div>
      </div>
    `;
  },
  choices: [],
  trial_duration: 82000,
  on_load: function () {
    // Start audio
    let audio = new Audio(media.target);
    audio.play();

    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');

    const trialStart = performance.now();

    const updateImage = () => {
      const elapsed = performance.now() - trialStart;

      // Reset borders
      image1.style.border = "none";
      image2.style.border = "none";
      image3.style.border = "none";

      if (elapsed >= 3000 && elapsed < 11000) {
        image1.src = media.collin;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 12000 && elapsed < 16000) {
        image1.src = media.room;
        image2.src = '';
        image3.src = '';
        image1.style.width = "60vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 17000 && elapsed < 23000) {
        image1.src = media.collin;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 25000 && elapsed < 28000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = '';
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "0";
      } else if (elapsed >= 29000 && elapsed < 33000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.animals;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 31000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 34000 && elapsed < 37000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.vehicles;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 36000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 38000 && elapsed < 47000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.green;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 44000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 50000 && elapsed < 54000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.dog;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 52000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 54000 && elapsed < 58000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.car;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 56000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 59000 && elapsed < 70000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.frog;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 63000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 73000 && elapsed < 78000) {
        image1.src = media.room;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else {
        image1.src = '';
        image2.src = '';
        image3.src = '';
        image1.style.width = "0";
        image2.style.width = "0";
        image3.style.width = "0";
      }
    };

    const interval = setInterval(updateImage, 100);
    setTimeout(() => clearInterval(interval), 82000);
  },
  response_ends_trial: false,
  post_trial_gap: 500,
  clear_display: true
};

var instructions_uphorn = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; box-sizing: border-box; overflow: hidden;">
        <img id="image3" src="" style="width: 0; max-width: 60vw; max-height: 25vh; margin-bottom: 3vh;" />
        <div id="dynamic-image-container" style="display: flex; justify-content: center; align-items: center; gap: 10vw; max-width: 90vw; max-height: 50vh; flex-wrap: nowrap; overflow: hidden; box-sizing: border-box;">
          <img id="image1" src="" style="width: 0; max-width: 30vw; max-height: 100%; height: auto;" />
          <img id="image2" src="" style="width: 0; max-width: 30vw; max-height: 100%; height: auto;" />
        </div>
      </div>
    `;
  },
  choices: [],
  trial_duration: 82000,
  on_load: function () {
    // Start audio
    let audio = new Audio(media.uphorn);
    audio.play();

    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');

    const trialStart = performance.now();

    const updateImage = () => {
      const elapsed = performance.now() - trialStart;

      // Reset borders
      image1.style.border = "none";
      image2.style.border = "none";
      image3.style.border = "none";

      if (elapsed >= 3000 && elapsed < 11000) {
        image1.src = media.collin;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 12000 && elapsed < 16000) {
        image1.src = media.room;
        image2.src = '';
        image3.src = '';
        image1.style.width = "60vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 17000 && elapsed < 23000) {
        image1.src = media.collin;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 25000 && elapsed < 28000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = '';
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "0";
      } else if (elapsed >= 29000 && elapsed < 33000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.animals;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 31000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 34000 && elapsed < 37000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.vehicles;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 36000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 38000 && elapsed < 47000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.green;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 44000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 50000 && elapsed < 54000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.dog;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 52000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 54000 && elapsed < 58000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.car;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 56000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 59000 && elapsed < 70000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.frog;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 63000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 73000 && elapsed < 78000) {
        image1.src = media.room;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else {
        image1.src = '';
        image2.src = '';
        image3.src = '';
        image1.style.width = "0";
        image2.style.width = "0";
        image3.style.width = "0";
      }
    };

    const interval = setInterval(updateImage, 100);
    setTimeout(() => clearInterval(interval), 82000);
  },
  response_ends_trial: false,
  post_trial_gap: 500,
  clear_display: true
};

var instructions_phorn = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; box-sizing: border-box; overflow: hidden;">
        <img id="image3" src="" style="width: 0; max-width: 60vw; max-height: 25vh; margin-bottom: 3vh;" />
        <div id="dynamic-image-container" style="display: flex; justify-content: center; align-items: center; gap: 10vw; max-width: 90vw; max-height: 50vh; flex-wrap: nowrap; overflow: hidden; box-sizing: border-box;">
          <img id="image1" src="" style="width: 0; max-width: 30vw; max-height: 100%; height: auto;" />
          <img id="image2" src="" style="width: 0; max-width: 30vw; max-height: 100%; height: auto;" />
        </div>
      </div>
    `;
  },
  choices: [],
  trial_duration: 82000,
  on_load: function () {
    // Start audio
    let audio = new Audio(media.phorn);
    audio.play();

    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');

    const trialStart = performance.now();

    const updateImage = () => {
      const elapsed = performance.now() - trialStart;

      // Reset borders
      image1.style.border = "none";
      image2.style.border = "none";
      image3.style.border = "none";

      if (elapsed >= 3000 && elapsed < 11000) {
        image1.src = media.collin;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 12000 && elapsed < 16000) {
        image1.src = media.room;
        image2.src = '';
        image3.src = '';
        image1.style.width = "60vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 17000 && elapsed < 23000) {
        image1.src = media.collin;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else if (elapsed >= 25000 && elapsed < 28000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = '';
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "0";
      } else if (elapsed >= 29000 && elapsed < 33000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.animals;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 31000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 34000 && elapsed < 37000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.vehicles;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 36000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 38000 && elapsed < 47000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.green;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 44000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 50000 && elapsed < 54000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.dog;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 52000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 54000 && elapsed < 58000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.car;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 56000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 59000 && elapsed < 70000) {
        image1.src = media.box;
        image2.src = media.box;
        image3.src = media.frog;
        image1.style.width = "15vw";
        image2.style.width = "15vw";
        image3.style.width = "20vw";
        if (elapsed >= 63000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 73000 && elapsed < 78000) {
        image1.src = media.room;
        image2.src = '';
        image3.src = '';
        image1.style.width = "40vw";
        image2.style.width = "0";
        image3.style.width = "0";
      } else {
        image1.src = '';
        image2.src = '';
        image3.src = '';
        image1.style.width = "0";
        image2.style.width = "0";
        image3.style.width = "0";
      }
    };

    const interval = setInterval(updateImage, 100);
    setTimeout(() => clearInterval(interval), 82000);
  },
  response_ends_trial: false,
  post_trial_gap: 500,
  clear_display: true
};

/* create a timeline variable for random instruction selection */
var instruction_timeline = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function() {
        var condition = jsPsych.timelineVariable('condition');
        console.log('Playing ' + condition + ' condition');
        if (condition === 'silence') {
          return instructions_silence.stimulus();
        } else if (condition === 'uphorn') {
          return instructions_uphorn.stimulus();
        } else {
          return instructions_phorn.stimulus();
        }
      },
      choices: [],
      trial_duration: 82000,
      on_load: function() {
        var condition = jsPsych.timelineVariable('condition');
        if (condition === 'silence') {
          let audio = new Audio(media.target);
          audio.play();
          instructions_silence.on_load();
        } else if (condition === 'uphorn') {
          let audio = new Audio(media.uphorn);
          audio.play();
          instructions_uphorn.on_load();
        } else {
          let audio = new Audio(media.phorn);
          audio.play();
          instructions_phorn.on_load();
        }
      },
      response_ends_trial: false,
      post_trial_gap: 500,
      clear_display: true
    }
  ],
  timeline_variables: [
    { condition: 'silence' },
    { condition: 'uphorn' },
    { condition: 'phorn' }
  ],
  randomize_order: true,
  sample: {
    type: 'without-replacement',
    size: 1
  }
};

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
      trial_duration: 1200,
      post_trial_gap: 500,
      clear_display: true
    }
  ],
  timeline_variables: trial_variables,
  randomize_order: true
};

/* add the instruction timeline to the main timeline */
timeline.push(instruction_timeline);

/* add the randomized timeline to the main timeline */
timeline.push(main_timeline);

/* run the experiment */
jsPsych.run(timeline);

