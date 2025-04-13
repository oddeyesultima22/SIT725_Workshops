document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      const tasks = await res.json();
  
      taskList.innerHTML = tasks.length
        ? tasks.map(task =>
            `<li>
              ${task.text}
              <button onclick="deleteTask(${task.id})">Delete</button>
            </li>`
          ).join('')
        : '<li>No tasks yet.</li>';
    };
  
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (!task) return;
  
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
      });
  
      taskInput.value = '';
      fetchTasks();
    });
  
    // Make delete function globally accessible
    window.deleteTask = async (id) => {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    };
  
    fetchTasks();
  });
  