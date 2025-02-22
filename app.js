const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const tasksContainer = document.getElementById("tasks-container");

const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

showAllTasks();

function showAllTasks() {
	tasksContainer.innerHTML = '';
	tasks.forEach((task, index) => {
		const div = document.createElement("div");
		div.setAttribute("class", "task animate-scale");

		const innerDiv = document.createElement("div");
		innerDiv.setAttribute("class", "task-content");
		div.append(innerDiv);

		const h3 = document.createElement("h3");
		h3.setAttribute("class", "task-title");
		h3.innerText = task.title;
		innerDiv.append(h3);

		const p = document.createElement("p");
		p.setAttribute("class", "task-description");
		p.innerText = task.description;
		innerDiv.append(p);

		const actionsDiv = document.createElement("div");
		actionsDiv.setAttribute("class", "task-actions");
		innerDiv.append(actionsDiv);

		const completeBtn = document.createElement("button");
		completeBtn.setAttribute("class", "btn-complete animate-hover");
		completeBtn.innerHTML = '<i class="fas fa-check"></i>';
		actionsDiv.append(completeBtn);

		const editBtn = document.createElement("button");
		editBtn.setAttribute("class", "btn-edit animate-hover");
		editBtn.innerHTML = '<i class="fas fa-pen"></i>';
		actionsDiv.append(editBtn);

		const deleteBtn = document.createElement("button");
		deleteBtn.setAttribute("class", "btn-delete animate-hover");
		deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
		actionsDiv.append(deleteBtn);

		completeBtn.addEventListener("click", () => {
			div.classList.toggle("completed");
		});

		editBtn.addEventListener("click", () => {
			title.value = task.title;
			description.value = task.description;
			tasks.splice(index, 1);
			localStorage.setItem("tasks", JSON.stringify(tasks));
			showAllTasks();
		});

		deleteBtn.addEventListener("click", () => {
			div.classList.add("animate-fade-out");
			setTimeout(() => {
				tasks.splice(index, 1);
				localStorage.setItem("tasks", JSON.stringify(tasks));
				showAllTasks();
			}, 300);
		});

		tasksContainer.append(div);
	});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	
	tasks.push({
		title: title.value,
		description: description.value,
	});
	
	localStorage.setItem("tasks", JSON.stringify(tasks));
	showAllTasks();
	
	title.value = "";
	description.value = "";
});
