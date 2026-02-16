 Цель: **собрать PLP “Walk-in Baths” (листинг) как на финальных скринах**, сделать это **шаблоном для всех категорий**, чтобы менялись только текст/фото/фильтры/данные. image1.png , image2.png , image3.png  у нас уже есть страница ее только надо подкорректировать но не переделывать ее заново , и не ухордить в другой стиль, стиль жолжен быть такой же как и у всего проэкта 

---

## ТЗ для AI-помощника: PLP “Walk-in Baths” (Product Listing Page)

### 0) Контекст проекта

* Стек: **Next.js (App Router) + TypeScript + Tailwind**.
* Нужна страница категории товаров (PLP), которая показывает список моделей + фильтрацию + VAT toggle + доверие/объяснение/FAQ.
* Дизайн ориентирован на аудиторию 60+ (крупная типографика, четкие CTA, высокий контраст, минимум “визуального шума”, простые формулировки).

---

## 1) Маршрут и структура

### Маршрут

* Реализовать страницу:

  * `/(catalog)/walk-in-baths` (или твой текущий роут категории, но итог тот же)
* Страница должна быть **универсальной**: один шаблон под категории, данные приходят из конфигурации/JSON.

### Структура секций сверху вниз (как на скринах)

1. **Header** (уже есть)
2. **Hero заголовок категории**

   * H1: “Walk-in Baths”
   * Subheading: “Safety, comfort, and easy access tailored to your home. Browse our UK-made collection.”
3. **Trust strip** (1 строка, иконки + текст):

   * “4.9/5 Trustpilot”
   * “10 Year Warranty”
   * “Made in UK”
   * “VAT Relief Handled”
4. **Explainer: “What is a walk-in bath?”** (до карточек товаров!)

   * Слева: короткое объяснение + 4 буллета
   * CTA: “See how it works (30 sec)” (кнопка/ссылка)
   * Справа: **диаграмма** (SVG/PNG) с подписями (watertight door / built-in seat / secure door seal / low step-in threshold)
5. Основной контент (2 колонки):

   * **Левый sidebar**: quiz + VAT toggle + фильтры
   * **Правый контент**: “Showing X results” + сетка карточек (2 колонки)
6. После карточек:

   * **Brochure CTA box** (“Prefer a physical brochure?” + кнопка “Send Me a Brochure by Post”)
7. **3 benefit cards**:

   * “No Hard Sell Guarantee”
   * “VAT Relief Handled”
   * “Nationwide Installation”
8. **Buyer’s Guide & FAQ** (accordion из 4 пунктов)
9. Footer (уже есть)

---

## 2) Компоненты, которые нужно создать/обновить

Сделай компоненты переиспользуемыми:

### A) `TrustStrip`

* Props: items[{icon, label}]
* Desktop: 1 строка, равномерно
* Mobile: wrap / 2 строки

### B) `CategoryExplainer`

* Props: title, description, bullets[], ctaLabel, ctaHref, diagramSrc
* Layout: 2 колонки, справа диаграмма в card-контейнере
* Диаграмма: responsive, max-width, не “мылится”

### C) `FiltersSidebar`

Секции:

1. Quiz card:

   * Title: “Not sure which model?”
   * Text: “Take our 30-second quiz to find your perfect fit.”
   * Button: “Help Me Choose” (href на /quiz или /help-me-choose)
2. VAT pricing card:

   * Toggle: `VAT Exempt` / `Standard`
   * Help text:

     * “Most customers with a chronic condition are eligible for VAT relief.”
     * “Self-declaration, no doctor’s note needed. You must confirm eligibility at checkout.”
3. Filters (checkbox groups):

   * LENGTH: `<1500mm`, `1500–1699mm`, `1700mm+`
   * HANDING: `Left Hand`, `Right Hand`
   * KEY FEATURES: `Powered Seat Lift`, `Hydrotherapy`, `Chromotherapy`, `Lay-down Option`

* Важно: состояние фильтров синхронизировать с URL query (чтобы можно было шарить ссылку):

  * пример: `?vat=exempt&length=standard&handing=left&features=hydro,chromotherapy`

### D) `ProductGrid`

* Header: “Showing X results”
* Grid: 2 колонки на desktop, 1 колонка на mobile/tablet

### E) `ProductCard`

Элементы:

* Image (real photo) + overlay label “Installed in Manchester” (если есть поле `installedIn`)
* Title (H3): “Serenity 66 Classic”
* 3 mini-spec chips/blocks: `SIZE`, `STEP`, `DOOR` (как на макете)
* Price block:

  * Основная цена зависит от VAT toggle:

    * `vat=exempt`: показываем **Ex VAT** price крупно + строка мелко “£X,XXX inc. VAT” (или наоборот как на макете — главное консистентно)
    * `vat=standard`: показываем **Inc VAT** price крупно + строка мелко “£X,XXX ex. VAT”
  * Строка зелёным: “Save £___ (VAT Relief)” только если `vat=exempt`
* CTA buttons:

  * Primary: “View Details” → PDP (например `/walk-in-baths/serenity-66-classic`)
  * Secondary: “Brochure” → /brochure (или модал/форма)

---

## 3) Данные и модель (минимально, чтобы ожило)

Сделай временный datasource `walkInBaths.ts` (потом заменим на БД).

### Product type (пример)

* `id`, `slug`, `name`
* `category`
* `imageSrc`
* `installedIn?`
* `spec`: `{ sizeMm, step: 'Low'|'Medium', door: 'L'|'R'|'L or R', system?: string }`
* `features`: string[] (для фильтрации)
* `lengthBucket`: 'compact'|'standard'|'large' (для фильтрации)
* `handing`: 'left'|'right'|'both'
* `priceExVat`, `priceIncVat` (number)
* `vatReliefSave` (number, можно вычислять как inc - ex)

---

## 4) Логика фильтрации и VAT

### VAT toggle

* `vat=exempt | standard`
* влияет только на отображение цен и “Save …” строку
* должен сохраняться при переходах/фильтрах (в URL)

### Фильтры

* Checkbox groups, множественный выбор допустим (кроме length — можно сделать single select, если хочешь как чекбокс — реши и сделай единообразно)
* Фильтрация работает на клиенте (пока), без перезагрузки
* “Showing X results” пересчитывается

---

## 5) Адаптив и UX (обязательно)

### Desktop

* Sidebar слева фиксированной ширины, контент справа
* Хорошие отступы, крупные кликабельные зоны

### Mobile

* Sidebar превращается в кнопку “Filters” → Drawer/Modal
* Trust strip переносится
* Explainer блок: диаграмма уходит под текст

---

## 6) Accessibility (60+)

* Кнопки min-height ~44px
* Видимый focus state на интерактивных элементах
* Контраст текста/кнопок
* Семантика: H1 один, далее H2/H3
* Accordion: keyboard navigation + aria атрибуты

---

## 7) Acceptance Criteria (что считается “готово”)

1. PLP визуально совпадает со структурой на скринах: hero → trust strip → explainer → sidebar+grid → brochure box → 3 benefits → FAQ.
2. VAT toggle меняет отображение цен и строку “Save…”.
3. Фильтры реально фильтруют товары и обновляют “Showing X results”.
4. Состояние VAT и фильтров живёт в URL query.
5. Mobile: фильтры доступны через drawer, ничего не “ломается”.
6. Все кнопки/accordion доступны с клавиатуры, есть focus outline.

---

## 8) Что мне вернуть (как результат работы)

* Список изменённых/созданных файлов
* Новые компоненты + где используются
* Конфиг данных (временный)
* Скриншоты/описание как проверить (локально)

---

