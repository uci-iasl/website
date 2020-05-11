'use strict';

const bib = {
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

	initEntryButtons(entryElem) {
		let etalButtons = entryElem.querySelectorAll(bib.entryEtalButtonsSelector);
		for (let etalButton of etalButtons) {
			etalButton.onclick = bib.displayEtAlNames;
			let etalElem = etalButton.parentNode;
			if (etalElem.classList.contains(bib.entryEtAlContainerClass)) {
				etalButton.bibEtalContentElem = etalElem.querySelector(bib.entryEtAlContentSelector);
			}
		}

		let appendixElem = entryElem.querySelector(bib.entryAppendixSelector);
		let abstractItemElem = null;
		let bibtexItemElem = null;
		if (appendixElem) {
			abstractItemElem = appendixElem.querySelector(bib.entryAbstractSelector);
			bibtexItemElem = appendixElem.querySelector(bib.entryBibtexSelector);
		}

		let abstractButton = entryElem.querySelector(bib.entryAbstractButtonSelector);
		if (abstractButton) {
			abstractButton.onclick = bib.toggleAppendixItemDisplay;
			abstractButton.bibAppendixItemElem = abstractItemElem;
		}

		let bibtexButton = entryElem.querySelector(bib.entryBibtexButtonSelector);
		if (bibtexButton) {
			bibtexButton.onclick = bib.toggleAppendixItemDisplay;
			bibtexButton.bibAppendixItemElem = bibtexItemElem;
		}
	},

	collectEntryInfo(entryElem) {
		let fieldElems = entryElem.querySelectorAll(bib.entryFieldsSelector);
		let values = [];
		for (let fieldElem of fieldElems) {
			values.push(fieldElem.innerText.toLowerCase());
		}

		let kind = entryElem.getAttribute(bib.entryKindAttrName);
		let category = bib.entryKindCategoryMap[kind] || bib.entryCategoryOther;

		return {
			element: entryElem,
			category: category,
			values: values,
		};
	},

	initInteractiveFeatures() {
		let sectionElem = document.querySelector(bib.sectionSelector);
		let groupElems = sectionElem.querySelectorAll(bib.sectionGroupsSelector);
		let groups = [];
		for (let groupElem of groupElems) {
			let entryElems = groupElem.querySelectorAll(bib.groupEntriesSelector);
			let entries = [];
			for (let entryElem of entryElems) {
				bib.initEntryButtons(entryElem);
				entries.push(bib.collectEntryInfo(entryElem));
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

	entryMatchesQuery(entry, query) {
		let hasCatSel = (query.category !== bib.entryCategoryAll);
		if (hasCatSel && entry.category !== query.category) return false;
		for (let word of query.words) {
			let found = false;
			for (let value of entry.values) {
				if (value.indexOf(word) !== -1) {
					found = true;
					break;
				}
			}
			if (!found) return false;
		}
		return true;
	},

	filterEntries() {
		let query = {
			words: bib.filterInputElem.value.toLowerCase().split(/\s+/),
			category: bib.filterSelectElem.value,
		};
		if (query.category === bib.entryCategoryAll) {
			bib.filterSelectElem.classList.add(bib.filterSelectInactiveClass);
		} else {
			bib.filterSelectElem.classList.remove(bib.filterSelectInactiveClass);
		}
		let totalVisible = 0;
		for (let group of bib.entryGroups) {
			let groupVisible = 0;
			for (let entry of group.entries) {
				let matched = bib.entryMatchesQuery(entry, query);
				entry.element.style.display = (matched ? 'list-item' : 'none');
				groupVisible += matched;
			}
			group.element.style.display = (groupVisible > 0 ? 'block' : 'none');
			totalVisible += groupVisible;
		}
		bib.noMatchGroup.style.display = (totalVisible > 0 ? 'none' : 'block');
	},

	toggleAppendixItemDisplay(event) {
		let button = event.currentTarget;
		let itemElem = button.bibAppendixItemElem;
		if (!itemElem) return;
		if (!itemElem.style.display || itemElem.style.display === 'none') {
			button.classList.remove(bib.entryButtonCollapsedClass);
			button.classList.add(bib.entryButtonExpandedClass);
			itemElem.style.display = 'block';
		} else {
			button.classList.remove(bib.entryButtonExpandedClass);
			button.classList.add(bib.entryButtonCollapsedClass);
			itemElem.style.display = 'none';
		}
	},

	displayEtAlNames(event) {
		let button = event.currentTarget;
		let contentElem = button.bibEtalContentElem;
		if (!contentElem) return;
		contentElem.style.display = 'inline';
		button.style.display = 'none';
	},
};

if (document.readyState === 'complete') {
	bib.initInteractiveFeatures();
} else {
	window.addEventListener('DOMContentLoaded', bib.initInteractiveFeatures);
}
