$(document).ready(function() {  //This allows us to initialize the jQuery code when the
                                //document loads
    var listo = [];    //Create a new array

    $('#newTaskForm').hide();    //The newTaskForm will be hidden when the document loads, and is near the top of the document so as to load correctly.

    var Task = function(task) {  //The constructor will help streamline the object creating
        this.task = task;            //process
        this.id = 'new';
    }

    var advanceTask = function(task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';
                } else if (listo[i].id === 'inProgress') {
                    listo[i].id === 'archived';
                } else {
                    listo.splice(i, 1);
                }
                break;
            }
        }
        task.remove();
    };

    var addTask = function(task) {    //This function checks to see if there was input from the user and then pushes the task into the array and saves it.

        if (task) {
            task = new Task(task);
            listo.push(task);
                            // The will clear the input form after it is submitted. Then it will show the new list item in the index.html.
            $('#newItemInput').val('');
            $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
        }
        // This will make the New button hide and show the input from at the same time
        $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
    };

// We use the document here so that the DOM can recognize the creation and manipulation of html elements
    $(document).on('click', '#item', function(e) {
        e.preventDefault();//Prevents the default action to
        var task = this;    //trigger
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
    });

    $(document).on('click', '#inProgress', function(e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });

    $(document).on('click', '#archived', function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });
