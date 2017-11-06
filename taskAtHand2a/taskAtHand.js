function TaskAtHandApp()
{
	var version = "v1.3";
	var appStorage = new AppStorage("taskAtHand");
	
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}
	
	this.start = function()
	{
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
		setStatus("ready");
	};
	function saveTaskList()
	 {
		 var tasks=[];
		 $("#task-list .task span.task-name").each(function()
		 { 
			tasks.push($(this).text())
		 });
		 appStorage.setValue("taskList", tasks);
	 }
	function loadTaskList()
	 {
		 var tasks = appStorage.getValue("taskList");
		 if(tasks)
		 {
			 for(var i in tasks)
			 {
				 addTaskElement(tasks[i]);
			 }
		 }
	 }
	
	function addTask()
	{
		var taskName = $("#new-task-name").val();
		if(taskName)
		{
			addTaskElement(taskName);
			$("#new-task-name").val("").focus();
		}
		saveTaskList();
	}
	
	function addTaskElement(taskName)
	{ 
		 var $task = $("#task-template .task").clone();
		 $task.click(function() { onSelectTask($task); });
		 $("span.task-name",$task).text(taskName);
		 
		 $("#task-list").append($task);
		 
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