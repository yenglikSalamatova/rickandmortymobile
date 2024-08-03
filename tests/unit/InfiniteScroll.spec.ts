import { shallowMount } from "@vue/test-utils";
import InfiniteScroll from "../../src/components/common/InfiniteScroll.vue"


describe('InfiniteScroll.vue', () => {
    let fetchDataMock: jest.Mock;

    beforeEach(() => {
        fetchDataMock = jest.fn();
    })

    it('должен вызывать fetchData при скролле вниз', async () => {
        shallowMount(InfiniteScroll, {
            props: {
                fetchData: fetchDataMock
            }
        });
        // Начальные значения
        Object.defineProperty(document.documentElement, 'scrollTop', {
            writable: true,
            value: 0
        });
        Object.defineProperty(document.documentElement, 'clientHeight', {
            writable: true,
            value: 100
        });
        Object.defineProperty(document.documentElement, 'scrollHeight', {
            writable: true,
            value: 120
        });

        const scrollEvent = new Event('scroll');
        document.dispatchEvent(scrollEvent);

        expect(fetchDataMock).toHaveBeenCalled()
    })
})