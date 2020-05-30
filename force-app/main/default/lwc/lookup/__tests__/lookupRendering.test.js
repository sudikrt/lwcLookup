import { createElement } from 'lwc';
import Lookup from 'c/lookup';

const SAMPLE_SEARCH_ITEMS = [
    {
        id : 'id1',
        icon : 'standard:default',
        title : 'Sample item 1',
        subtitle : 'sub1'
    },
    {
        id : 'id2',
        icon : 'standard:default',
        title : 'Sample item 2',
        subtitle : 'sub2'
    }
];
describe ('c-lookup event handling', () => {
    afterEach (() => {
        while (document.body.firstChild) {
            document.body.removeChild (document.body.firstChild);
        }
    });
    it ('show not result by default', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        document.body.appendChild (element);

        //Query for endered list
        const listElems = element.shadowRoot.querySelectorAll ('li');
        expect (listElems.length).toBe (1);
        expect (listElems[0].textContent).toBe ('No results.');
    });

    it ('reders label', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.label = 'Sample Lookup';
        document.body.appendChild (element);

        // Verify label
        const detailEl = element.shadowRoot.querySelector('label');
        expect(detailEl.textContent).toBe('Sample Lookup');
    });

    it ('does not render label if ommited', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.label = '';
        document.body.appendChild (element);

        const detailEl = element.shadowRoot.querySelector('label');
        expect(detailEl).toBe(null);
    });

    it ('render single entry (no selection)', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.isMultiEntry = false;
        document.body.appendChild(element);

        //verify selected icon
        const selIcon = element.shadowRoot.querySelector('lightning-icon');
        expect(selIcon.alternativeText).toBe('Selected item icon');
        // Verify clear selection button
        const clearSelButton = element.shadowRoot.querySelector('button');
        expect(clearSelButton.title).toBe('Remove selected option');
        // Verify result list is NOT rendered
        const selList = element.shadowRoot.querySelectorAll('ul.slds-listbox_inline');
        expect(selList.length).toBe(0);
    });

    it ('renders multi entry (no selection)', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.isMultiEntry = true;
        document.body.appendChild (element);

        //verify selected icon is not rendered
        const selIcon = element.shadowRoot.querySelectorAll ('lightning-icon');
        expect (selIcon.length).toBe (1);

        //verify clear selection is not rendered
        const clearSelection = element.shadowRoot.querySelectorAll ('button');
        expect (clearSelection.length).toBe (0);

        //verify result is renderd
        const selList = element.shadowRoot.querySelectorAll ('ul.slds-listbox_inline');
        expect (selList.length).toBe (1);
    });

    it ('render title on selection', () => {
        const element = createElement ('c-lookup', {
            is: Lookup
        });
        element.isMultiEntry = false;
        element.selection = [SAMPLE_SEARCH_ITEMS [0]];
        document.body.appendChild(element);

        const inputBox = element.shadowRoot.querySelector ('input');
        expect (inputBox.title).toBe (SAMPLE_SEARCH_ITEMS[0].title);
    });

    it ('render title on selection of multi select', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.isMultiEntry = true;
        element.selection = SAMPLE_SEARCH_ITEMS;
        document.body.appendChild (element);

        const inputBox = element.shadowRoot.querySelector ('input');
        expect (inputBox.title).toBe ('');

        const selPills = element.shadowRoot.querySelectorAll ('lightning-pill');
        expect (selPills.length).toBe (SAMPLE_SEARCH_ITEMS.length);
        expect (selPills[0].title).toBe (SAMPLE_SEARCH_ITEMS[0].title);
        expect (selPills[1].title).toBe (SAMPLE_SEARCH_ITEMS[1].title);
    });

    it ('renders errors', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.errors = [
            { id: 'e1', message: 'Sample error 1' },
            { id: 'e2', message: 'Sample error 2' }
        ];
        document.body.appendChild (element);

        //verify errors
        const errors = element.shadowRoot.querySelectorAll ('label.form-error');
        expect (errors.length).toBe(2);
        expect (errors[0].textContent).toBe('Sample error 1');
    });
});