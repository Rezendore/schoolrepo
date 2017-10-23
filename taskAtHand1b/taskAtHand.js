function TaskAtHandApp()
{
	var version = "v1.0";
	
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
		setStatus("ready");
	};
	
	function addTask()
	{
		var taskName = $("#new-task-name").val();
		if(taskName)
		{
			addTaskElement(taskName);
			$("#new-task-name").val("").focus();
		}
	}
	
	function addTaskElement(taskName)
	{
		 var $task = $("task-template .task").clone();
		 $("span.task-name",$task).text(taskName);
		 
		 $("task-list").append($task);
		 
		 $("button.delete", $task).click(function(){$task.remove(); });
		 $("button.move-up", $task).click(function(){$task.insertBefore($tasl.prev()) });
		 $("button.move-down", $task).click(function(){$task.insertAfter($tasl.next()) });
		 
		 $("span.task-name", $task).click(function()
		 {
			 onEditTaskName($(this)); 
			 
			 function onEditTaskName($span)
			 {
				 $span.hide()
					.siblings("input.task-name")
					.val($span.text())
					.show()
					.focus();
			 }
		 });
		 
		 $("input.task-name", $task).change(function() 
		 {
			 onChangeTaskName($(this));
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
		 });
		 
		 $("input.task-name", $task).change(function() 
		 { 
			onChangeTaskName($(this)); 
		}).blur(function() 
		{
			$(this).hide().siblings("span.task-name").show();
		});
		 
	}
}
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});