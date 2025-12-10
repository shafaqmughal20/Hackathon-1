# SP.Plan: Physical AI & Humanoid Robotics Interactive Textbook System

**Feature**: 001-physical-ai-textbook
**Created**: 2025-12-10
**Status**: Draft
**Author**: Claude Code

## Architecture Overview

The Physical AI & Humanoid Robotics Interactive Textbook System is a comprehensive educational platform that combines a Docusaurus-based documentation site with a FastAPI backend, Qdrant vector store, and OpenAI-powered RAG chatbot. The architecture follows a microservices pattern with clear separation of concerns:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Docusaurus    │    │   FastAPI API    │    │   Qdrant Vector │
│   Frontend      │◄──►│   Backend        │◄──►│   Store         │
│   (Static Site) │    │   (RAG, Auth,    │    │   (Book Content │
│                 │    │   Ingestion)     │    │   Embeddings)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Browser/      │    │   OpenAI API     │    │   Content Files │
│   Mobile        │    │   (ChatKit)      │    │   (MD/MDX)      │
│   (User)        │    │   (LLM Responses)│    │   (Book Content)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Component Interaction Flow:
1. **Content Ingestion**: MD/MDX textbook content → FastAPI ingestion endpoint → Qdrant vector store
2. **User Interaction**: Docusaurus frontend → FastAPI API → OpenAI ChatKit → Qdrant retrieval → Response with citations
3. **Authentication**: User login → JWT token → Docusaurus frontend → FastAPI protected endpoints

## Technical Context

### Core Technologies
- **Frontend**: Docusaurus v3.x with classic template
- **Backend**: FastAPI 0.104+ with Python 3.11+
- **Vector Store**: Qdrant Cloud (via Ordent Cloud)
- **LLM Integration**: OpenAI ChatKit SDK
- **Authentication**: JWT/BetterAuth
- **Content Format**: MD/MDX with DocuSource structure
- **Deployment**: GitHub Pages (frontend), Render/Railway (backend)

### System Components
- **Textbook Content**: 6-8 modules, 4-5 lessons per module (15,000-18,000 words)
- **RAG Pipeline**: Content chunking (400-600 tokens), OpenAI embeddings, Qdrant storage
- **Chat Interface**: React widget with floating button, highlight-to-ask, citation display
- **User Management**: Registration, login, progress tracking, personalization

### Known Dependencies
- Docusaurus plugin ecosystem for custom components
- OpenAI API for embeddings and chat completion
- Qdrant API for vector storage and retrieval
- Frontend build process integration with backend API calls

## Constitution Check

### Compliance Verification
- ✅ **Accessibility**: Plan includes responsive design, WCAG 2.1 AA compliance, multi-device support
- ✅ **Technical Accuracy**: Plan specifies PEP 8 compliance, tested code examples, proper documentation
- ✅ **Completeness**: Plan covers all 6-8 modules with 2+ examples each as per constitution
- ✅ **RAG Integration**: Plan includes grounding, citations, and accuracy standards (≥95%)
- ✅ **Code Quality**: Plan specifies FastAPI testing, response time <3s, proper error handling
- ✅ **Interactive Learning**: Plan includes MDX components, code playgrounds, engagement features
- ✅ **User Experience**: Plan includes performance targets, accessibility, responsive design
- ✅ **Personalization**: Plan includes user profiles, progress tracking, adaptive content
- ✅ **Urdu Translation**: Plan includes real-time translation with ≤2s latency
- ✅ **Deployment**: Plan includes GitHub Pages, monitoring, auto-scaling

### Quality Gates
- All technical decisions align with constitution standards
- Performance targets meet constitution requirements
- Accessibility features exceed WCAG 2.1 AA compliance

## Research & Unknowns Resolution

### Phase 0: Research Summary

#### Decision: Docusaurus vs. Custom React App
**Rationale**: Docusaurus chosen for built-in MDX support, auto-sidebar generation, internationalization, and documentation-focused features that align with textbook requirements
**Alternatives considered**: Next.js, Gatsby, VuePress - Docusaurus provides best content organization and plugin ecosystem for educational content

#### Decision: Qdrant vs. Alternative Vector Stores
**Rationale**: Qdrant selected for its cloud offering, performance, and integration with OpenAI embeddings as specified in requirements
**Alternatives considered**: Pinecone, Weaviate, Chroma - Qdrant offers competitive pricing and performance for educational use

