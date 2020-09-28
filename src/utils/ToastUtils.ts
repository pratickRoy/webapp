import {ToastOptions} from "react-toastify/dist/types";

export default class PredicateUtils {

    static buildToastOptions(defaultToastOptions : ToastOptions,
                             toastId? : String) {

        return Object.assign(
            {
                toastId : toastId
            },
            defaultToastOptions
        )
    }
}