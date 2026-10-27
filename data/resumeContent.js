export const sectionNav = {
  ru: [
    { id: "hero", label: "Главная" },
    { id: "about", label: "Обо мне" },
    { id: "journey", label: "Карьера" },
    { id: "skills", label: "Навыки" },
    { id: "education", label: "Обучение" },
    { id: "projects", label: "Проекты" },
    { id: "contact", label: "Контакты" }
  ],
  en: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "journey", label: "Career" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ]
};

export const sectionVisibility = {
  hero: true, about: true, journey: true, skills: true, education: true,
  oss: false, projects: true, achievements: false, blogs: false, podcast: false,
  github: false, experience: false, philosophy: false, contact: true
};

export const siteMeta = {
  titleSuffix: "Junior Java Developer",
  footerTagline: "Java Backend Developer",
  description: "Junior Java Developer with a background in Law and Cybersecurity.",
  siteUrl: "https://example.com",
  locale: "en_US",
  ogImage: "/og-profile.jpg",
  keywords: ["java developer", "spring boot", "backend", "junior", "cybersecurity"],
  twitterHandle: "",
  themeColor: "#06050d"
};

export const content = {
  ru: {
    personal: {
      name: "Yaroslav Alexandrov",
      title: "Junior Java Developer",
      location: "Минск, Беларусь",
      heroKicker: "Junior Java Developer",
      heroHeadline: "Создаю backend-системы.",
      heroStatement: "Специализируюсь на Java, Spring Boot и архитектуре баз данных. Работаю в сфере кибербезопасности.",
      aboutHeading: "Обо мне",
      aboutParagraphs: [
        "Я начинающий Java-разработчик с базой в Java Core и ООП. Имею практический опыт разработки веб-приложений в команде.",
        "Сейчас работаю инженером по кибербезопасности в ЗАО Белтим. Параллельно развиваюсь в backend-разработке на Java и применяю полученные навыки для написания кода."
      ]
    },
    journey: [
      {
        year: "2026 - Настоящее время",
        role: "Инженер по кибербезопасности",
        company: "ЗАО «Белтим»",
        summary: "Аттестация систем защиты информации.",
        impact: "Проведение аудита информационных систем.\nОценка защищенности и анализ уязвимостей.\nОформление аттестатов соответствия."
      },
      {
        year: "2020 - 2026",
        role: "Инспектор группы кадров",
        company: "Органы внутренних дел РБ",
        summary: "Полный цикл кадрового делопроизводства (270+ сотрудников).",
        impact: "Ведение кадрового учета: приказы, личные дела, контракты.\nОрганизация и проведение аттестаций, исчисление стажа.\nПодготовка ответов на запросы и взаимодействие с государственными органами и иными организациями."
      }
    ],
    skills: [
      { category: "Backend", accent: "violet", items: ["Java Core", "Spring Boot", "Spring MVC", "Spring Security", "Spring Data", "REST API"] },
      { category: "Базы данных", accent: "cyan", items: ["PostgreSQL", "MySQL", "Hibernate / JPA", "SQL"] },
      { category: "Инструменты", accent: "magenta", items: ["Git", "Maven", "ООП", "Java Collections", "IntelliJ IDEA"] },
      { category: "Сети и инфраструктура", accent: "amber", items: ["Настройка сетей", "Сопровождение инфраструктуры", "Защита данных", "Аттестация систем"] }
    ],
    education: [
      {
        period: "Сентябрь 2026",
        degree: "Защита персональных данных",
        institution: "Национальный центр защиты персональных данных РБ",
        focus: "Кибербезопасность",
        note: "Специализированный курс по защите информации."
      },
      {
        period: "Февраль - Июнь 2026",
        degree: "Кибербезопасность",
        institution: "Skillbox",
        focus: "Информационная безопасность",
        note: "Комплексное изучение основ информационной безопасности и анализа угроз."
      },
      {
        period: "Декабрь 2025 - Октябрь 2026",
        degree: "Java Developer",
        institution: "TeachMeSkills",
        focus: "Backend-разработка",
        note: "Комплексное обучение Java-разработке: от основ синтаксиса до создания полноценных веб-приложений."
      },
      {
        period: "2016 – 2020",
        degree: "Правоведение",
        institution: "БГСХА",
        focus: "Юриспруденция",
        note: "Высшее образование."
      }
    ],
    projects: [
      {
        id: "01",
        title: "E-commerce Web Application",
        concept: "Командный проект по созданию backend для интернет-магазина.",
        stack: ["Java", "Spring Boot", "Hibernate", "PostgreSQL", "Git"],
        impact: "Моя роль: Реализовал классы доменной модели, доработал MVC-контроллеры для страниц товаров и интегрировал базу данных PostgreSQL через Hibernate/JPA.",
        cta: "Смотреть на GitHub"
      }
    ],
    contact: {
      headline: "Ищу возможности для старта в роли Junior Java Developer.",
      statement: "Открыт для стажировок и командных проектов. Свяжитесь со мной удобным способом.",
      methods: [
        { label: "Email", value: "Yaroslav22041999@mail.ru", href: "mailto:Yaroslav22041999@mail.ru" },
        { label: "Telegram", value: "+375445610478", href: "https://t.me/tac_pm" },
        { label: "LinkedIn", value: "Yaroslav Alexandrov", href: "https://www.linkedin.com/in/yaroslav-alexsandrov-8013a2410/" },
        { label: "GitHub", value: "M1Rz1338", href: "https://github.com/M1Rz1338" }
      ]
    }
  },
  en: {
    personal: {
      name: "Yaroslav Alexandrov",
      title: "Junior Java Developer",
      location: "Minsk, Belarus",
      heroKicker: "Junior Java Developer",
      heroHeadline: "Building reliable backend systems.",
      heroStatement: "Focused on Java, Spring Boot, and database architecture. Working in cybersecurity.",
      aboutHeading: "About Me",
      aboutParagraphs: [
        "I am a Junior Java Developer with a foundation in Java Core and OOP. I have hands-on experience building web applications in a team environment.",
        "Currently, I work as a Cybersecurity Engineer at ZAO BelTim. In parallel, I am developing my skills in Java backend development and applying them to write reliable code."
      ]
    },
    journey: [
      {
        year: "2026 - Present",
        role: "Cybersecurity Engineer",
        company: "ZAO BelTim",
        summary: "Certification of information security systems.",
        impact: "Conducting audits of information systems.\nSecurity assessment and vulnerability analysis.\nIssuing compliance certificates."
      },
      {
        year: "2020 - 2026",
        role: "HR Inspector",
        company: "Ministry of Internal Affairs of RB",
        summary: "Full cycle of HR record management (270+ employees).",
        impact: "Maintaining HR records: orders, personal files, contracts.\nOrganizing and conducting certifications, calculating length of service.\nPreparing responses to requests and interacting with government agencies and other organizations."
      }
    ],
    skills: [
      { category: "Backend", accent: "violet", items: ["Java Core", "Spring Boot", "Spring MVC", "Spring Security", "Spring Data", "REST API"] },
      { category: "Databases", accent: "cyan", items: ["PostgreSQL", "MySQL", "Hibernate / JPA", "SQL"] },
      { category: "Tools", accent: "magenta", items: ["Git", "Maven", "OOP", "Java Collections", "IntelliJ IDEA"] },
      { category: "Networks & Infrastructure", accent: "amber", items: ["Network Setup", "Infrastructure Support", "Data Protection", "System Certification"] }
    ],
    education: [
      {
        period: "September 2026",
        degree: "Personal Data Protection",
        institution: "National Center for Personal Data Protection of RB",
        focus: "Cybersecurity",
        note: "Specialized course in information protection."
      },
      {
        period: "February - June 2026",
        degree: "Cybersecurity",
        institution: "Skillbox",
        focus: "Information Security",
        note: "Comprehensive study of information security fundamentals and threat analysis."
      },
      {
        period: "December 2025 - October 2026",
        degree: "Java Developer",
        institution: "TeachMeSkills",
        focus: "Backend Development",
        note: "Comprehensive Java development training: from syntax basics to building full-fledged web applications."
      },
      {
        period: "2016 – 2020",
        degree: "Law",
        institution: "BSAA",
        focus: "Jurisprudence",
        note: "Higher education."
      }
    ],
    projects: [
      {
        id: "01",
        title: "E-commerce Web Application",
        concept: "A team project focused on building the backend for an online store.",
        stack: ["Java", "Spring Boot", "Hibernate", "PostgreSQL", "Git"],
        impact: "My role: Implemented domain model classes, enhanced MVC controllers for product pages, and integrated the PostgreSQL database using Hibernate/JPA.",
        cta: "View on GitHub"
      }
    ],
    contact: {
      headline: "Looking for Junior Java Developer opportunities.",
      statement: "Available for internships and team projects. Feel free to reach out.",
      methods: [
        { label: "Email", value: "Yaroslav22041999@mail.ru", href: "mailto:Yaroslav22041999@mail.ru" },
        { label: "Telegram", value: "+375445610478", href: "https://t.me/tac_pm" },
        { label: "LinkedIn", value: "Yaroslav Alexandrov", href: "https://www.linkedin.com/in/yaroslav-alexsandrov-8013a2410/" },
        { label: "GitHub", value: "M1Rz1338", href: "https://github.com/M1Rz1338" }
      ]
    }
  }
};

export const openSourceFallback = [];
export const achievements = [];
export const blogs = [];
export const podcasts = [];
export const highlights = [];
export const experiencePanels = [];
export const githubProfile = { username: "" };
export const philosophy = { quote: "", body: "" };
export const personal = content.ru.personal;
export const contact = content.ru.contact;