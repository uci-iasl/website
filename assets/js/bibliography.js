'use strict';

var bib = {
	sectionSelector: 'section.bibliography',
	sectionGroupsSelector: '.group',
	groupEntriesSelector: 'ul.bibliography > li',
	entryFieldsSelector: [
		'.authors-index', '.editors-index',
		'.title', '.journal', '.booktitle', '.series',
		'.organization', '.institution', '.school',
		'.publisher', '.address', '.date',
		'.note', '.keywords-index',
	].join(','),

	entryEtalButtonsSelector: [
		'.authors .etal a[role=button]',
		'.editors .etal a[role=button]',
	].join(','),
	entryAbstractButtonSelector: '.extras > .abstract a[role=button]',
	entryBibtexButtonSelector: '.extras > .bibtex a[role=button]',

	sectionNoMatchGroupSelector: '#ctl-bib-section-no-match',
	sectionFilterInputSelector: '#ctl-bib-filter-input',
	sectionFilterSelectSelector: '#ctl-bib-filter-selection',
	filterSelectInactiveClass: 'inactive',

	entryKindAttrName: 'data-bib-kind',
	entryKindCategoryMap: {
		book: 'books',
		inbook: 'books',
		incollection: 'books',
		proceedings: 'conferences',
		inproceedings: 'conferences',
		conference: 'conferences',
		article: 'journals',
	},
	entryCategoryAll: 'all',
	entryCategoryOther: 'other',

	entryContentClass: 'bibentry',
	entryAppendixSelector: '.appendix',
	entryAbstractSelector: '.abstract',
	entryBibtexSelector: '.bibtex',
	entryButtonCollapsedClass: 'collapsed',
	entryButtonExpandedClass: 'expanded',

	entryEtAlContainerClass: 'etal',
	entryEtAlContentSelector: '.content',

	initInteractiveFeatures: function() {
		var sectionElem = document.querySelector(bib.sectionSelector);
		var groupElems = sectionElem.querySelectorAll(bib.sectionGroupsSelector);
		var groups = [];
		for (var groupElem of groupElems) {
			var entryElems = groupElem.querySelectorAll(bib.groupEntriesSelector);
			var entries = [];
			for (var entryElem of entryElems) {
				var etalButtons = entryElem.querySelectorAll(bib.entryEtalButtonsSelector);
				for (var etalButton of etalButtons)
					etalButton.onclick = bib.displayEtAlNames;

				var abstractButton = entryElem.querySelector(bib.entryAbstractButtonSelector);
				if (abstractButton) abstractButton.onclick = bib.toggleAbstractDisplay;

				var bibtexButton = entryElem.querySelector(bib.entryBibtexButtonSelector);
				if (bibtexButton) bibtexButton.onclick = bib.toggleBibtexDisplay;

				var fieldElems = entryElem.querySelectorAll(bib.entryFieldsSelector);
				var values = [];
				for (var fieldElem of fieldElems)
					values.push(fieldElem.innerText.toLowerCase());

				var kind = entryElem.getAttribute(bib.entryKindAttrName);
				var category = bib.entryCategoryOther;
				if (kind in bib.entryKindCategoryMap)
					category = bib.entryKindCategoryMap[kind];

				entries.push({
					element: entryElem,
					category: category,
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
		var hasCatSel = (query.category != bib.entryCategoryAll);
		if (hasCatSel && entry.category != query.category) return false;
		for (var word of query.words) {
			var found = false;
			for (var value of entry.values) {
				if (value.indexOf(word) != -1) {
					found = true;
					break;
				}
			}
			if (!found) return false;
		}
		return true;
	},

	filterEntries: function() {
		var query = {
			words: bib.filterInputElem.value.toLowerCase().split(/\s+/),
			category: bib.filterSelectElem.value,
		};
		if (query.category == bib.entryCategoryAll) {
			bib.filterSelectElem.classList.add(bib.filterSelectInactiveClass);
		} else {
			bib.filterSelectElem.classList.remove(bib.filterSelectInactiveClass);
		}
		var totalVisible = 0;
		for (var group of bib.entryGroups) {
			var groupVisible = 0;
			for (var entry of group.entries) {
				var matched = bib.entryMatchesQuery(entry, query);
				entry.element.style.display = (matched ? 'list-item' : 'none');
				groupVisible += matched;
			}
			group.element.style.display = (groupVisible > 0 ? 'block' : 'none');
			totalVisible += groupVisible;
		}
		bib.noMatchGroup.style.display = (totalVisible > 0 ? 'none' : 'block');
	},

	toggleAppendixDisplay: function(button, appendixItemSelector) {
		var entry = button;
		while (entry && (!entry.classList.contains(bib.entryContentClass) || !entry.id))
			entry = entry.parentNode;
		if (!entry) return;
		var appendix = entry.querySelector(bib.entryAppendixSelector);
		if (!appendix) return;
		var elem = appendix.querySelector(appendixItemSelector);
		if (!elem) return;

		if (!elem.style.display || elem.style.display == 'none') {
			button.classList.remove(bib.entryButtonCollapsedClass);
			button.classList.add(bib.entryButtonExpandedClass);
			elem.style.display = 'block';
		} else {
			button.classList.remove(bib.entryButtonExpandedClass);
			button.classList.add(bib.entryButtonCollapsedClass);
			elem.style.display = 'none';
		}
	},

	toggleAbstractDisplay: function(event) {
		return bib.toggleAppendixDisplay(event.currentTarget, bib.entryAbstractSelector);
	},

	toggleBibtexDisplay: function(event) {
		return bib.toggleAppendixDisplay(event.currentTarget, bib.entryBibtexSelector);
	},

	displayEtAlNames: function(event) {
		var button = event.currentTarget;
		var etal = button.parentNode;
		if (!etal || !etal.classList.contains(bib.entryEtAlContainerClass)) return;
		var etalContent = etal.querySelector(bib.entryEtAlContentSelector);
		if (!etalContent) return;
		etalContent.style.display = 'inline';
		button.style.display = 'none';
	},
};

if (document.readyState == 'complete') {
	bib.initInteractiveFeatures();
} else {
	window.addEventListener('DOMContentLoaded', bib.initInteractiveFeatures);
}
