const jsPsych = initJsPsych();

var baseDir = "https://raw.githubusercontent.com/rondeline/predictability/master/";

var media = {
  // images
  collin: baseDir + "img/collin.png",
  frog: baseDir + "img/frog.png",
  dog: baseDir + "img/dog.png",
  lion: baseDir + "img/lion.png",
  turtle: baseDir + "img/turtle.png",
  pig: baseDir + "img/pig.png",
  bird: baseDir + "img/bird.png",
  horse: baseDir + "img/horse.png",
  penguin: baseDir + "img/penguin.png",
  giraffe: baseDir + "img/giraffe.png",
  fish: baseDir + "img/fish.png",
  butterfly: baseDir + "img/butterfly.png",
  snake: baseDir + "img/snake.png",
  tiger: baseDir + "img/tiger.png",
  cow: baseDir + "img/cow.png",
  bunny: baseDir + "img/bunny.png",
  convertible: baseDir + "img/convertible.png",
  bus: baseDir + "img/bus.png",
  ambulance: baseDir + "img/ambulance.png",
  car: baseDir + "img/car.png",
  car_orange: baseDir + "img/car_orange.png",
  truck: baseDir + "img/truck.png",
  truck_green: baseDir + "img/truck_green.png",
  firetruck: baseDir + "img/firetruck.png",
  car_blue: baseDir + "img/car_blue.png",
  pickup: baseDir + "img/pickup.png",
  police: baseDir + "img/police.png",
  box_y: baseDir + "img/box_yellow.png",
  box_b: baseDir + "img/box_brown.png",
  room: baseDir + "img/room.png",
  coat: baseDir + "img/coat.png",
  scarf: baseDir + "img/scarf.png",
  sock_purple: baseDir + "img/sock_purple.png",
  pants: baseDir + "img/pants.png",
  shirt_yellow: baseDir + "img/shirt_yellow.png",
  banana: baseDir + "img/banana.png",
  apple: baseDir + "img/apple.png",
  cheese: baseDir + "img/cheese.png",
  hotdog: baseDir + "img/hotdog.png",
  cupcake: baseDir + "img/cupcake.png",
  orange: baseDir + "img/orange.png",
  animals: baseDir + "img/animals.png",
  vehicles: baseDir + "img/vehicles.png",
  green: baseDir + "img/green.png",
  ribbon: baseDir + "img/ribbon.png",
  box_dog: baseDir + "img/box_dog.png",
  box_car: baseDir + "img/box_car.png",
  
  // audio
  pnoise_horn: baseDir + "wav/Pnoise_horn.mp3",
  upnoise_horn: baseDir + "wav/UPnoise_horn.mp3",
  pnoise_store: baseDir + "wav/Pnoise_store.mp3",
  upnoise_store: baseDir + "wav/UPnoise_store.mp3",
  ready: baseDir + "wav/ready.mp3",
  prompt: baseDir + "wav/RMS70_prompt.mp3",
  testaudio: baseDir + "wav/RMS70_readytogo.wav",
  phorn: baseDir + "wav/p_horn_10snr_v2.mp3",
  uphorn: baseDir + "wav/up_horn_10snr_v2.mp3",
  pstore: baseDir + "wav/p_store_10snr_v3.mp3",
  upstore: baseDir + "wav/up_store_10snr_v3.mp3",
  end: baseDir + "wav/RMS70_final.wav",
  warning: baseDir + "wav/RMS70_noisy_warn.mp3",
  silence: baseDir + "wav/RMS70_target.mp3",
  
  //videos
  testvideo: baseDir + "mp4/test_video.mp4",
  
};

Object.entries(media).forEach(([key, value]) => {
    if (!value) {
        console.warn(`Missing or undefined media: ${key}`);
    }
});

