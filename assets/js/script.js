// show current date inside header
$("#currentDay").text( moment().format('ddd MMM Do, YYYY') );

// Set up clock to check on current time while page is open
var time = document.getElementById("currentDay");
function currentDay() {
  time.textContent = new Date().toString();
}

// let taskRestore = JSON.parse(localStorage.text, taskHour("")) || [];

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

// load previously saved tasks if available
function loadEvents() {
    // Setting variable count equal to 9 - which is the start of the timeblocks
    for (let count = 9; count < 18; count++) {
      // Getting the count number from localStorage
      localStorage.getItem(count);
      // Setting myString equal to the getItem(count)
      let myString = localStorage.getItem(count);
      // If conditional for if there is a count in localStorage (a timeblock is clicked)
      if (myString) {
        // Then the ID for that count is pulled and it will place the value of myString
        $("#" + count).val(myString);
      }
    }
  }

$(".saveBtn").on("click", function () {
    var text = $(this).siblings(".task").val();
  
    var taskHour = parseInt($(this).parent().attr("id").split("hour")[1], text);
    localStorage.setItem(text, taskHour);

    loadEvents();
  });

timeTracker();
loadEvents();
