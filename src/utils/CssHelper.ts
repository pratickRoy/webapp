export default class CssHelper {

    // Todo : Find a more elegant implementation
    static getCssClassName(...cssClasses: (string[] | string | undefined | (string | undefined)[])[]) : string {

        let cssClassName = "";
        for (let i = 0; i < cssClasses.length; i++) {

            if (typeof cssClasses[i] === "string") {
                cssClassName += " " + cssClasses[i]
            } else {
                cssClassName += " " + (cssClasses[i] as Array<String>).join(" ")
            }

        }

        return cssClassName;
    }
}