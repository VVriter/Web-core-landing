<template>
  <div class="blog-post-page">
    <!-- Animated Background -->
    <div class="post-background">
      <div class="animated-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
      </div>
      <div class="gradient-overlay"></div>
    </div>

    <article class="blog-post" v-if="post">
      <!-- Post Header -->
      <header class="post-header">
        <div class="container">
          <nav class="breadcrumb">
            <NuxtLink to="/blog" class="breadcrumb-link">
              <Icon name="mdi:arrow-left" size="sm" />
              Повернутися до блогу
            </NuxtLink>
          </nav>

          <div class="post-meta">
            <div class="post-category" :class="`category-${post.meta?.category?.toLowerCase()}`">
              {{ post.meta?.category }}
            </div>
            <div class="post-info">
              <span class="post-date">{{ formatDate(post.meta?.date) }}</span>
              <span class="post-separator">•</span>
              <span class="post-read-time">
                <Icon name="mdi:clock-outline" size="sm" />
                {{ post.meta?.readTime || '5 хв' }}
              </span>
              <span class="post-separator">•</span>
              <span class="post-author">{{ post.meta?.author || 'WebCore Team' }}</span>
            </div>
          </div>

          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-description" v-if="post.description">{{ post.description }}</p>

          <div class="post-image" v-if="post.meta?.image">
            <img 
              :src="post.meta.image" 
              :alt="post.title"
              class="hero-image"
            />
          </div>

          <div class="post-tags" v-if="post.meta?.tags">
            <span v-for="tag in post.meta.tags" :key="tag" class="post-tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </header>

      <!-- Post Content -->
      <div class="post-content">
        <div class="container">
          <div class="content-wrapper">
            <div class="prose">
              <ContentRenderer :value="post" />
            </div>

            <!-- Table of Contents -->
            <aside class="toc" v-if="post.body?.toc?.links?.length">
              <div class="toc-header">
                <Icon name="mdi:format-list-bulleted" size="md" />
                <span>Зміст статті</span>
              </div>
              <nav class="toc-nav">
                <a 
                  v-for="link in post.body.toc.links" 
                  :key="link.id"
                  :href="`#${link.id}`"
                  class="toc-link"
                  :class="`toc-level-${link.depth}`"
                >
                  {{ link.text }}
                </a>
              </nav>
            </aside>
          </div>
        </div>
      </div>

      <!-- Post Footer -->
      <footer class="post-footer">
        <div class="container">
          <div class="share-section">
            <h3 class="share-title">Поділіться статтею</h3>
            <div class="share-buttons">
              <a 
                :href="shareLinks.facebook" 
                target="_blank" 
                class="share-btn facebook"
                aria-label="Поділитися у Facebook"
              >
                <Icon name="mdi:facebook" size="md" />
              </a>
              <a 
                :href="shareLinks.twitter" 
                target="_blank" 
                class="share-btn twitter"
                aria-label="Поділитися у Twitter"
              >
                <Icon name="mdi:twitter" size="md" />
              </a>
              <a 
                :href="shareLinks.linkedin" 
                target="_blank" 
                class="share-btn linkedin"
                aria-label="Поділитися у LinkedIn"
              >
                <Icon name="mdi:linkedin" size="md" />
              </a>
              <button 
                @click="copyLink" 
                class="share-btn copy"
                :class="{ 'copied': linkCopied }"
                aria-label="Скопіювати посилання"
              >
                <Icon :name="linkCopied ? 'mdi:check' : 'mdi:link'" size="md" />
              </button>
            </div>
          </div>

          <div class="cta-section">
            <div class="cta-card">
              <div class="cta-content">
                <h3 class="cta-title">Потрібна допомога з веб-розробкою?</h3>
                <p class="cta-description">
                  Наша команда готова втілити ваші ідеї в життя. Від концепції до запуску — ми забезпечимо професійний результат.
                </p>
                <NuxtLink to="/contact" class="cta-button">
                  <Icon name="mdi:rocket-launch" size="md" />
                  Замовити консультацію
                </NuxtLink>
              </div>
              <div class="cta-visual">
                <Icon name="mdi:code-tags" size="xl" class="cta-icon" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </article>

    <!-- Related Posts -->
    <section class="related-posts" v-if="relatedPosts?.length">
      <div class="container">
        <h2 class="related-title">Схожі статті</h2>
        <div class="related-grid">
          <article 
            v-for="relatedPost in relatedPosts" 
            :key="relatedPost._path || relatedPost.slug || relatedPost.title"
            class="related-card"
          >
            <div class="related-image">
              <img 
                :src="relatedPost.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'" 
                :alt="relatedPost.title"
                loading="lazy"
              />
            </div>
            <div class="related-content">
              <div class="related-category" :class="`category-${relatedPost.category?.toLowerCase()}`">
                {{ relatedPost.category }}
              </div>
              <h3 class="related-card-title">{{ relatedPost.title }}</h3>
              <p class="related-excerpt">{{ relatedPost.description }}</p>
              <NuxtLink :to="relatedPost._path || '/blog'" class="related-link">
                Читати далі
                <Icon name="mdi:arrow-right" size="sm" />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Floating Particles -->
    <div class="floating-particles">
      <div class="particle" v-for="i in 8" :key="i" :style="getParticleStyle(i)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../../../components/Icon.vue'