var imgpreload = {
  type: jsPsychPreload,
  show_progress_bar: true,
  message: '<p>Loading pictures...</p>',
  images: [
      media.collin,
      media.frog,
      media.dog,
      media.lion,
      media.turtle,
      media.pig,
      media.bird,
      media.horse,
      media.penguin,
      media.giraffe,
      media.butterfly,
      media.snake,
      media.fish,
      media.tiger,
      media.cow,
      media.bunny,
      media.convertible,
      media.bus,
      media.ambulance,
      media.car,
      media.truck,
      media.truck_green,
      media.pickup,
      media.firetruck,
      media.police,
      media.car_blue,
      media.car_orange,
      media.box_y,
      media.box_b,
      media.room,
      media.sock_purple,
      media.shirt_yellow,
      media.coat,
      media.scarf,
      media.pants,
      media.apple,
      media.banana,
      media.cheese,
      media.orange,
      media.hotdog,
      media.cupcake,
      media.animals,
      media.vehicles,
      media.green,
      media.ribbon,
      media.box_dog,
      media.box_car
    ]
};
var audpreload = {
  type: jsPsychPreload,
  show_progress_bar: true,
  message: '<p>Loading sounds...</p>',
  audio: [
      media.pnoise_horn,
      media.upnoise_horn,
      media.pnoise_store,
      media.upnoise_store,
      media.ready,
      media.prompt,
      media.testaudio,
      media.phorn,
      media.uphorn,
      media.pstore,
      media.upstore,
      media.end,
      media.warning,
      media.silence
    ]
};
var vidpreload = {
  type: jsPsychPreload,
  show_progress_bar: true,
  message: '<p>Loading videos...</p>',
  video: [
      media.testvideo
    ]
};

const welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 'Welcome! Press "next" to continue.',
    choices: ['Next']
};

const video_config = { type: chsRecord.VideoConfigPlugin };

const video_consent = {
    type: chsRecord.VideoConsentPlugin,
    PIName: "Carlos Benitez-Barrera",
    institution: "University of South Florida",
    PIContact: "benitezbarrera@usf.edu",
    purpose: "You are being asked to take part because your child is the right age for this study. We want to see how children your child’s age learn based on what they hear.",
    procedures: "This study is a one-time visit and takes up to 30 minutes to complete. Our studies are designed to be fun, age-appropriate activities for young children, and easily conducted online. Your child will be shown a set of short, animated videos and then will be asked to provide a handful of responses about them. We will ask you to turn around or sit away from your child's view (unless your child needs help pressing buttons) to avoid influencing your child's responses. There are no right or wrong answers, so your child's true responses are okay!",
    risk_statement: "This research is considered minimal risk.  Minimal risk means that study risks are the same as the risks you face in daily life. During the study, your child may hear noises louder than a typical conversation, and they may find these noises bothersome. We do not know if you will receive any benefit from your participation.",
    voluntary_participation: "Your participation is voluntary. You do not have to participate and may stop your participation at any time. There will be no penalties or loss of benefits or opportunities if you do not participate or decide to stop once you start.",
    payment: "There are no costs to participating. You will be compensated $5 in Amazon credit if you complete the scheduled study visit. If you withdraw for any reason from the study, you will not be paid.",
    datause: "We will do our best to keep your records private and confidential. We cannot guarantee absolute confidentiality. Your personal information may be disclosed if required by law. Certain people may need to see your study records. These individuals include: The research team, including the Principal Investigator, study coordinator, and all other research staff.; Certain government and university people who need to know more about the study. For example, individuals who provide oversight on this study may need to look at your records. This is done to make sure that we are doing the study in the right way. They also need to make sure that we are protecting your rights and your safety.; Any agency of the federal, state, or local government that regulates this research.; The USF Institutional Review Board (IRB) and its related staff who have oversight responsibilities for this study, and staff in USF Research Integrity and Compliance. Your information or samples collected as part of the research, even if identifiers are removed, will NOT be used or distributed for future research studies. More information on how we keep your videos and data private can be found at lookit.mit.edu/faq.",
    additional_video_privacy_statement: "At the end of the session, we will also ask your permission to use your videos as examples for presentations to academic or scientific audiences. Your decision will not affect your participation or any compensation you may receive.",
    "research_rights_statement": "The Institutional Review Board (IRB) of the University of South Florida has approved this research study. If you have questions about your rights, complaints, or issues as a person taking part in this study, call the USF IRB at (813) 974-5638 or contact by email at RSCH-IRB@usf.edu."
};

const warning = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "", // or any HTML you want displayed
  choices: [], // no buttons shown
  response_ends_trial: false,
  on_load: function() {
    const audio = new Audio(media.warning);
    audio.play();
    audio.onended = function() {
      jsPsych.finishTrial();
    };
  }
};

