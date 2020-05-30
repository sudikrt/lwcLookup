import { createElement } from 'lwc';
import Lookup from 'c/lookup';

const SAMPLE_SEARCH_RAW = 'Sample Search* ';
const SAMPLE_SEARCH_CLEAN  = 'sample search';
const SAMPLE_SEARCH_ITEMS = [
    {
        id : 'id1',
        icon : 'standard:default',
        title : 'Sample item 1',
        subtitle : 'Sub 1'
    },
    {
        id : 'id2',
        icon : 'standard:default',
        title : 'Sample item 2',
        subtitle : 'Sub 2'
    }
];

describe ('c-lookup event fires', () => {
    afterEach ( () => {
        while (document.body.firstChild) {
            document.body.removeChild (document.body.firstChild);
        }
    });

    it ('search event fires', () => {
        jest.useFakeTimers ();

        //Create element with mock search handler
        const mockSearchFn = jest.fn ();
        const element = createElement ('c-lookup', {
            is : Lookup
        });
        element.addEventListener ('search',mockSearchFn);
        element.isMultiEntry = true;
        element.selection = SAMPLE_SEARCH_ITEMS;
        document.body.appendChild (element);

        //set searchTerm and force input change
        const searchInput = element.shadowRoot.querySelector ('input');
        searchInput.value = SAMPLE_SEARCH_RAW;
        searchInput.dispatchEvent(new CustomEvent('input'));

        //Disable search throtteling
        jest.runAllTimers ();

        //check fired event
        expect (mockSearchFn).toHaveBeenCalledTimes (1);
        const searchEvent = mockSearchFn.mock.calls [0][0];
        expect(searchEvent.detail).toEqual({
            searchTerm: SAMPLE_SEARCH_CLEAN,
            selectedIds: ['id1', 'id2']
        });

    })
})