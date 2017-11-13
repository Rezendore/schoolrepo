function TaskAtHandApp()
{
	var version = "v3.2";
	var appStorage = new AppStorage("taskAtHand");
	var taskList = new TaskList();
	timeoutId = 0;
	
	function setStatus(msg, noFade)
	{
		$("#app>footer").text(msg).show();
		if(!noFade)
		{
			$("#app>footer").fadeOut(1000);
		}
	}
	
	this.start = function()
	{
		$("#theme").change(onChangeTheme);

		$("#new-task-name").keypress(function(e){
			if (e.which == 13)
			{
				addTask();
				return false;
			}
		})
		.focus();
		
		$("#app header").append(version);
		loadTaskList();
		loadTheme();
		setStatus("ready");
	};
	function toggleDetails($task)
	{
		$(".details",$task).slideToggle();
		$("button.toggle-details",$task).toggleClass("expanded");
	}
	function onChangeTheme()
	{
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		appStorage.setValue("theme",theme);
	}
	function setTheme(theme)
	{
		$("#theme-style").attr("href","theme/"+theme+".css");
	}
	function loadTheme()
	{
		var theme = appStorage.getValue("theme");
		if(theme)
		{
			setTheme(theme);
			$("#theme>option[value=" + theme + "]").attr("selected","selected");
		}
	}
	function saveTaskList()
	 {
		 if(timeoutId) clearTimeout(timeoutId);
		 setStatus("saving changes...", true);
		 tieoutId=setTimeout(function()
		 {
			 appStorage.setValue("taskList",taskList.getTasks());
			 timeoutId=0;
			 setStatus("changes saved.");
		 },
		 2000);
	 }
	function loadTaskList()
	 {
		 var tasks = appStorage.getValue("taskList");
		 taskList = new TaskList(tasks);
		 rebuildTaskList();
	 }
	 function rebuildTaskList()
	 {
		 $("#task-list").empty();
		 taskList.each(function(task)
		 {
			 addTaskElement(task);
		 });
	 }
	
	function addTask()
	{
		var taskName = $("#new-task-name").val();
		if(taskName)
		{
			var task = new Task(taskName);
			taskList.addTask(task);
			appStorage.setValue("nextTaskId", Task.nextTaskId);
			addTaskElement(taskName);
			saveTaskList();
			$("#new-task-name").val("").focus();
		}
	}
	
	function addTaskElement(task)
	{ 
		 var $task = $("#task-template .task").clone();
		 $task.data("task-id",task.id);
		 $("span.task-name",$task).text(task.name);
		 $task.click(function() { onSelectTask($task); });
		 $(".details input,.details select", $task).each(function() {
			 var $input = $(this);
			 var fieldName = $input.data("field");
			$input.val(task[fieldName]); 
		 });
		 $(".details input, .details select", $task).change(function() {
			 onChangeTaskDetails(task.id, $(this));
		 });
		 
		 $("#task-list").append($task);
		 $("button.toggle-details",$task).click(function() {	toggleDetails($task); });
		 $("button.delete", $task).click(function() { removeTask($task); });
		 $("button.move-up", $task).click(function() { moveTask($task, true); });
		 $("button.move-down", $task).click(function() { moveTask($task, false); });
		 //$("button.delete", $task).click(function() { $task.remove(); });
		 //$("button.move-up", $task).click(function() { $task.insertBefore($task.prev()) });
		 //$("button.move-down", $task).click(function() { $task.insertAfter($task.next()) });
		 
		 $("span.task-name", $task).click(function() {onEditTaskName($(this)); });
		 
		 $("input.task-name", $task).change(function() {onChangeTaskName($(this)); });
		 
		 $("input.task-name", $task).change(function() 
		 { 
			onChangeTaskName($(this)); 
		}).blur(function() 
		{
			$(this).hide().siblings("span.task-name").show();
		});
		 
	}
	
	function onChangeTaskDetails(taskId,$input)
	{
		var task = taskList.getTask(taskId);
		if(task)
		{
			var fieldName = $input.data("field");
			tasl[fieldName] = $input.val();
			saveTaskList();
		}
	}
	function onSelectTask($task)
	{
		if($task)
		{
			$task.siblings(".selected").removeClass("selected");
			$task.addClass("selected");
		}
	}
	
	function removeTask($task)
	{
			 $task.remove();
			 saveTaskList();
	}
	 function moveTask($task, moveUp)
	 {
		 if(moveUp)
		 {
			 $task.insertBefore($task.prev());
		 } else {
			 $task.insertAfter($task.next());
		 }
		 saveTaskList();
	 }
	 
	function onEditTaskName($span)
	{
		$span.hide()
		.siblings("input.task-name")
		.val($span.text())
		.show()
		.focus();
	}
	function onChangeTaskName($input)
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val())
		{
			 $span.text($input.val());
		}
		$span.show();
	}
	/*saveTaskList();*/
}

$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});