const instructions = {
  type: chsSurvey.ConsentSurveyPlugin,
  survey_json: {
    showQuestionNumbers: false,
    completeText: 'Ready to play!',
    elements: [
      {
        type: 'html',
        title: "Directions",
        html: `
          <h2 style="font-size: 24px; text-align: center; margin-bottom: 5px;">Directions</h2>
          <p style="font-size: 20px; line-height: 1.5; margin-bottom: 0px;">
            In this session, your child will sort familiar objects into one of two boxes. 
            <strong>Some background noise may play at the beginning of the game.</strong> Please prompt your child to continue listening through the noise.
            Your child will use the mouse or trackpad to select their response. If your child is unable to click on their own, 
            you may click on the response they have selected. But remember to select your child's response - we want to know what they think!
            Please do not turn down or turn off your device's volume during the games. 
            (Adjusting the volume before games is okay!)
          </p>
        `,
        choices: [],
        showOtherItem: false,
        showSelectAllItem: false,
        showNoneItem: false
      },
      {
        type: 'html',
        title: "Let's test your audio!", 
        name: 'audio', 
        html: `
          <h2 style="font-size: 24px; text-align: center; margin-bottom: 20px;">Let's test your audio!</h2>
          <p style="font-size: 18px; text-align: center; margin-bottom: 10px;">
            Click the play button to test your audio:
          </p>
          <div style="display: flex; justify-content: center; padding: 20px;">
            <audio id="audio-test" controls>
              <source src="${media.testaudio}" type="audio/wav">
            </audio>
          </div>
        `,
        isRequired: true,
      },
      {
        type: 'html',
        title: "Let's test your video!", 
        name: 'video', 
        html: `
          <h2 style="font-size: 24px; text-align: center; margin-bottom: 20px;">Let's test your video!</h2>
          <p style="font-size: 18px; text-align: center; margin-bottom: 10px;">
            Click the play button to test your video:
          </p>
          <div style="display: flex; justify-content: center; padding: 20px;">
            <video id="video-test" controls style="width: 800px;">
              <source src="${media.testvideo}" type="video/mp4">
            </video>
          </div>
        `,
        isRequired: true,
      },
      {
      type: 'html',
      name: 'Ready?',
      html: `
        <p style="font-size: 20px; text-align: center; margin-bottom: 0px;">
        Once your child is seated in front of the screen, click "Ready to play!" below to start the study </p>
        <p style="font-size: 15px; text-align: center; margin-bottom: 0px;">
        For technical support, please contact Rondeline Williams [rondeline.williams@stanford.edu].
        </p>`
      }
    ]
  }
};

// Collin
const collin = {
    type: jsPsychImageButtonResponse,
    stimulus: media.collin,
    choices: []
};

// Collin's room
const room = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <img src="${media.room}" style="position: absolute; left: 450px; top: 200px; width: 1200px;">
    `,
    choices: []
}

// Predictability - noise - horn (this may have been to troubleshoot)
const intro = {
    type: jsPsychHtmlButtonResponse, 
    stimulus: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; max-width: 90vw; margin: auto;">
          <img src="${media.collin}" id="collin" style="width: 40vw; max-width: 500px; height: auto;">
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; max-width: 90vw; margin: auto;">
          <img src="${media.room}" id="room" style="width: 80vw; max-width: 800px; height: auto;">
      </div>
    `,
    choices: [],
    on_load: () => {
            document.getElementById('collin').style.display = 'none';
            document.getElementById('room').style.display = 'none';
            setTimeout(() => {
                document.getElementById('collin').style.display = 'block';
            }, 2000);
    
            setTimeout(() => {
                document.getElementById('collin').style.display = 'none';
            }, 10000);
    
            // Image "one" appears and disappears
            setTimeout(() => {
                document.getElementById('room').style.display = 'block';
            }, 10000);
    
            setTimeout(() => {
                document.getElementById('room').style.display = 'none';
            }, 15000);
            setTimeout(() => {
                document.getElementById('collin').style.display = 'block';
            }, 15000);
    },
    response_ends_trial: false,
    trial_duration: 23000
};

