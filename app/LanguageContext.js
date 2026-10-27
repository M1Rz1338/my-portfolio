"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { content as allContent, sectionNav as allNav } from "@/data/resumeContent";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("ru");

    useEffect(() => {
        const savedLang = localStorage.getItem("site-lang");
        if (savedLang) {
            setLang(savedLang);
            return;
        }

        const browserLang = navigator.language || navigator.userLanguage;

        if (browserLang.toLowerCase().startsWith("ru")) {
            setLang("ru");
        } else {
            setLang("en");
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === "ru" ? "en" : "ru";
        setLang(newLang);
        localStorage.setItem("site-lang", newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, content: allContent[lang], nav: allNav[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}