Ты работаешь как senior full-stack engineer и release-prep reviewer.

Контекст проекта:
- Это SMB lead-gen сайт.
- Sanity для блога уже реализован, поэтому не трать время на CMS gap.
- Сайт пока не публичный и не продвигается.
- Кастомный домен клиента еще НЕ подключен, потому что клиент не предоставил доступ / DNS.
- Текущий vercel.app URL — временный.
- Поэтому final domain SEO configuration, canonical на реальный домен и production email branding нужно считать pending client dependency, а не текущим дефектом реализации.
- Твоя задача: не делать общий аудит заново, а выполнить ПРАКТИЧЕСКИЙ PRE-LAUNCH STABILIZATION PLAN.

Главная цель:
Подготовить сайт так, чтобы он был технически готов к безопасному запуску сразу после подключения домена.

Не распыляйся.
Не трать время на low-priority polish.
Сфокусируйся только на том, что реально влияет на readiness.

Приоритеты работы:

P0 — обязательно до запуска
1. Надежная обработка лидов
   - Найди все lead forms / brochure / contact / quote flows.
   - Определи, какие из них реально рабочие, а какие фейковые / временные / неполные.
   - Приведи все формы к одному надежному паттерну:
     - server-side validation,
     - единый submit flow,
     - надежное сохранение данных,
     - явный success/error response.
   - Если branded email sending пока нельзя финализировать без домена, все равно сделай систему так, чтобы лид НЕ терялся.
   - Предпочтительно: durable persistence first, notifications second.
   - Укажи, какие env vars и external services нужны.

2. Удаление фейковых и битых путей
   - Найди все href="#", временные CTA, redirect-only страницы, неподключенные формы, mock-success flows.
   - Замени на реальные route/action path либо убери из UI.
   - Не должно остаться элементов, которые выглядят рабочими, но не работают.

3. Очистка flow / route consistency
   - Проверь free-quote, free-brochure, contact, CTA pathways.
   - Убери дублирование и confusing logic.
   - Должен остаться один ясный flow на каждое действие пользователя.

4. Минимальная launch readiness проверка
   - build
   - lint
   - route sanity
   - no obvious runtime blockers
   - env validation
   - no broken imports / dead integrations

P1 — желательно до запуска, если не требует большой переделки
5. Минимальный analytics/conversion tracking
   - Добавь tracking для:
     - primary CTA clicks
     - brochure submit
     - contact submit
     - quote submit
     - phone/email clicks
   - Реализуй минимально, без overengineering.

6. Single source of truth for business/contact data
   - Найди хардкод телефонов, email, адресов, CTA labels.
   - По возможности централизуй.

7. Lead submission observability
   - Добавь базовый logging / error visibility.
   - Нужно понимать, если lead submit ломается.

P2 — не делать сейчас, только подготовить notes
8. Final domain switch tasks
   - Не реализовывай финальный branded domain setup, если нет доступа к домену.
   - Вместо этого подготовь checklist:
     - где меняется SITE_URL / metadataBase / canonical / sitemap / robots / schema
     - где подключается final sender domain
     - что проверить после подключения домена

9. Deep performance optimization
   - Только если увидишь очень дешевые и очевидные quick wins.
   - Не делай большой рефактор client/server boundary сейчас.

10. SEO expansion / extra pages
   - Не делать сейчас.
   - Только note, что понадобится после домена и запуска.

Формат работы:
1. Сначала составь concise implementation plan.
2. Потом выполни только P0 задачи.
3. После выполнения покажи:
   - что изменил,
   - какие файлы затронул,
   - что осталось,
   - что заблокировано клиентом,
   - какие manual follow-up steps нужны.
4. Если какая-то проблема не может быть решена без client dependency, явно пометь:
   - BLOCKED BY CLIENT / DOMAIN ACCESS

Очень важно:
- Не считай отсутствие кастомного домена текущим engineering defect.
- Не считай отсутствие финального branded email setup причиной откладывать reliable lead capture.
- CMS/blog не считать проблемой, это уже сделано.
- Главный критерий успеха: сайт не должен терять лиды и не должен содержать фейковые пользовательские пути.

Definition of Done:
- Все реальные lead forms проходят через рабочий backend flow.
- Лид не теряется даже если email notification временно unavailable.
- Нет href="#" и mock-success UX в production UI.
- Нет путаницы между brochure/contact/quote flows.
- build/lint status понятен.
- Есть список задач, которые можно выполнить только после получения доступа к домену.

Не пытайся улучшить всё подряд.
Если есть выбор между:
- красивым refactor,
- performance cleanup,
- дополнительным SEO polish,
- и надежной обработкой лидов,

всегда выбирай надежную обработку лидов.

Если какая-то форма сейчас только “выглядит готовой”, но не имеет надежного backend path, считай это дефектом выше среднего приоритета.

Если какая-то страница временная, redirect-only или не должна быть отдельным пользовательским flow, не лечи ее косметически — либо убери, либо сведи к одной ясной user journey.