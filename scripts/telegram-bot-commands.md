# Telegram Bot Commands Setup

## Отримання Thread ID (ID гілки/топіку)

### Спосіб 1: Через URL
1. Відкрий гілку (топік) в Telegram Desktop або Web
2. Подивись на URL: `https://t.me/c/CHAT_ID/THREAD_ID`
3. Останнє число — це Thread ID

### Спосіб 2: Через бота
Налаштуй команду `/thread_id` для свого бота:

1. Відкрий @BotFather
2. Надішли `/setcommands`
3. Вибери свого бота
4. Надішли:
```
thread_id - Отримати ID поточної гілки
```

### Спосіб 3: Простий скрипт для отримання thread_id

Створи файл `get-thread-id.js` і запусти його:

```javascript
// get-thread-id.js
const BOT_TOKEN = 'YOUR_BOT_TOKEN';

async function getUpdates() {
  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
  const data = await response.json();

  console.log('Recent messages:');
  data.result.forEach(update => {
    if (update.message) {
      const msg = update.message;
      console.log(`
Chat ID: ${msg.chat.id}
Thread ID: ${msg.message_thread_id || 'N/A (not in a topic)'}
From: ${msg.from?.first_name || 'Unknown'}
Text: ${msg.text || '(no text)'}
---`);
    }
  });
}

getUpdates();
```

Запуск:
```bash
node get-thread-id.js
```

### Спосіб 4: cURL команда

Після того як надіслав повідомлення в гілку, виконай:

```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/getUpdates" | jq '.result[-1].message.message_thread_id'
```

## Налаштування

Після отримання Thread ID, додай його в `.env`:

```env
TELEGRAM_THREAD_ID=123
```

Або в docker-compose через environment.
