// send CSV to the server 
function saveData(csvString) {
  return fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filedata: csvString }) // same shape as the PHP example
  });
}

/* initialize jsPsych */
var jsPsych = initJsPsych({
  display_element: 'jspsych-target',
  on_load: function () {
    document.body.style.backgroundColor = '#fdfdfd';
  },
  on_finish: function () {
    // Just show the data table in the browser (no saving)
    //jsPsych.data.displayData();
    saveData(jsPsych.data.get().csv())
      .then(() => console.log('Saved CSV'))
      .catch(err => console.error('Save failed:', err));

    // optional, just for viewing in the browser
    jsPsych.data.displayData();
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
  cookie: baseDir + "jspsych/img/cookie.png",
  banana: baseDir + "jspsych/img/banana.png",
  grapes: baseDir + "jspsych/img/grapes.png",

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
    media.cupcake, media.cookie, media.banana, media.grapes
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

/* prolific id */
var pid = {
  type: jsPsychSurveyText,
  questions: [
    { prompt: 'Please enter your Prolific ID:', name: 'prolific_id', required: true, rows: 1, columns: 12 }
  ],
  button_label: 'Next'
};
timeline.push(pid);

/* welcome trial */
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'Welcome! Press the spacebar to continue.',
  choices: [' '],
  post_trial_gap: 500,
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
  { stimulus_image: media.cat },
  { stimulus_image: media.convertible },
  { stimulus_image: media.fiat },
  { stimulus_image: media.fish },
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
  { stimulus_image: media.whale }
];

/* directions */
var directions1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <div style="text-align: center; font-size: 24px; max-width: 60%; margin-bottom: 30px;">
          <h2>Directions</h2>
          <p>In this study, you will use the 'A' and 'L' keys to sort images into two boxes. Press 'A' if you 
          think the image should go in the box on the top, and press 'L' if you think the image should go
          in the box on the bottom.</p>
          <p>Press the spacebar to try a few examples.</p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 5px;">
          <img src="${media.box}" style="width: 15vw;">
          <img src="${media.box}" style="width: 15vw;">
        </div>
      </div>
    `;
  },
  choices: [' '],
  post_trial_gap: 500
};
timeline.push(directions1);

var cupcake_example = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
        <p>Press 'A' to move the cupcake into the top box.</p>
        <div style="display:flex; flex-direction: column; align-items:center; gap:10px; margin-top:5px;">
          <img src="${media.box}"     style="width:15vw; max-width:150px; height:auto;">
          <img src="${media.cupcake}" style="width:12vw; max-width:125px; height:auto;">
          <img src="${media.box}"     style="width:15vw; max-width:150px; height:auto;">
        </div>
      </div>
    `;
  },
  choices: ['a'],
  response_ends_trial: true,
  trial_duration: null
};
timeline.push(cupcake_example);

var banana_example = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
        <p>Press 'L' to move the banana into the bottom box.</p>
        <div style="display:flex; flex-direction: column; align-items:center; gap:10px; margin-top:5px;">
          <img src="${media.box}"     style="width:15vw; max-width:150px; height:auto;">
          <img src="${media.banana}" style="width:12vw; max-width:125px; height:auto;">
          <img src="${media.box}"     style="width:15vw; max-width:150px; height:auto;">
        </div>
      </div>
    `;
  },
  choices: ['l'],
  response_ends_trial: true,
  trial_duration: null
};
timeline.push(banana_example);

var directions2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <p>Great! You will only have 1500ms to respond to each image. Let's practice responding quickly.
        On the next page, press 'A' to move the cookie into the top box.</p>
        <p>Press the spacebar to continue.</p>
      </div>`;
  },
  choices: [' '],
  response_ends_trial: true,
  post_trial_gap: 500
};
timeline.push(directions2);

var cookie_feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="text-align: center; font-size: 24px;">
        <p>Great work! You responded within 1500ms.</p>
        <p>Press 'L' on the next page to move the grapes into the bottom box.</p>
        <p>Press the spacebar to continue.</p>
      </div>
    `;
  },
  choices: [' '],
  response_ends_trial: true,
  post_trial_gap: 500
};

var cookie_slow_feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="text-align: center; font-size: 24px;">
        <p>Too slow! Try to respond faster next time.</p>
        <p>Press 'L' on the next page to move the grapes into the bottom box.</p>
        <p>Press the spacebar to continue</p>
      </div>
    `;
  },
  choices: [' '],
  response_ends_trial: true,
  post_trial_gap: 500
};

