"""
Seed starter job openings into MongoDB.

Usage:
    python manage.py seed_careers            # add roles that don't exist yet
    python manage.py seed_careers --reset    # delete ALL jobs first, then seed

Edit the SEED_JOBS list below (or manage roles through the API) to change
what appears on the /careers page. Applications are never touched.
"""

import datetime

from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify

from apps.utils.mongo import get_mongo_db

SEED_JOBS = [
    {
        'title': 'Frontend Engineer',
        'department': 'Engineering',
        'type': 'Full-time',
        'work_mode': 'Hybrid',
        'location': 'Indore, India',
        'experience': '2+ years',
        'summary': (
            'Build fast, accessible and beautifully animated interfaces for client '
            'platforms using React and modern tooling.'
        ),
        'responsibilities': [
            'Ship production React interfaces from design files and product briefs',
            'Own performance, accessibility and animation quality',
            'Collaborate closely with designers and backend engineers',
            'Review code and raise the quality bar for the team',
        ],
        'requirements': [
            'Strong React, JavaScript / TypeScript and CSS fundamentals',
            'A portfolio or GitHub that shows work you are proud of',
        ],
        'nice_to_have': ['Tailwind, Framer Motion or GSAP experience'],
        'skills': ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        'openings': 2,
        'order': 1,
    },
    {
        'title': 'Backend Engineer (Python / Django)',
        'department': 'Engineering',
        'type': 'Full-time',
        'work_mode': 'Hybrid',
        'location': 'Indore, India',
        'experience': '2+ years',
        'summary': (
            'Design reliable APIs and data pipelines that power web platforms, '
            'AI features and enterprise integrations.'
        ),
        'responsibilities': [
            'Design and build REST APIs with Django and DRF',
            'Integrate third-party services, payments and AI providers',
            'Model data and keep systems secure, observable and fast',
            'Write tests and own your deployments',
        ],
        'requirements': [
            'Solid Python and Django / DRF experience',
            'Comfort with SQL / NoSQL databases and cloud deployment',
            'Clear written communication and a debugging mindset',
        ],
        'nice_to_have': ['MongoDB experience', 'Experience integrating LLM APIs'],
        'skills': ['Python', 'Django', 'REST APIs', 'MongoDB', 'Docker'],
        'openings': 1,
        'order': 2,
    },
    {
        'title': 'Full Stack Engineer',
        'department': 'Engineering',
        'type': 'Full-time',
        'work_mode': 'Hybrid',
        'location': 'Indore, India',
        'experience': '3+ years',
        'summary': (
            'Own entire feature lifecycles from database modeling and API architecture '
            'to polished client-side user experiences.'
        ),
        'responsibilities': [
            'Architect scalable web solutions with React/Next.js and Node.js or Python',
            'Build real-time systems, third-party integrations, and automated workflows',
            'Optimize full-stack web vitals, caching layers, and database queries',
            'Mentor junior developers and participate in code reviews',
        ],
        'requirements': [
            'Deep expertise in React ecosystem alongside Python or Node.js',
            'Experience with database schema design (PostgreSQL / MongoDB)',
            'Strong systems design instincts and autonomous problem solving',
        ],
        'nice_to_have': ['GraphQL, Redis caching, microservices experience'],
        'skills': ['React', 'Node.js', 'Python', 'PostgreSQL', 'Next.js'],
        'openings': 2,
        'order': 3,
    },
    {
        'title': 'AI / ML Solutions Engineer',
        'department': 'Engineering',
        'type': 'Full-time',
        'work_mode': 'Remote',
        'location': 'Remote / Indore',
        'experience': '1-3 years',
        'summary': (
            'Integrate intelligent language models, retrieval pipelines (RAG), and '
            'autonomous agents into client software and internal tools.'
        ),
        'responsibilities': [
            'Develop customized RAG pipelines with vector databases and embeddings',
            'Fine-tune prompt chains and agentic workflows for business use cases',
            'Evaluate LLM outputs, reduce hallucinations, and optimize token usage',
            'Collaborate with product teams to discover high-leverage AI features',
        ],
        'requirements': [
            'Hands-on experience with OpenAI / Anthropic / Gemini APIs & LangChain/LlamaIndex',
            'Proficiency with Python, asynchronous APIs, and vector search',
            'Sharp focus on pragmatic, production-grade AI applications',
        ],
        'nice_to_have': ['Fine-tuning experience, Hugging Face models, PyTorch basics'],
        'skills': ['Python', 'OpenAI API', 'Vector Databases', 'LangChain', 'Prompt Engineering'],
        'openings': 1,
        'order': 4,
    },
    {
        'title': 'UI / UX Designer',
        'department': 'Design',
        'type': 'Full-time',
        'work_mode': 'Hybrid',
        'location': 'Indore, India',
        'experience': '1+ years',
        'summary': (
            'Turn complex business problems into clear, striking product '
            'experiences, from research to hi-fi prototypes.'
        ),
        'responsibilities': [
            'Lead discovery, flows, wireframes and visual design',
            'Create and maintain design systems',
            'Prototype interactions and hand off to engineering',
            'Present and defend design decisions with clients',
        ],
        'requirements': [
            'Strong Figma skills and a sharp visual eye',
            'A portfolio showing process, not just final screens',
            'Understanding of accessibility and responsive design',
        ],
        'nice_to_have': ['Motion / micro-interaction design'],
        'skills': ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
        'openings': 1,
        'order': 5,
    },
    {
        'title': 'Mobile App Developer (Flutter / React Native)',
        'department': 'Engineering',
        'type': 'Full-time',
        'work_mode': 'Hybrid',
        'location': 'Indore, India',
        'experience': '2+ years',
        'summary': (
            'Develop performant, native-feeling cross-platform iOS & Android mobile '
            'applications with seamless offline and push notifications support.'
        ),
        'responsibilities': [
            'Build and publish cross-platform mobile apps for iOS and Android',
            'Integrate REST/WebSocket APIs, offline caching, and native device modules',
            'Maintain continuous build and deployment pipelines (App Store / Play Store)',
            'Deliver 60fps animations and smooth gesture interactions',
        ],
        'requirements': [
            'Demonstrated experience shipping Flutter or React Native mobile apps',
            'Strong grasp of state management, mobile security, and local storage',
            'Live apps published on the App Store or Google Play Store',
        ],
        'nice_to_have': ['Native Swift/Kotlin bridge knowledge, Firebase suite'],
        'skills': ['Flutter', 'React Native', 'Dart', 'Mobile UI', 'REST APIs'],
        'openings': 1,
        'order': 6,
    },
    {
        'title': 'Digital Growth Intern',
        'department': 'Growth',
        'type': 'Internship',
        'work_mode': 'Remote',
        'location': 'Remote (India)',
        'experience': 'Freshers welcome',
        'summary': (
            'Help us tell our story (content, SEO, social and outreach) and learn '
            'how a modern tech studio finds its clients.'
        ),
        'responsibilities': [
            'Draft blog posts, case studies and social content',
            'Support SEO, analytics and email campaigns',
            'Research leads and assist with outreach',
        ],
        'requirements': [
            'Excellent written English and genuine curiosity about tech',
            'Familiarity with social platforms and basic analytics',
            'Self-starter who finishes what they start',
        ],
        'nice_to_have': [],
        'skills': ['Content Writing', 'SEO', 'Social Media'],
        'openings': 1,
        'order': 7,
    },
]


class Command(BaseCommand):
    help = 'Seed starter job openings into MongoDB (collection: careers_jobs).'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset', action='store_true',
            help='Delete all existing job openings before seeding.',
        )

    def handle(self, *args, **options):
        db = get_mongo_db()
        if db is None:
            raise CommandError('MongoDB is not connected. Check MONGO_URI in backend/.env.')

        coll = db['careers_jobs']
        if options['reset']:
            deleted = coll.delete_many({}).deleted_count
            self.stdout.write(self.style.WARNING(f'Deleted {deleted} existing job(s).'))

        created = 0
        for job in SEED_JOBS:
            if coll.find_one({'title': job['title']}, {'_id': 1}):
                self.stdout.write(f"Skipped (exists): {job['title']}")
                continue
            now = datetime.datetime.utcnow()
            coll.insert_one({
                **job,
                'slug': slugify(job['title']),
                'salary_range': '',
                'status': 'open',
                'created_by': 'seed_careers',
                'created_at': now,
                'updated_at': now,
            })
            created += 1
            self.stdout.write(self.style.SUCCESS(f"Created: {job['title']}"))

        self.stdout.write(self.style.SUCCESS(f'Done. {created} job(s) created.'))
