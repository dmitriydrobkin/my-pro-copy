export type Dictionary = {
  nav: { home: string; about: string; contact: string; privacy: string };
  common: { loading: string; error: string; retry: string };
  contactForm: { title: string; name: string; phone: string; submit: string };
};

export const dictionaries = {
  uk: {
    nav: { home: "Пункт 1", about: "Пункт 2", contact: "Пункт 3", privacy: "Пункт 4" },
    common: { loading: "Завантаження...", error: "Помилка", retry: "Спробувати знову" },
    contactForm: { title: "Форма", name: "Ім'я", phone: "Телефон", submit: "Відправити" }
  },
  ru: {
    nav: { home: "Пункт 1", about: "Пункт 2", contact: "Пункт 3", privacy: "Пункт 4" },
    common: { loading: "Загрузка...", error: "Ошибка", retry: "Попробовать снова" },
    contactForm: { title: "Форма", name: "Имя", phone: "Телефон", submit: "Отправить" }
  }
};

export function getDictionary(lang: string): Dictionary {
  return lang === 'ru' ? dictionaries.ru : dictionaries.uk;
}
