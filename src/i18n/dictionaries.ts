import { staticPagesDictUk, staticPagesDictRu } from './dictionaries.static';

export type Dictionary = {
  header: {
    portfolio: string;
    services: string;
    contact: string;
    getStarted: string;
    lang: string;
    home: string;
    about: string;
  };
  footer: {
    brandName: string;
    description: string;
    rights: string;
    consultation: string;
    quickLinksTitle: string;
    contactsTitle: string;
    links: {
      landing: string;
      businessCard: string;
      corporate: string;
      ecommerce: string;
      tgBots: string;
      portfolio: string;
      about: string;
      solutions: string;
      locations: string;
    }
  };
  common: {
    orderSite: string;
    moreInfo: string;
    portfolio: string;
  };
  quiz: {
    step: string;
    outOf: string;
    contactDesc: string;
    customOption: string;
    customPlaceholder: string;
    textPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    contactMethod: string;
    phone: string;
    telegram: string;
    email: string;
    privacyLabel: string;
    placeholderPhone: string;
    placeholderTelegram: string;

    btnNext: string;
    btnSubmit: string;
    successTitle: string;
    successSubtitle: string;
    successDesc: string;
    errorMsg: string;
    fromPrefix: string;
  };
} & typeof staticPagesDictUk;

const uk: Dictionary = {
  header: {
    portfolio: 'Портфоліо',
    services: 'Послуги',
    contact: 'Контакти',
    getStarted: 'Обговорити проект',
    lang: 'RU',
    home: 'Головна',
    about: 'Про мене',
  },
  footer: {
    brandName: 'Dmitriy M.',
    description: 'Сайти та Telegram-боти, які приносять прибуток 24/7.',
    rights: 'Всі права захищені.',
    consultation: 'Отримати<br />консультацію',
    quickLinksTitle: 'Швидкі посилання',
    contactsTitle: 'Контакти',
    links: {
      landing: 'Лендінг',
      businessCard: 'Сайт-візитка',
      corporate: 'Корпоративний',
      ecommerce: 'Магазин',
      tgBots: 'TG-боти',
      portfolio: 'Портфоліо',
      about: 'Про мене',
      solutions: 'Галузеві рішення',
      locations: 'Географія',
    }
  },
  common: {
    orderSite: 'Замовити сайт',
    moreInfo: 'Детальніше',
    portfolio: 'Портфоліо',
  },
  quiz: {
    step: 'Крок',
    outOf: 'з',
    contactDesc: 'Залиште контакт, щоб побачити попередню оцінку вартості.',
    customOption: 'Свій варіант',
    customPlaceholder: 'Напишіть ваш варіант...',
    textPlaceholder: 'Напишіть тут...',
    nameLabel: 'Ваше ім\'я *',
    namePlaceholder: 'Олександр',
    contactLabel: 'Email або Telegram *',
    contactPlaceholder: '@username або пошта',
    contactMethod: "Як з вами зв'язатися?",
    phone: "Телефон",
    telegram: "Telegram",
    email: "Email",
    privacyLabel: "Я погоджуюсь з політикою конфіденційності",
    placeholderPhone: "+380 (99) 000-00-00",
    placeholderTelegram: "@username або номер",

    btnNext: 'Далі',
    btnSubmit: 'Отримати розрахунок',
    successTitle: 'Оцінка готова!',
    successSubtitle: 'Попередня вартість вашого проєкту:',
    successDesc: 'Я вже отримав вашу заявку і скоро зв\'яжусь з вами за вказаними контактами, щоб уточнити деталі та надати точний кошторис.',
    errorMsg: 'Сталася помилка під час відправлення',
    fromPrefix: 'від $',
  },
  ...staticPagesDictUk,
};

const ru: Dictionary = {
  header: {
    portfolio: 'Портфолио',
    services: 'Услуги',
    contact: 'Контакты',
    getStarted: 'Обсудить проект',
    lang: 'UA',
    home: 'Главная',
    about: 'Обо мне',
  },
  footer: {
    brandName: 'Dmitriy M.',
    description: 'Сайты и Telegram-боты, которые приносят прибыль 24/7.',
    rights: 'Все права защищены.',
    consultation: 'Получить<br />консультацию',
    quickLinksTitle: 'Быстрые ссылки',
    contactsTitle: 'Контакты',
    links: {
      landing: 'Лендинг',
      businessCard: 'Сайт-визитка',
      corporate: 'Корпоративный',
      ecommerce: 'Магазин',
      tgBots: 'TG-боты',
      portfolio: 'Портфолио',
      about: 'Обо мне',
      solutions: 'Отраслевые решения',
      locations: 'География',
    }
  },
  common: {
    orderSite: 'Заказать сайт',
    moreInfo: 'Подробнее',
    portfolio: 'Портфолио',
  },
  quiz: {
    step: 'Шаг',
    outOf: 'из',
    contactDesc: 'Оставьте контакт, чтобы увидеть предварительную оценку стоимости.',
    customOption: 'Свой вариант',
    customPlaceholder: 'Напишите ваш вариант...',
    textPlaceholder: 'Напишите здесь...',
    nameLabel: 'Ваше имя *',
    namePlaceholder: 'Александр',
    contactLabel: 'Email или Telegram *',
    contactPlaceholder: '@username или почта',
    contactMethod: "Как с вами связаться?",
    phone: "Телефон",
    telegram: "Telegram",
    email: "Email",
    privacyLabel: "Я согласен с политикой конфиденциальности",
    placeholderPhone: "+380 (99) 000-00-00",
    placeholderTelegram: "@username или номер",
    btnNext: 'Далее',
    btnSubmit: 'Получить расчет',
    successTitle: 'Оценка готова!',
    successSubtitle: 'Предварительная стоимость вашего проекта:',
    successDesc: 'Я уже получил вашу заявку и скоро свяжусь с вами по указанным контактам, чтобы уточнить детали и дать точную смету.',
    errorMsg: 'Произошла ошибка при отправке',
    fromPrefix: 'от $',
  },
  ...staticPagesDictRu,
};

export function getDictionary(lang: string): Dictionary {
  return lang === 'ru' ? ru : uk;
}
