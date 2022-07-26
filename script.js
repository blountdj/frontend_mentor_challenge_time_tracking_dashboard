const frequencies = document.querySelectorAll(".item--report__bottom__item");

const workTimeEl = document.querySelector(".work--time");
const workPreviousEl = document.querySelector(".work--previous");
const playTimeEl = document.querySelector(".play--time");
const playPreviousEl = document.querySelector(".play--previous");
const studyTimeEl = document.querySelector(".study--time");
const studyPreviousEl = document.querySelector(".study--previous");
const exerciseTimeEl = document.querySelector(".exercise--time");
const exercisePreviousEl = document.querySelector(".exercise--previous");
const socialTimeEl = document.querySelector(".social--time");
const socialPreviousEl = document.querySelector(".social--previous");
const selfCareTimeEl = document.querySelector(".selfCare--time");
const selfCarePreviousEl = document.querySelector(".selfCare--previous");

let freqency;
let data;
let current;
let previous;
const previousTextArray = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

// read data file
fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => (data = jsondata));

function removeAllActiveClasses() {
  frequencies.forEach((item) => item.classList.remove("active"));
}

function updateHTML(item, timeEl, previousEl, freqency) {
  let array = data.filter((obj) => {
    return obj.title == item;
  });

  current = array[0].timeframes[freqency].current;
  previous = array[0].timeframes[freqency].previous;
  timeEl.innerHTML = `${current}${current === 1 ? "hr" : "hrs"}`;
  previousEl.innerHTML = `${previousTextArray[freqency]} - ${previous}${
    previous === 1 ? "hr" : "hrs"
  }`;
}

frequencies.forEach((item) => {
  item.addEventListener("click", function () {
    removeAllActiveClasses();
    this.classList.add("active");
    freqency = this.getAttribute("data-frequency");

    updateHTML("Work", workTimeEl, workPreviousEl, freqency);
    updateHTML("Play", playTimeEl, playPreviousEl, freqency);
    updateHTML("Study", studyTimeEl, studyPreviousEl, freqency);
    updateHTML("Exercise", exerciseTimeEl, exercisePreviousEl, freqency);
    updateHTML("Social", socialTimeEl, socialPreviousEl, freqency);
    updateHTML("Self Care", selfCareTimeEl, selfCarePreviousEl, freqency);
  });
});