// order
const order_a = {
    animal_box: 'a',
    vehicle_box: 'b',
    box_choices: ['box_dog', 'box_car']
};

const order_b = {
    animal_box: 'b',
    vehicle_box: 'a',
    box_choices: ['box_car', 'box_dog']
};

const orders = [order_a, order_b]
 
// Randomly select one order for the participant
const order = jsPsych.randomization.sampleWithoutReplacement(orders, 1)[0];

// Record which order participants saw
const order_number = orders.findIndex(c => c === order)

const order_labels = [
    "order_a",
    "order_b"
];

jsPsych.data.addProperties({
  order_number: order_number,
  order_label: order_labels[order_number]
});

// animals-vehicles example
const animals_vehicles_intro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.animals}" id="animals" style="width: 50vw; max-width: 300px; height: auto;">
        </div>
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.vehicles}" id="vehicles" style="width: 50vw; max-width: 300px; height: auto;">
        </div>
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.green}" id="green" style="width: 50vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; padding: 10px;">
            <img src="${media.box_b}" id="a" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; padding: 10px;">
            <img src="${media.box_b}" id="b" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        document.getElementById('animals').style.display = 'none';
        document.getElementById('vehicles').style.display = 'none';
        document.getElementById('green').style.display = 'none';
        setTimeout(() => {
            document.getElementById('animals').style.display = 'block';
        }, 6500);
        
        setTimeout(() => {
            const animal = document.getElementById(order.animal_box);
            if (animal) animal.style.border = '6px solid blue';
        }, 8000);

        setTimeout(() => {
            const animal = document.getElementById(order.animal_box);
            if (animal) animal.style.border = 'none';
        }, 9500);
        
        setTimeout(() => {
            document.getElementById('animals').style.display = 'none';
        }, 10000);
        
        setTimeout(() => {
            document.getElementById('vehicles').style.display = 'block';
        }, 10500);

        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = '6px solid blue';
        }, 12500);

        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = 'none';
        }, 14500);
        
        setTimeout(() => {
            document.getElementById('vehicles').style.display = 'none';
        }, 15000);
        
        setTimeout(() => {
            document.getElementById('green').style.display = 'block';
        }, 16500);
        
        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = '6px solid blue';
        }, 19500);

        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = 'none';
        }, 21500);
        
        setTimeout(() => {
            document.getElementById('green').style.display = 'none';
        }, 22500);
    },
    response_ends_trial: false,
    trial_duration: 23500
};

const animals_vehicles_ex = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin: 50px; margin-top: 5px;">
            <img src="${media.dog}" id="dog" style="width: 50vw; max-width: 300px; height: auto;">
        </div>
        <div style="display: flex; justify-content: center; margin: 50px; margin-top: 5px;">
            <img src="${media.convertible}" id="convertible" style="width: 50vw; max-width: 300px; height: auto;">
        </div>
        <div style="display: flex; justify-content: center; margin: 50px; margin-top: 5px;">
            <img src="${media.frog}" id="frog" style="width: 50vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" id="a" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" id="b" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        document.getElementById('dog').style.display = 'none';
        document.getElementById('convertible').style.display = 'none';
        document.getElementById('frog').style.display = 'none';
        setTimeout(() => {
            document.getElementById('dog').style.display = 'block';
        }, 3000);
        
        setTimeout(() => {
            const animal = document.getElementById(order.animal_box);
            if (animal) animal.style.border = '6px solid blue';
        }, 4000);
        
        setTimeout(() => {
            const animal= document.getElementById(order.animal_box);
            if (animal) animal.style.border = 'none';
        }, 5500);
        
        setTimeout(() => {
            document.getElementById('dog').style.display = 'none';
        }, 6000);
        
        setTimeout(() => {
            document.getElementById('convertible').style.display = 'block';
        }, 7000);
        
        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = '6px solid blue';
        }, 8000);
        
        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = 'none';
        }, 9500);
        
        setTimeout(() => {
            document.getElementById('convertible').style.display = 'none';
        }, 10500);
        
        setTimeout(() => {
            document.getElementById('frog').style.display = 'block';
        }, 12000);
        
        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = '6px solid blue';
        }, 17000);
        
        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = 'none';
        }, 19000);
        
        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) b.style.border = '6px solid blue';
        }, 21000);
        
        setTimeout(() => {
            const vehicle = document.getElementById(order.vehicle_box);
            if (vehicle) vehicle.style.border = 'none';
        }, 23000);
        
         setTimeout(() => {
            document.getElementById('frog').style.display = 'none';
        }, 24000);
    },
    response_ends_trial: false,
    trial_duration: 26000
};

