const container = document.getElementById("container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const loader = document.getElementById("loader");

// get the quotes for API

let quotes = [];

async function getQuotes() {
	// shows loading if not quote appears
	showLoading();
	const URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

	try {
		const response = await fetch(URL);
		quotes = await response.json();
		hideLoading();
		getRandomQuote();
		tweet();
	} catch (error) {
		console.log(error);
	}
}

// ---------------------------------------------------------------------------------

// get random quote from api and add it to screen

function getRandomQuote() {
	showLoading();
	// get random guote
	const quote = quotes[Math.floor(Math.random() * quotes.length)];

	// check if author is unknown

	!quote.author
		? (authorText.textContent = "Unknown")
		: (authorText.textContent = quote.author);

	//check if quote is too long
	quote.text.length > 50
		? quoteText.classList.add("long-quote")
		: quoteText.classList.remove("long-quote");
	quoteText.textContent = quote.text;
	hideLoading();
}

// ---------------------------------------------------------------------------------

// handle click events

function generateNewQuote() {
	const newQuoteButton = document.getElementById("new-quote");

	newQuoteButton.onclick = () => {
		getRandomQuote();
	};
}

function tweet() {
	const twitterButton = document.getElementById("x");
	const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

	//allows user to tweet that quote

	twitterButton.onclick = () => {
		window.open(twitterURL, "_blank");
	};
}

// show loading state

function showLoading() {
	loader.hidden = false;
	container.hidden = true;
}

// hide loading state
function hideLoading() {
	loader.hidden = true;
	container.hidden = false;
}

// ---------------------------------------------------------------------------------

// calling functions

getQuotes();
generateNewQuote();
