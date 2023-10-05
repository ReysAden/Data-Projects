   let pomodoroTimeInSeconds = 1500;
   let breakTimeInSeconds = 300;
   let pomodoroSetByUser = 1500;
   let breakSetByuser = 300;
   let pause = false;
   let run = false;
   let isTimeRunning = false;
   let showTimeInterval = undefined;
   let showTimeForBreak = undefined;

   $('#start').click(() => {
     if (isTimeRunning) {
       return;
     }
     $('#start').prop('disabled', true);
     $('#reset').prop('disabled', true);
     if (!isTimeRunning && pause) {
       showTimeForBreak = setInterval(() => {
         showTimeForBreakFunction();
       }, 1000)

     } else if (!isTimeRunning) {
       showTimeInterval = setInterval(() => {
         showTimeForPomodoro();
       }, 1000)
     }
   });

   function intervalForBreak() {
     showTimeForBreak = setInterval(() => {
       showTimeForBreakFunction();
     }, 1000)
   }

   function getPomodoroTime() {
     return pomodoroTimeInSeconds;
   }

   function getBreakTime() {
     return breakTimeInSeconds;
   }

   function setBreakTime(breakTime) {
     breakTimeInSeconds = breakTime;
   }

   function setPomodoroTime(timeValue) {
     pomodoroTimeInSeconds = timeValue;
   }

   function showTimeForPomodoro() {
     let beepSound = new Audio('https://freesound.org/data/previews/346/346572_5121236-lq.mp3');
     run = true;
     isTimeRunning = true;

     $('.status').text('Pomodoro');
     printTimer(pomodoroTimeInSeconds);

     pomodoroTimeInSeconds--;

     if (pomodoroTimeInSeconds === -1) {
       beepSound.play();
       intervalForBreak();
       clearInterval(showTimeInterval);
       setPomodoroTime(pomodoroSetByUser);
     }
   }

   function showTimeForBreakFunction() {
     isTimeRunning = true;
     run = false;
     pause = true;
     $('.status').text('Break');
     printTimer(breakTimeInSeconds);

     breakTimeInSeconds--;

     if (breakTimeInSeconds === -1) {
       clearInterval(showTimeForBreak);
       setBreakTime(breakSetByuser);
       run = false;
       pause = false;
       isTimeRunning = false;
       $('#start').prop('disabled', false);
     }
   }

   $('#stop').click(() => {
     isTimeRunning = false;
     $('#start').prop('disabled', false);
     $('#reset').prop('disabled', false);
     clearInterval(showTimeInterval);
     clearInterval(showTimeForBreak);
   });

   $('#reset').click(() => {
     pomodoroSetByUser = 1500;
     breakSetByuser = 300;
     setPomodoroTime(pomodoroSetByUser);
     setBreakTime(breakSetByuser);
     run = false;
     pause = false;
     isTimeRunning = false;
     $('#start').prop('disabled', false);
     $('.status').text('Press start button to start');
     $('.timer').text('25: 00');
   });

   function printTimer(seconds) {
     let minutes = 0;
     minutes = Math.floor(seconds / 60);
     let second = seconds % 60;
     let secondFormat = second <= 9 ? second = '0' + second : second;
     $('.timer').text(minutes + ': ' + secondFormat);
   }

   $('#timePlus').click(() => {
     pomodoroTimeInSeconds = pomodoroTimeInSeconds + 30;
     pomodoroSetByUser = pomodoroSetByUser + 30;
     $('.status').text('Added ' + 30 + ' seconds to pomodoro timer');
     printTimer(pomodoroTimeInSeconds);
   });

   $('#timeMinus').click(() => {
     if (pomodoroTimeInSeconds <= 30) {
       pomodoroTimeInSeconds = 30;
       return;
     }
     pomodoroTimeInSeconds = pomodoroTimeInSeconds - 30;
     pomodoroSetByUser = pomodoroSetByUser - 30;

     $('.status').text('Removed ' + 30 + ' seconds from tomodoro timer');
     printTimer(pomodoroTimeInSeconds);
   });

   $('#breakMinus').click(() => {
     if (breakTimeInSeconds <= 30) {
       breakTimeInSeconds = 30;
       return;
     }
     breakTimeInSeconds = breakTimeInSeconds - 30;
     breakSetByuser = breakSetByuser - 30;
     $('.status').text('Removed ' + 30 + ' seconds from break timer');
     printTimer(breakTimeInSeconds);
   })
 
   $('#breakPlus').click(() => {
     breakTimeInSeconds = breakTimeInSeconds + 30;
     breakSetByuser = breakSetByuser + 30;
     $('.status').text('Added ' + 30 + ' seconds from break timer');
     printTimer(breakTimeInSeconds);
   })
   $(document).ready(function() {
    $('#addTask').click(function() {
        var taskText = $('#taskInput').val();
        var dueDate = prompt("Enter due date for the task (e.g., YYYY-MM-DD):");
        
        if (taskText !== '') {
            $('#taskList').append('<li><span class="task-text">' + taskText + '</span><span class="due-date">' + dueDate + '</span><button class="delete">Delete</button></li>');
            $('#taskInput').val('');
        }
    });

    $(document).on('dblclick', 'li', function() {
        $(this).toggleClass('completed');
    });

    $(document).on('click', '.delete', function() {
        $(this).parent().remove();
    });

    $('#taskList').sortable();
});
