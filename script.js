async function fetchTasks() {
  const response = await fetch("http://localhost:5000/tasks");
  const tasks = await response.json();

  document.getElementById("task-list").innerHTML = tasks
    .map(
      (task) => `
        <div class="task">
            <h3>${task.titre} (${task.priorite})</h3>
            <p>${task.description}</p>
            <p><strong>Statut :</strong> ${task.statut}</p>
            <p><strong>Échéance :</strong> ${new Date(
              task.echeance
            ).toLocaleDateString()}</p>
        </div>
    `
    )
    .join("");
}

fetchTasks();
