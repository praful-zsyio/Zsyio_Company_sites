import os
import django
import sys

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.services.models import Service

services_data = [
    {
      "id": 1,
      "slug": "custom-software-engineering",
      "title": "Custom Software Engineering",
      "description": "End-to-end bespoke software engineering designed for performance, enterprise reliability, and business growth.",
      "icon": "Code2",
      "icon_image": "/media/service_icons/software-engineering.png",
      "gradient": "from-blue-600 to-indigo-700",
      "base_rate": 150000.00,
      "hourly_rate": 2500.00,
      "typical_timeline": "6 - 12 weeks"
    },
    {
      "id": 2,
      "slug": "cloud-infrastructure-devops",
      "title": "Cloud Infrastructure & DevOps",
      "description": "Architecting resilient multi-cloud environments, automated CI/CD pipelines, and infrastructure-as-code solutions.",
      "icon": "CloudCog",
      "icon_image": "/media/service_icons/cloud-devops.png",
      "gradient": "from-indigo-500 to-cyan-600",
      "base_rate": 125000.00,
      "hourly_rate": 3000.00,
      "typical_timeline": "3 - 6 weeks"
    },
    {
      "id": 3,
      "slug": "enterprise-application-modernization",
      "title": "Application Modernization",
      "description": "Refactoring monolithic legacy systems into secure, scalable, and high-performance microservices architectures.",
      "icon": "RefreshCw",
      "icon_image": "/media/service_icons/app-modernization.png",
      "gradient": "from-emerald-500 to-teal-700",
      "base_rate": 175000.00,
      "hourly_rate": 3200.00,
      "typical_timeline": "8 - 16 weeks"
    },
    {
      "id": 4,
      "slug": "ai-machine-learning-solutions",
      "title": "AI & Intelligent Automation",
      "description": "Integrating generative AI models, LLM-driven agents, and predictive analytics to automate critical workflows.",
      "icon": "BrainCircuit",
      "icon_image": "/media/service_icons/ai-solutions.png",
      "gradient": "from-violet-600 to-purple-800",
      "base_rate": 200000.00,
      "hourly_rate": 3500.00,
      "typical_timeline": "6 - 10 weeks"
    },
    {
      "id": 5,
      "slug": "data-engineering-analytics",
      "title": "Data Engineering & Analytics",
      "description": "Building modern data warehouses, event-driven pipelines, and actionable business intelligence dashboards.",
      "icon": "DatabaseZap",
      "icon_image": "/media/service_icons/data-engineering.png",
      "gradient": "from-amber-500 to-orange-600",
      "base_rate": 140000.00,
      "hourly_rate": 2800.00,
      "typical_timeline": "4 - 8 weeks"
    },
    {
      "id": 6,
      "slug": "cybersecurity-compliance-services",
      "title": "Cybersecurity & Risk Management",
      "description": "Comprehensive security audits, vulnerability assessments, penetration testing, and zero-trust framework implementation.",
      "icon": "ShieldCheck",
      "icon_image": "/media/service_icons/cybersecurity.png",
      "gradient": "from-red-600 to-rose-700",
      "base_rate": 160000.00,
      "hourly_rate": 3500.00,
      "typical_timeline": "2 - 4 weeks"
    },
    {
      "id": 7,
      "slug": "api-ecosystem-systems-integration",
      "title": "API & Enterprise Systems Integration",
      "description": "Designing secure REST and GraphQL APIs to unify fragmented SaaS tools, internal databases, and external platforms.",
      "icon": "Network",
      "icon_image": "/media/service_icons/api-integration.png",
      "gradient": "from-teal-500 to-blue-600",
      "base_rate": 110000.00,
      "hourly_rate": 2400.00,
      "typical_timeline": "3 - 5 weeks"
    },
    {
      "id": 8,
      "slug": "ui-ux-design-product-strategy",
      "title": "Digital Product Design & Strategy",
      "description": "User-centric UI/UX research, rapid prototyping, and design systems built to elevate engagement and conversion rates.",
      "icon": "Palette",
      "icon_image": "/media/service_icons/product-design.png",
      "gradient": "from-pink-500 to-rose-600",
      "base_rate": 95000.00,
      "hourly_rate": 2000.00,
      "typical_timeline": "2 - 5 weeks"
    },
    {
      "id": 9,
      "slug": "mobile-cross-platform-development",
      "title": "Mobile Solutions Engineering",
      "description": "High-performance native and cross-platform mobile apps for iOS and Android with seamless backend synchronicity.",
      "icon": "Smartphone",
      "icon_image": "/media/service_icons/mobile-dev.png",
      "gradient": "from-sky-500 to-blue-700",
      "base_rate": 135000.00,
      "hourly_rate": 2500.00,
      "typical_timeline": "6 - 12 weeks"
    },
    {
      "id": 10,
      "slug": "managed-it-operational-support",
      "title": "Managed IT & SRE Support",
      "description": "24/7 proactive infrastructure monitoring, site reliability engineering (SRE), SLA management, and technical maintenance.",
      "icon": "Cpu",
      "icon_image": "/media/service_icons/managed-it.png",
      "gradient": "from-slate-700 to-zinc-900",
      "base_rate": 85000.00,
      "hourly_rate": 1800.00,
      "typical_timeline": "Ongoing / Retainer"
    }
]

from apps.utils.mongo import get_mongo_db

def seed_services():
    print(f"Starting to seed {len(services_data)} services...")
    
    db = get_mongo_db()
    if db is None:
        print("ERROR: MongoDB not connected. Check MONGO_URI in .env")
        sys.exit(1)
        
    coll = db['services']
    
    existing = coll.count_documents({})
    if existing:
        print(f"Clearing {existing} existing service(s)...")
        coll.delete_many({})
    
    for svc in services_data:
        icon_path = svc.get('icon_image')
        if icon_path and icon_path.startswith('/media/'):
            svc['icon_image'] = icon_path.replace('/media/', '')
            
    result = coll.insert_many(services_data)
    print(f"Seeded {len(result.inserted_ids)} services successfully.")
    
if __name__ == "__main__":
    seed_services()