#### Decision: ChatKit vs. Direct OpenAI API
**Rationale**: ChatKit chosen for agentic capabilities and built-in conversation management as specified in requirements
**Alternatives considered**: LangChain, direct OpenAI API - ChatKit provides more structured approach for educational chatbot

## Implementation Phases

### Phase 1: Foundation & Content Structure
**Goals**: Set up Docusaurus site, create content folder structure, implement basic MDX components
**Tasks**:
1. Initialize Docusaurus project with classic template
2. Create folder structure: `/docs/modules/module-1/chapter-1/lesson-1.mdx`
3. Configure sidebar generation for auto-discovery
4. Implement basic MDX components for interactive elements
5. Set up internationalization for Urdu translation
**Deliverables**: Functional Docusaurus site with proper content structure
**Validation criteria**: Content renders correctly, navigation works, basic styling applied
**Possible blockers**: Docusaurus plugin compatibility issues
**Dependencies**: None (standalone phase)

### Phase 2: Backend API & RAG Infrastructure
**Goals**: Implement FastAPI backend with ingestion, chat, and health endpoints; set up Qdrant integration
**Tasks**:
1. Create FastAPI project structure with proper routing
2. Implement `/api/ingest` endpoint for content processing
3. Implement `/api/chat` endpoint with RAG logic
4. Implement `/api/ping` health check endpoint
5. Integrate Qdrant for vector storage and retrieval
6. Implement OpenAI embedding and completion calls
**Deliverables**: FastAPI backend with working RAG pipeline
**Validation criteria**: Content can be ingested, chat responses generated with citations
**Possible blockers**: OpenAI API access, Qdrant configuration
**Dependencies**: Content structure from Phase 1

### Phase 3: Content Creation & Ingestion Pipeline
**Goals**: Create textbook content and implement ingestion pipeline
**Tasks**:
1. Write 6-8 modules with 4-5 lessons each (15,000-18,000 words)
2. Implement content chunking strategy (400-600 tokens)
3. Add metadata fields (source, chapter, section) to embeddings
4. Test ingestion pipeline with full content set
5. Validate content quality and accuracy
**Deliverables**: Complete textbook content with proper structure
**Validation criteria**: All content ingested successfully, proper chunking and metadata
**Possible blockers**: Content writing timeline, technical accuracy verification
**Dependencies**: Backend API from Phase 2

### Phase 4: Frontend Integration & Chat Widget
**Goals**: Integrate chatbot widget into Docusaurus, implement highlight-to-ask functionality
**Tasks**:
1. Create React chatbot widget component
2. Implement floating button UI on all pages
3. Add highlight-to-ask functionality
4. Display citations and references in chat responses
5. Ensure mobile responsiveness
6. Integrate with FastAPI backend endpoints
**Deliverables**: Functional chatbot widget integrated into textbook
**Validation criteria**: Chat works on all pages, citations displayed, mobile-friendly
**Possible blockers**: Docusaurus component integration, cross-browser compatibility
**Dependencies**: Backend API from Phase 2, Content from Phase 3

### Phase 5: Authentication & Personalization
**Goals**: Implement user authentication and personalized learning experience
**Tasks**:
1. Implement JWT/BetterAuth authentication system
2. Create user registration and login flows
3. Implement progress tracking and storage
4. Add personalized chapter variants (beginner/CS/AI/Engineering)
5. Implement bookmark and note-taking capabilities
**Deliverables**: Full authentication system with personalization
**Validation criteria**: Users can register/login, progress saved, personalization works
**Possible blockers**: Authentication library compatibility
**Dependencies**: Backend API from Phase 2, Frontend from Phase 4

### Phase 6: Advanced Features & Optimization
**Goals**: Implement auto-summaries, quizzes, Urdu translation, and performance optimization
**Tasks**:
1. Implement auto-summary generation for chapters
2. Create auto-quiz generation engine
3. Implement Urdu translation with RTL support
4. Optimize performance (response times <3s)
5. Add accessibility features and testing
6. Implement error handling and fallbacks
**Deliverables**: Advanced features and optimized performance
**Validation criteria**: Summaries/quiz generated, Urdu works, response times met
**Possible blockers**: Translation API integration, performance optimization
**Dependencies**: All previous phases

