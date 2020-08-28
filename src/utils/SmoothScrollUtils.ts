import $ from "jquery";

export default class SmoothScrollUtils {

    static scrollToId(id : String, onScrollCompletedCallback?: { (): void; (...args: any[]): void; }) {

        const linkedId : String = id.replace("link", "");
        const element : JQuery<HTMLElement> = $("#" + linkedId);

        // Scroll
        $('html,body').animate(
            {scrollTop: element.offset()?.top!},
            'slow',
            () => {
                if (onScrollCompletedCallback) {
                    setTimeout(onScrollCompletedCallback, 100)
                }
            }
        );
    }
}