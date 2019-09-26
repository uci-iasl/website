"use strict";

var bib = {
	sectionSelector: "section.bibliography",
	sectionGroupsSelector: ".group",
	groupEntriesSelector: "ul.bibliography>li",
	entryFieldsSelector: [
		".authors-index", ".editors-index",
		".title", ".journal", ".booktitle", ".series",
		".organization", ".institution", ".school",
		".publisher", ".address", ".date",
		".note", ".keywords-index",
	].join(","),
	sectionFilterInputSelector: "input.filter",
	sectionFilterSelectSelector: "select.selection",

	entryKindAttrName: "data-bib-kind",
	entryKindSelectionMap: {
		book: "books",
		inbook: "books",
		incollection: "books",
		proceedings: "conferences",
		inproceedings: "conferences",
		conference: "conferences",
		article: "journals",
	},
	entrySelectionTagAll: "all",
	entrySelectionTagOther: "other",

	entryContentClass: "bibentry",
	entryBibtexClass: "bibtex",
	entryBibtexCollapsedSign: "▸",
	entryBibtexExpandedSign: "▾",

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
					kind: entryElem.getAttribute(bib.entryKindAttrName),
					values: values,
				});
			}
			groups.push({
				element: groupElem,
				entries: entries,
			});
		}
		bib.entryGroups = groups;

		bib.filterInputElem = sectionElem.querySelector(bib.sectionFilterInputSelector);
		bib.filterSelectElem = sectionElem.querySelector(bib.sectionFilterSelectSelector);
		bib.filterInputElem.oninput = bib.filterEntries;
		bib.filterSelectElem.oninput = bib.filterEntries;
	},

	entryMatchesQuery: function(entry, query) {
		if (query.selection != bib.entrySelectionTagAll) {
			var entrySel = bib.entrySelectionTagOther;
			if (entry.kind in bib.entryKindSelectionMap)
				entrySel = bib.entryKindSelectionMap[entry.kind];
			if (entrySel != query.selection)
				return false;
		}

		for (var word of query.words) {
			var found = false;
			for (var value of entry.values) {
				if (value.indexOf(word) != -1) {
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
		var query = {
			words: bib.filterInputElem.value.toLowerCase().split(/\s+/),
			selection: bib.filterSelectElem.value,
		};
		for (var group of bib.entryGroups) {
			var numVisible = group.entries.length;
			for (var entry of group.entries) {
				var matched = bib.entryMatchesQuery(entry, query);
				entry.element.style.display = (matched ? "list-item" : "none");
				numVisible -= !matched;
			}
			group.element.style.display = (numVisible > 0 ? "block" : "none");
		}
	},

	toggleBibtexDisplay: function(button) {
		var entry = button;
		while (entry && (!entry.classList.contains(bib.entryContentClass) || !entry.id))
			entry = entry.parentNode;
		if (!entry) return;

		var selector = entry.tagName + "." + bib.entryContentClass +
			"#" + entry.id + ">." + bib.entryBibtexClass;
		var bibtex = document.querySelector(selector);
		if (!bibtex) return;
		if (!bibtex.style.display || bibtex.style.display == "none") {
			button.textContent = button.textContent.replace(
				bib.entryBibtexCollapsedSign,
				bib.entryBibtexExpandedSign
			);
			bibtex.style.display = "block";
		} else {
			button.textContent = button.textContent.replace(
				bib.entryBibtexExpandedSign,
				bib.entryBibtexCollapsedSign
			);
			bibtex.style.display = "none";
		}
	},
}

window.onload = bib.initEntryTextFilter;
