import { createContext, useEffect, useState, useMemo } from "react";
import mm_data from "../lang/mm";
import en_data from "../lang/en";

const LanguageContext = createContext({
    updateLanguage: () => { },
    content: null,
});

const LanguageContextProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [content, setContent] = useState(en_data);

    useEffect(() => {
        const lan = localStorage.getItem("lan");
        if (lan) {
            setLanguage(lan);
        } else {
            setLanguage("en");
        }
    }, []);

    const updateLanguage = (newLanguage) => {
        if (newLanguage !== language) {
            localStorage.setItem("lan", newLanguage);
            setLanguage(newLanguage);
        }
    };

    useEffect(() => {
        if (language === "mm") {
            setContent(mm_data);
        }else {
            setContent(en_data);
        }
    }, [language]);

    const value = useMemo(
        () => ({
            lan: language,
            content: content,
            updateLanguage,
        }),
        [language, content]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext, LanguageContextProvider };
