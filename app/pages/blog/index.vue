<template>
  <div class="blog-page">
    <!-- Animated Background -->
    <div class="blog-background">
      <div class="animated-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="grid-pattern"></div>
    </div>

    <section class="blog-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <Icon name="mdi:newspaper-variant-outline" size="md" class="badge-icon" />
            <span>Блог WebCore</span>
          </div>
          <h1 class="hero-title">
            Експертні <span class="gradient-text">знання</span> для вашого успіху
          </h1>
          <p class="hero-description">
            Корисні статті про веб-розробку, дизайн та digital-маркетинг від команди професіоналів
          </p>
        </div>
      </div>
    </section>

    <section class="blog-content">
      <div class="container">
        <div class="blog-grid">
          <div v-if="!blogPosts || blogPosts.length === 0" class="no-posts">
            <Icon name="mdi:newspaper-variant-outline" size="xl" class="no-posts-icon" />
            <h3>Статті завантажуються...</h3>
            <p>Зачекайте, будь ласка, поки завантажуються статті блогу.</p>
          </div>
          
          <article 
            v-for="(post, index) in blogPosts" 
            :key="post._path || post.slug || index"
            class="blog-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="card-glow"></div>
            <div class="card-pattern"></div>
            <div class="card-accent-line"></div>
            
            <div class="blog-image">
              <img 
                :src="post.meta.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'" 
                :alt="post.title"
                loading="lazy"
                class="post-image"
              />
              <div class="image-overlay">
                <div class="read-time">
                  <Icon name="mdi:clock-outline" size="sm" />
                  {{ post.meta.readTime || '5 хв' }}
                </div>
              </div>
            </div>

            <div class="blog-card-content">
              <div class="blog-card-header">
                <span class="blog-date">{{ formatDate(post.meta.date) }}</span>
                  <span class="blog-category" :class="`category-${post.meta.category?.toLowerCase()}`">
                    {{ post.meta.category }}
                  </span>
              </div>
              
              <h3 class="blog-title">{{ post.title }}</h3>
              <p class="blog-excerpt">{{ post.description }}</p>
              
              <div class="blog-tags" v-if="post.meta.tags && post.meta.tags.length">
                <span v-for="tag in post.meta.tags.slice(0, 3)" :key="tag" class="blog-tag">
                  {{ tag }}
                </span>
              </div>
              
              <NuxtLink 
                :to="post._path || '/blog'" 
                class="blog-link"
                @click="handlePostClick(post)"
              >
                <span>Читати статтю</span>
                <Icon name="mdi:arrow-right" size="sm" class="link-icon" />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Floating Particles -->
    <div class="floating-particles">
      <div class="particle" v-for="i in 10" :key="i" :style="getParticleStyle(i)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../components/Icon.vue'

// Fetch blog posts from Nuxt Content
const { data: blogPosts } = await useAsyncData('blog', async () => {
  try {
    const posts = await queryCollection('blog').all()
    
    // Generate slug and _path from available data
    const postsWithSlugs = posts.map(post => {
      // Use path field if available, otherwise generate from _id
      if (post.path) {
        post._path = post.path
        post.slug = post.path.split('/').pop()
      } else if (post._id) {
        // Extract filename from _id (usually something like blog/filename.md)
        const filename = post._id.split('/').pop()?.replace('.md', '')
        post.slug = filename
        post._path = `/blog/${filename}`
      }
      return post
    })
    
    console.log('Blog posts with generated paths:', postsWithSlugs.map(p => ({ 
      title: p.title, 
      _path: p._path,
      path: p.path,
      slug: p.slug,
      _id: p._id,
      date: p.date,
      dateType: typeof p.date,
      metaDate: p.meta?.date,
      metaDateType: typeof p.meta?.date
    })))
    
    // Manual sort by date
    if (postsWithSlugs && postsWithSlugs.length > 0) {
      return postsWithSlugs.sort((a, b) => {
        const dateA = new Date(a.meta?.date || 0)
        const dateB = new Date(b.meta?.date || 0)
        
        // Handle invalid dates
        if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0
        if (isNaN(dateA.getTime())) return 1
        if (isNaN(dateB.getTime())) return -1
        
        return dateB.getTime() - dateA.getTime()
      })
    }
    
    return postsWithSlugs || []
  } catch (err) {
    console.error('Error loading blog posts:', err)
    return []
  }
})

