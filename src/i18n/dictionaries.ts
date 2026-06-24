export type Dictionary = {
  nav: {
    item1: string;
    item2: string;
    item3: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
  };
};

const uk: Dictionary = {
  nav: {
    item1: "Пункт 1",
    item2: "Пункт 2",
    item3: "Пункт 3"
  },
  common: {
    loading: "Завантаження...",
    error: "Помилка",
    retry: "Спробувати знову"
  }
};

const ru: Dictionary = {
  nav: {
    item1: "Пункт 1",
    item2: "Пункт 2",
    item3: "Пункт 3"
  },
  common: {
    loading: "Загрузка...",
    error: "Ошибка",
    retry: "Попробовать снова"
  }
};

export function getDictionary(lang: string): Dictionary {
  return lang === 'ru' ? ru : uk;
}
