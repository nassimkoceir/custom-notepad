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

let history = document.getElementById("history");

function allNotes(){
	history.innerHTML = "";
	for (var i = 0; i < localStorage.length; i++){
	    let card = document.createElement("div")
		let key = parseInt(localStorage.key(i));
		let item = JSON.parse(localStorage.getItem(key));

		card.innerHTML = ${item.title} ${item.content};

		history.appendChild(p);
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

	setInterval(autosave, 1000);

	inputContent.removeEventListener("input", idNote);
}

inputContent.addEventListener("input", idNote);

allNotes();

setInterval(allNotes, 5000);

})();
