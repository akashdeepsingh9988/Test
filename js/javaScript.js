var name = "";
name = localStorage.getItem("name");
//getToDo();


//FUNCTION FOR WEATHER WIDGET
!function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, 'script', 'weatherwidget-io-js');

// METHOD FOR DISPLAY TIME
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var timing = "";
    m = checkTime(m);
    s = checkTime(s);
    name = localStorage.getItem("name");
    if (h < 12 && h >= 0)
    {
        timing = "Morning";
        document.getElementById('time-display').innerHTML =
                h + ":" + m + " <h1 class = 'goodm'> Good Morning,  " + name + "</h1>";
    } else if (h >= 12 && h < 17)
    {
        timing = "Afternoon";
        document.getElementById('time-display').innerHTML =
                h + ":" + m + " <h1 class = 'goodm'> Good Afternoon, " + name + "</h1>";
    } else
    {
        document.getElementById('time-display').innerHTML =
                h + ":" + m + "<h1 class = 'goodm'> Good Evening, " + name + "</h1>";
    }


    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    ; // add zero in front of numbers < 10
    return i;
}

// JQUERY METHOD
$(document).ready(function ()
{
    var toDoList = JSON.parse(localStorage.getItem('toDoList'));
    // CHECK IF TO DO LIST IS EMPTY
    if (toDoList != null)
    {
        getToDo();
    }
    var name = "";
    name = localStorage.getItem("name");


    // CODE TO GET CITY OF USER BASED ON IP ADDRESS
    $.getJSON('https://ipapi.co/json/', function (data) {
        var data = JSON.stringify(data, null, 2);
        var obj = JSON.parse(data);
        var city = obj["city"];
        city = city.toLowerCase();
        
        // logic 1 to identify cities 
        if (city == "St. Marys")
        {
            city = "saint-marys";
            document.getElementById("weather-widget").innerHTML = "<a class='weatherwidget-io' href='https://forecast7.com/en/43d26n81d14/" + city + "/' id ='abc' data-label_1="+city+" data-label_2="+city+" data-theme='original'>"+city+" WEATHER</a>";
        }
        else if (city == "toronto")
        {
            document.getElementById("weather-widget").innerHTML = "<a class='weatherwidget-io' href='https://forecast7.com/en/43d65n79d38/" + city + "/' id ='abc' data-label_1="+city+" data-label_2="+city+" data-theme='original'>"+city+" Weather</a>";
        }        
        else
        {
            alert("Unable to fetch user location");
        }
        
        // logic end
    });

    // GETTING INPUT FROM USER FOR NAME
    var focus = localStorage.getItem("focus");
    if (name == null || name == "")
    {
        $("#name").keypress(function (event) {
            if (event.keyCode == 13) { // VALIDATING ENTER KEY
                name = $("#name").val();
                if (name.length < 3)
                {
                    alert("Enter valid name");
                } else
                {
                    localStorage.setItem("name", name); // STORING NAME IN LOCAL STORAGE
                    // alert("my name is : " + name)
                    $("#form-display").fadeOut();
                    $("#time-display").fadeIn();
                    $("#input-focus").fadeIn();
                }
            }
        });
    } else
    {
        $("#time-display").fadeIn();
        $("#form-display").fadeOut();
        if (focus == null || focus == "")
        {
            $("#input-focus").fadeIn();
            $("#qt").fadeOut();
        } else
        {
            document.getElementById('focus-val').innerHTML = focus;
            $("#display-focus").fadeIn();
            $("#qt").fadeIn();
        }
    }
});

// WEATHER  ICON TOGGLE 
$("#weather-icon").click(function () {
    $("#weather-widget").toggle();
});

// DISPLAY RANDOM BACKGROUND IMAGES ON PAGE REFRESH 
$(function () {
    var images = ['./images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg', './images/5.jpg', './images/6.jpg', './images/7.jpg', './images/8.jpg'];
    $('body').css({
        'background-image': 'url(' + images[Math.floor(Math.random() * images.length)] + ')'
    });

    var say = ["Remember to always be yourself. Unless you suck.", "Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it", "Do what you can, with what you have, where you are.", "Dream as if you’ll live forever, live as if you’ll die today", "Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it", "Life is about making an impact, not making an income.", "It is better to be hated for what you are than to be loved for what you are not"];

    document.getElementById('qt-p').innerHTML = "<q>" + say[Math.floor(Math.random() * (say.length))] + "</q>";

});

// GETTING USER GOAL/FOCUS INFO
$("#focus").keypress(function (event) {
    if (event.keyCode == 13) {
        var focus = $("#focus").val();
        localStorage.setItem("focus", focus);
        $("#input-focus").fadeOut();
        document.getElementById('focus-val').innerHTML = focus;
        $("#display-focus").fadeIn();
        $("#qt").fadeIn();
        //alert(focus);
    }
}
);

// DELETE GOAL FROM PAGE
$("#delete-img").click(function () {
    localStorage.removeItem("focus");
    $("#display-focus").fadeOut();
    $("#input-focus").fadeIn();
    $("#qt").fadeOut();
});

// WRAP CODE TO FOCUS/ GOAL TEXT
$("#focus-val").click(function () {
    $("#focus-val").wrap("<del>");
});

// DISPLAY TODO MODAL BY TOGGLE
$("#todo-btn").click(function () {
    // alert("dis");
    $("#modal-todo").toggle();
});

// CLOSE MODAL
$("#close-modal").click(function () {
    // alert("dis");
    $("#modal-todo").fadeOut();
});

//CLOSE MODAL
$("#close-m").click(function () {
    // alert("dis");
    $("#modal-todo").fadeOut();
});

//OPERATIONS ON TODO LIST
document.getElementById('todolist').addEventListener('submit', saveToDo);

// SAVE TO LOCAL STORAGE
function saveToDo(event) {
    var d = new Date()
    event.preventDefault();
    var getId = d.getTime();
    var getInput = document.getElementById("todobox").value;
    var todo = {id: getId, todo: getInput}

    if (localStorage.getItem('toDoList') == null) {
        var toDoList = [];
        toDoList.push(todo);
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
    } else {
        var toDoList = JSON.parse(localStorage.getItem('toDoList'));
        toDoList.push(todo);
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
    }

    document.getElementById('todolist').reset();
    getToDo();
}

// GETING VALUES FROM TODO LIST
function getToDo() {

    var toDoList = JSON.parse(localStorage.getItem('toDoList'));
    var ShowToDo = document.getElementById('ShowToDoList');
    ShowToDoList.innerHTML = '';
    for (var i = 0; i < toDoList.length; i++) {
        var id = toDoList[i].id;
        var toDoText = toDoList[i].todo;
        ShowToDoList.innerHTML +=
                '<hr>' +
                '<p style = "font-size: 20px;">' + toDoText + '' +
                '<a href="#" class = "button is-primary" style = "float:right;" onclick="deleteToDo(\'' + id + '\')">Close this task</a></p>';
    }
}

// DELETE DATA FROM TODO LIST
function deleteToDo(id) {
    var toDoList = JSON.parse(localStorage.getItem('toDoList'));
    for (var i = 0; i < toDoList.length; i++) {
        if (toDoList[i].id == id) {
            var txt;
            var r = confirm("Are you sure?");
            if (r == true) {
                toDoList.splice(i, 1);
                getToDo();
            } else {
                getToDo();
            }
            // toDoList.splice(i, 1);
        }
    }
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    getToDo();
}
