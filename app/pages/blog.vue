<template>
  <div class="blog-page">
    <section class="blog-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Блог</h1>
          <p class="hero-description">
            Корисні статті про веб-розробку, дизайн та digital-маркетинг
          </p>
        </div>
      </div>
    </section>

    <section class="blog-content">
      <div class="container">
        <div class="blog-grid">
          <div 
            v-for="post in blogPosts" 
            :key="post.id"
            class="blog-card"
          >
            <div class="blog-card-header">
              <span class="blog-date">{{ post.date }}</span>
              <span class="blog-category">{{ post.category }}</span>
            </div>
            <h3 class="blog-title">{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <a href="#" class="blog-link">Читати далі →</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
useHead({
  title: 'Блог - WebCore',
  meta: [
    { name: 'description', content: 'Корисні статті про веб-розробку та digital-маркетинг' }
  ]
})

const blogPosts = [
  {
    id: 1,
    title: 'Як створити ефективний landing page',
    excerpt: 'Практичні поради зі створення лендінгу, який конвертує відвідувачів у клієнтів',
    date: '15 січня 2024',
    category: 'Маркетинг'
  },
  {
    id: 2,
    title: 'Сучасні тренди в веб-дизайні 2024',
    excerpt: 'Огляд найактуальніших тенденцій у дизайні веб-сайтів на поточний рік',
    date: '10 січня 2024',
    category: 'Дизайн'
  },
  {
    id: 3,
    title: 'Як покращити швидкість завантаження сайту',
    excerpt: 'Технічні прийоми та оптимізації для підвищення продуктивності веб-сайту',
    date: '5 січня 2024',
    category: 'Розробка'
  }
]
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.blog-page {
  min-height: 100vh;
  padding-top: 70px;
}

.blog-hero {
  padding: 4rem 0;
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.blog-content {
  padding: 4rem 0;
  background: var(--color-bg-secondary);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.blog-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px var(--color-shadow-color);
  border-color: var(--color-border-accent);
}

.blog-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.blog-date {
  color: var(--color-text-secondary);
}

.blog-category {
  background: var(--color-bg-tertiary);
  color: var(--color-accent-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.blog-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.blog-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.blog-link {
  color: var(--color-accent-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.blog-link:hover {
  color: var(--color-accent-secondary);
}

@media (max-width: 1343px) {
  .blog-hero {
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .blog-content {
    padding: 3rem 0;
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .blog-hero {
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .blog-card {
    padding: 1.5rem;
  }

  .blog-title {
    font-size: 1.25rem;
  }
}
</style>
