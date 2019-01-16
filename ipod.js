// Create your global variables below:
var tracklist = [
  "Let It Happen",
  "Nangs",
  "The Moment",
  "Yes I'm Changing",
  "Eventually",
  "Gossip",
  "The Less I Know The Better",
  "Past Life",
  "Disciples",
  "'Cause I'm A Man"
];
var volLevels = [];
var initSuccess = false;
var volIndex = 0;
var paused = false;
var counter = 0;

function init() {
  // Your code goes here
  if (!initSuccess) {
    var currentPlayer = document.getElementById("player-time");
    currentPlayer.value = 0;
    for (let i = 0; i < 6; i++)
      volLevels.push(document.getElementById("vl" + i));
    volLevels[0].style.backgroundColor = "purple";
    volLevels[1].style.backgroundColor = "purple";
    volLevels[2].style.backgroundColor = "purple";
    initSuccess = true;
    volIndex = 2;
  }
}

function volUp() {
  // Your code goes here
  if (volIndex + 1 < volLevels.length) {
    volIndex = volIndex + 1;
    document.getElementById("vl" + volIndex).style.backgroundColor = "purple";
  }
}

function volDown() {
  // Your code goes here
  if (volIndex >= 0) {
    document.getElementById("vl" + volIndex).style.backgroundColor = "white";
    volIndex = volIndex - 1;
  }
}

function switchPlay() {
  // Your code goes here
  var currentPlayer = document.getElementById("player-time");
  var currentTime = document.getElementById("time-elapsed");
  var icon = document.getElementById("switchPlay");

  if (icon.className == "fas fa-play") {
    icon.className = "fas fa-pause";
    paused = false;
  } else {
    icon.className = "fas fa-play";
    paused = true;
  }

  var playback = function() {
    if (!paused) {
      counter++;
      console.log(counter);
      currentTime.innerHTML = secondsToMs(counter);
      currentPlayer.value = counter;
      if (counter === 180) {
        nextSong();
        counter = 0;
      }
    } else {
      // resume
      clearInterval(timer);
    }
  };

  var timer = setInterval(playback, 1000);
}

function nextSong() {
  // Your code goes here
  var currentSong = document.getElementById("player-song-name");
  var s = currentSong.innerHTML;
  currentSong.innerHTML =
    tracklist[(tracklist.indexOf(s) + 1) % tracklist.length];
}

function prevSong() {
  // Your code goes here
  var currentSong = document.getElementById("player-song-name");
  var s = currentSong.innerHTML;
  currentSong.innerHTML =
    tracklist[
      tracklist.indexOf(s) - 1 < 0
        ? tracklist.length - 1
        : tracklist.indexOf(s) - 1
    ];
}

function secondsToMs(d) {
  d = Number(d);

  var min = Math.floor(d / 60);
  var sec = Math.floor(d % 60);

  return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();
