import useSWR from "swr";

export const getBibleTranslation = () => {
    //https://bible.helloao.org/api/available_translations.json
    try{const res = fetch(`https://bible.helloao.org/api/available_translations.json`)
    return res;
    }
    catch(res){
        return null;
    }
}