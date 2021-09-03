let review = document.getElementById("review");
let deploy = document.getElementById("deploy");

review.addEventListener("click", async () => {
	  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	  let message = chrome.scripting.executeScript({target: { tabId: tab.id },function: getReviewMessage,}, function (result) {document.getElementById("message-input").value = result[0].result});
});
deploy.addEventListener("click", async () => {
	  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	  let message = chrome.scripting.executeScript(
		  {target: { tabId: tab.id },function: getDeployMessage},
		  function (result) {
			  let text = result[0].result
			  text = text.replace('{{version}}', document.getElementById("version").value);
			  document.getElementById("message-input").value = text;
		  });
});

function getDeployMessage() {
	let name = document.getElementsByClassName("css-atqsw9 edzl37l0")[0].innerText;
	let ticket = name.match('(EW-)[0-9]*');
	let text = name.match('(:.*)');
	console.log(name);
	console.log(ticket);
	console.log(text);
	return ":euronews: MEP `{{version}}` -> *" + ticket[0] + text[0] + "*";
}

function getReviewMessage() {
	let name = document.getElementsByClassName("css-atqsw9 edzl37l0")[0].innerText;
	let url = window.location.href
	return name + "\n" + url
}

