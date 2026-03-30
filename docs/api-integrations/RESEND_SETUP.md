# Подключение Email-уведомлений о лидах (Resend)

Статус на 2026-03-27:
- durable lead capture уже реализован отдельно от email
- `Resend` теперь является optional notification layer, а не primary storage
- если `Resend` временно не настроен, лид не должен теряться при условии что настроен Supabase

## Что нужно сделать заказчику

1. Зарегистрироваться на https://resend.com (бесплатный тариф — 3000 писем/месяц)
2. Верифицировать домен `odysseybaths.co.uk` в панели Resend → Domains (добавить DNS-запись TXT)
3. Создать API-ключ в панели Resend → API Keys
4. Передать разработчику:
   - API-ключ (`re_xxxxxxxxxxxx`)
   - Email адрес на который приходят лиды (например `paul@odysseybaths.co.uk`)

## Что нужно сделать разработчику

### 1. Установить пакет
```bash
npm install resend
```

### 2. Добавить переменные окружения

В файл `.env.local` (локально):
```
RESEND_API_KEY=re_xxxxxxxxxxxx
LEAD_EMAIL_TO=paul@odysseybaths.co.uk
LEAD_EMAIL_FROM="Odyssey Baths <onboarding@resend.dev>"
```

На Vercel: Settings → Environment Variables — добавить те же две переменные.

### 3. Убедиться, что durable storage уже настроен

Email-нотификации не должны быть единственным способом получения лида.

Обязательно должны быть настроены:
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Таблица для лидов:
- см. [`SUPABASE_LEAD_SUBMISSIONS.sql`](/home/dev/dev/repos/oddyseyweb/docs/api-integrations/SUPABASE_LEAD_SUBMISSIONS.sql)

### 4. Текущая реализация в коде

Текущий код уже умеет:
- сохранять лид в `Supabase` first
- после успешного сохранения отправлять optional email через `Resend`
- не ронять lead flow, если `Resend` не настроен

Основной код:
- [`lib/lead-submissions.ts`](/home/dev/dev/repos/oddyseyweb/lib/lead-submissions.ts)
- [`app/api/leads/route.ts`](/home/dev/dev/repos/oddyseyweb/app/api/leads/route.ts)
- [`app/free-brochure/actions.ts`](/home/dev/dev/repos/oddyseyweb/app/free-brochure/actions.ts)

## Что получит заказчик

Каждый раз когда кто-то заполняет реальную lead form, после успешного сохранения можно отправлять письмо на указанный email с:
- Тип запроса (Quote / Survey / Question / Handing)
- Имя, телефон, postcode
- Email и сообщение (если указаны)
- Дата и время
- Для brochure flow также: адрес, best time to call, product slug

## Текущий статус

- [x] Shared lead backend path реализован
- [x] `contact` flow подключен к shared backend
- [x] `free-brochure` flow подключен к shared backend
- [x] Durable-first design реализован
- [ ] Supabase credentials добавлены в env
- [ ] Таблица `lead_submissions` создана в Supabase
- [ ] Заказчик регистрируется на Resend
- [ ] Заказчик верифицирует домен `odysseybaths.co.uk`
- [ ] Заказчик передаёт API-ключ
- [ ] Пакет `resend` установлен, если решаем использовать его вместо прямого HTTP вызова
- [ ] Переменные `RESEND_*` добавлены на Vercel
