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

    it ('handleClearSingleSelection ', () => {
        const element  = createElement ('c-lookup', {
            is : Lookup
        });
        element.isMultiEntry = false;
        element.selection = SAMPLE_SEARCH_ITEMS[0];
        document.body.appendChild (element);

        //clear selection
        const clearSelection = element.shadowRoot.querySelector ('button');
        clearSelection.click ();
        expect (element.selection.length).toBe(0);
    });
    it ('handleClearSelectedItem', () =>{
        const element = createElement ('c-lookup', {
            is: Lookup
        });
        element.isMultiEntry = true;
        element.selection = SAMPLE_SEARCH_ITEMS;
        document.body.appendChild (element);

        //remove the selected item
        const selPill = element.shadowRoot.querySelectorAll('lightning-pill');
        selPill[0].dispatchEvent(new CustomEvent('remove'));
        expect(element.selection.length).toBe(1);
    })
})