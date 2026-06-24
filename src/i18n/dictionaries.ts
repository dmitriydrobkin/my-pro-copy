export type Dictionary = {
  header: {
    home: string;
    about: string;
    contact: string;
  };
  footer: {
    brandName: string;
    description: string;
    consultation: string;
    quickLinksTitle: string;
    contactsTitle: string;
    privacyLabel: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    btnSubmit: string;
    privacyCheck: string;
  };
};

const uk: Dictionary = {
  header: {
    home: 'Головна',
    about: 'Про нас',
    contact: 'Контакти',
  },
  footer: {
    brandName: 'Brand',
    description: 'New Starter Project',
    consultation: 'Отримати<br />консультацію',
    quickLinksTitle: 'Швидкі посилання',
    contactsTitle: 'Контакти',
    privacyLabel: 'Політика конфіденційності',
  },
  common: {
    loading: 'Завантаження...',
    error: 'Щось пішло не так',
    success: 'Успішно',
  },
  form: {
    nameLabel: 'Ваше ім\'я *',
    namePlaceholder: 'Олександр',
    contactLabel: 'Email або Telegram *',
    contactPlaceholder: '@username або пошта',
    btnSubmit: 'Відправити',
    privacyCheck: 'Я погоджуюсь з політикою конфіденційності',
  },
};

const ru: Dictionary = {
  header: {
    home: 'Главная',
    about: 'О нас',
    contact: 'Контакты',
  },
  footer: {
    brandName: 'Brand',
    description: 'New Starter Project',
    consultation: 'Получить<br />консультацию',
    quickLinksTitle: 'Быстрые ссылки',
    contactsTitle: 'Контакты',
    privacyLabel: 'Политика конфиденциальности',
  },
  common: {
    loading: 'Загрузка...',
    error: 'Что-то пошло не так',
    success: 'Успешно',
  },
  form: {
    nameLabel: 'Ваше имя *',
    namePlaceholder: 'Александр',
    contactLabel: 'Email или Telegram *',
    contactPlaceholder: '@username или почта',
    btnSubmit: 'Отправить',
    privacyCheck: 'Я согласен с политикой конфиденциальности',
  },
};

export function getDictionary(lang: string): Dictionary {
  return lang === 'ru' ? ru : uk;
}