let cookie_response_rt = null;

var cookie_example = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
    <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
        <p>Press 'A' to move the cookie into the top box.</p>
        <div style="display:flex; flex-direction: column; align-items:center; gap:10px; margin-top:5px;">
          <img src="${media.box}"     style="width:15vw; max-width:150px; height:auto;">
          <img src="${media.cookie}" style="width:12vw; max-width:125px; height:auto;">
          <img src="${media.box}"     style="width:15vw; max-width:150px; height:auto;">
        </div>
      </div>
    `;
  },
  choices: ['a'],
  response_ends_trial: true,
  trial_duration: 1500,
  on_finish: function(data) {
    cookie_response_rt = data.rt;
  }
};

var cookie_feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    if (cookie_response_rt === null || cookie_response_rt > 1500) {
      return `
        <div style="text-align: center; font-size: 24px;">
          <p>Too slow! Try to respond faster next time.</p>
          <p>Press 'L' on the next page to move the grapes into the bottom box.</p>
          <p>Press the spacebar to continue</p>
        </div>
      `;
    } else {
      return `
        <div style="text-align: center; font-size: 24px;">
          <p>Great work! You responded within 1500ms.</p>
          <p>Press 'L' on the next page to move the grapes into the bottom box.</p>
          <p>Press the spacebar to continue.</p>
        </div>
      `;
    }
  },
  choices: [' '],
  response_ends_trial: true,
  post_trial_gap: 500
};

timeline.push(cookie_example, cookie_feedback);

let grapes_response_rt = null;

var grapes_example = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
    <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
        <p>Press 'L' to move the grapes into the bottom box.</p>
        <div style="display:flex; flex-direction: column; align-items:center; gap:10px; margin-top:5px;">
          <img src="${media.box}"     style="width:15vw; max-width:150px; height:auto;">
          <img src="${media.grapes}" style="width:12vw; max-width:125px; height:auto;">
          <img src="${media.box}"     style="width:15vw; max-width:150px; height:auto;">
        </div>
      </div>
    `;
  },
  choices: ['l'],
  response_ends_trial: true,
  trial_duration: 1500,
  on_finish: function(data) {
    grapes_response_rt = data.rt;
  }
};

var grapes_feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    if (grapes_response_rt === null || grapes_response_rt > 1500) {
      return `
        <div style="text-align: center; font-size: 24px;">
          <p>Too slow! Try to respond faster next time.</p>
          <p>Press the spacebar to continue</p>
        </div>
      `;
    } else {
      return `
        <div style="text-align: center; font-size: 24px;">
          <p>Great work! You responded within 1500ms.</p>
          <p>Press the spacebar to continue.</p>
        </div>
      `;
    }
  },
  choices: [' '],
  response_ends_trial: true,
  post_trial_gap: 500
};

timeline.push(grapes_example, grapes_feedback);

var directions3 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="text-align: center; font-size: 24px;">
        <p>You will now learn how to play the game. Accuracy on this game is very important, so please pay close attention.
        The highest scoring participants will earn a bonus payment of up to $5.</p>
        <p>Press the spacebar to continue.</p>
      </div>
    `;
  },
  choices: [' '],
  response_ends_trial: true,
  post_trial_gap: 500
};
timeline.push(directions3);

var attention_check = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    return `
      <div style="text-align: center; font-size: 24px;">
        <p>Here are a few random words. Please select the word ruler so we know you are still with us.</p>
      </div>
    `;
  },
  choices: ['apple', 'ruler', 'jacket', 'hammer', 'water', 'yogurt'],
  response_ends_trial: true,
  post_trial_gap: 500
};
timeline.push(attention_check);

var ready = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="text-align: center; font-size: 24px;">
        <p>Great! You are ready to play the game. Remember that the highest scoring participants will earn a bonus payment of up to $5.</p>
        <p>Press the spacebar to start the game.</p>
      </div>
    `;
  },
  choices: [' '],
  response_ends_trial: true,
  post_trial_gap: 500
};
timeline.push(ready);


