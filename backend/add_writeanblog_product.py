import os
import datetime
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.conf import settings

db = settings.MONGO_CLIENT['zsyio_db']
products_col = db['products']

product_data = {
    'name': 'WriteAnBlog',
    'title': 'WriteAnBlog - Community-Driven Editorial & Blogging Platform',
    'slug': 'writeanblog',
    'subtitle': 'Community-Driven Editorial & Blogging Platform',
    'tagline': 'A blogging platform for everyone',
    'category': 'Web Application',
    'client': 'In-house / Open Publishing',
    'status': 'Live',
    'live_url': 'https://writeanblog.com/',
    'liveUrl': 'https://writeanblog.com/',
    'repository_url': 'https://github.com/ayanmagardey/writeanblog',
    'thumbnail': 'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782395/projects/writeanblog/blog1.png',
    'image': 'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782395/projects/writeanblog/blog1.png',
    'cloudinary_image': 'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782395/projects/writeanblog/blog1.png',
    'images': [
        'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782395/projects/writeanblog/blog1.png',
        'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782397/projects/writeanblog/blog2.png',
        'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782398/projects/writeanblog/blog3.png',
        'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782402/projects/writeanblog/blog4.png',
        'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782403/projects/writeanblog/blog5.png'
    ],
    'screenshots': [
        {
            'url': 'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782395/projects/writeanblog/blog1.png',
            'caption': 'Landing page highlighting featured stories and daily historical deep dives'
        },
        {
            'url': 'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782402/projects/writeanblog/blog4.png',
            'caption': 'Chronological article feed with real-time engagement, reading metrics, and dark mode tag taxonomy'
        },
        {
            'url': 'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782397/projects/writeanblog/blog2.png',
            'caption': 'Immersive long-form article reading view with typography-first historical deep dive'
        },
        {
            'url': 'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782398/projects/writeanblog/blog3.png',
            'caption': 'Author publishing suite & rich-text editor with cover image uploader and draft manager'
        },
        {
            'url': 'https://res.cloudinary.com/damlvqiwv/image/upload/v1791782403/projects/writeanblog/blog5.png',
            'caption': 'Community member onboarding and author account creation portal'
        }
    ],
    'description': 'WriteAnBlog is a full-featured, content-first publishing and editorial platform engineered for both daily staff editorials and open community storytelling. It features automated daily publication feeds, tag discovery architectures, reading time estimators, interactive engagement metrics, and a curated newsletter digest pipeline.',
    'summary': 'Community-Driven Editorial & Blogging Platform engineered for daily staff editorials and open community storytelling.',
    'features': [
        'Curated Featured Showcase: Dynamic hero highlight system tailored for daily marquee essays and long-form investigative pieces.',
        'Chronological Editorial Stream: Infinite-scrolling community and staff feed with automated read-time calculations and publication timestamps.',
        'Taxonomy & Tag Engine: Granular multi-tag categorization allowing readers to filter between history, science, aviation, and engineering.',
        'Community & Author Profiles: Decoupled author model supporting institutional editorial boards as well as independent guest contributors.',
        'Social Signals & Analytics: Low-latency micro-interactions tracking article claps, bookmark counts, and comment threads.',
        'Automated Weekly Digest: Integrated newsletter subscription modal for sending weekly top-performing editorial essays.'
    ],
    'highlights': [
        'Curated Featured Showcase: Dynamic hero highlight system tailored for daily marquee essays and long-form investigative pieces.',
        'Chronological Editorial Stream: Infinite-scrolling community and staff feed with automated read-time calculations and publication timestamps.',
        'Taxonomy & Tag Engine: Granular multi-tag categorization allowing readers to filter between history, science, aviation, and engineering.',
        'Community & Author Profiles: Decoupled author model supporting institutional editorial boards as well as independent guest contributors.',
        'Social Signals & Analytics: Low-latency micro-interactions tracking article claps, bookmark counts, and comment threads.'
    ],
    'solutions': [
        'Editorial Content Delivery: Automated publication scheduling and high-readability typographic presentation.',
        'Granular Topic Discovery: Multi-faceted tagging system allowing quick navigation across specialized domains.',
        'Reader Engagement: Frictionless clap reactions, bookmark collections, and real-time read-time estimation.',
        'Audience Retention: Built-in automated weekly digest newsletter subscriptions.'
    ],
    'tech': [
        'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Node.js', 'Django REST Framework', 'PostgreSQL', 'Redis'
    ],
    'tech_stack': [
        'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Node.js', 'Django REST Framework', 'PostgreSQL', 'Redis'
    ],
    'metrics': {
        'published_articles': 48,
        'unique_authors': 3,
        'categories_count': 12,
        'average_read_time': '4 min',
        'popular_domains': ['History', 'Science & Space', 'Aviation', 'Software Engineering']
    },
    'stat_value': '48+',
    'stat_label': 'Published Articles',
    'accent': 'hsl(215, 85%, 60%)',
    'price': 0.0,
    'created_at': datetime.datetime.now(datetime.timezone.utc),
    'updated_at': datetime.datetime.now(datetime.timezone.utc)
}

res = products_col.update_one({'slug': 'writeanblog'}, {'$set': product_data}, upsert=True)
print(f"Upserted: matched={res.matched_count}, modified={res.modified_count}, upserted_id={res.upserted_id}")

# Also ensure TecxStop has 'name' explicitly set
products_col.update_one({'slug': 'tecxstop'}, {'$set': {'name': 'TecxStop'}})

print("\n--- Current Products in MongoDB ---")
for p in products_col.find():
    print(f"ID: {p.get('_id')} | Name: '{p.get('name')}' | Title: '{p.get('title')}' | Slug: '{p.get('slug')}'")