let ready_audio = new Audio(media.ready);

// Ready
const ready = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; max-width: 90vw; margin: auto;">
          <img src="${media.room}" id="room" style="width: 80vw; max-width: 800px; height: auto;">
      </div>
    `,
    choices: [],
    on_load: () => {
        ready_audio.play();
    },
    on_finish: () => {
        ready_audio.pause();
        ready_audio.currentTime = 0;
    },
    response_ends_trial: false,
    trial_duration: 11000
};

const start_rec = { type: chsRecord.StartRecordPlugin };

let prompt_audio = new Audio(media.prompt);

// Vehicles
const car = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.car}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'car'
    },
    response_ends_trial: true
};

const truck = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.truck}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ),
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'truck'
    },
    response_ends_trial: true
};

const ambulance = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.ambulance}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ),
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'ambulance'
    },
    response_ends_trial: true
};

const bus = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.bus}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'bus'
    },
    response_ends_trial: true
};

const convertible = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.convertible}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ),
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const car_blue = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.car_blue}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ),
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'car_blue'
    },
    response_ends_trial: true
};

const police = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.police}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'police'
    },
    response_ends_trial: true
};

const firetruck = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.firetruck}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'firetruck'
    },
    response_ends_trial: true
};

const pickup = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.pickup}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'pickup'
    },
    response_ends_trial: true
};

const truck_green = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.truck_green}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ),
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'truck_green'
    },
    response_ends_trial: true
};

const car_orange = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.car_orange}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'car_orange'
    },
    response_ends_trial: true
};

// Animals
const pig = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.pig}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'pig'
    },
    response_ends_trial: true
};

const penguin = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.penguin}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ),
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'penguin'
    },
    response_ends_trial: true
};

const bird = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.bird}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'bird'
    },
    response_ends_trial: true
};

const horse = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.horse}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'horse'
    },
    response_ends_trial: true
};

const turtle = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.turtle}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'turtle'
    },
    response_ends_trial: true
};

const lion = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.lion}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'lion'
    },
    response_ends_trial: true
};

const dog = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.dog}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const frog = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.frog}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const giraffe = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.giraffe}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'giraffe'
    },
    response_ends_trial: true
};

const butterfly = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.butterfly}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'butterfly'
    },
    response_ends_trial: true
};

const fish = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.fish}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'fish'
    },
    response_ends_trial: true
};

const snake = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.snake}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'snake'
    },
    response_ends_trial: true
};

const tiger = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.tiger}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'tiger'
    },
    response_ends_trial: true
};

const cow = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.cow}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'cow'
    },
    response_ends_trial: true
};

const bunny = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.bunny}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: order.box_choices.map(choice =>
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media[choice]}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ), 
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
        prompt_audio.play();
    },
    on_finish: (trialData) => {
        prompt_audio.pause();
        prompt_audio.currentTime = 0;
        
        trialData.selected_item = order.box_choices[trialData.response];
        trialData.choice_0 = order.box_choices[0];
        trialData.choice_1 = order.box_choices[1]
    },
    data: {
        stimulus_item: 'bunny'
    },
    response_ends_trial: true
};

const stop_rec = { type: chsRecord.StopRecordPlugin };

// Clothes
const sock_purple = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.sock_purple}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_dog}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_car}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const shirt_yellow = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.shirt_yellow}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_dog}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_car}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const scarf = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.scarf}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_dog}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_car}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const pants = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.pants}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_dog}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_car}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const coat = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.coat}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

// Dolls
const robot_yellow = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.robot_yellow}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const monster_yellow = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.monster_yellow}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const russian = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.russian}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const monster_purple = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.monster_purple}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const robot_orange = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.robot_orange}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const superhero = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.superhero}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>
    `,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box_b}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    button_html: (choice) => `
        <button style="
            background: none; 
            border: none; 
            margin: 0 200px;
            padding: 10px; 
            cursor: pointer;
        ">
            ${choice}
        </button>`,
    on_load: () => {
    },
    on_finish: () => {
    },
    response_ends_trial: true
};

