"use strict";

var bib = {
	sectionSelector: "section.bibliography",
	sectionGroupsSelector: ".group",
	groupEntriesSelector: "ul.bibliography>li",
	entryFieldsSelector: [
		".authors", ".editors",
		".title", ".journal", ".booktitle", ".series",
		".organization", ".institution", ".school",
		".publisher", ".address", ".date",
		".note",
	].join(","),
	filterInputSelector: "input.filter",

	initEntryTextFilter: function() {
		var sectionElem = document.querySelector(bib.sectionSelector);
		var groupElems = sectionElem.querySelectorAll(bib.sectionGroupsSelector);
		var groups = [];
		for (var groupElem of groupElems) {
			var entryElems = groupElem.querySelectorAll(bib.groupEntriesSelector);
			var entries = [];
			for (var entryElem of entryElems) {
				var fieldElems = entryElem.querySelectorAll(bib.entryFieldsSelector);
				var values = [];
				for (var fieldElem of fieldElems)
					values.push(fieldElem.innerText.toLowerCase());
				entries.push({
					element: entryElem,
					values: values,
				});
			}
			groups.push({
				element: groupElem,
				entries: entries,
			});
		}
		bib.entryGroups = groups;

		bib.filterInputElem = sectionElem.querySelector(bib.filterInputSelector)
		bib.filterInputElem.oninput = bib.filterEntries
	},

	doStringsMatch: function(strings, queryWords) {
		for (var qw of queryWords) {
			var found = false;
			for (var str of strings) {
				if (str.indexOf(qw) != -1) {
					found = true;
					break;
				}
			}
			if (!found)
				return false;
		}
		return true;
	},

	filterEntries: function() {
		var queryWords = bib.filterInputElem.value.toLowerCase().split(/\s+/);
		for (var group of bib.entryGroups) {
			var numVisible = group.entries.length
			for (var item of group.entries) {
				var matched = bib.doStringsMatch(item.values, queryWords);
				item.element.style.display = (matched ? "list-item" : "none");
				numVisible -= !matched;
			}
			group.element.style.display = (numVisible > 0 ? "block" : "none");
		}
	},

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
	},
}

window.onload = bib.initEntryTextFilter;
