import { mount } from "@vue/test-utils";
import InfiniteScroll from "../../src/components/common/InfiniteScroll.vue"
import { nextTick } from "vue";


describe('InfiniteScroll.vue', () => {
    let fetchDataMock: jest.Mock;

    beforeEach(() => {
        fetchDataMock = jest.fn();
    })

    it('должен вызывать fetchData при скролле вниз', async () => {
        const wrapper=mount(InfiniteScroll, {
            props: {
                fetchData: fetchDataMock
            },
            slots: {
                default: '<div style="height: 2000px;"></div>' 
            }
        });

        const scrollContainer = wrapper.find('.infinite-scroll')
        scrollContainer.element.scrollTop = scrollContainer.element.scrollHeight

        await nextTick()

        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);

        expect(fetchDataMock).toHaveBeenCalled()
    })
})