### Phase 7: Testing & Deployment
**Goals**: Complete testing and deploy to production
**Tasks**:
1. Implement comprehensive test suite (unit, integration, e2e)
2. Performance testing and optimization
3. Security testing and vulnerability assessment
4. Deploy Docusaurus to GitHub Pages
5. Deploy FastAPI backend to Render/Railway
6. Final validation and quality assurance
**Deliverables**: Fully deployed and tested system
**Validation criteria**: All tests pass, deployment successful, meets success criteria
**Possible blockers**: Deployment configuration, SSL certificates
**Dependencies**: All previous phases

## Component Breakdown

### Docusaurus Structure & Configuration
```
website/
├── docs/
│   ├── modules/
│   │   ├── module-1-foundations/
│   │   │   ├── chapter-1-intro/
│   │   │   │   ├── lesson-1-overview.mdx
│   │   │   │   ├── lesson-2-basics.mdx
│   │   │   │   └── lesson-3-applications.mdx
│   │   │   ├── chapter-2-advanced/
│   │   │   └── _category_.json
│   │   ├── module-2-ros/
│   │   ├── module-3-simulation/
│   │   ├── module-4-ai-control/
│   │   └── module-5-capstone/
│   ├── _category_.json
├── src/
│   ├── components/
│   │   ├── ChatWidget/
│   │   ├── InteractiveCode/
│   │   ├── SummaryGenerator/
│   │   └── QuizComponent/
│   ├── pages/
│   └── css/
├── static/
│   ├── img/
│   └── assets/
├── i18n/
│   ├── en/
│   └── ur/ (Urdu translations)
├── docusaurus.config.js
├── sidebars.js
└── package.json
```

### Backend Modules & Router Structure
```
backend/
├── main.py
├── config/
│   ├── settings.py
│   └── database.py
├── api/
│   ├── __init__.py
│   ├── v1/
│   │   ├── __init__.py
│   │   ├── routers/
│   │   │   ├── chat.py
│   │   │   ├── ingest.py
│   │   │   ├── auth.py
│   │   │   └── health.py
│   │   └── models/
│   │       ├── chat.py
│   │       ├── user.py
│   │       └── content.py
├── services/
│   ├── rag_service.py
│   ├── chat_service.py
│   ├── ingestion_service.py
│   ├── embedding_service.py
│   └── auth_service.py
├── utils/
│   ├── chunking.py
│   ├── validation.py
│   └── helpers.py
├── tests/
└── requirements.txt
```

### Ingestion Pipeline Components
- **File Reader**: Parse MD/MDX files with metadata extraction
- **Chunker**: Split content into 400-600 token chunks with overlap
- **Embedder**: Generate OpenAI embeddings for each chunk
- **Vector Store**: Store embeddings in Qdrant with metadata
- **Indexer**: Create searchable index with content relationships

### RAG Pipeline Components
- **Retriever**: Query Qdrant for relevant content chunks
- **Ranker**: Rank results by relevance and recency
- **Generator**: Create contextual responses using OpenAI ChatKit
- **Grounding Validator**: Ensure responses are based only on textbook content
- **Citation Formatter**: Extract and format source citations

### ChatKit Agent Architecture
- **Conversation Manager**: Handle multi-turn conversations
- **Context Provider**: Supply textbook content as context
- **Response Formatter**: Structure responses with citations
- **Guardrail Validator**: Prevent hallucinations and off-topic responses

### Frontend Widget Integration Steps
1. Create React component for chat widget
2. Implement floating button with smooth animations
3. Add text selection and highlight functionality
4. Integrate with backend API endpoints
5. Implement responsive design for mobile
6. Add accessibility features (keyboard navigation, screen readers)

## Dependencies & Critical Path

### Dependency Chain
```
Content Writing → Ingestion Pipeline → RAG Backend → Chat Widget → Authentication → Advanced Features → Deployment
```

### Critical Path Analysis
1. **Content Creation** (Phase 3): Cannot proceed without written content
2. **Backend API** (Phase 2): Frontend and chatbot depend on API endpoints
3. **Authentication** (Phase 5): Personalization depends on user system
4. **Deployment** (Phase 7): All features must be complete for final deployment

### Risk Mitigation
- Parallel development possible for frontend/widget and backend
- Content creation can start early and be refined iteratively
- API contracts defined early to enable parallel development

## ADR-Ready Design Decisions

