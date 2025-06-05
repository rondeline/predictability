// Array of media files
const videoFiles = [

];

const audioFiles = [
    
];

const imageFiles = [
    "jspsych/img/bird.png",
    "jspsych/img/bus.png",
    "jspsych/img/butterfly.png",
    "jspsych/img/car.png",
    "jspsych/img/cat.png",
    "jspsych/img/convertible.png",
    "jspsych/img/dog.png",
    "jspsych/img/fiat.png",
    "jspsych/img/fish.png",
    "jspsych/img/frog.png",
    "jspsych/img/horse.png",
    "jspsych/img/iguana.png",
    "jspsych/img/ladybug.png",
    "jspsych/img/lion.png",
    "jspsych/img/minivan.png",
    "jspsych/img/octopus.png",
    "jspsych/img/pickup.png",
    "jspsych/img/pig.png",
    "jspsych/img/seahorse.png",
    "jspsych/img/suv.png",
    "jspsych/img/tractor_truck.png",
    "jspsych/img/tractor.png",
    "jspsych/img/truck.png",
    "jspsych/img/turtle.png",
    "jspsych/img/whale.png",
]

// Function to preload media with a progress bar
function preloadMediaWithProgress(callback) {
    const totalFiles = videoFiles.length + audioFiles.length + imageFiles.length;
    let loadedFiles = 0;

    // Show the progress bar
    document.getElementById('progress-container').style.display = 'block'; // Show the progress bar
    const progressFill = document.getElementById('progress-fill');

    // Function to update progress
    function updateProgress() {
        loadedFiles++;
        const progress = (loadedFiles / totalFiles) * 100;
        progressFill.style.width = `${progress}%`;

        if (loadedFiles === totalFiles) {
            // Hide the progress bar once done
            document.getElementById('progress-container').style.display = 'none';
            // Proceed to start the game
            if (callback && typeof callback === 'function') {
                callback(); // Show the first page or start the game
            }
        }
    }
    // Preload videos
    videoFiles.forEach((videoUrl) => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.preload = "auto"; // Preload the video
        video.oncanplaythrough = updateProgress;
        video.onerror = () => console.error(`Failed to load video: ${videoUrl}`);
        video.style.display = "none"; // Hide the video element
        document.body.appendChild(video); // Append to the body temporarily
    });

    // Preload audio
    audioFiles.forEach((audioUrl) => {
        const audio = document.createElement('audio');
        audio.src = audioUrl;
        audio.preload = "auto"; // Preload the audio
        audio.oncanplaythrough = updateProgress;
        audio.onerror = () => console.error(`Failed to load audio: ${audioUrl}`);
        audio.style.display = "none"; // Hide the audio element
        document.body.appendChild(audio); // Append to the body temporarily
    });

    // Preload images
    imageFiles.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl; // Set the image source
        img.onload = updateProgress;
        img.onerror = () => console.error(`Failed to load image: ${imageUrl}`);
    });
}

// Start button logic
document.getElementById('start-button').addEventListener('click', function () {
    // Show the progress bar and start media preload
    document.getElementById('start-container').style.display = 'none'; // Hide start container
    document.getElementById('game-container').style.display = 'none'; // Keep game container hidden initially
    // Start media preload before loading the game
    preloadMediaWithProgress(() => {
        // Once preloading is complete, show the game container and load the first page
        document.getElementById('game-container').style.display = 'block'; // Show game container
        loadPage(currentPage); // Load the first page of questions
    });
});