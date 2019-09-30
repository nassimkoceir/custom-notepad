(() => {
class Note {
    constructor(creation, title, content) {
        this.creation = creation;
        this.title = title;
		this.content = content;
    }
}

let inputKey = document.getElementById("key");
let inputTitle = document.getElementById("title");
let inputContent = document.getElementById("content");
let noteNew = document.getElementById("new-note");

let history = document.getElementById("history");

function allNotes(){
	history.innerHTML = "";
	for (var i = 0; i < localStorage.length; i++){
	    let card = document.createElement("div");
		let key = parseInt(localStorage.key(i));
		let item = JSON.parse(localStorage.getItem(key));

		let noteContent = item.content;
		noteContent = noteContent.substring(0, 49);

		card.setAttribute("class", "card");
		card.innerHTML = `<div class="card-title">${item.title}</div><div class="card-content">${noteContent}</div> <a class="card-delete" data-key="${key}" href="#">Delete</a>`;

		history.appendChild(card);
	}

	let cardEvent = document.querySelectorAll(".card-delete");
	for(i=0; i<cardEvent.length; i++){
		cardEvent[i].addEventListener('click', noteDelete);
	}
}

function autosave(){
	let id = inputKey.dataset.key;
	let dcreation = inputKey.dataset.date;
	let title = inputTitle.value;
	let content = inputContent.value;

	let note = new Note(dcreation, title, content);
	localStorage.setItem(id, JSON.stringify(note));
}

function idNote(){
	let dcreation = new Date();
	let id = dcreation.getTime();

	inputKey.dataset.key = id;
	inputKey.dataset.date = dcreation;

	timer = setInterval(autosave, 1000);

	inputContent.removeEventListener("input", idNote);
}

function noteDelete(key){
	let cardKey = this.dataset.key;
	if(cardKey == inputKey.dataset.key){
		clearInterval(timer);
		
		delete(inputKey.dataset.key);
		inputTitle.value = "";
		inputContent.value = "";
	}
	localStorage.removeItem(cardKey);
}

function noteClear(){
	clearInterval(timer);

	inputKey.removeAttribute("data-key");
	inputTitle.value = "";
	inputContent.value = "";

	inputContent.addEventListener("input", idNote);
}

inputContent.addEventListener("input", idNote);

noteNew.addEventListener("click", noteClear);

allNotes();

setInterval(allNotes, 1000);

})();
