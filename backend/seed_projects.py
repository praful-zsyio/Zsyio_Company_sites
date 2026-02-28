import os
import sys
import pymongo
from pymongo import MongoClient
import datetime
from dotenv import load_dotenv

# Add the project root to the Python path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

def get_mongo_db():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise Exception("MONGO_URI not found in environment variables.")
    
    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        client.admin.command('ismaster')  # Check connection
        print("MongoDB Connected Successfully")
        return client['zsyio_db']
    except Exception as e:
        print(f"MongoDB Connection Failed: {e}")
        return None

def seed_projects():
    db = get_mongo_db()
    if db is None:
        print("Database connection not available. Aborting seed.")
        return

    projects_collection = db['projects']
    
    # Clear existing projects to avoid duplicates
    print("Deleting existing projects...")
    projects_collection.delete_many({})
    print("Existing projects deleted.")

    projects_data = [
        {
  "title": "The Planets",
  "category": "Web Development",
  "summary": "An interactive space-themed web experience showcasing planets with immersive UI and animations.",
  "description": "The Planets is a visually engaging web application that presents detailed information about planets in our solar system. Built with modern frontend technologies, the project focuses on smooth animations, responsive design, and an immersive user experience. It demonstrates advanced UI/UX implementation and structured component-based architecture.",
  "image": "https://res.cloudinary.com/damlvqiwv/image/upload/v1772184850/planet_zktjup.png",
  "tech_stack": ["React", "JavaScript", "CSS", "HTML","GSAP", "Vite", "Three.js"],
  "tags": ["Featured", "Web", "Interactive UI","Animation", "Frontend","3D"],
  "live_url": "https://planets-bice.vercel.app/",
  "github_url": "https://github.com/Mayawaaan/Planets",
  "client": "Personal Project",
  "duration": "2-3 Weeks",
  "completion_date": datetime.datetime(2025, 1, 15, 0, 0, 0, tzinfo=datetime.timezone.utc),
  "role": "Frontend Developer",
  "features": [
    "Interactive planet selection interface",
    "Smooth transitions and animations",
    "Responsive layout for mobile and desktop",
    "Component-based architecture",
    "Modern UI design with engaging visuals",
    "3D planet models and animations using Three.js"
  ],
  "challenges": "Maintaining performance while implementing smooth animations and ensuring responsiveness across devices.",
  "solutions": "Optimized rendering logic, minimized re-renders, and structured reusable UI components for scalability and maintainability.",
  "created_at": datetime.datetime.utcnow()
},
       {
  "title": "Real-Time Chat Application",
  "category": "Web Application",
  "summary": "A scalable real-time messaging platform with authentication, group chats, media sharing, and live notifications.",
  "description": "Developed a full-stack real-time chat application enabling secure one-to-one and group messaging. The system supports live message synchronization using WebSockets, media sharing, authentication workflows, and notification handling. Built with a scalable backend architecture and responsive frontend for seamless cross-device usage.",
  "image": "https://res.cloudinary.com/damlvqiwv/image/upload/v1772185480/chat-app_eyonmx.png",
  "tech_stack": [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Socket.io",
    "JWT Authentication"
  ],
  "tags": ["Featured", "Web App", "Real-Time", "Chat System"],
  "live_url": "https://chatapp-kzre.onrender.com/",
  "github_url": "https://github.com/Mayawaaan/ChatApp",
  "client": "Personal Project",
  "duration": "1-2 Months",
  "completion_date": datetime.datetime(2025, 1, 20, 0, 0, 0, tzinfo=datetime.timezone.utc),
  "role": "Full Stack Developer",
  "features": [
    "Real-time one-to-one messaging using WebSockets",
    "Group chat functionality",
    "Secure authentication with JWT",
    "Media and file sharing support",
    "Live in-app notifications",
    "Responsive cross-device UI",
    "Message persistence with database storage"
  ],
  "challenges": "Ensuring low-latency real-time communication while maintaining secure authentication and efficient database queries.",
  "solutions": "Implemented Socket.io for bi-directional communication, optimized MongoDB indexing for message retrieval, and secured routes using JWT middleware.",
  "architecture": {
    "frontend": "React SPA",
    "backend": "Node.js with Express",
    "database": "MongoDB",
    "realtime": "Socket.io",
    "authentication": "JWT-based token system"
  },
  "created_at": datetime.datetime.utcnow()
},
       {
  "title": "Audi R8 3D Experience",
  "category": "Web Development",
  "summary": "An interactive 3D car visualization in the browser featuring high-fidelity rendering and smooth user controls.",
  "description": "Developed a 3D web experience showcasing the Audi R8 using React and WebGL. Users can interact with the high-quality car model, zoom, orbit, and explore details with optimized performance and responsive design across devices.",
  "image": "https://res.cloudinary.com/damlvqiwv/image/upload/v1772185487/Audi_r8_zyr0c8.png",
  "tech_stack": [
    "React",
    "Three.js",
    "React Three Fiber (R3F)",
    "Vite",
    "WebGL",
    "Tailwind CSS"
  ],
  "tags": ["Featured", "Web", "3D", "Interactive UI"],
  "live_url": "https://audi-r8-woad.vercel.app",
  "github_url": "https://github.com/Mayawaaan/AudiR8",
  "client": "Personal Project",
  "duration": "2–3 Weeks",
  "completion_date": datetime.datetime(2025, 11, 26, 0, 0, 0, tzinfo=datetime.timezone.utc),
  "role": "Frontend Developer",
  "features": [
    "Interactive 3D car model with orbit, zoom, and pan controls",
    "High-quality rendering with realistic lighting and materials",
    "Responsive design optimized for both desktop and mobile",
    "Fast loading and optimized build using Vite",
    "Component-structured 3D scene for extensibility"
  ],
  "challenges": "Rendering complex 3D models in the browser while maintaining smooth interaction and cross-device performance.",
  "solutions": "Used React Three Fiber to integrate Three.js into a React component architecture and optimized scene graph for performance.",
  "created_at": datetime.datetime.utcnow()
}
    ]

    if projects_data:
        print(f"Inserting {len(projects_data)} projects...")
        projects_collection.insert_many(projects_data)
        print("Projects seeded successfully.")
    else:
        print("No projects to seed.")

if __name__ == "__main__":
    seed_projects()
