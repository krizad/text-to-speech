// Check if speech synthesis is available
if (!('speechSynthesis' in window)) {
  console.log('Speech synthesis is not supported in this browser.');
} 

let speech = new SpeechSynthesisUtterance();
speech.lang = "th-TH";
speech.rate = 1;
speech.pitch = 1;
speech.volume = 1;


let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  //sort alphabetically lang
  voices.sort((a, b) => {
    let langA = a.lang.toUpperCase();
    let langB = b.lang.toUpperCase();
    if (langA < langB) {
      return -1;
    }
    if (langA > langB) {
      return 1;
    }
    return 0;
  });
  //speech.voice = voices[46];
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.lang+" : "+voice.name, i);
    if (voice.lang.includes("th")) {
      voiceSelect.options[i].selected = true;
      speech.voice = voice;
    }
  });
};

document.querySelector("#rate").addEventListener("input", () => {
  const rate = document.querySelector("#rate").value;
  speech.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  speech.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
  speech.pitch = pitch;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
});

document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});
