# Dynamics G-Ex AI Hub - Product Requirements Document

## Overview
A comprehensive AI training platform for Dynamics G-Ex employees to learn about Microsoft Copilot and AI tools. Built with React (Create React App), FastAPI, and MongoDB.

## Original Problem Statement
Build an AI training platform to help employees learn about AI, particularly Microsoft Copilot, with interactive features, quizzes, certificate generation, and community engagement.

## Core Features Implemented

### Training Modules
- **Intro & Quick Wins** (no quiz) - Quick start guide with accordion-style collapsible sections
- **Module 1**: AI Fundamentals & Strategy
- **Module 2**: Governance & Responsible AI Use  
- **Module 3**: Practical Applications
- **Module 4**: Advanced AI with Success Stories & Certificate Generation

### Interactive Features
- Floating AI Helper (OpenAI GPT-4o integration)
- Animated page tutorials
- Quizzes for each module (except intro)
- Success Stories section with likes
- Certificate generation (PDF) for completing all modules

### Champions Toolkit
- Stats dashboard (champions, modules completed, stories shared)
- Department-specific toolkits (expandable)
- Leaderboard showing top performers
- Downloadable resources

### UI/UX
- Australian English spelling throughout
- Orange-highlighted "Training" navigation link with pulse animation
- Feedback form links (Microsoft Forms)
- Responsive design with Tailwind CSS + Shadcn UI

## Technical Stack
- **Frontend**: React (Create React App), Tailwind CSS, Shadcn UI
- **Backend**: Python FastAPI
- **Database**: MongoDB
- **AI Integration**: OpenAI GPT-4o
- **PDF Generation**: reportlab

## Key API Endpoints
- `POST /api/quiz-submit` - Submit quiz results
- `GET /api/quiz-results/view?password=Dynamics@26` - Admin view of quiz results
- `GET /api/quiz-results/download?password=Dynamics@26` - Download quiz results CSV
- `GET/POST /api/success-stories` - Success stories CRUD
- `POST /api/success-stories/{id}/like` - Like a story
- `GET /api/champions/dashboard` - Champions stats and leaderboard
- `POST /api/module-assistant` - AI chat for modules
- `POST /api/certificate/check` - Check certificate eligibility
- `POST /api/certificate/generate` - Generate PDF certificate
- `GET /api/module-stats` - Module completion statistics

## Database Collections
- `quiz_submissions` - {name, email, department, module_id, score, ...}
- `success_stories` - {story_id, name, content, likes, ...}

## Test Credentials
- **Admin password**: `Dynamics@26` (for quiz results access)
- **Certificate bypass email**: `certificate@dynamicsgex.com.au`

## What's Been Completed (Jan 9, 2026)
- [x] Accordion layout for Intro & Quick Wins module (5 collapsible sections)
- [x] Deleted redundant file `TrainingModuleEnhanced.jsx`
- [x] Full site testing - 17/17 backend tests passed, all frontend pages working

## Upcoming Tasks (P1-P2)
- [ ] Enhance "Success Stories" feature (dedicated page, pagination, search)
- [ ] Add more department-specific content to modules

## Future/Backlog (P3)
- [ ] Multi-language support
- [ ] User progress-tracking dashboard
- [ ] LMS integration

## Known Considerations
- AI Helper uses OpenAI GPT-4o - requires valid API key in `backend/.env`
- AI endpoints have fallback static responses if API fails
- Certificate generation bypasses eligibility check for test email
- Tutorial modal appears on first module visit (intentional onboarding)
