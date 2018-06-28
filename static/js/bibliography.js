"use strict";
var bib = {
	toggleBibtexDisplay: function(button) {
		var entry = button;
		while (entry && (!entry.classList.contains("bibentry") || !entry.id))
			entry = entry.parentNode;
		if (!entry) return;

		var query = entry.tagName + ".bibentry#" + entry.id + ">.bibtex";
		var bibtex = document.querySelector(query);
		if (!bibtex) return;
		if (!bibtex.style.display || bibtex.style.display == "none") {
			button.textContent = button.textContent.replace(/^▸/, "▾");
			bibtex.style.display = "block";
		} else {
			button.textContent = button.textContent.replace(/^▾/, "▸");
			bibtex.style.display = "none";
		}
	}
}
