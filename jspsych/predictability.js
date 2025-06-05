const jsPsych = initJsPsych({
  display_element: 'jspsych-target'
});

var baseDir = "https://raw.githubusercontent.com/rondeline/predictability/master/";

// Load media files 
var media = {
    // images
    bird: baseDir + "jspsych/img/bird.png",
    box: baseDir + "jspsych/img/box.png",
    bus: baseDir + "jspsych/img/bus.png",
    butterfly: baseDir +"jspsych/img/butterfly.png",
    car: baseDir + "jspsych/img/car.png",
    cat: baseDir + "jspsych/img/cat.png",
    convertible: baseDir +"jspsych/img/convertible.png",
    dog: baseDir + "jspsych/img/dog.png",
    fiat: baseDir + "jspsych/img/fiat.png",
    fish: baseDir + "jspsych/img/fish.png",
    frog: baseDir + "jspsych/img/frog.png",
    horse: baseDir +"jspsych/img/horse.png",
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
        media.bird,
        media.box,
        media.bus,
        media.butterfly,
        media.car,
        media.cat,
        media.convertible,
        media.dog,
        media.fiat,
        media.fish,
        media.frog,
        media.horse,
        media.iguana,
        media.ladybug,
        media.lion,
        media.minivan,
        media.octopus,
        media.pickup,
        media.pig,
        media.seahorse,
        media.suv,
        media.tractor,
        media.turtle,
        media.whale
    ]
};

const welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 'Welcome! Press "next" to continue.',
    choices: ['Next']
};

// Consent
const consent = {
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
    on_finish: function(data) {
        if (data.response === 1) {
            jsPsych.endExperiment('Consent not given. Exiting.');
        }
    }
}

// Trials
var bird = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
        `<div style="display: flex; justify-content: center; margin-top: 5px;">
            <img src="${media.bird}" style="width: 20vw; max-width: 300px; height: auto;">
        </div>`,
    choices: [
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`,
        `<div style="display: flex; justify-content: center; margin: 50px; padding: 10px;">
            <img src="${media.box}" style="width: 12vw; max-width: 200px; height: auto;">
        </div>`
    ],
    response_ends_trial: true,
};


jsPsych.run([imgpreload, welcome, consent, bird]);