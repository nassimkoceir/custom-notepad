(() => {

let inputKey = document.getElementById("key");
let inputTitle = document.getElementById("title");
let inputContent = document.getElementById("content");

function autosave(dcreation, id){
	console.log(dcreation);
	console.log(id);
	console.log(inputContent.value);
}

function idNote(){
	let dcreation = new Date();
	let id = Math.round(Math.random() * dcreation.getTime());

	inputKey.dataset.key = id;
	inputKey.dataset.date = dcreation;

	inputContent.removeEventListener("input", idNote);

	setInterval(autosave(dcreation, id), 10000);
}

inputContent.addEventListener("input", idNote);

})();
