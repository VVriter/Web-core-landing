<template>
  <div class="stories-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Instagram Stories - WebCore Agency</h1>
      <p class="page-description">Креативи для СММ: "Чому обирають WebCore"</p>
      <button class="download-all-btn" @click="downloadAllStories">
        <Icon name="mdi:download-multiple" size="lg" />
        Завантажити всі Stories (ZIP)
      </button>
      </div>

      <!-- Stories Grid -->
      <div class="stories-grid">
      <!-- Title Story -->
      <div class="story-item">
        <div class="story-frame">
          <div class="story title-story">
            <div class="story-background title-bg">
              <div class="gradient-overlay"></div>
              <div class="floating-elements">
                <div class="floating-icon icon-1">
                  <Icon name="mdi:rocket-launch" size="xl" />
                    </div>
                <div class="floating-icon icon-2">
                  <Icon name="mdi:star" size="lg" />
                    </div>
                <div class="floating-icon icon-3">
                  <Icon name="mdi:trending-up" size="lg" />
                  </div>
                <div class="floating-icon icon-4">
                  <Icon name="mdi:shield-check" size="lg" />
                      </div>
                <div class="floating-icon icon-5">
                  <Icon name="mdi:lightning-bolt" size="lg" />
                    </div>
              </div>
            </div>

                  <div class="story-content">
              <div class="logo-section">
                <div class="logo-container">
                  <WebCoreLogo :animated="true" :size="120" animationType="full" class="main-logo" />
                      </div>
                <h1 class="brand-name">
                  <span class="web-text">Web</span><span class="core-text">Core</span>
                </h1>
                <p class="brand-tagline">Digital Agency</p>
            </div>

              <div class="title-section">
                <h2 class="main-title">
                  Чому обирають
                  <span class="highlight-text">WebCore?</span>
                </h2>
                <p class="subtitle">Дізнайтеся про наші переваги</p>
            </div>

              <div class="cta-section" style="transform: translateY(-20px);">
                <div class="swipe-indicator">
                  <Icon name="mdi:gesture-swipe-right" size="lg" />
                  <span>Swipe to explore</span>
                    </div>
                  </div>
                      </div>
                      </div>
                    </div>
        <div class="story-label">Story 1/7 - Титульна</div>
            </div>

      <!-- Advantage Stories -->
      <div 
        v-for="(story, index) in advantageStories" 
        :key="index" 
        class="story-item"
      >
        <div class="story-frame">
          <div class="story advantage-story" :class="`story-${index + 1}`">
            <div class="story-background" :class="`bg-${index + 1}`">
              <div class="gradient-overlay" :class="`overlay-${index + 1}`"></div>
              <div class="pattern-overlay"></div>
                    </div>
            
                  <div class="story-content">
              <div class="advantage-header">
                <div class="advantage-icon">
                  <Icon :name="story.icon" size="xl" />
                      </div>
                <div class="advantage-number">0{{ index + 1 }}</div>
            </div>

              <div class="advantage-content">
                <h3 class="advantage-title">{{ story.title }}</h3>
                <p class="advantage-description">{{ story.description }}</p>
                
                <div class="advantage-stats" v-if="story.stats">
                  <div class="stat-item" v-for="(stat, statIndex) in story.stats" :key="statIndex">
                    <div class="stat-number">{{ stat.number }}</div>
                    <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>

                <div class="advantage-features" v-if="story.features">
                  <div class="feature-item" v-for="(feature, featureIndex) in story.features" :key="featureIndex">
                    <Icon name="mdi:check-circle" size="md" />
                    <span>{{ feature }}</span>
        </div>
      </div>
    </div>

              <div class="cta-footer">
                <button class="cta-btn" @click="openContactModal">
                  <Icon name="mdi:send" size="md" />
                  Консультація
        </button>
              </div>
              </div>
            </div>
                </div>
        <div class="story-label">Story {{ index + 2 }}/7 - {{ story.title }}</div>
            </div>
          </div>

    <!-- Download Instructions -->
    <div class="download-instructions">
      <h3>Інструкції для використання:</h3>
      <ul>
        <li>Кожна story має розмір 375x667px (9:16)</li>
        <li>Збережіть кожну story як окреме зображення</li>
        <li>Використовуйте в Instagram Stories послідовно</li>
        <li>Рекомендується додати інтерактивні елементи (опитування, кнопки)</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../components/Icon.vue'
import WebCoreLogo from '../../components/WebCoreLogo.vue'
import { useModal } from '../../composables/useModal'

const { openModal } = useModal()

