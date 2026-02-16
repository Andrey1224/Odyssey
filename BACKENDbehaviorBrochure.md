BACKEND / BEHAVIOR (Claude Code CLI) — логика/данные/интеграции

 у нас будет Supabase  мы пока ее еще не подключили 
1) Модель данных (Lead)

Entity: BrochureLead

id

createdAt

sourcePage (free-brochure / PDP / PLP)

productSlug (optional)

firstName

lastName

address1

address2 (optional)

postcode

email

phone

preferredContact (optional)

bestTimeToCall (optional)

consentTextVersion (string)

userAgent, ip (если собираете)

status: new | contacted | shipped | closed (можно позже)

2) Endpoint/Action для сабмита

Выбирай один подход (любой норм):

Вариант A: Next.js Server Action

app/free-brochure/actions.ts → submitBrochureLead(formData)

Валидировать на сервере (zod)

Сохранить в БД

Вернуть success/failure

Вариант B: API route

POST /api/leads/brochure

Body JSON

Серверная валидация + сохранение

3) Валидация (must-have)

firstName/lastName: min 1–2 chars

address1: min 5 chars

postcode: UK postcode regex (достаточно базовой проверки)

email: стандартная

phone: min длина + разрешённые символы

Ошибки возвращать структурировано:

{ "errors": { "postcode": "Enter a valid UK postcode" } }

4) Поведение формы (client)

Disable submit пока идёт запрос

При ошибках:

показать inline errors

скролл/фокус на первое поле с ошибкой

При success:

заменить форму на success state

(опционально) дать кнопку “Back to Walk-in Baths”

5) URL params (контекст)

На /free-brochure:

читать product из query

маппить slug → product title (из вашего product list / data file)

передавать productSlug в payload

(опционально) utm_source/utm_campaign сохранять в lead

6) Куда сохранять лид (варианты)

Минимум на MVP:

Supabase table brochure_leads (лучший вариант)
или

Airtable/Google Sheets через webhook (быстро для операционки)
или

Email notification (fallback)

7) Нотификации (рекомендую, не обязательно)

После сохранения:

отправить email в компанию: “New brochure request” + данные

(опционально) отправить confirmation email клиенту: “We’ve received your request”
Если не хочешь усложнять — сделай только внутреннюю нотификацию.

8) Безопасность/качество

Honeypot поле для спама (скрытое)

Rate limit по IP (простая защита)

Логи ошибок (console/server logs)

Privacy: не хранить лишнее

TASK для Claude Code CLI (копируй)

Implement brochure lead behavior

Create /free-brochure page submission flow:

Add server action or API endpoint for brochure leads.

Validate inputs (firstName, lastName, address1, postcode, email, phone).

Store lead in DB (create table if needed).

Return structured errors.

Client behavior:

Disable button while submitting.

Show inline validation errors + focus first invalid field.

On success, show success state.

URL context:

Read product query param and include it in saved lead.

Display product name on the page if present.

Anti-spam:

Add honeypot field + ignore submissions when filled.

Acceptance:

Lead is stored.

Errors show correctly.

Success state works.

/free-brochure?product=serenity-66-classic saves product slug.