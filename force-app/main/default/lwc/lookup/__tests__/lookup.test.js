import { createElement } from 'lwc';
import Lookup from 'c/lookup';

const SAMPLE_SEARCH_ITEMS = [
    {
        id : 'id1',
        icon : 'standard:default',
        title : 'Smaple Item 1',
        subtutle : 'sub 1'
    },
    {
        id : 'id2',
        icon : 'standard:default',
        title : 'Smaple Item 2',
        subtutle : 'sub 2'
    }

]

describe('c-lookup', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('getselection returns the correct selection when initial selection is an array', () => {
        const element = createElement('c-lookup', {
            is: Lookup
        });
        element.selection = SAMPLE_SEARCH_ITEMS;
        const selection = element.getSelection ();

        expect(selection.length).toBe(2);
    });
    it ('getSelection returns correct selection when initial selection is a single Item', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.selection = SAMPLE_SEARCH_ITEMS[0];
        const selection = element.getSelection ();
        expect (selection.length).toBe (1);
    });
    it ('search result renders correct result', () => {
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.setSearchResults (SAMPLE_SEARCH_ITEMS);
        document.body.appendChild (element);

        const listElementLis = element.shadowRoot.querySelectorAll ('li');
        expect (listElementLis.length).toBe (2);
        const resultItemElements = listElementLis[0].querySelectorAll ('lightning-formatted-rich-text');
        expect (resultItemElements.length).toBe (2);
    })
});