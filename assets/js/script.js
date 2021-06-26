$(document).ready(function(){


var saveButton = document.querySelector(".saveBtn");
var currentDay = document.querySelector("#currentDay");
var schedule = $(".schedule")
var itemsArray = [];
var today;

var getItems = function () {
  itemsArray = JSON.parse(localStorage.getItem("workdayItem")) || [];

  itemsArray.forEach(function (taskItem) {
    $(".row").each(function () {
      var divHourValue = $(this).children(".hour").text().trim();
      var divHourTime = parseInt(divHourValue);
      if (taskItem.time === divHourValue) {
        $(this).children(".task").text(taskItem.task);
      }
    });
  });
};

var saveItems = function () {
  localStorage.setItem("workdaySchedule", JSON.stringify(itemsArray));
};

var buildEmptyWorkdayArray = function () {
  for (var i = 9; i <= 17; i++) {
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
  console.log(itemsArray);
};

// var setBackgroup

var loadRows = function(){
    for(var i=0; i<itemsArray.length; i++){
        var rowEl = $("<div>")
            rowEl.attr("class", "row")
            rowEl.attr("id", i)
        var hourEl =  $("<div>")
            hourEl.attr("class", "col-md-1 hour ")
            hourEl.text(itemsArray[i].displayTime)
        var textAreaEl = $("<textarea>")
            textAreaEl.attr("class","col-md-10 task form-control")

        var btnEl = $("<button>")
            btnEl.attr("class", "saveBtn col-md-1")
           
        var iconEl = $("<i>")
            iconEl.attr("class", "far fa-save")

        btnEl.append(iconEl);
        
        rowEl.append(hourEl);
        rowEl.append(textAreaEl);
        rowEl.append(btnEl);
        schedule.append(rowEl);
    }
}

var loadPage = function () {
  buildEmptyWorkdayArray();
  loadRows()

 // getItems();
  today = moment();
  currentDay.textContent = today.format("dddd MMMM Do");

  // var timeNow= today.format("LT")
  // var hourNow = today.hour(hh)
  // console.log(timeNow, hourNow)
  // moment("9AM", hh)

  $(".row").each(function () {});
};

loadPage();

$(".saveBtn").on("click",function(event){
    console.log(event.target.parentElement.id)
    var workdayItem = itemsArray[event.target.parentElement.id];
    workdayItem.taskItem = $(this).siblings(".task").val().trim()
    console.log(workdayItem)
    saveItems();
});


// function saveTask() {
//     console.log("in savetask")
// //   workdayItem.time = $(this).siblings(".hour").text().trim();
// //   workdayItem.task = $(this).siblings(".task").val().trim();
// //   itemsArray.push(workdayItem);
// //   saveItems();
// };


})