const end = {
  type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="display: flex; justify-content: center; align-items: flex-start; gap: 15px; margin-top: 20px; margin-bottom: 100px;">
        <img src="${media.collin}" style="width: 40vw; max-width: 500px; height: auto;">
        <img src="${media.ribbon}" style="width: 20vw; max-width: 200px; height: auto;">
        </div>
    `,
    choices: ['Next'],
    button_html: (choice) =>
        `<div style="
            position: relative;
            width: 800px; 
            margin: 0 auto;
        ">
            <button class="jspsych-btn"
                style="
                    position: absolute;
                    right: 0;
                    bottom: -70px; 
                    background-color: green;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 30px;
                    width: 160px;
                    height: 60px;
                    border: none;
                    cursor: pointer;
                ">
                ${choice}
            </button>
        </div>`,
    on_load: () => {
        const end_audio = new Audio(media.end);
        end_audio.play();

        document.querySelectorAll('.jspsych-btn').forEach(button => {
            button.addEventListener('click', () => {
                end_audio.pause();
                end_audio.currentTime = 0;
            });
        });
    },
    trial_ends_after_audio: false,
};

let animals_vehicles = [turtle, lion, horse, bird, butterfly, fish, giraffe, snake, cow, tiger, bunny, truck, bus, ambulance, pickup, car_blue, firetruck, police, truck_green, car_orange];

// Randomization
animals_vehicles = jsPsych.randomization.shuffle(animals_vehicles);

//let dolls_food = [superhero, robot_yellow, robot_orange, monster_yellow, monster_purple, hotdog, cupcake, orange, apple, cheese, banana];

// const final = {
//   type: jsPsychHtmlButtonResponse,
//     stimulus: `
//         <img src="${media.floatinghead}" style="position: absolute; top: 75px; left: 0px; width: 250px;">
//     `,
//     choices: ['Next'],
//     button_html: (choice, choice_index) => 
//         `<button class="jspsych-btn" 
//             style="
//                 position: absolute; 
//                 bottom: 20px; 
//                 left: 1200px; 
//                 background-color: green; 
//                 color: white; 
//                 padding: 10px 20px; 
//                 border-radius: 8px; 
//                 font-size: 40px; 
//                 width: 200px;
//                 height: 60px;
//                 border: none;
//                 cursor: pointer;
//             ">
//             ${choice}
//         </button>`,
//     on_load: () => {
//         const final_audio = new Audio(media.final_aud);
//         final_audio.play();

//         document.querySelectorAll('.jspsych-btn').forEach(button => {
//             button.addEventListener('click', () => {
//                 final_audio.pause();
//                 final_audio.currentTime = 0;
//             });
//         });
//     },
//     trial_ends_after_audio: false,
// };

const survey = {
    type: chsSurvey.ConsentSurveyPlugin,
        survey_json: {
        showQuestionNumbers: false,
        completeText: 'Next',
        pages: [
            {
                elements: [
                    {
                      type: 'checkbox',
                      title: "What is your child's race?", 
                      name: 'race', 
                      description: "You can select as many as you want.",
                      choices: [
                            "African/Black",
                            "Asian/Pacific Islander",
                            "Caucasian/White",
                            "Hispanic/Latino",
                            "Native/Indigenous Peoples",
                            "Other",
                            "Prefer not to say"
                        ],
                      showOtherItem: false,
                      showSelectAllItem: false,
                      showNoneItem: false,
                      isRequired: false,
                    },  
                    {
                      type: 'radiogroup',
                      title: "How often does your child hear English in a typical day?", 
                      name: 'english', 
                      choices: [
                          'None of the time',
                          'Some of the time',
                          'Most of the time',
                          'All of the time',
                      ],
                      isRequired: false
                    }, 
                    {
                      type: 'radiogroup',
                      title: "How would you describe your child's sensitivity to everyday noises (overheard conversations, traffic sounds, etc.)? Would you say they...", 
                      name: 'counting', 
                      choices: [
                          'Are not at all bothered',
                          'Are a little bothered',
                          'Are somewhat bothered',
                          'Are very bothered',
                          'Are extremeley bothered'
                      ],
                      isRequired: false
                    },
                    {
                      type: 'radiogroup',
                      title: "What is the highest level of education you or your partner (if applicable) completed?", 
                      name: 'education', 
                      choices: [
                          'Less than high school',
                          'High school or GED',
                          'Some college',
                          "Bachelor's degree",
                          "Master's degree",
                          "Graduate or professional degree",
                          "Prefer not to say"
                      ],
                      isRequired: false
                    },
                    {
                      type: 'text',
                      title: 'What is your email address? We will use it to send your Amazon gift card if your child meets the eligibility criteria.', 
                      placeholder: 'email',
                      name: 'email', 
                      inputType: 'email',
                      size: 30,
                      isRequired: true,
                    }
                ]
            }
            
        ]
    }
};
const debrief = {
    type: chsSurvey.ConsentSurveyPlugin,
        survey_json: {
        showQuestionNumbers: false,
        completeText: 'Next',
        pages: [
            {
                name: 'Thank you for participating in this study. This work would not be possible without you!',
                elements: [
                    {
                      type: 'html',
                      title: 'What did my child do today?',
                      html: `
                      <h2 style="font-size: 24px; text-align: center; margin-bottom: 20px;">What did my child do today?</h2>
                      In this study, we were interested in how the timing of background noise influences how children complete different tasks like sorting. Your child listened to 1 of 2 types of background noise- a honking horn or a woman talking on the phone. Your child also experienced that noise in 1 of 2 ways- predictable (where the noise played every 3s) or unpredictable (where the noise played randomly). We expect that if the timing of background noise is important for learning and performance, we should see different sorting patterns based on whether children sorted when the noise was predictable compared to when the noise was unpredictable. \n \n This study will help us understand how important the environment is for learning and behavior. We were interested in what your child thought, so there were no right or wrong answers. Lots of other children have also participated in this study. Sometimes they responded a little similarly to your child and sometimes they responded a little differently. All answers are okay! \n \n If you want to learn more about how children learn in noisy environments, check out this article called <a href=https://www.npr.org/sections/health-shots/2016/07/21/486799292/turning-down-the-background-noise-could-help-toddlers-learn target='_blank' rel='noopener'>Turning Down The Background Noise Could Help Toddlers Learn.
                      `,
                      isRequired: false,
                      showOtherItem: false,
                      showSelectAllItem: false,
                      showNoneItem: false,
                      size: 1
                    },
                    {
                        type: 'html',
                        title: 'How do I receive compensation?',
                        html: `
                        <h2 style="font-size: 24px; text-align: center; margin-bottom: 20px;">How do I receive compensation?</h2>
                        To thank you for your participation, we'll be emailing you a $5 Amazon gift card - this should arrive in your inbox within the two weeks after we confirm your consent video and check that your child is in the age range for this study (If you don't hear from us by then, feel free to reach out!). If you participate again with another child in the age range, you'll receive one gift card per child. Please note that we cannot compensate participation from children outside of the age range.
                        `,
                        isRequired: false,
                        showOtherItem: false,
                        showSelectAllItem: false,
                        showNoneItem: false,
                        size: 1
                    },
                    {
                        type: 'html',
                        title: "What if I have more questions?",
                        html: `
                        <h2 style="font-size: 24px; text-align: center; margin-bottom: 20px;">What if I have more questions?</h2>
                        For any questions or concerns about your child's participation in this study, please contact Rondeline Williams at rondeline.williams@stanford.edu.
                        `,
                        isRequired: false,
                        showOtherItem: false,
                        showSelectAllItem: false,
                        showNoneItem: false,
                        size: 1
                    }
                ]
            }
        ]
    }
};

const exit_survey = { type: chsSurvey.ExitSurveyPlugin };

let phorn_aud = new Audio(media.phorn);
let uphorn_aud = new Audio(media.uphorn);
let pstore_aud = new Audio(media.pstore);
let upstore_aud = new Audio(media.upstore);
let silence_aud = new Audio(media.silence);

// Silence
let silence_condition = [
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Get ready!</p>',
        choices: 'NO_KEYS',  
        trial_duration: 500,
        on_load: () => {
            console.log('Background audio starts playing');
            silence_aud.play();
        }
    },
    intro,
    animals_vehicles_intro,
    animals_vehicles_ex,
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Trials complete! Please wait...</p>',
        choices: 'NO_KEYS', 
        trial_duration: 500,
        on_finish: () => {
            console.log('Background audio stops playing');
            silence_aud.pause();
            silence_aud.currentTime = 0;
        }
    },
    ready,
    penguin,
    car,
    ...animals_vehicles
    
];

