"use strict";

var bib = {
	sectionSelector: "section.bibliography",
	sectionGroupsSelector: ".group",
	sectionNoMatchGroupSelector: "#ctl-bib-group-no-match",
	groupEntriesSelector: "ul.bibliography>li",
	entryFieldsSelector: [
		".authors-index", ".editors-index",
		".title", ".journal", ".booktitle", ".series",
		".organization", ".institution", ".school",
		".publisher", ".address", ".date",
		".note", ".keywords-index",
	].join(","),
	sectionFilterInputSelector: "#ctl-bib-filter-input",
	sectionFilterSelectSelector: "#ctl-bib-filter-selection",
	filterSelectInactiveClass: "inactive",

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
		bib.noMatchGroup = sectionElem.querySelector(bib.sectionNoMatchGroupSelector);

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
		if (query.selection == bib.entrySelectionTagAll) {
			bib.filterSelectElem.classList.add(bib.filterSelectInactiveClass);
		} else {
			bib.filterSelectElem.classList.remove(bib.filterSelectInactiveClass);
		}
		var totalVisible = 0;
		for (var group of bib.entryGroups) {
			var groupVisible = 0;
			for (var entry of group.entries) {
				var matched = bib.entryMatchesQuery(entry, query);
				entry.element.style.display = (matched ? "list-item" : "none");
				groupVisible += matched;
			}
			group.element.style.display = (groupVisible > 0 ? "block" : "none");
			totalVisible += groupVisible;
		}
		bib.noMatchGroup.style.display = (totalVisible > 0 ? "none" : "block");
	displayEtAlNames: function(button) {
		var etalElem = button.parentNode;
		if (!etalElem || !etalElem.classList.contains("etal")) return;
		var etalContainer = etalElem.querySelector(".container");
		if (!etalContainer) return;
		etalContainer.style.display = "inline";
		button.style.display = "none";
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