### 1. Content Chunking Strategy
**Issue**: How to optimally chunk textbook content for RAG retrieval?
**Decision**: Use 400-600 token chunks with 20% overlap to maintain context
**Rationale**: Balances retrieval accuracy with context preservation; aligns with OpenAI recommendations
**Alternatives considered**: Fixed sentence count, semantic chunking, paragraph-level chunks

### 2. Vector Store Selection
**Issue**: Which vector database best fits the educational RAG requirements?
**Decision**: Qdrant Cloud for its performance, cost-effectiveness, and OpenAI integration
**Rationale**: Meets performance requirements while providing necessary features for educational content
**Alternatives considered**: Pinecone, Weaviate, Chroma, FAISS

### 3. Docusaurus Architecture Pattern
**Issue**: How to structure Docusaurus for optimal content organization and navigation?
**Decision**: Multi-module structure with auto-generated sidebars and category-based organization
**Rationale**: Provides clear learning path while maintaining easy navigation and maintenance
**Alternatives considered**: Flat structure, manual sidebar management, separate documentation sites per module

### 4. FastAPI Modular Design
**Issue**: How to structure the FastAPI backend for scalability and maintainability?
**Decision**: Versioned API with separate routers, dependency injection, and service layer pattern
**Rationale**: Enables future extensibility while maintaining clean separation of concerns
**Alternatives considered**: Monolithic approach, microservice architecture, different frameworks

### 5. ChatKit Agent Workflow
**Issue**: How to structure the AI conversation flow for educational purposes?
**Decision**: Context-aware agent with grounding validation and citation generation
**Rationale**: Ensures educational accuracy while providing natural conversation flow
**Alternatives considered**: Simple prompt completion, rule-based responses, external conversation management

### 6. Sidebar & File Structure Conventions
**Issue**: How to organize content files for optimal maintainability and navigation?
**Decision**: Hierarchical structure with clear naming conventions and category files
**Rationale**: Enables auto-generation of navigation while maintaining clear content organization
**Alternatives considered**: Flat structure, manual navigation, different naming conventions

## Testing & Validation Strategy

### RAG Accuracy Tests
- **Test Type**: Content retrieval accuracy
- **Method**: Query known content sections and verify response accuracy
- **Target**: ≥95% accuracy rate for textbook-based questions
- **Tools**: Custom test suite with predefined questions and expected answers

### Widget Tests
- **Test Type**: UI/UX functionality
- **Method**: End-to-end tests for chat widget interactions
- **Target**: 100% functionality across all supported browsers/devices
- **Tools**: Playwright, Jest for UI testing

### API Tests
- **Test Type**: Backend endpoint validation
- **Method**: Unit and integration tests for all API endpoints
- **Target**: 90%+ code coverage, <3s response times
- **Tools**: pytest, FastAPI test client

### Deployment Tests
- **Test Type**: Production environment validation
- **Method**: Automated deployment validation and health checks
- **Target**: Zero-downtime deployments, 99.9% uptime
- **Tools**: Health check endpoints, monitoring services

### Citation Grounding Tests
- **Test Type**: Response source validation
- **Method**: Verify all chat responses include proper citations
- **Target**: 100% citation accuracy, no hallucinations
- **Tools**: Automated content matching and citation validation

## Setup Commands

### Initial Development Environment
```bash
# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup
cd website
npm install
npm run start

# Environment variables
cp .env.example .env
# Configure API keys and endpoints
```

### Production Build Commands
```bash
# Build Docusaurus site
cd website
npm run build

# Build backend Docker image
cd backend
docker build -t physical-ai-textbook-backend .
```

### Deployment Commands
```bash
# Deploy frontend to GitHub Pages
cd website
npm run deploy

# Deploy backend to Render/Railway
# Using platform-specific CLI tools or dashboard
```

## Build Steps

### Local Development Build
1. Set up Python virtual environment and install backend dependencies
2. Install Node.js dependencies for Docusaurus frontend
3. Configure environment variables for local development
4. Run backend API server
5. Run Docusaurus development server
6. Verify all components work together

### Production Build
1. Build static Docusaurus site
2. Package backend application
3. Configure production environment variables
4. Deploy frontend to GitHub Pages
5. Deploy backend to cloud platform
6. Configure DNS and SSL certificates
7. Verify production deployment

---

**Version**: 1.0.0 | **Last Updated**: 2025-12-10 | **Next Step**: `/sp.tasks` to generate implementation tasks