// Get the current route
const route = useRoute()
const slug = route.params.slug as string[]

// Fetch the blog post
const { data: post } = await useAsyncData(`blog-${slug?.join('/')}`, async () => {
  try {
    const postSlug = slug?.join('/')
    console.log('Looking for post with slug:', postSlug)
    console.log('Raw slug params:', slug)
    
    const posts = await queryCollection('blog').all()
    
    // Generate slugs from available data
    const postsWithSlugs = posts.map(post => {
      // Use path field if available, otherwise generate from _id
      if (post.path) {
        post._path = post.path
        post.slug = post.path.split('/').pop()
      } else if (post._id) {
        const filename = post._id.split('/').pop()?.replace('.md', '')
        post.slug = filename
        post._path = `/blog/${filename}`
      }
      return post
    })
    
    console.log('All posts with slugs:', postsWithSlugs.map(p => ({ 
      title: p.title, 
      _path: p._path, 
      slug: p.slug, 
      _id: p._id 
    })))
    
    // Find post by slug - try different matching strategies
    let foundPost = postsWithSlugs.find(p => p.slug === postSlug)
    
    // If not found, try matching with the last part of _path
    if (!foundPost) {
      foundPost = postsWithSlugs.find(p => p._path?.endsWith(`/${postSlug}`))
    }
    
    // If still not found, try matching with filename from _id
    if (!foundPost) {
      foundPost = postsWithSlugs.find(p => {
        if (p._id) {
          const filename = p._id.split('/').pop()?.replace('.md', '')
          return filename === postSlug
        }
        return false
      })
    }
    
    if (foundPost) {
      console.log('Found post:', foundPost.title)
      return foundPost
    }
    
    console.log('No post found for slug:', postSlug)
    console.log('Available slugs:', postsWithSlugs.map(p => p.slug))
    return null
  } catch (err) {
    console.error('Error loading blog post:', err)
    return null
  }
})

// Fetch related posts
const { data: relatedPosts } = await useAsyncData('related-posts', async () => {
  if (!post.value?.meta?.category) return []
  try {
    const posts = await queryCollection('blog').all()
    return posts
      .filter(p => p.meta?.category === post.value?.meta?.category && p._path !== post.value?._path)
      .slice(0, 3)
  } catch (err) {
    console.error('Error loading related posts:', err)
    return []
  }
})

// 404 if post not found
if (!post.value) {
  console.log('Post not found, throwing 404')
  throw createError({
    statusCode: 404,
    statusMessage: 'Стаття не знайдена'
  })
}

console.log('Post loaded successfully:', post.value.title)

// SEO
// @ts-ignore
useHead({
  title: `${post.value.title} | WebCore Blog`,
  meta: [
    { name: 'description', content: post.value.description },
    { name: 'keywords', content: post.value.meta?.tags?.join(', ') },
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: post.value.description },
    { property: 'og:image', content: post.value.meta?.image },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: post.value.meta?.date },
    { property: 'article:author', content: post.value.meta?.author },
    { property: 'article:section', content: post.value.meta?.category },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.value.title },
    { name: 'twitter:description', content: post.value.description },
    { name: 'twitter:image', content: post.value.meta?.image }
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

// Share functionality
const linkCopied = ref(false)

