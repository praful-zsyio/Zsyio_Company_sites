import os
import django
import sys
import json

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.services.models import Technology

technologies_data = [
    {
      "id": 1,
      "name": "Amazon Web Services",
      "icon": "Cloud",
      "icon_image": "tech_icons/aws.png",
      "color": "#FF9900",
      "category": "Cloud Platforms"
    },
    {
      "id": 2,
      "name": "Microsoft Azure",
      "icon": "Cloud",
      "icon_image": "tech_icons/azure.png",
      "color": "#0078D4",
      "category": "Cloud Platforms"
    },
    {
      "id": 3,
      "name": "Google Cloud Platform",
      "icon": "Cloud",
      "icon_image": "tech_icons/gcp.png",
      "color": "#4285F4",
      "category": "Cloud Platforms"
    },
    {
      "id": 4,
      "name": "Digital Ocean",
      "icon": "Server",
      "icon_image": "tech_icons/digitalocean.png",
      "color": "#0080FF",
      "category": "Cloud Platforms"
    },
    {
      "id": 5,
      "name": "Cloudflare",
      "icon": "ShieldCheck",
      "icon_image": "tech_icons/cloudflare.png",
      "color": "#F38020",
      "category": "Cloud Platforms"
    },
    {
      "id": 6,
      "name": "React",
      "icon": "Atom",
      "icon_image": "tech_icons/react.png",
      "color": "#61DAFB",
      "category": "Frontend"
    },
    {
      "id": 7,
      "name": "Next.js",
      "icon": "Globe",
      "icon_image": "tech_icons/nextjs.png",
      "color": "#000000",
      "category": "Frontend"
    },
    {
      "id": 8,
      "name": "TypeScript",
      "icon": "FileCode2",
      "icon_image": "tech_icons/typescript.png",
      "color": "#3178C6",
      "category": "Frontend"
    },
    {
      "id": 9,
      "name": "Vue.js",
      "icon": "Code2",
      "icon_image": "tech_icons/vuejs.png",
      "color": "#4FC08D",
      "category": "Frontend"
    },
    {
      "id": 10,
      "name": "Angular",
      "icon": "Shield",
      "icon_image": "tech_icons/angular.png",
      "color": "#DD0031",
      "category": "Frontend"
    },
    {
      "id": 11,
      "name": "JavaScript",
      "icon": "FileCode",
      "icon_image": "tech_icons/javascript.png",
      "color": "#F7DF1E",
      "category": "Frontend"
    },
    {
      "id": 12,
      "name": "Three.js",
      "icon": "Box",
      "icon_image": "tech_icons/threejs.png",
      "color": "#049EF4",
      "category": "Frontend"
    },
    {
      "id": 13,
      "name": "GLSL",
      "icon": "Sparkles",
      "icon_image": "tech_icons/glsl.png",
      "color": "#5586A4",
      "category": "Frontend"
    },
    {
      "id": 14,
      "name": "Node.js",
      "icon": "Server",
      "icon_image": "tech_icons/nodejs.png",
      "color": "#339933",
      "category": "Backend"
    },
    {
      "id": 15,
      "name": "Python",
      "icon": "Terminal",
      "icon_image": "tech_icons/python.png",
      "color": "#3776AB",
      "category": "Backend"
    },
    {
      "id": 16,
      "name": "Go",
      "icon": "Cpu",
      "icon_image": "tech_icons/go.png",
      "color": "#00ADD8",
      "category": "Backend"
    },
    {
      "id": 17,
      "name": "Java",
      "icon": "Coffee",
      "icon_image": "tech_icons/java.png",
      "color": "#ED8B00",
      "category": "Backend"
    },
    {
      "id": 18,
      "name": "GraphQL",
      "icon": "Network",
      "icon_image": "tech_icons/graphql.png",
      "color": "#E10098",
      "category": "Backend"
    },
    {
      "id": 19,
      "name": "MongoDB",
      "icon": "Database",
      "icon_image": "tech_icons/mongodb.png",
      "color": "#47A248",
      "category": "Data and Databases"
    },
    {
      "id": 20,
      "name": "MySQL",
      "icon": "Database",
      "icon_image": "tech_icons/mysql.png",
      "color": "#4479A1",
      "category": "Data and Databases"
    },
    {
      "id": 21,
      "name": "PostgreSQL",
      "icon": "Database",
      "icon_image": "tech_icons/postgresql.png",
      "color": "#4169E1",
      "category": "Data and Databases"
    },
    {
      "id": 22,
      "name": "SQLite",
      "icon": "Database",
      "icon_image": "tech_icons/sqlite.png",
      "color": "#003B57",
      "category": "Data and Databases"
    },
    {
      "id": 23,
      "name": "Apache Kafka",
      "icon": "Activity",
      "icon_image": "tech_icons/kafka.png",
      "color": "#231F20",
      "category": "Data and Databases"
    },
    {
      "id": 24,
      "name": "MSSQL",
      "icon": "Database",
      "icon_image": "tech_icons/mssql.png",
      "color": "#CC292B",
      "category": "Data and Databases"
    },
    {
      "id": 25,
      "name": "Redis",
      "icon": "Layers",
      "icon_image": "tech_icons/redis.png",
      "color": "#DC382D",
      "category": "Data and Databases"
    },
    {
      "id": 26,
      "name": "Zustand",
      "icon": "Boxes",
      "icon_image": "tech_icons/zustand.png",
      "color": "#443E38",
      "category": "Data and Databases"
    },
    {
      "id": 27,
      "name": "Docker",
      "icon": "Container",
      "icon_image": "tech_icons/docker.png",
      "color": "#2496ED",
      "category": "DevOps and Infra"
    },
    {
      "id": 28,
      "name": "Kubernetes",
      "icon": "Boxes",
      "icon_image": "tech_icons/kubernetes.png",
      "color": "#326CE5",
      "category": "DevOps and Infra"
    },
    {
      "id": 29,
      "name": "Terraform",
      "icon": "Blocks",
      "icon_image": "tech_icons/terraform.png",
      "color": "#7B42BC",
      "category": "DevOps and Infra"
    },
    {
      "id": 30,
      "name": "GitHub Actions",
      "icon": "GitBranch",
      "icon_image": "tech_icons/github-actions.png",
      "color": "#2088FF",
      "category": "DevOps and Infra"
    },
    {
      "id": 31,
      "name": "Jira",
      "icon": "CheckSquare",
      "icon_image": "tech_icons/jira.png",
      "color": "#0052CC",
      "category": "DevOps and Infra"
    },
    {
      "id": 32,
      "name": "Notion",
      "icon": "FileText",
      "icon_image": "tech_icons/notion.png",
      "color": "#000000",
      "category": "DevOps and Infra"
    },
    {
      "id": 33,
      "name": "NGINX",
      "icon": "ServerCog",
      "icon_image": "tech_icons/nginx.png",
      "color": "#009639",
      "category": "DevOps and Infra"
    },
    {
      "id": 34,
      "name": "Jenkins",
      "icon": "Wrench",
      "icon_image": "tech_icons/jenkins.png",
      "color": "#D24939",
      "category": "DevOps and Infra"
    },
    {
      "id": 35,
      "name": "Gemini",
      "icon": "Sparkles",
      "icon_image": "tech_icons/gemini.png",
      "color": "#1A73E8",
      "category": "AI Platforms"
    },
    {
      "id": 36,
      "name": "OpenAI",
      "icon": "Bot",
      "icon_image": "tech_icons/openai.png",
      "color": "#10A37F",
      "category": "AI Platforms"
    },
    {
      "id": 37,
      "name": "Anthropic",
      "icon": "BrainCircuit",
      "icon_image": "tech_icons/anthropic.png",
      "color": "#D97706",
      "category": "AI Platforms"
    },
    {
      "id": 38,
      "name": "Kaggle",
      "icon": "BarChart3",
      "icon_image": "tech_icons/kaggle.png",
      "color": "#20BEFF",
      "category": "AI Platforms"
    },
    {
      "id": 39,
      "name": "Hugging Face",
      "icon": "Smile",
      "icon_image": "tech_icons/huggingface.png",
      "color": "#FFD21E",
      "category": "AI Platforms"
    },
    {
      "id": 40,
      "name": "Hostinger",
      "icon": "Server",
      "icon_image": "tech_icons/hostinger.png",
      "color": "#673DE6",
      "category": "Web Hosting and Platforms"
    },
    {
      "id": 41,
      "name": "WordPress",
      "icon": "Globe",
      "icon_image": "tech_icons/wordpress.png",
      "color": "#21759B",
      "category": "Web Hosting and Platforms"
    },
    {
      "id": 42,
      "name": "Render",
      "icon": "CloudLightning",
      "icon_image": "tech_icons/render.png",
      "color": "#46E3B7",
      "category": "Web Hosting and Platforms"
    },
    {
      "id": 43,
      "name": "Vercel",
      "icon": "Triangle",
      "icon_image": "tech_icons/vercel.png",
      "color": "#000000",
      "category": "Web Hosting and Platforms"
    },
    {
      "id": 44,
      "name": "Supabase",
      "icon": "Zap",
      "icon_image": "tech_icons/supabase.png",
      "color": "#3ECF8E",
      "category": "Web Hosting and Platforms"
    },
    {
      "id": 45,
      "name": "Firebase",
      "icon": "Flame",
      "icon_image": "tech_icons/firebase.png",
      "color": "#FFCA28",
      "category": "Web Hosting and Platforms"
    },
    {
      "id": 46,
      "name": "Private Virtual Machines",
      "icon": "HardDrive",
      "icon_image": None,
      "color": "#4A5568",
      "category": "Web Hosting and Platforms"
    }
]

from apps.utils.mongo import get_mongo_db

def seed_technologies():
    print(f"Starting to seed {len(technologies_data)} technologies...")
    
    db = get_mongo_db()
    if db is None:
        print("ERROR: MongoDB not connected. Check MONGO_URI in .env")
        sys.exit(1)
        
    coll = db['technologies']
    
    existing = coll.count_documents({})
    if existing:
        print(f"Clearing {existing} existing technology(s)...")
        coll.delete_many({})
    
    for tech in technologies_data:
        icon_path = tech.get('icon_image')
        if icon_path and icon_path.startswith('/media/'):
            tech['icon_image'] = icon_path.replace('/media/', '')
            
    result = coll.insert_many(technologies_data)
    print(f"Seeded {len(result.inserted_ids)} technologies successfully.")
    
if __name__ == "__main__":
    seed_technologies()
