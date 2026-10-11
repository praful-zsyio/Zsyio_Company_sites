import os
import sys
import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

# Add project root to sys.path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)


def get_mongo_db():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise Exception("MONGO_URI not found in environment variables.")

    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000, tlsAllowInvalidCertificates=True)
        client.admin.command('ismaster')
        print("MongoDB Connected Successfully [OK]")
        return client['zsyio_db']
    except Exception as e:
        print(f"MongoDB Connection Failed: {e}")
        return None


INSIGHTS_SEED_DATA = [
    {
        "slug": "fintech-microservices-migration",
        "category": "Case Studies",
        "type": "Enterprise Case Study",
        "title": "Deconstructing a Financial Monolith into High-Throughput Microservices",
        "summary": "How we migrated a core banking transaction engine from an on-premise relational bottleneck to a distributed event-driven mesh in 14 weeks — achieving zero data loss and 4.2x latency improvement.",
        "published_at": "Oct 2025",
        "read_time": "7 min read",
        "author": {
            "name": "Engineering Core Team",
            "role": "Distributed Systems Practice",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        },
        "metrics": [
            {"label": "P99 Latency Drop", "value": "-76%"},
            {"label": "Transaction Throughput", "value": "18k/sec"},
            {"label": "Production Uptime", "value": "99.995%"},
        ],
        "tags": ["Kafka", "Go", "Kubernetes", "PostgreSQL", "FinTech"],
        "client_industry": "Digital Banking & Payments",
        "challenge": "A fast-growing fintech platform was encountering severe database deadlocks during peak morning settlement hours. The legacy Java monolith shared a centralized database with tightly coupled transaction logic, resulting in transaction drops and 2.4-second response latencies.",
        "solution": "We engineered a phased Strangler Fig migration strategy. We extracted transaction ledgering, identity validation, and notification pipelines into autonomous microservices connected via an Apache Kafka event backbone with transactional outbox guarantees.",
        "body": [
            {
                "heading": "1. The Architectural Bottleneck",
                "content": "The primary obstacle was database lock contention during concurrent merchant settlement. Writing to 28 interrelated tables synchronously within a single database transaction created cascade thread pool starvation. When transaction spikes hit 6,000 requests per second, API gateway error rates soared above 8%.",
            },
            {
                "heading": "2. The Event-Driven Strangler Pattern",
                "content": "Rather than a high-risk big bang rewrite, we introduced an asynchronous CDC (Change Data Capture) pipeline utilizing Debezium and Kafka. This allowed the legacy database to stream change events into our new event mesh in sub-millisecond intervals. Downstream services consumed these events into read-optimized replica caches.",
            },
            {
                "heading": "3. Zero-Downtime Data Cutover",
                "content": "By implementing dual-run verification, both legacy and microservice clusters executed alongside each other for three weeks. Automated reconciliation bots verified ledger integrity down to the single cent across 4.2 million transactions before DNS cutover.",
            },
        ],
        "key_takeaways": [
            "Event-driven architecture decouples read pressure from transactional writing.",
            "The Strangler Fig pattern minimizes enterprise migration risk to near zero.",
            "Idempotency keys at the API gateway layer prevent catastrophic double-debiting.",
        ],
        "is_featured": True,
        "is_published": True,
        "created_at": datetime.datetime(2025, 10, 15, 12, 0, 0, tzinfo=datetime.timezone.utc),
        "updated_at": datetime.datetime(2025, 10, 15, 12, 0, 0, tzinfo=datetime.timezone.utc),
    },
    {
        "slug": "llm-rag-vector-architecture",
        "category": "AI & Data",
        "type": "Engineering Deep Dive",
        "title": "Engineering Enterprise RAG: Sub-Second Vector Search with Guardrails",
        "summary": "Architecting a production-grade generative retrieval pipeline capable of indexing 1.8M regulatory documents with strict deterministic guardrails and token cost optimization.",
        "published_at": "Nov 2025",
        "read_time": "9 min read",
        "author": {
            "name": "Applied AI Lab",
            "role": "Machine Learning Team",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        },
        "metrics": [
            {"label": "Search Retrieval Time", "value": "<180ms"},
            {"label": "Hallucination Reduction", "value": "98.4%"},
            {"label": "Token Cost Efficiency", "value": "-44%"},
        ],
        "tags": ["LLM", "Pinecone", "Python", "RAG", "Embeddings"],
        "client_industry": "LegalTech & Compliance",
        "challenge": "Enterprise clients needed natural-language answers extracted from thousands of complex, heavily nested regulatory PDF contracts. Off-the-shelf vector search suffered from chunk fragmentation, out-of-context retrieval, and high LLM token costs.",
        "solution": "We engineered a hybrid search architecture combining dense vector embeddings with sparse BM25 keyword matching, integrated with hierarchical parent-child document chunking and an automated re-ranking cross-encoder layer.",
        "body": [
            {
                "heading": "1. Solving the Chunk Fragmentation Problem",
                "content": "Standard fixed-size 500-token chunking splits critical tables and contractual clauses across boundaries. We implemented syntax-aware AST chunking that respects legal article boundaries and preserves structural headers as injected metadata tags.",
            },
            {
                "heading": "2. Hybrid Dense + Sparse Retrieval",
                "content": "Pure dense cosine similarity often misses exact statute numbers or clause identifiers. By combining dense OpenAI text-embedding-3 vectors with sparse BM25 indices via reciprocal rank fusion (RRF), retrieval accuracy jumped from 71% to 94.6%.",
            },
            {
                "heading": "3. Real-Time Output Guardrails",
                "content": "Before the generated answer reaches the user interface, a deterministic validation harness evaluates factual alignment against the retrieved source citation chunks, filtering out unverified assertions.",
            },
        ],
        "key_takeaways": [
            "Hierarchical chunking preserves semantic context better than naive sliding windows.",
            "Cross-encoder re-ranking dramatically prunes irrelevant context before LLM prompting.",
            "Hybrid search is mandatory for domains involving exact alphanumeric codes.",
        ],
        "is_featured": False,
        "is_published": True,
        "created_at": datetime.datetime(2025, 11, 20, 10, 0, 0, tzinfo=datetime.timezone.utc),
        "updated_at": datetime.datetime(2025, 11, 20, 10, 0, 0, tzinfo=datetime.timezone.utc),
    },
    {
        "slug": "60fps-micro-animations-react",
        "category": "Engineering",
        "type": "Frontend Architecture",
        "title": "Architecting 60fps Micro-Interactions in React 19: GPU Offloading & GSAP",
        "summary": "How we maintain silky smooth 60 frames-per-second render performance in data-dense interfaces without triggering React reconciler layout thrashing.",
        "published_at": "Dec 2025",
        "read_time": "6 min read",
        "author": {
            "name": "UI/UX Creative Engineering",
            "role": "Frontend Systems",
            "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        },
        "metrics": [
            {"label": "Frame Rate", "value": "Solid 60fps"},
            {"label": "Lighthouse Performance", "value": "99/100"},
            {"label": "CLS (Shift)", "value": "0.000"},
        ],
        "tags": ["React 19", "GSAP", "Tailwind CSS", "Framer Motion", "WebGL"],
        "client_industry": "Creative SaaS & Developer Platforms",
        "challenge": "Complex interactive web platforms often suffer from micro-stutter, cumulative layout shift (CLS), and heavy thread locks when multiple canvas renders, 3D canvases, and DOM animations run simultaneously.",
        "solution": "A systematic architecture separating UI layout state from transform animations: leveraging CSS custom properties, hardware-accelerated composite transforms (`translate3d`, `will-change`), and GSAP Context scoping.",
        "body": [
            {
                "heading": "1. The Cost of React Re-renders in Animation",
                "content": "Driving high-frequency scroll or mouse animations directly through React component state forces React's Virtual DOM reconciliation engine to run 60 times a second. By isolating animations to direct DOM ref mutations and GPU transform matrices, React remains idle while transitions run at native hardware refresh rates.",
            },
            {
                "heading": "2. Context Scoping & Cleanup",
                "content": "Uncleaned GSAP timelines cause memory leaks during client-side navigation. Utilizing scoped `useGSAP` wrappers ensures automatic timeline garbage collection and listener tearing upon unmount.",
            },
        ],
        "key_takeaways": [
            "Never animate geometry properties like width, height, or top; stick to transform and opacity.",
            "Use will-change judiciously on elements entering viewport animations.",
            "Decouple state changes from high-frequency physics ticks.",
        ],
        "is_featured": False,
        "is_published": True,
        "created_at": datetime.datetime(2025, 12, 5, 14, 0, 0, tzinfo=datetime.timezone.utc),
        "updated_at": datetime.datetime(2025, 12, 5, 14, 0, 0, tzinfo=datetime.timezone.utc),
    },
    {
        "slug": "zero-trust-kubernetes-aws",
        "category": "Cloud Architecture",
        "type": "Infrastructure Blueprint",
        "title": "Zero-Trust Cloud Architecture: Hardening Multi-Tenant Kubernetes on AWS",
        "summary": "A practical blueprint for deploying SOC2-compliant, network-isolated cloud clusters with automated secret rotation, mutual TLS, and least-privilege IAM roles.",
        "published_at": "Jan 2026",
        "read_time": "8 min read",
        "author": {
            "name": "Cloud & Reliability Group",
            "role": "DevOps Architecture",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        },
        "metrics": [
            {"label": "Vulnerability Scan", "value": "0 Critical"},
            {"label": "Secret Rotation Cycle", "value": "Every 24h"},
            {"label": "Failover RTO", "value": "<45s"},
        ],
        "tags": ["AWS", "EKS", "Terraform", "Istio", "Security"],
        "client_industry": "Healthcare & MedTech Compliance",
        "challenge": "A digital healthcare provider handling sensitive patient health records (PHI) needed to pass stringent HIPAA and SOC2 Type II certifications while enabling autonomous engineering team deployments.",
        "solution": "We architected an immutable AWS EKS infrastructure provisioned via Terraform, fortified with Istio service mesh for mutual TLS (mTLS), Cilium eBPF network policies, and HashiCorp Vault automated credential synthesis.",
        "body": [
            {
                "heading": "1. Elimination of Persistent Secrets",
                "content": "Rather than storing long-lived database credentials in static environment files, microservices request short-lived (15-minute) dynamic credentials directly from Vault via Kubernetes ServiceAccount tokens.",
            },
            {
                "heading": "2. eBPF-Powered Kernel-Level Isolation",
                "content": "Cilium replaces standard Linux iptables routing with high-performance eBPF network filters, enforcing egress whitelisting at layer 7 and instantly alerting on unexpected outbound connections.",
            },
        ],
        "key_takeaways": [
            "Zero-trust assumes the internal cluster perimeter is already compromised.",
            "Dynamic secret synthesis eliminates credential exfiltration hazards.",
            "eBPF enables line-rate packet security without proxy overhead.",
        ],
        "is_featured": False,
        "is_published": True,
        "created_at": datetime.datetime(2026, 1, 10, 9, 30, 0, tzinfo=datetime.timezone.utc),
        "updated_at": datetime.datetime(2026, 1, 10, 9, 30, 0, tzinfo=datetime.timezone.utc),
    },
    {
        "slug": "global-design-system-scale",
        "category": "Engineering",
        "type": "Design Systems",
        "title": "From Figma to CSS Variables: Unifying UI Tokens Across 4 Product Suites",
        "summary": "How we synchronized design tokens across web, mobile, and desktop codebases, reducing front-end development cycle times by 40% while preserving brand fidelity.",
        "published_at": "Feb 2026",
        "read_time": "5 min read",
        "author": {
            "name": "Design Systems Guild",
            "role": "Brand & Engineering",
            "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        },
        "metrics": [
            {"label": "Token Sync Pipeline", "value": "100% Automated"},
            {"label": "UI Bug Reports", "value": "-62%"},
            {"label": "Theme Switch Speed", "value": "Instant 0ms"},
        ],
        "tags": ["Design Systems", "Figma", "CSS Tokens", "Tailwind", "Accessibility"],
        "client_industry": "Global Enterprise Software",
        "challenge": "Four separate engineering squads were independently recreating button variations, modal dialogs, and color palettes, leading to brand divergence and redundant CSS bloat.",
        "solution": "We established a single source of truth in Figma using design tokens, compiled automatically through Style Dictionary into HSL CSS custom properties, Tailwind theme presets, and React component packages.",
        "body": [
            {
                "heading": "1. Token Hierarchy and HSL Semantic Mapping",
                "content": "Tokens are categorized into Global (base colors/spacings), Semantic (e.g. `--surface-primary`, `--text-muted`), and Component levels. Expressing colors in HSL space enables programmatic opacity layers without hex conversions.",
            },
            {
                "heading": "2. Automated GitHub Actions Sync",
                "content": "When designers publish token updates in Figma, a webhook triggers a GitHub Action that generates typed CSS variables, updates tests, and opens an automated pull request in the frontend repo.",
            },
        ],
        "key_takeaways": [
            "Semantic tokens decouple UI theme logic from raw color palettes.",
            "Automated token compilation bridges the gap between designers and developers.",
            "Accessibility contrast checks can be enforced directly in the CI pipeline.",
        ],
        "is_featured": False,
        "is_published": True,
        "created_at": datetime.datetime(2026, 2, 8, 16, 0, 0, tzinfo=datetime.timezone.utc),
        "updated_at": datetime.datetime(2026, 2, 8, 16, 0, 0, tzinfo=datetime.timezone.utc),
    },
    {
        "slug": "mobile-telemetry-flutter-architecture",
        "category": "Case Studies",
        "type": "Mobile Engineering",
        "title": "High-Volume Mobile Telemetry: Building an Offline-First IoT Field App",
        "summary": "Engineering a mission-critical mobile application for industrial technicians operating in zero-connectivity environments, syncing millions of sensor telemetry events seamlessly upon reconnection.",
        "published_at": "Mar 2026",
        "read_time": "8 min read",
        "author": {
            "name": "Mobile Solutions Practice",
            "role": "Client Deliveries",
            "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        },
        "metrics": [
            {"label": "Offline Buffer", "value": "Up to 500k Points"},
            {"label": "Battery Drain", "value": "<3.2%/hr"},
            {"label": "App Store Rating", "value": "4.9 / 5.0"},
        ],
        "tags": ["Flutter", "Dart", "SQLite", "IoT", "Bluetooth LE"],
        "client_industry": "Industrial Automation & Logistics",
        "challenge": "Field engineers inspecting remote manufacturing facilities required a rapid mobile diagnostics app that connects to Bluetooth hardware sensors, records telemetry continuously, and functions flawlessly without internet access for days at a time.",
        "solution": "We developed a high-performance Flutter mobile application featuring an encrypted SQLite event log, binary compression queues, and a delta synchronization algorithm that resolves conflicting data updates seamlessly.",
        "body": [
            {
                "heading": "1. The Offline SQLite Event Sourcing Queue",
                "content": "Rather than updating records in place, sensor readings are stored as an immutable event stream in local SQLite. When the mobile device acquires cellular connectivity, the synchronization engine batches records in compressed gzip payloads.",
            },
            {
                "heading": "2. Bluetooth Low Energy Background Processing",
                "content": "Custom native platform channels in Kotlin and Swift manage BLE peripheral connections in background threads, buffering data packets even when the app is minimized.",
            },
        ],
        "key_takeaways": [
            "Immutable local event sourcing prevents corruption during abrupt battery loss.",
            "Delta compression reduces cellular data transfer volume by over 80%.",
            "Native platform channels are essential for high-throughput hardware I/O in Flutter.",
        ],
        "is_featured": False,
        "is_published": True,
        "created_at": datetime.datetime(2026, 3, 1, 11, 0, 0, tzinfo=datetime.timezone.utc),
        "updated_at": datetime.datetime(2026, 3, 1, 11, 0, 0, tzinfo=datetime.timezone.utc),
    },
]


def seed_insights():
    db = get_mongo_db()
    if db is None:
        print("Database connection not available. Aborting seed.")
        return

    collection = db['insights']
    print("Clearing existing insights...")
    collection.delete_many({})
    print("Existing insights deleted.")

    print(f"Seeding {len(INSIGHTS_SEED_DATA)} insights into MongoDB collection 'insights'...")
    collection.insert_many(INSIGHTS_SEED_DATA)
    print("Successfully seeded all insights!")


if __name__ == '__main__':
    seed_insights()