const shareLinks = computed(() => {
  const url = encodeURIComponent(window?.location?.href || '')
  const title = encodeURIComponent(post.value?.title || '')
  const description = encodeURIComponent(post.value?.description || '')

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${description}`
  }
})

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

// Generate consistent particle styles (no random for SSR compatibility)
const getParticleStyle = (index: number) => {
  // Use index to create consistent but varied styles
  const size = (index % 3) + 2
  const left = (index * 17.3) % 100
  const animationDuration = 25 + (index % 8) * 3
  const delay = (index * 1.2) % 8
  
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

/* Blog Post Page */
.blog-post-page {
  min-height: 100vh;
  padding-top: 70px;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.post-background {
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
  filter: blur(100px);
  opacity: 0.2;
  animation: morphShape 30s ease-in-out infinite;
}

.shape-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  top: -20%;
  right: -10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
  bottom: -10%;
  left: -5%;
  animation-delay: 15s;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, transparent 0%, var(--color-bg-primary) 85%);
  z-index: 1;
}

/* Post Header */
.post-header {
  padding: 4rem 0;
  position: relative;
  z-index: 2;
}

.breadcrumb {
  margin-bottom: 2rem;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border-primary);
  background: var(--color-card-bg);
}

.breadcrumb-link:hover {
  color: var(--color-accent-primary);
  border-color: var(--color-accent-primary);
}

.post-meta {
  margin-bottom: 2rem;
}

.post-category {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
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

.post-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.post-separator {
  opacity: 0.5;
}

.post-date,
.post-read-time,
.post-author {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.post-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--color-text-primary);
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.post-description {
  font-size: 1.375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 800px;
}

.post-image {
  margin-bottom: 2rem;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.hero-image {
  width: 100%;
  max-width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  border-radius: 16px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.post-tag {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.post-tag:hover {
  background: var(--color-accent-primary);
  color: white;
  transform: translateY(-2px);
}

/* Post Content */
.post-content {
  padding: 4rem 0;
  position: relative;
  z-index: 2;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4rem;
  align-items: start;
}

.prose {
  max-width: none;
  color: var(--color-text-primary);
  line-height: 1.8;
  font-size: 1.125rem;
}

/* Table of Contents */
.toc {
  position: sticky;
  top: 100px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.toc-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-primary);
}

.toc-nav {
  display: flex;
  flex-direction: column;
}

.toc-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.5rem 0;
  border-left: 2px solid transparent;
  padding-left: 1rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  line-height: 1.4;
}

.toc-link:hover {
  color: var(--color-accent-primary);
  border-left-color: var(--color-accent-primary);
  padding-left: 1.25rem;
}

.toc-level-3 {
  padding-left: 2rem;
  font-size: 0.85rem;
}

.toc-level-4 {
  padding-left: 3rem;
  font-size: 0.8rem;
}

/* Post Footer */
.post-footer {
  padding: 4rem 0;
  border-top: 1px solid var(--color-border-primary);
  position: relative;
  z-index: 2;
}

.share-section {
  margin-bottom: 4rem;
  text-align: center;
}

.share-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.share-btn.facebook {
  background: #1877F2;
  color: white;
}

.share-btn.twitter {
  background: #1DA1F2;
  color: white;
}

.share-btn.linkedin {
  background: #0A66C2;
  color: white;
}

.share-btn.copy {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.share-btn.copy.copied {
  background: #10B981;
  color: white;
}

.share-btn:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* CTA Section */
.cta-section {
  margin-top: 4rem;
}

.cta-card {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></svg>') repeat;
  background-size: 30px 30px;
}

.cta-content {
  flex: 1;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.cta-description {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  color: var(--color-accent-primary);
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.cta-visual {
  position: relative;
  z-index: 2;
}

.cta-icon {
  font-size: 4rem;
  opacity: 0.8;
}

/* Related Posts */
.related-posts {
  padding: 6rem 0;
  background: var(--color-bg-secondary);
  position: relative;
  z-index: 2;
}

.related-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: 3rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.related-card {
  background: var(--color-card-bg);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border-primary);
}

.related-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);
  border-color: var(--color-accent-primary);
}

.related-image {
  height: 200px;
  overflow: hidden;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-card:hover .related-image img {
  transform: scale(1.05);
}

.related-content {
  padding: 1.5rem;
}

.related-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.related-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-accent-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.related-link:hover {
  color: var(--color-accent-secondary);
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
  opacity: 0.3;
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

@keyframes floatUp {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100px) translateX(30px);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1343px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .toc {
    position: static;
    order: -1;
  }

  .post-title {
    font-size: 3rem;
  }

  .cta-card {
    padding: 2rem;
    flex-direction: column;
    text-align: center;
  }

  .cta-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .post-header {
    padding: 1.5rem 0;
  }

  .post-title {
    font-size: 2.25rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .post-description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .post-meta {
    margin-bottom: 1.5rem;
  }

  .post-info {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .post-category {
    font-size: 0.7rem;
    padding: 0.25rem 0.75rem;
  }

  .post-date,
  .post-read-time,
  .post-author {
    font-size: 0.875rem;
  }

  .hero-image {
    height: 220px;
    margin: 1rem 0;
  }

  .post-tags {
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .post-tag {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }

  .prose {
    font-size: 1rem;
    line-height: 1.7;
  }

  .post-content {
    padding: 1.5rem 0;
  }

  .content-wrapper {
    display: block;
  }

  .toc {
    display: none; /* Приховуємо TOC на мобільних */
  }

  .post-footer {
    padding: 2rem 0;
  }

  .share-section {
    margin-bottom: 2rem;
  }

  .share-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .cta-section {
    margin-top: 2rem;
  }

  .cta-card {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;
  }

  .cta-title {
    font-size: 1.375rem;
    margin-bottom: 0.75rem;
  }

  .cta-description {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }

  .cta-visual {
    margin-top: 1rem;
    order: -1;
  }

  .cta-icon {
    opacity: 0.3;
  }

  .related-posts {
    padding: 3rem 0;
  }

  .related-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .related-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .related-image {
    height: 180px;
  }

  .related-content {
    padding: 1.25rem;
  }

  .related-card-title {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .related-excerpt {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }

  .post-header {
    padding: 1rem 0;
  }

  .post-title {
    font-size: 1.75rem;
    line-height: 1.3;
    margin-bottom: 0.75rem;
  }

  .post-description {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .post-meta {
    margin-bottom: 1rem;
  }

  .post-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.375rem;
  }

  .post-category {
    font-size: 0.65rem;
    padding: 0.2rem 0.6rem;
  }

  .post-date,
  .post-read-time,
  .post-author {
    font-size: 0.8rem;
  }

  .hero-image {
    height: 180px;
    margin: 0.75rem 0;
    border-radius: 8px;
  }

  .post-tags {
    gap: 0.375rem;
    margin: 0.75rem 0;
  }

  .post-tag {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
  }

  .post-content {
    padding: 1rem 0;
  }

  .post-footer {
    padding: 1.5rem 0;
  }

  .share-section {
    margin-bottom: 1.5rem;
  }

  .share-title {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }

  .share-buttons {
    gap: 0.75rem;
    justify-content: center;
  }

  .share-btn {
    width: 42px;
    height: 42px;
    font-size: 1rem;
  }

  .cta-section {
    margin-top: 1.5rem;
  }

  .cta-card {
    padding: 1.25rem;
    border-radius: 12px;
  }

  .cta-title {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .cta-description {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }

  .cta-button {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    border-radius: 8px;
  }

  .related-posts {
    padding: 2rem 0;
  }

  .related-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .related-grid {
    gap: 1.25rem;
  }

  .related-image {
    height: 160px;
  }

  .related-content {
    padding: 1rem;
  }

  .related-card-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .related-excerpt {
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }

  .related-link {
    font-size: 0.9rem;
  }
}

/* Prose Styling */
:deep(.prose) {
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--color-text-primary);
    font-weight: 700;
    line-height: 1.3;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }

  a {
    color: var(--color-accent-primary);
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--color-accent-secondary);
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.7;
  }

  blockquote {
    border-left: 4px solid var(--color-accent-primary);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--color-text-secondary);
    background: var(--color-bg-tertiary);
    padding: 1.5rem;
    border-radius: 8px;
  }

  code {
    background: var(--color-bg-tertiary);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9em;
    color: var(--color-accent-primary);
  }

  pre {
    background: var(--color-bg-tertiary);
    padding: 1.5rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 2rem 0;
    border: 1px solid var(--color-border-primary);
  }

  pre code {
    background: none;
    padding: 0;
    color: var(--color-text-primary);
  }

  img {
    max-width: 100%;
    height: auto;
    width: auto;
    border-radius: 12px;
    margin: 2rem auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    display: block;
    object-fit: cover;
  }
  
  /* Спеціальні стилі для великих зображень */
  img[src*="unsplash"] {
    max-height: 500px;
    object-fit: cover;
    width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    background: var(--color-card-bg);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border-primary);
  }

  th {
    background: var(--color-bg-tertiary);
    font-weight: 600;
    color: var(--color-text-primary);
  }

  hr {
    border: none;
    height: 1px;
    background: var(--color-border-primary);
    margin: 3rem 0;
  }
}

/* Mobile Prose Styling */
@media (max-width: 1343px) {
  :deep(.prose) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.375rem; }
    h4 { font-size: 1.125rem; }
    
    h1, h2, h3, h4, h5, h6 {
      margin-top: 2rem;
      margin-bottom: 0.75rem;
    }
    
    pre {
      padding: 1rem;
      margin: 1.5rem 0;
      overflow-x: auto;
      font-size: 0.875rem;
    }
    
    blockquote {
      padding: 1rem;
      margin: 1.5rem 0;
    }
    
    ul, ol {
      padding-left: 1.5rem;
      margin-bottom: 1.25rem;
    }
    
    table {
      font-size: 0.875rem;
    }
    
    th, td {
      padding: 0.75rem 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  :deep(.prose) {
    h1 { font-size: 1.75rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    h4 { font-size: 1.125rem; }
    
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      margin-bottom: 1.25rem;
      line-height: 1.7;
    }
    
    pre {
      padding: 0.75rem;
      margin: 1rem 0;
      font-size: 0.8rem;
      border-radius: 8px;
    }
    
    blockquote {
      padding: 0.75rem;
      margin: 1rem 0;
      padding-left: 1rem;
      border-radius: 6px;
    }
    
    ul, ol {
      padding-left: 1.25rem;
      margin-bottom: 1rem;
    }
    
    li {
      margin-bottom: 0.375rem;
    }
    
    img {
      max-width: 100%;
      height: auto;
      width: auto;
      margin: 1.5rem auto;
      border-radius: 8px;
      display: block;
      object-fit: cover;
    }
    
    img[src*="unsplash"] {
      max-height: 400px;
      object-fit: cover;
      width: 100%;
    }
    
    table {
      font-size: 0.8rem;
      border-radius: 8px;
    }
    
    th, td {
      padding: 0.5rem 0.375rem;
    }
  }
}

@media (max-width: 480px) {
  :deep(.prose) {
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.375rem; }
    h3 { font-size: 1.125rem; }
    h4 { font-size: 1rem; }
    
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    
    pre {
      padding: 0.5rem;
      margin: 0.75rem 0;
      font-size: 0.75rem;
      border-radius: 6px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    
    pre::-webkit-scrollbar {
      height: 4px;
    }
    
    pre::-webkit-scrollbar-track {
      background: var(--color-bg-tertiary);
      border-radius: 2px;
    }
    
    pre::-webkit-scrollbar-thumb {
      background: var(--color-accent-primary);
      border-radius: 2px;
    }
    
    blockquote {
      padding: 0.5rem;
      margin: 0.75rem 0;
      padding-left: 0.75rem;
      border-radius: 4px;
      font-size: 0.95rem;
    }
    
    code {
      font-size: 0.8em;
      padding: 0.2rem 0.4rem;
    }
    
    ul, ol {
      padding-left: 1rem;
      margin-bottom: 0.75rem;
    }
    
    li {
      margin-bottom: 0.25rem;
      font-size: 0.95rem;
    }
    
    img {
      max-width: 100%;
      height: auto;
      width: auto;
      margin: 1rem auto;
      border-radius: 6px;
      display: block;
      object-fit: cover;
    }
    
    img[src*="unsplash"] {
      max-height: 300px;
      object-fit: cover;
      width: 100%;
    }
    
    table {
      font-size: 0.75rem;
      border-radius: 6px;
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }
    
    table::-webkit-scrollbar {
      height: 4px;
    }
    
    table::-webkit-scrollbar-track {
      background: var(--color-bg-tertiary);
      border-radius: 2px;
    }
    
    table::-webkit-scrollbar-thumb {
      background: var(--color-accent-primary);
      border-radius: 2px;
    }
    
    th, td {
      padding: 0.375rem 0.5rem;
      min-width: 80px;
    }
    
    hr {
      margin: 2rem 0;
    }
  }
}
</style>