/* create the three instruction conditions */
var instructions_silence = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
      <div class="screen">
        <div class="triple">
          <img id="image1" src="">
          <img id="image3" src="">
          <img id="image2" src="">
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

    // helpers: toggle classes (instead of fiddling with inline widths/heights)
    const reset = () => {
      [image1, image2, image3].forEach(el => {
        el.classList.remove('hidden','hero','highlight');
        el.style.outline = 'none';
      });
    };
    const hide  = el => el.classList.add('hidden');
    const show  = el => el.classList.remove('hidden', 'hero');
    const hero = el => { 
      el.classList.remove('hidden');  // ensure visible
      el.classList.add('hero');       // make it big
    };

    const trialStart = performance.now();

    const updateImage = () => {
      const elapsed = performance.now() - trialStart;

      // Reset borders
      image1.style.border = "none";
      image2.style.border = "none";
      image3.style.border = "none";

      if (elapsed >= 3000 && elapsed < 11000) {
        image1.src = media.collin; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 12000 && elapsed < 16000) {
        image1.src = media.room; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 17000 && elapsed < 23000) {
        image1.src = media.collin; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 25000 && elapsed < 28000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        hide(image3);
      } else if (elapsed >= 29000 && elapsed < 33000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.animals; show(image3);
        if (elapsed >= 31000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 34000 && elapsed < 37000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.vehicles; show(image3);
        if (elapsed >= 36000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 38000 && elapsed < 47000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.green; show(image3);
        if (elapsed >= 44000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 50000 && elapsed < 54000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.dog; show(image3);
        if (elapsed >= 52000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 54000 && elapsed < 58000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.car; show(image3);
        if (elapsed >= 56000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 59000 && elapsed < 70000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.frog; show(image3);
        if (elapsed >= 63000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 73000 && elapsed < 78000) {
        image1.src = media.room; hero(image1);
        hide(image2);
        hide(image3);
      } else {
        hide(image1);
        hide(image2);
        hide(image3);
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
      <div class="screen">
        <div class="triple">
          <img id="image1" src="">
          <img id="image3" src="">
          <img id="image2" src="">
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

    // helpers: toggle classes (instead of fiddling with inline widths/heights)
    const reset = () => {
      [image1, image2, image3].forEach(el => {
        el.classList.remove('hidden','hero','highlight');
        el.style.outline = 'none';
      });
    };
    const hide  = el => el.classList.add('hidden');
    const show  = el => el.classList.remove('hidden', 'hero');
    const hero = el => { 
      el.classList.remove('hidden');  // ensure visible
      el.classList.add('hero');       // make it big
    };

    const trialStart = performance.now();

    const updateImage = () => {
      const elapsed = performance.now() - trialStart;

      // Reset borders
      image1.style.border = "none";
      image2.style.border = "none";
      image3.style.border = "none";

      if (elapsed >= 3000 && elapsed < 11000) {
        image1.src = media.collin; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 12000 && elapsed < 16000) {
        image1.src = media.room; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 17000 && elapsed < 23000) {
        image1.src = media.collin; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 25000 && elapsed < 28000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        hide(image3);
      } else if (elapsed >= 29000 && elapsed < 33000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.animals; show(image3);
        if (elapsed >= 31000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 34000 && elapsed < 37000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.vehicles; show(image3);
        if (elapsed >= 36000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 38000 && elapsed < 47000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.green; show(image3);
        if (elapsed >= 44000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 50000 && elapsed < 54000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.dog; show(image3);
        if (elapsed >= 52000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 54000 && elapsed < 58000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.car; show(image3);
        if (elapsed >= 56000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 59000 && elapsed < 70000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.frog; show(image3);
        if (elapsed >= 63000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 73000 && elapsed < 78000) {
        image1.src = media.room; hero(image1);
        hide(image2);
        hide(image3);
      } else {
        hide(image1);
        hide(image2);
        hide(image3);
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
      <div class="screen">
        <div class="triple">
          <img id="image1" src="">
          <img id="image3" src="">
          <img id="image2" src="">
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

    // helpers: toggle classes (instead of fiddling with inline widths/heights)
    const reset = () => {
      [image1, image2, image3].forEach(el => {
        el.classList.remove('hidden','hero','highlight');
        el.style.outline = 'none';
      });
    };
    const hide  = el => el.classList.add('hidden');
    const show  = el => el.classList.remove('hidden', 'hero');
    const hero = el => { 
      el.classList.remove('hidden');  // ensure visible
      el.classList.add('hero');       // make it big
    };

    const trialStart = performance.now();

    const updateImage = () => {
      const elapsed = performance.now() - trialStart;

      // Reset borders
      image1.style.border = "none";
      image2.style.border = "none";
      image3.style.border = "none";

      if (elapsed >= 3000 && elapsed < 11000) {
        image1.src = media.collin; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 12000 && elapsed < 16000) {
        image1.src = media.room; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 17000 && elapsed < 23000) {
        image1.src = media.collin; hero(image1);
        hide(image2);
        hide(image3);
      } else if (elapsed >= 25000 && elapsed < 28000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        hide(image3);
      } else if (elapsed >= 29000 && elapsed < 33000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.animals; show(image3);
        if (elapsed >= 31000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 34000 && elapsed < 37000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.vehicles; show(image3);
        if (elapsed >= 36000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 38000 && elapsed < 47000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.green; show(image3);
        if (elapsed >= 44000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 50000 && elapsed < 54000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.dog; show(image3);
        if (elapsed >= 52000) {
          image1.style.border = "8px solid blue";
          image1.style.borderRadius = "10px";
        }
      } else if (elapsed >= 54000 && elapsed < 58000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.car; show(image3);
        if (elapsed >= 56000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 59000 && elapsed < 70000) {
        image1.src = media.box; show(image1);
        image2.src = media.box; show(image2);
        image3.src = media.frog; show(image3);
        if (elapsed >= 63000) {
          image2.style.border = "8px solid blue";
          image2.style.borderRadius = "10px";
        }
      } else if (elapsed >= 73000 && elapsed < 78000) {
        image1.src = media.room; hero(image1);
        hide(image2);
        hide(image3);
      } else {
        hide(image1);
        hide(image2);
        hide(image3);
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

const choice_trial = {
  type: jsPsychHtmlKeyboardResponse,
  data: { phase: 'choice' },
  stimulus: function () {
    const img =
      jsPsych.timelineVariable('stimulus_image') ??
      jsPsych.timelineVariable('image') ?? '';
    return `
      <div class="screen">
        <div class="triple">  <!-- was: class="choice" -->
          <img src="${media.box}" alt="top box">
          <img src="${img}" alt="stimulus">
          <img src="${media.box}" alt="bottom box">
        </div>
      </div>
    `;
  },
  choices: ['a','l'],
  trial_duration: 1500,
  response_ends_trial: true,
  post_trial_gap: 500,
  clear_display: true
};

// Feedback (only if too slow on the immediately previous choice trial)
const slow_feedback_block = {
  conditional_function: function () {
    const lastChoice = jsPsych.data.get().filter({ phase: 'choice' }).last(1).values()[0];
    return lastChoice && lastChoice.rt === null;
  },
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <div style="text-align:center; font-size:24px;">
        <p>Too slow! Try to respond faster next time.</p>
        <p>Press the spacebar to continue.</p>
      </div>`,
    choices: [' '],
    response_ends_trial: true,
    post_trial_gap: 300,
    clear_display: true
  }]
};

// Randomized block
const randomized_block = {
  timeline: [choice_trial, slow_feedback_block],
  timeline_variables: trial_variables,
  randomize_order: true
};

// Push to the main timeline (keep your instruction_timeline as-is)
timeline.push(instruction_timeline);
timeline.push(randomized_block);

// demographics
const demographics = {
  type: jsPsychSurveyMultiChoice,
  preamble: '<p>Thank you for your participation! Before we end, please tell us more about yourself.</p>',
  questions: [
    {
      prompt: 'What is your highest level of education?',
      name: 'education',
      options: [
        'Less than High School', 'High School', 'Some College',
        "Bachelor's Degree", "Master's Degree", 'Doctoral or Professional Degree', 'Other'
      ],
      required: true
    },
    {
      prompt: 'How often do you speak English during a normal day?',
      name: 'english',
      options: ['Never','A little of the time','Some of the time','Most of the time','All of the time'],
      required: true
    }
  ],
  button_label: 'Continue'
};

// purpose
const purpose = {
  type: jsPsychSurveyText,
  questions: [
    { prompt: 'What do you think this study was about?', name: 'purpose', required: true, rows: 5, columns: 60 }
  ],
  button_label: 'Submit'
};

// push to timeline
timeline.push(demographics, purpose);

/* run the experiment */
jsPsych.run(timeline);
