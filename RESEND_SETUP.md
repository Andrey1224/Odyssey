# Подключение Email-уведомлений о лидах (Resend)

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
```

На Vercel: Settings → Environment Variables — добавить те же две переменные.

### 3. Обновить `app/api/leads/route.ts`

Заменить `console.log("[LEAD]", ...)` на отправку письма через Resend.

## Что получит заказчик

Каждый раз когда кто-то заполняет форму на `/contact` — на указанный email приходит письмо с:
- Тип запроса (Quote / Survey / Question / Handing)
- Имя, телефон, postcode
- Email и сообщение (если указаны)
- Дата и время

## Текущий статус

- [x] Форма на `/contact` работает и валидирует данные
- [x] API route `/api/leads` принимает POST-запросы
- [ ] Заказчик регистрируется на Resend
- [ ] Заказчик верифицирует домен `odysseybaths.co.uk`
- [ ] Заказчик передаёт API-ключ
- [ ] Разработчик устанавливает `resend` и обновляет route.ts
- [ ] Переменные добавлены на Vercel
