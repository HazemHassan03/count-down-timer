const selectCon = document.querySelector(".select-date"),
  showCon = document.querySelector(".show-timer"),
  submit = document.querySelector("button.submit"),
  back = document.querySelector(".select-date .back"),
  daysEl = document.querySelector(".days .value"),
  hoursEl = document.querySelector(".hours .value"),
  minutesEl = document.querySelector(".minutes .value"),
  secondsEl = document.querySelector(".seconds .value"),
  to = document.querySelector(".timer .date"),
  changeDate = document.querySelector(".change-date");

let selectDate = document.querySelector("input#date"),
  messageEl = document.querySelector(".message"),
  interval;

if (localStorage.getItem("Date")) {
  showTimer(localStorage.getItem("Date"));
} else {
  select();
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = `${
  currentDate.getMonth() + 1 < 10
    ? `0${currentDate.getMonth() + 1}`
    : currentDate.getMonth() + 1
}`;
const day = `${
  currentDate.getDate() < 10
    ? `0${currentDate.getDate()}`
    : currentDate.getDate()
}`;
const hour = `${
  currentDate.getHours() < 10
    ? `0${currentDate.getHours()}`
    : currentDate.getHours()
}`;
const minute = `${
  currentDate.getMinutes() < 10
    ? `0${currentDate.getMinutes()}`
    : currentDate.getMinutes()
}`;
const currentFullDate = `${year}-${month}-${day}T${hour}:${minute}`;
selectDate.value = currentFullDate;

back.addEventListener("click", show);
changeDate.addEventListener("click", select);
submit.addEventListener("click", inputValidation);
selectDate.addEventListener("input", function () {
  if (this.value) {
    this.setAttribute("data-placeholder", "");
  } else {
    this.setAttribute("data-placeholder", "Select a date");
  }
});

function show() {
  selectCon.classList.remove("active");
}

function select() {
  selectCon.classList.add("active");
}

function showMessage(message) {
  messageEl.innerHTML = message;
  if (!document.querySelector(".message.active")) {
    messageEl.classList.add("active");
    setTimeout(() => {
      messageEl.classList.remove("active");
    }, 3000);
  }
}

function inputValidation() {
  let valid = selectDate.value ? true : false;
  if (valid) {
    const date = selectDate.value;
    const targetDate = new Date(date).getTime();
    const currentDate = new Date().getTime();
    if (targetDate - currentDate > 0) {
      showTimer(date);
    } else {
      showMessage("Please select a date in the future.");
    }
  } else {
    selectDate.classList.add("invalid");
    selectDate.addEventListener("input", () => {
      selectDate.classList.remove("invalid");
    });
  }
}

function showTimer(date) {
  const dateTarget = new Date(date).getTime();
  to.textContent =
    "To " +
    new Date(date).toLocaleString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  clearInterval(interval);
  interval = setInterval(() => {
    const dateNow = new Date().getTime();
    const dateDifference = dateTarget - dateNow;
    const days = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (dateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (dateDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((dateDifference % (1000 * 60)) / 1000);
    if (dateDifference > 0) {
      daysEl.textContent = days < 10 ? `0${days}` : days;
      hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
      minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
      secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    } else {
      clearInterval(interval);
      showMessage(
        `<i class="fa-solid fa-trophy"></i> Hooray! You've reached your target date!`
      );
    }
  }, 1000);
  show();
  back.classList.add("active");
  localStorage.setItem("Date", date);
}
