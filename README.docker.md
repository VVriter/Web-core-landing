# Docker Compose Setup для WebCore Agency

## Запуск додатку

### Перший запуск

1. Переконайтеся, що Docker і Docker Compose встановлені на сервері
2. Створіть директорію для логів (якщо ще не створена):
   ```bash
   mkdir -p logs/nginx
   ```
3. Запустіть контейнери:
   ```bash
   docker-compose up -d --build
   ```

### Перевірка статусу

```bash
docker-compose ps
```

### Перегляд логів

```bash
# Всі логи
docker-compose logs -f

# Логи тільки Nuxt додатку
docker-compose logs -f nuxt-app

# Логи тільки Nginx
docker-compose logs -f nginx
```

### Зупинка

```bash
docker-compose down
```

### Перезапуск після змін

```bash
docker-compose up -d --build
```

## Налаштування

### Зміна порту

Якщо потрібно змінити порт з 1111 на інший:

1. Відредагуйте `docker-compose.yml`:
   ```yaml
   ports:
     - "НОВИЙ_ПОРТ:1111"
   ```

2. Відредагуйте `nginx.conf`:
   ```nginx
   listen НОВИЙ_ПОРТ;
   ```

### Зміна домену

Відредагуйте `nginx.conf`:
```nginx
server_name НОВИЙ_ДОМЕН www.НОВИЙ_ДОМЕН;
```

## Структура

- `Dockerfile` - збірка Nuxt додатку (multi-stage)
- `nginx.conf` - конфігурація Nginx reverse proxy
- `docker-compose.yml` - оркестрація контейнерів
- `.dockerignore` - файли, які ігноруються при збірці

## Доступ до додатку

Після запуску додаток буде доступний на:
- `http://web-core.agency:1111`
- `http://www.web-core.agency:1111`

## Health Check

Обидва сервіси мають health checks:
- Nuxt: `http://localhost:3000/health`
- Nginx: `http://localhost:1111/health`

