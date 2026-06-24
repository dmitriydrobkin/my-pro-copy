import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Глобальные настройки сайта
export const siteSettings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value'),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Контент страниц
export const pageContent = sqliteTable('page_content', {
  route: text('route').primaryKey(),
  h1: text('h1'),
  seoTitle: text('seoTitle'),
  description: text('description'),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Лиды (заявки)
export const leads = sqliteTable('leads', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  contactInfo: text('contactInfo').notNull(),
  status: text('status', { enum: ['new', 'contacted', 'converted', 'rejected'] }).notNull().default('new'),
  estimatedBudget: text('estimatedBudget'),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Ответы из квиза
export const quizAnswers = sqliteTable('quiz_answers', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  leadId: integer('leadId', { mode: 'number' }).notNull().references(() => leads.id, { onDelete: 'cascade' }),
  answersJson: text('answersJson', { mode: 'json' }).notNull(), // Храним ответы в JSON
});

// Авторизованные Telegram чаты для получения заявок
export const telegramChats = sqliteTable('telegram_chats', {
  id: text('id').primaryKey(), // Telegram chat_id (переводим в строку на всякий случай)
  title: text('title'), // Имя пользователя или название группы
  type: text('type'), // private, group, supergroup, channel
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});