// Advantage stories data (without title story)
const advantageStories = [
  {
    icon: 'mdi:rocket-launch',
    title: 'Швидкий старт проєктів',
    description: 'Розпочинаємо розробку вже через 24 години після обговорення деталей',
    stats: [
      { number: '24h', label: 'До старту' },
      { number: '1-6', label: 'Тижнів розробки' }
    ],
    features: [
      'Детальне планування на старті',
      'Швидке прототипування',
      'Agile методологія'
    ]
  },
  {
    icon: 'mdi:shield-check',
    title: 'Гарантія якості',
    description: '60 днів безкоштовної підтримки та виправлення помилок',
    stats: [
      { number: '60', label: 'Днів гарантії' },
      { number: '99.9%', label: 'Uptime' }
    ],
    features: [
      'Повне тестування перед запуском',
      'Безкоштовні правки',
      'Технічна підтримка'
    ]
  },
  {
    icon: 'mdi:trending-up',
    title: 'Результати що видно',
    description: 'Наші клієнти в середньому збільшують продажі на 150%',
    stats: [
      { number: '+150%', label: 'Ріст продажів' },
      { number: '300+', label: 'Задоволених клієнтів' }
    ],
    features: [
      'SEO оптимізація',
      'Конверсійний дизайн',
      'Аналітика та звіти'
    ]
  },
  {
    icon: 'mdi:account-group',
    title: 'Команда експертів',
    description: '12+ спеціалістів з досвідом 5+ років в IT сфері',
    stats: [
      { number: '12+', label: 'Експертів' },
      { number: '5+', label: 'Років досвіду' }
    ],
    features: [
      'Full-stack розробники',
      'UI/UX дизайнери',
      'Digital маркетологи'
    ]
  },
  {
    icon: 'mdi:clock-fast',
    title: 'Швидка підтримка',
    description: 'Відповідаємо на звернення протягом 2 годин, працюємо 24/7',
    stats: [
      { number: '2h', label: 'Час відповіді' },
      { number: '24/7', label: 'Підтримка' }
    ],
    features: [
      'Цілодобова підтримка',
      'Швидке вирішення проблем',
      'Регулярні оновлення'
    ]
  },
  {
    icon: 'mdi:currency-usd',
    title: 'Прозора ціна',
    description: 'Фіксована вартість без прихованих платежів та доплат',
    stats: [
      { number: '0%', label: 'Прихованих доплат' },
      { number: '100%', label: 'Прозорість' }
    ],
    features: [
      'Детальна кошторисна',
      'Фіксовані терміни',
      'Поетапна оплата'
    ]
  }
]

const openContactModal = () => {
  openModal('contact')
}