// Horn - predictable
let phorn_condition = [
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Get ready!</p>',
        choices: 'NO_KEYS',  
        trial_duration: 500,
        on_load: () => {
            console.log('Background audio starts playing');
            phorn_aud.play();
        }
    },
    intro,
    animals_vehicles_intro,
    animals_vehicles_ex,
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Trials complete! Please wait...</p>',
        choices: 'NO_KEYS', 
        trial_duration: 500,
        on_finish: () => {
            console.log('Background audio stops playing');
            phorn_aud.pause();
            phorn_aud.currentTime = 0;
        }
    },
    ready,
    penguin,
    car,
    ...animals_vehicles
];

// Horn - unpredictable
let uphorn_condition = [
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Get ready!</p>',
        choices: 'NO_KEYS',  
        trial_duration: 500,
        on_load: () => {
            console.log('Background audio starts playing');
            uphorn_aud.play();
        }
    },
    intro,
    animals_vehicles_intro,
    animals_vehicles_ex,
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Trials complete! Please wait...</p>',
        choices: 'NO_KEYS', 
        trial_duration: 500,
        on_finish: () => {
            console.log('Background audio stops playing');
            uphorn_aud.pause();
            uphorn_aud.currentTime = 0;
        }
    },
    ready,
    penguin,
    car,
    ...animals_vehicles
];

