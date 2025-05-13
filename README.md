# Система управления обращениями

## Запуск проекта

### Предварительные требования

- Node.js
- Docker и Docker Compose
- Yarn

### Установка и запуск

1. Установите зависимости:

```bash
yarn install
```

2. Создайте файл `.env` в корне проекта:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=appeal_system
POSTGRES_PORT=5432

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
PORT=4000
```

3. Запустите базу данных:

```bash
docker-compose up -d
```

4. Примените миграции:

```bash
yarn prisma migrate dev
```

5. Запустите сервер:

```bash
# Режим разработки
yarn dev

# Продакшен режим
yarn build
yarn start
```

## API Endpoints

### 1. Создание обращения

```http
POST /api/appeals
Content-Type: application/json

{
    "topic": "Проблема с доступом",
    "text": "Не могу войти в систему"
}
```

### 2. Взять обращение в работу

```http
PATCH /api/appeals/:id/take
```

### 3. Завершить обработку обращения

```http
PATCH /api/appeals/:id/complete
Content-Type: application/json

{
    "solution": "Проблема решена путем сброса пароля"
}
```

### 4. Отмена обращения

```http
PATCH /api/appeals/:id/cancel
Content-Type: application/json

{
    "cancellationReason": "Дублирующее обращение"
}
```

### 5. Получение списка обращений

```http
Получить все обращения
GET /api/appeals

Фильтрация по конкретной дате
GET /api/appeals?date=2024-02-20

Фильтрация по диапазону дат
GET /api/appeals?startDate=2024-02-01&endDate=2024-02-29
```

### 6. Отмена всех обращений в работе

```http
POST /api/appeals/cancel-all-in-progress
```

## Тестовые запросы

### Пример последовательности действий:

1. Создание обращения:

```bash
curl -X POST http://localhost:4000/api/appeals \
  -H "Content-Type: application/json" \
  -d '{"topic": "Тестовое обращение", "text": "Это тестовое обращение"}'
```

2. Взять обращение в работу (замените :id на полученный ID):

```bash
curl -X PATCH http://localhost:4000/api/appeals/:id/take
```

3. Завершить обращение:

```bash
curl -X PATCH http://localhost:4000/api/appeals/:id/complete \
  -H "Content-Type: application/json" \
  -d '{"solution": "Тестовое решение"}'
```

4. Получить список обращений:

```bash
curl http://localhost:4000/api/appeals
```

## Статусы обращений

- `NEW` - Новое обращение
- `IN_PROGRESS` - В работе
- `COMPLETED` - Завершено
- `CANCELLED` - Отменено
