(() => {

let inputKey = document.getElementById("key");
let inputTitle = document.getElementById("title");
let inputContent = document.getElementById("content");

function autosave(){
	let id
}

function idNote(){
	let dcreation = new Date();
	let id = Math.round(Math.random() * dcreation.getTime());

	inputKey.dataset.key = id;
	inputKey.dataset.date = dcreation;

	inputContent.removeEventListener("input", idNote);

	setInterval(autosave, 10000);
}

inputContent.addEventListener("input", idNote);

})();