// Store - predictable
let pstore_condition = [
    warning,
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Get ready!</p>',
        choices: 'NO_KEYS',  
        trial_duration: 500,
        on_load: () => {
            console.log('Background audio starts playing');
            pstore_aud.play();
        }
    },
    intro,
    animals_vehicles_intro,
    animals_vehicles_ex,
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Trials complete! Please wait...</p>',
        choices: 'NO_KEYS', 
        trial_duration: 500,
        on_finish: () => {
            console.log('Background audio stops playing');
            pstore_aud.pause();
            pstore_aud.currentTime = 0;
        }
    },
    ready,
    penguin,
    car,
    ...animals_vehicles
];

// Store - unpredictable
let upstore_condition = [
    warning,
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Get ready!</p>',
        choices: 'NO_KEYS',  
        trial_duration: 500,
        on_load: () => {
            console.log('Background audio starts playing');
            upstore_aud.play();
        }
    },
    intro,
    animals_vehicles_intro,
    animals_vehicles_ex,
    {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Trials complete! Please wait...</p>',
        choices: 'NO_KEYS', 
        trial_duration: 500,
        on_finish: () => {
            console.log('Background audio stops playing');
            upstore_aud.pause();
            upstore_aud.currentTime = 0;
        }
    },
    ready,
    penguin,
    car,
    ...animals_vehicles
];

// Randomly assign to one of three trial conditions
const conditions = [
    // Silence
    [...silence_condition],
    // Horn - Predictable
    //[...phorn_condition],
    // Horn - Unpredictable 
    //[...uphorn_condition],
    // Store - Predictable
    [...pstore_condition],
    // Store - Unpredictable
    [...upstore_condition]
];

// Randomly select one condition for the participant
const trials = jsPsych.randomization.sampleWithoutReplacement(conditions, 1)[0];

// Track which condition was selected
const condition_number = conditions.findIndex(c => c === trials);

const condition_labels = [
  //"silence",
  //"phorn",
  //"uphorn",
  "pstore",
  "upstore"
];

trials.forEach(trial => {
  if (!trial.data) {
    trial.data = {};
  }
  trial.data.condition_number = condition_number;
  trial.data.condition_label = condition_labels[condition_number];
});

jsPsych.run([imgpreload, audpreload, vidpreload, welcome, video_config, video_consent, instructions, start_rec, ...trials, stop_rec, end, survey, exit_survey, debrief]);