// Download all stories as images in ZIP
const downloadAllStories = async () => {
  try {
    // Динамічно імпортуємо необхідні бібліотеки
    const [{ default: html2canvas }, { default: JSZip }] = await Promise.all([
      import('html2canvas' as any),
      import('jszip' as any)
    ])
    
    const zip = new JSZip()
    const stories = document.querySelectorAll('.story-frame .story')
    
    // Показуємо індикатор завантаження
    const button = document.querySelector('.download-all-btn') as HTMLButtonElement
    if (button) {
      button.disabled = true
      button.innerHTML = '<span class="spinner"></span> Генерація картинок...'
    }
    
    // Генеруємо картинки для кожної story
    for (let i = 0; i < stories.length; i++) {
      const story = stories[i] as HTMLElement
      
      // Оновлюємо прогрес
      if (button) {
        const progress = Math.round(((i + 1) / stories.length) * 100)
        button.innerHTML = `<span class="spinner"></span> Генерація ${progress}%...`
      }
      
      // Клонуємо елемент для кращого рендерингу
      const clonedStory = story.cloneNode(true) as HTMLElement
      
      // Створюємо контейнер для правильного розміру
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.top = '-9999px'
      container.style.left = '-9999px'
      container.style.width = '1080px'
      container.style.height = '1920px'
      container.style.background = '#000'
      container.style.zIndex = '-9999'
      
      // Налаштовуємо клонований елемент
      clonedStory.style.width = '100%'
      clonedStory.style.height = '100%'
      clonedStory.style.transform = 'scale(3.6)' // Масштабуємо з 300px до 1080px
      clonedStory.style.transformOrigin = 'top left'
      
      container.appendChild(clonedStory)
      document.body.appendChild(container)
      
      // Замінюємо SVG іконки на inline SVG для кращого рендерингу
      const icons = clonedStory.querySelectorAll('svg')
      icons.forEach(icon => {
        if (icon.parentElement?.tagName === 'ICON-STUB') {
          // Конвертуємо Icon компонент в SVG
          const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          svgElement.setAttribute('viewBox', '0 0 24 24')
          svgElement.setAttribute('width', icon.getAttribute('width') || '24')
          svgElement.setAttribute('height', icon.getAttribute('height') || '24')
          svgElement.innerHTML = icon.innerHTML
          icon.parentElement.replaceWith(svgElement)
        }
      })
      
      // Чекаємо завантаження всіх ресурсів
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Створюємо canvas з story
      const canvas = await html2canvas(container, {
        width: 1080,
        height: 1920,
        windowWidth: 1080,
        windowHeight: 1920,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null, // Прозорий фон, оскільки контейнер вже має чорний
        logging: false,
        foreignObjectRendering: true, // Для кращого рендерингу SVG
        imageTimeout: 15000,
        onclone: (clonedDoc: Document) => {
          // Додаткова обробка клонованого документа для іконок
          const clonedIcons = clonedDoc.querySelectorAll('[data-icon]')
          clonedIcons.forEach((icon: any) => {
            icon.style.display = 'inline-block'
            icon.style.visibility = 'visible'
          })
        }
      })
      
      // Видаляємо контейнер
      document.body.removeChild(container)
      
      // Конвертуємо canvas в blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) resolve(blob)
        }, 'image/png', 0.95)
      })
      
      // Генеруємо ім'я файлу
      let filename: string
      if (i === 0) {
        filename = '01-title-story.png'
      } else {
        const storyTitle = advantageStories[i - 1]?.title || `story-${i}`
        const cleanTitle = storyTitle.toLowerCase()
          .replace(/[^\wа-яіїєґ\s-]/g, '')
          .replace(/\s+/g, '-')
        filename = `${String(i + 1).padStart(2, '0')}-${cleanTitle}.png`
      }
      
      // Додаємо файл до архіву
      zip.file(filename, blob)
    }
    
    // Додаємо README файл з інструкціями
    const readme = `WebCore Agency - Instagram Stories Pack
========================================

Цей пакет містить 7 Instagram Stories для промоції WebCore Agency.

Файли:
------
01-title-story.png - Титульна story
02-швидкий-старт-проєктів.png - Швидкий старт проєктів
03-гарантія-якості.png - Гарантія якості  
04-результати-що-видно.png - Результати що видно
05-команда-експертів.png - Команда експертів
06-швидка-підтримка.png - Швидка підтримка
07-прозора-ціна.png - Прозора ціна

Технічні характеристики:
------------------------
- Розмір: 1080x1920px (9:16)
- Формат: PNG з високою якістю
- Готові для публікації в Instagram

Рекомендації:
------------
1. Публікуйте stories послідовно (1-7)
2. Додайте інтерактивні елементи в Instagram:
   - Опитування
   - Кнопки з посиланнями
   - Стікери
3. Використовуйте хештеги: #webcore #webdevelopment #digitalagency

Контакти:
---------
Веб-сайт: web-core.agency
Телефон: +380777707232
Email: support@web-core.agency

© 2024 WebCore Agency. Всі права захищені.
`
    
    zip.file('README.txt', readme)
    
    // Генеруємо ZIP архів
    if (button) {
      button.innerHTML = '<span class="spinner"></span> Створення архіву...'
    }
    
    const content = await zip.generateAsync({ type: 'blob' })
    
    // Створюємо посилання для завантаження
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.download = 'webcore-instagram-stories.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    // Відновлюємо кнопку
    if (button) {
      button.disabled = false
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5m14-9h-3V3H8v6H5l7 7z"/></svg> Завантажити всі Stories (ZIP)'
    }
    
    console.log('Stories downloaded successfully!')
    
  } catch (error) {
    console.error('Error downloading stories:', error)
    alert('Помилка при завантаженні stories. Спробуйте ще раз.')
    
    // Відновлюємо кнопку при помилці
    const button = document.querySelector('.download-all-btn') as HTMLButtonElement
    if (button) {
      button.disabled = false
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5m14-9h-3V3H8v6H5l7 7z"/></svg> Завантажити всі Stories (ZIP)'
    }
  }
}

// SEO
useHead({
  title: 'Instagram Stories - WebCore Agency',
  meta: [
    {
      name: 'description',
      content: 'Креативні Instagram Stories про переваги WebCore Agency для СММ. Готові креативи для Instagram.'
    }
  ]
})
</script>

<style scoped>
/* Stories Page Layout */
.stories-page {
  min-height: 100vh;
  background: var(--color-bg-primary);
  padding: 2rem;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin: 0 0 1.5rem 0;
}

/* Download All Button */
.download-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
}

.download-all-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(139, 92, 246, 0.4);
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
}

.download-all-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.download-all-btn svg {
  width: 20px;
  height: 20px;
}

/* Spinner animation */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Stories Grid */
.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  justify-items: center;
}

/* Story Item */
.story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.story-frame {
  width: 300px;
  height: 600px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  background: #000;
}

.story-frame:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
}