// @ts-ignore
useHead({
  title: 'Блог - WebCore | Експертні знання про веб-розробку',
  meta: [
    { name: 'description', content: 'Корисні статті про веб-розробку, дизайн та digital-маркетинг від команди WebCore. Практичні поради та експертні знання для вашого успіху.' },
    { name: 'keywords', content: 'блог, веб-розробка, дизайн, маркетинг, SEO, оптимізація, landing page, тренди' }
  ]
})

// Format date function
const formatDate = (dateString: string | Date) => {
  if (!dateString) return 'Дата не вказана'
  
  let date: Date
  if (dateString instanceof Date) {
    date = dateString
  } else {
    date = new Date(dateString)
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.warn('Invalid date:', dateString)
    return 'Невірна дата'
  }
  
  return date.toLocaleDateString('uk-UA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// PostHog analytics
const { $posthog } = useNuxtApp()

// Трекінг перегляду блогу
onMounted(() => {
  if ($posthog) {
    $posthog.capture('blog_page_viewed', {
      posts_count: blogPosts.value?.length || 0,
      timestamp: new Date().toISOString()
    })
  }
})

// Handle post click for debugging and analytics
const handlePostClick = (post: any) => {
  console.log('Post clicked:', post)
  console.log('Post _path:', post._path)
  console.log('Post slug:', post.slug)
  console.log('Will navigate to:', post._path || '/blog')
  
  // PostHog трекінг кліку на статтю
  if ($posthog) {
    $posthog.capture('blog_post_clicked', {
      post_title: post.title,
      post_category: post.meta?.category,
      post_slug: post.slug,
      post_path: post._path,
      timestamp: new Date().toISOString()
    })
  }
}

// Generate consistent particle styles (no random for SSR compatibility)
const getParticleStyle = (index: number) => {
  // Use index to create consistent but varied styles
  const size = (index % 3) + 2
  const left = (index * 13.7) % 100
  const animationDuration = 20 + (index % 10) * 2
  const delay = (index * 0.8) % 5
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${delay}s`
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
  position: relative;
  z-index: 2;
}

/* Blog Page */
.blog-page {
  min-height: 100vh;
  padding-top: 70px;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.blog-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.animated-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 30% 70% 70% 30%;
  filter: blur(80px);
  opacity: 0.3;
  animation: morphShape 25s ease-in-out infinite;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  top: -10%;
  left: -5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
  bottom: -5%;
  right: -10%;
  animation-delay: 8s;
}

.shape-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, var(--color-accent-tertiary), var(--color-accent-primary));
  top: 40%;
  right: 20%;
  animation-delay: 16s;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, transparent 0%, var(--color-bg-primary) 80%);
  z-index: 1;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(var(--color-border-primary) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-primary) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.1;
  z-index: 1;
  animation: gridMove 30s linear infinite;
}

/* Hero Section */
.blog-hero {
  padding: 6rem 0;
  position: relative;
  z-index: 2;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-accent);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent-primary);
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
  animation: badgeFloat 3s ease-in-out infinite;
}

.badge-icon {
  color: var(--color-accent-tertiary);
  animation: iconSpin 8s linear infinite;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 650px;
  margin: 0 auto;
}

/* Blog Content */
.blog-content {
  padding: 6rem 0;
  position: relative;
  z-index: 2;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
}

.no-posts {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  background: var(--color-card-bg);
  border-radius: 24px;
  border: 1px solid var(--color-border-primary);
}

.no-posts-icon {
  color: var(--color-accent-primary);
  margin-bottom: 1rem;
  opacity: 0.7;
}

.no-posts h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.no-posts p {
  color: var(--color-text-secondary);
  font-size: 1.125rem;
}

@media (min-width: 1024px) {
  .blog-card {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards;
  }
}

.blog-card {
  background: var(--color-card-bg);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--color-border-primary);
  position: relative;
}

.blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.blog-card:hover::before {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 24px;
  z-index: 0;
  pointer-events: none;
}

.blog-card:hover .card-glow {
  opacity: 1;
  animation: glowPulse 3s ease-in-out infinite;
}

.card-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, var(--color-border-accent) 1px, transparent 0);
  background-size: 15px 15px;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.blog-card:hover .card-pattern {
  opacity: 0.05;
}

.card-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
  z-index: 2;
}

.blog-card:hover .card-accent-line {
  transform: scaleX(1);
}

.blog-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 24px 80px rgba(139, 92, 246, 0.25);
  border-color: var(--color-border-accent);
}

/* Blog Image */
.blog-image {
  position: relative;
  height: 240px;
  overflow: hidden;
  z-index: 2;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-card:hover .post-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(217, 70, 239, 0.8));
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.blog-card:hover .image-overlay {
  opacity: 1;
}

.read-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Blog Card Content */
.blog-card-content {
  padding: 2rem;
  position: relative;
  z-index: 2;
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
  font-weight: 500;
}

.blog-category {
  padding: 0.375rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.category-маркетинг {
  background: linear-gradient(135deg, #F59E0B, #F97316);
  color: white;
}

.category-дизайн {
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  color: white;
}

.category-розробка {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
}

.blog-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.blog-tag {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.blog-card:hover .blog-tag {
  background: var(--color-accent-primary);
  color: white;
  transform: translateY(-2px);
}

.blog-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-accent-primary);
  text-decoration: none;
  font-weight: 600;
  padding: 1rem 1.5rem;
  background: var(--color-bg-tertiary);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  margin: -1rem -1rem -1rem -1rem;
  margin-top: 1rem;
}

.blog-link:hover {
  background: var(--color-accent-primary);
  color: white;
  transform: translateY(-2px);
  border-color: var(--color-accent-secondary);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
}

.link-icon {
  transition: transform 0.3s ease;
}

.blog-link:hover .link-icon {
  transform: translateX(4px);
}

/* Floating Particles */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: var(--color-accent-primary);
  border-radius: 50%;
  opacity: 0.4;
  animation: floatUp linear infinite;
  filter: blur(1px);
}

/* Animations */
@keyframes morphShape {
  0%, 100% {
    border-radius: 30% 70% 70% 30%;
    transform: translate(0, 0);
  }
  25% {
    border-radius: 58% 42% 75% 25%;
    transform: translate(5%, -5%);
  }
  50% {
    border-radius: 50% 50% 33% 67%;
    transform: translate(0, 5%);
  }
  75% {
    border-radius: 33% 67% 58% 42%;
    transform: translate(-5%, 0);
  }
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

@keyframes badgeFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes iconSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glowPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.2;
  }
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-100px) translateX(30px);
    opacity: 0;
  }
}

/* Accessibility - Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .shape,
  .badge-icon,
  .particle,
  .grid-pattern,
  .hero-badge,
  .card-glow {
    animation: none !important;
  }

  .blog-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .post-image,
  .image-overlay,
  .blog-link {
    transition: none !important;
  }
}

/* Responsive Design */
@media (max-width: 1343px) {
  .blog-hero {
    padding: 4rem 0;
  }

  .hero-title {
    font-size: 3rem;
  }

  .blog-content {
    padding: 4rem 0;
  }

  .blog-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  .blog-card-content {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .blog-hero {
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .blog-content {
    padding: 3rem 0;
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .blog-image {
    height: 200px;
  }

  .blog-title {
    font-size: 1.25rem;
  }

  .blog-card-content {
    padding: 1.25rem;
  }
}

@media (max-width: 480px) {
  .blog-hero {
    padding: 2rem 0;
  }

  .hero-badge {
    font-size: 0.75rem;
    padding: 0.375rem 1rem;
    margin-bottom: 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .blog-content {
    padding: 2rem 0;
  }

  .blog-image {
    height: 180px;
  }

  .blog-card-content {
    padding: 1rem;
  }

  .blog-title {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }

  .blog-excerpt {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .blog-link {
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
  }
}
</style>
