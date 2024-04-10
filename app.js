const title = document.getElementById("title");
const description = document.getElementById("description")
const form = document.querySelector("form");
const container = document.querySelector(".container");

const task = localStorage.getItem("tasks")? JSON.parse(localStorage.getItem("tasks")):[];

showalltsk();

function showalltsk() {
	task.forEach((value,index)=>{
		const div = document.createElement("div")
		div.setAttribute("class","task")

		const inerdiv = document.createElement("div")
		div.append(inerdiv)

		const p = document.createElement("p")
		p.innerText = value.title
		inerdiv.append(p)
		
		const span = document.createElement("span")
		span.innerText = value.description;
		inerdiv.append(span);

		const btn = document.createElement("button")
		btn.setAttribute("class","delbtn")
		btn.innerText = "-";
		div.append(btn)

		btn.addEventListener("click",()=>{
			removtask()
			task.splice(index,1)
			localStorage.setItem("tasks",JSON.stringify(task));
			showalltsk()
		})
		container.append(div)
	})
}
function removtask(){
	task.forEach(()=>{
		const div = document.querySelector(".task")
		div.remove();
	})
}
form.addEventListener("submit", (e)=>{
	e.preventDefault();
	removtask();
	task.push({
		title: title.value,
		description: description.value,
	});
	localStorage.setItem("tasks",JSON.stringify(task));
	showalltsk();
})