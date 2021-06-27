$(document).ready(function () {
  var saveButton = document.querySelector(".saveBtn");
  var currentDay = document.querySelector("#currentDay");
  var schedule = $(".schedule");
  var itemsArray = [];
  var today;


  /****************************************************************************
 *  getItems - get workday Schedule from  localStorage and store to itemsArray 
 ***************************************************************************/
  var getItems = function () {
    tempItemsArray = JSON.parse(localStorage.getItem("workdaySchedule"));

    if (!tempItemsArray || tempItemsArray.length === 0) {
      return;
    } else {
      itemsArray = tempItemsArray;
    }
  };

/****************************************************************************
 *  saveItems - store the itemsArray to localStorage 
 ***************************************************************************/
  var saveItems = function () {
    localStorage.setItem("workdaySchedule", JSON.stringify(itemsArray));
  };


/******************************************************************************
 * BuildEmptyWorkdayArray - create empty array with the workdayItem object
 ******************************************************************************/
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
  };

/***************************************************************************
 * loadRows() - creates the timeline and display on the page
 ***************************************************************************/

  var loadRows = function () {
    for (var i = 0; i < itemsArray.length; i++) {
      var rowEl = $("<div>");
      rowEl.attr("class", "row");
      rowEl.attr("id", i);
      var hourEl = $("<div>");
      hourEl.attr("class", "col-sm-1 hour ");
      hourEl.text(itemsArray[i].displayTime);
      var textAreaEl = $("<textarea>");
      textAreaEl.attr("class", "col-sm-10 task description");

      var btnEl = $("<button>");
      btnEl.attr("class", "saveBtn col-sm-1");

      var iconEl = $("<i>");
      iconEl.attr("class", "far fa-save");

      btnEl.append(iconEl);

      rowEl.append(hourEl);
      rowEl.append(textAreaEl);
      rowEl.append(btnEl);
      schedule.append(rowEl);
    }
  };

  /********************************************************************************
   * loadPage() - initially called function
   * 1. call BuildEmptyWorkdayArray - create empty array with the workdayItem object
   * 2. Call loadRows - creates the timeline and display on the page
   * 3. call moment object and display date in currentDay container
   * 4. use datediff to set the background color
   ********************************************************************************/

  var loadPage = function () {
    buildEmptyWorkdayArray();

    loadRows();
    getItems();

    today = moment();
    currentDay.textContent = today.format("dddd MMMM Do");

    $(".row").each(function () {
      var id = parseInt($(this).attr("id"));
      var scheduleObj = itemsArray[id];
      $(this).children(".task").text(scheduleObj.taskItem);

      var rowTime = moment().hour(scheduleObj.militaryTime).minute(0).second(0);

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

  //Calls LoadPage Function
  loadPage();


/*****************************************************************************
 *  Anynonmous Function to set click event when the save Buttons are clicked
 * Gets the ID attribute from the parent element and and the value in the 
 * associated textarea and store the value in the corresponding 
 * area of the itemsArray
 *****************************************************************************/
  $(".saveBtn").on("click", function (event) {
    var parentDiv = event.target.parentElement;
    var id = parseInt(parentDiv.id);

    var workdayItem = itemsArray[id];
    
    itemsArray[id].taskItem = $(parentDiv).children(".task").val().trim();

    saveItems();
  });
});
