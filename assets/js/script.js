// show current date inside header
$("#currentDay").text( moment().format('ddd MMM Do, YYYY') );

// Set up clock to check on current time while page is open
var time = document.getElementById("currentDay");
function currentDay() {
  time.textContent = new Date().toString();
}

// refresh timetable every hour
setInterval(currentDay, 1000 * 60);

// create a function to compare current time to time on scheduler and changes classes accordingly
function timeTracker() {
    // use moment to get current hour time
    var currentHour = moment().hour();

    // go thruogh each time-block div to get the hour assigned to it
    $(".time-block").each(function () {
        var taskHour = parseInt($(this).attr("id").split("hour")[1]);
        console.log(taskHour);
        console.log(currentHour)

        // check current time against time on scheduler
        if (taskHour < currentHour) {
            $(this).removeClass("future");
            $(this).removeClass("present");
            $(this).addClass("past");

        }else if (taskHour === currentHour) {
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");

        }else if (taskHour > currentHour) {
            $(this).removeClass("present");
            $(this).removeClass("past");
            $(this).addClass("future");
        }
    })
}

// saves entered text to restore later
$(".saveBtn").click(function (event) {
    event.preventDefault();
    var value = $(this).siblings(".task").val();
    var time = $(this).parent().attr("id").split("hour")[1];
    localStorage.setItem(time, value);
  });


// restores previous saved vaules into text boxes
$(document).ready(function () {
  $("#hour9 .task").val(localStorage.getItem("9"));
  $("#hour10 .task").val(localStorage.getItem("10"));
  $("#hour11 .task").val(localStorage.getItem("11"));
  $("#hour12 .task").val(localStorage.getItem("12"));
  $("#hour13 .task").val(localStorage.getItem("13"));
  $("#hour14 .task").val(localStorage.getItem("14"));
  $("#hour15 .task").val(localStorage.getItem("15"));
  $("#hour16 .task").val(localStorage.getItem("16"));
});

// when page is opened, checks time to set color coding
timeTracker();