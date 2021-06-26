$(document).ready(function () {
  var saveButton = document.querySelector(".saveBtn");
  var currentDay = document.querySelector("#currentDay");
  var schedule = $(".schedule");
  var itemsArray = [];
  var today;

  var getItems = function () {
    tempItemsArray = JSON.parse(localStorage.getItem("workdaySchedule"));

    if (!tempItemsArray || tempItemsArray.length === 0) {
      return;
    } else {
      itemsArray = tempItemsArray;
    }

    //   $(".row").each(function () {
    //     var id = $(this).attr("id")
    //     var scheduleItem = itemsArray[id]
    //     console.log(scheduleItem)
    //   })
  };

  var saveItems = function () {
    localStorage.setItem("workdaySchedule", JSON.stringify(itemsArray));
  };

  var buildEmptyWorkdayArray = function () {
    for (var i = 9; i <= 20; i++) {
      var workdayItem = {
        militaryTime: i,
        displayTime: "",
        taskItem: "",
      };

      if (i < 12) {
        workdayItem.displayTime = i + "AM";
      } else if (i === 12) {
        workdayItem.displayTime = i + "PM";
      } else {
        workdayItem.displayTime = i - 12 + "PM ";
      }

      itemsArray.push(workdayItem);
    }
    console.log("After Build Array: ", itemsArray);
  };

  // var setBackgroup

  var loadRows = function () {
    for (var i = 0; i < itemsArray.length; i++) {
      var rowEl = $("<div>");
      rowEl.attr("class", "row");
      rowEl.attr("id", i);
      var hourEl = $("<div>");
      hourEl.attr("class", "col-md-1 hour ");
      hourEl.text(itemsArray[i].displayTime);
      var textAreaEl = $("<textarea>");
      textAreaEl.attr("class", "col-md-10 task form-control");

      var btnEl = $("<button>");
      btnEl.attr("class", "saveBtn col-md-1");

      var iconEl = $("<i>");
      iconEl.attr("class", "far fa-save");

      btnEl.append(iconEl);

      rowEl.append(hourEl);
      rowEl.append(textAreaEl);
      rowEl.append(btnEl);
      schedule.append(rowEl);
    }
  };

  var loadPage = function () {
    buildEmptyWorkdayArray();

    loadRows();
    getItems();

    today = moment();
    currentDay.textContent = today.format("dddd MMMM Do");

    // for(var i = 0; i<itemsArray.length; i++){
    $(".row").each(function () {
      var id = parseInt($(this).attr("id"));
      var scheduleObj = itemsArray[id];
      $(this).children(".task").text(scheduleObj.taskItem);

      var rowTime = moment().hour(scheduleObj.militaryTime).minute(0).second(0);
      // console.log("rowTime: ",rowTime);

      var timeDiff = today.diff(rowTime, "minutes");

      if (timeDiff > 0 && timeDiff < 60) {
        $(this).children(".task").addClass("present");
      } else if (today.isAfter(rowTime)) {
        $(this).children(".task").addClass("past");
      } else {
        $(this).children(".task").addClass("future");
      }
    });
  };

  loadPage();

  $(".saveBtn").on("click", function (event) {
    var parentDiv = event.target.parentElement;
    var id = parseInt(parentDiv.id);
    console.log("ID", id, "event ", parentDiv);
    var workdayItem = itemsArray[id];
    console.log("ArrayItem", itemsArray);

    itemsArray[id].taskItem = $(parentDiv).children(".task").val().trim();

    //itemsArray[id].taskItem = $(this).children(".task").val().trim();

    saveItems();
  });
});

// function saveTask() {
//     console.log("in savetask")
// //   workdayItem.time = $(this).siblings(".hour").text().trim();
// //   workdayItem.task = $(this).siblings(".task").val().trim();
// //   itemsArray.push(workdayItem);
// //   saveItems();
// };

// var getItems = function () {
//     itemsArray = JSON.parse(localStorage.getItem("workdayItem")) || [];

//     itemsArray.forEach(function (taskItem) {
//       $(".row").each(function () {
//         var id = $(this).id
//         var divHourValue = $(this).children(".hour").text().trim();
//         var divHourTime = parseInt(divHourValue);
//         console.log("ID", id, "divHour: ", divHourValue, " divHourTime:  ", divHourTime )
//         if (taskItem.time === divHourValue) {
//           $(this).children(".task").text(taskItem.task);
//         }
//       });
//     });
//   };
