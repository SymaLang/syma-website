export const customEffects = {
    'CustomEffects/PageTitle': async (req, helpers) => {
        const { Call, Sym, isSym, isStr, Str, Num, jsToSymbolic, symbolicToJs, platform } =
            helpers;

        let [id, title] = req.a;

        title = isStr(title) ? title.v : 'Default Title';

        document.title = title;
        let titleTag = document.querySelector('head > title');
        if (!titleTag) {
            titleTag = document.createElement('title');
            document.head.appendChild(titleTag);
        }
        titleTag.textContent = title;

        return Call(Sym('PageTitleComplete'), Str(title));
    }
};