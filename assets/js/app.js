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
		card.innerHTML = `<div class="card-title">${item.title}</div>
		<div class="card-content">${noteContent}</div>
		<div class="card-content">${item.dcreation}</div>
		<div><a class="card-modify" data-key="${key}" href="#">Modify</a> <a class="card-delete" data-key="${key}" href="#">Delete</a></div>`;

		history.appendChild(card);
	}

	let cardDelete = document.querySelectorAll(".card-delete");
	for(i=0; i<cardDelete.length; i++){
		cardDelete[i].addEventListener('click', noteDelete);
	}

	let cardModify = document.querySelectorAll(".card-modify");
	for(i=0; i<cardModify.length; i++){
		cardModify[i].addEventListener('click', noteModify);
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
	var dcreation = new Date();
	var id = dcreation.getTime();

	inputKey.dataset.key = id;
	inputKey.dataset.date = dcreation;

	timer = setInterval(autosave, 1000);

	inputContent.removeEventListener("input", idNote);
}

function noteModify(key){
	inputContent.removeEventListener("input", idNote);

	if(typeof timer !== 'undefined'){
		clearInterval(timer);
	}

	let cardKey = this.dataset.key;
	inputKey.dataset.key = cardKey;

	let item = JSON.parse(localStorage.getItem(cardKey));
	inputTitle.value = item.title;
	inputContent.value = item.content;
	inputKey.dataset.date = item.dcreation;

	inputContent.addEventListener("input", autosave);
}

function noteDelete(key){
	let cardKey = this.dataset.key;
	if(cardKey == inputKey.dataset.key){
		clearInterval(timer);

		delete(inputKey.dataset.key);
		delete(inputKey.dataset.date);
		inputTitle.value = "";
		inputContent.value = "";
	}

	localStorage.removeItem(cardKey);
}

function noteClear(){
	if(typeof timer !== 'undefined'){
		clearInterval(timer);
	}

	inputKey.removeAttribute("data-key");
	inputKey.removeAttribute("data-date");
	inputTitle.value = "";
	inputContent.value = "";

	inputContent.addEventListener("input", idNote);
}

inputContent.addEventListener("input", idNote);

noteNew.addEventListener("click", noteClear);

allNotes();

setInterval(allNotes, 1000);

})();
