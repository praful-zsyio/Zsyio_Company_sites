"""
Seed script: inserts 4 example products into the MongoDB 'products' collection.
Run with: .\venv\Scripts\python seed_products.py
"""
import os, sys, datetime
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.utils.mongo import get_mongo_db

db = get_mongo_db()
if db is None:
    print("ERROR: MongoDB not connected. Check MONGO_URI in .env")
    sys.exit(1)

coll = db['products']

existing = coll.count_documents({})
if existing:
    print(f"Clearing {existing} existing product(s)...")
    coll.delete_many({})

products = [
    {
        "name": "Zsyio OS",
        "slug": "zsyio-os",
        "category": "Platform",
        "status": "Live",
        "tagline": "The operating layer for modern engineering teams.",
        "description": (
            "A unified internal developer platform that consolidates CI/CD pipelines, "
            "environment management, observability, and deployment workflows into a single, "
            "opinionated interface—purpose-built for velocity."
        ),
        "highlights": [
            "One-click environment provisioning",
            "Built-in blue/green deployments",
            "Real-time pipeline observability",
            "Role-based access with audit logs",
        ],
        "tech": ["Kubernetes", "ArgoCD", "Prometheus", "React", "Go"],
        "stat_value": "10x",
        "stat_label": "Faster Deployments",
        "accent": "hsl(259, 72%, 70%)",
        "price": "0.00",
        "image": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200",
        "created_at": datetime.datetime(2026, 1, 1),
    },
    {
        "name": "DataWeave",
        "slug": "dataweave",
        "category": "Data",
        "status": "Beta",
        "tagline": "No-code data pipelines that actually scale.",
        "description": (
            "Drag-and-drop pipeline builder with enterprise-grade connectors for 200+ sources. "
            "DataWeave handles schema evolution, backfill, incremental loads, and data quality "
            "checks automatically."
        ),
        "highlights": [
            "200+ pre-built source connectors",
            "Auto schema drift detection",
            "SLA-aware scheduling engine",
            "Column-level data lineage",
        ],
        "tech": ["Apache Spark", "dbt", "Airflow", "TypeScript", "PostgreSQL"],
        "stat_value": "200+",
        "stat_label": "Connectors Available",
        "accent": "hsl(174, 40%, 55%)",
        "price": "0.00",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
        "created_at": datetime.datetime(2026, 2, 1),
    },
    {
        "name": "SentryShield",
        "slug": "sentry-shield",
        "category": "Security",
        "status": "Live",
        "tagline": "AI-powered threat detection for cloud workloads.",
        "description": (
            "Continuously monitors your cloud estate for misconfigurations, anomalous behaviour, "
            "and compliance drift. SentryShield correlates signals across IAM, network, and "
            "application layers to surface real threats—not noise."
        ),
        "highlights": [
            "Sub-second anomaly detection",
            "SOC 2 & ISO 27001 reporting",
            "Automated remediation playbooks",
            "Multi-cloud unified posture view",
        ],
        "tech": ["Python", "TensorFlow", "AWS GuardDuty", "Elastic SIEM", "Terraform"],
        "stat_value": "99.8%",
        "stat_label": "Threat Precision",
        "accent": "hsl(347, 82%, 67%)",
        "price": "0.00",
        "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200",
        "created_at": datetime.datetime(2026, 3, 1),
    },
    {
        "name": "PulseForm",
        "slug": "pulseform",
        "category": "Analytics",
        "status": "Coming Soon",
        "tagline": "Product analytics that tell you why, not just what.",
        "description": (
            "Session replay, funnel analysis, heatmaps, and cohort retention—all queryable via "
            "natural language. PulseForm translates raw behavioural data into actionable product "
            "decisions without requiring a data team."
        ),
        "highlights": [
            "Natural language query interface",
            "Session replay with event timeline",
            "Funnel & cohort analysis",
            "Privacy-preserving by design",
        ],
        "tech": ["ClickHouse", "Next.js", "OpenAI", "WebSockets", "Redis"],
        "stat_value": "NL",
        "stat_label": "Query in Plain English",
        "accent": "hsl(41, 86%, 57%)",
        "price": "0.00",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
        "created_at": datetime.datetime(2026, 4, 1),
    },
]

result = coll.insert_many(products)
print(f"Seeded {len(result.inserted_ids)} products successfully.")
for p, _id in zip(products, result.inserted_ids):
    print(f"  [{_id}]  {p['name']}  ({p['status']})")