.story-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-align: center;
  padding: 0.5rem 1rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.story {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Story Backgrounds */
.story-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.title-bg {
  background: linear-gradient(135deg, 
    #8B5CF6 0%,
    #D946EF 30%,
    #F97316 60%,
    #8B5CF6 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
}

.bg-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-2 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.bg-3 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.bg-4 {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.bg-5 {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.bg-6 {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, 
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  animation: patternMove 20s linear infinite;
}

/* Story Content */
.story-content {
  position: relative;
  z-index: 1;
  padding: 1.25rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  overflow: hidden;
}

/* Title Story Styles */
.logo-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
}

.main-logo {
  filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8));
  z-index: 2;
}

.brand-name {
  font-size: 2.75rem;
  font-weight: 900;
  margin: 0;
  line-height: 1;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.web-text {
  color: white;
}

.core-text {
  color: #FFD700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
}

.brand-tagline {
  font-size: 0.95rem;
  opacity: 0.9;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
}

.title-section {
  text-align: center;
  margin: 1rem 0;
}

.main-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.highlight-text {
  color: #FFD700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
}

.subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  font-weight: 300;
}

.cta-section {
  text-align: center;
}

.swipe-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  opacity: 0.9;
  animation: swipePulse 2s ease-in-out infinite;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
}

/* Floating Elements for Title */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  animation: floatIcon 4s ease-in-out infinite;
}

.icon-1 {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.icon-2 {
  top: 25%;
  right: 15%;
  animation-delay: 1s;
}

.icon-3 {
  bottom: 35%;
  left: 15%;
  animation-delay: 2s;
}

.icon-4 {
  bottom: 25%;
  right: 10%;
  animation-delay: 3s;
}

.icon-5 {
  top: 45%;
  left: 5%;
  animation-delay: 4s;
}

/* Advantage Story Styles */
.advantage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.advantage-icon {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.advantage-number {
  font-size: 2rem;
  font-weight: 900;
  opacity: 0.3;
}

.advantage-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.advantage-title {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
}

.advantage-description {
  font-size: 1rem;
  line-height: 1.3;
  opacity: 0.9;
  margin: 0;
}

.advantage-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  flex: 1;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 0.125rem;
}

.stat-label {
  font-size: 0.7rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.advantage-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.3;
}

.feature-item svg {
  color: #4ade80;
  flex-shrink: 0;
}

.cta-footer {
  text-align: center;
  flex-shrink: 0;
  margin-top: auto;
}

.cta-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: 0 auto;
  white-space: nowrap;
  min-width: fit-content;
}

.cta-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* Download Instructions */
.download-instructions {
  max-width: 800px;
  margin: 4rem auto 2rem;
  padding: 2rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.download-instructions h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.download-instructions h3::before {
  content: '📱';
  font-size: 1.25rem;
}

.download-instructions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.download-instructions li {
  padding: 0.75rem 0;
  color: var(--color-text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  border-bottom: 1px solid var(--color-border-primary);
}

.download-instructions li:last-child {
  border-bottom: none;
}

.download-instructions li::before {
  content: '✓';
  color: var(--color-accent-primary);
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* Animations */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes logoGlow {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)); }
  50% { filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.8)); }
}


@keyframes swipePulse {
  0%, 100% { opacity: 0.8; transform: translateX(0); }
  50% { opacity: 1; transform: translateX(5px); }
}

@keyframes floatIcon {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
  25% { transform: translateY(-10px) rotate(5deg); opacity: 0.8; }
  75% { transform: translateY(-5px) rotate(-3deg); opacity: 0.7; }
}

@keyframes patternMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, 30px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .stories-page {
    padding: 1rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
  
  .stories-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .story-frame {
    width: 280px;
    height: 580px;
  }
  
  .story-content {
    padding: 1rem 0.875rem;
  }
  
  .advantage-content {
    gap: 0.75rem;
  }
  
  .cta-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.85rem;
  }
  
  .download-instructions {
    margin: 2rem auto 1rem;
    padding: 1.5rem;
  }
  
  .download-instructions h3 {
    font-size: 1.25rem;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .brand-name {
    font-size: 2.25rem;
  }
  
  .logo-container {
    margin-bottom: 1rem;
    padding: 0.75rem;
  }
  
  .advantage-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .stories-page {
    padding: 0.75rem;
  }
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .stories-grid {
    gap: 1rem;
  }
  
  .story-frame {
    width: 260px;
    height: 520px;
  }
  
  .story-label {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
  
  .download-instructions {
    padding: 1rem;
  }
  
  .main-title {
    font-size: 1.75rem;
  }
  
  .brand-name {
    font-size: 1.875rem;
  }
  
  .logo-container {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
  }
  
  .main-logo {
    width: 100px !important;
    height: 100px !important;
  }
  
  .advantage-title {
    font-size: 1.5rem;
  }
  
  .advantage-description {
    font-size: 1rem;
  }
  
  .stat-number {
    font-size: 1.25rem;
  }
  
  .feature-item {
    font-size: 0.8rem;
  }
}
</style>
