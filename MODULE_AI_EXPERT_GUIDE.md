# DGX AI Expert & Module Tutorial - Implementation Guide

## Overview
The training modules include two interactive features:
1. **Module Tutorial**: Quick start popup explaining module features
2. **DGX AI Expert**: Floating AI assistant for module-specific questions

## Module Tutorial

### Features
- **Interactive & Animated**: Highlights actual components on the page with spotlight effect
- **Step-by-step guided tour**: 5 steps walking users through the module
- **Smooth animations**: Pulsing borders, smooth scrolling, and transitions
- **Smart positioning**: Tooltips adjust position based on highlighted element
- **Progress indicators**: Visual dots showing current step
- **Auto-scroll**: Automatically scrolls to highlighted elements
- Appears automatically on first visit (after 1 second)
- "Skip Tour" and navigation buttons for user control
- "Don't show again" stored in localStorage
- Dark overlay with spotlight effect on active elements

### Tutorial Steps

1. **Welcome**: Center modal introducing the tour
2. **Module Content**: Highlights collapsible sections and explains how to expand them
3. **AI Expert**: Points to the floating tab on the right side
4. **Quiz**: Highlights the quiz section at the bottom
5. **Ready**: Final encouragement message

### Visual Effects

- **Pulsing orange border**: Around highlighted elements
- **Dark backdrop**: Dims everything except the highlighted area (spotlight effect)
- **Smooth scrolling**: Automatically brings elements into view
- **Animated tooltip**: Positioned near highlighted elements with arrows
- **Progress dots**: Show which step user is on

### How to Add to a New Module

#### Step 1: Import the Component
```javascript
import { ModuleTutorial } from "@/components/training/ModuleTutorial";
```

#### Step 2: Add Component to JSX
Place after Footer, before AI Expert:
```javascript
<Footer />

{/* Module Tutorial */}
<ModuleTutorial 
  moduleId={X}
  moduleName="Your Module Name"
/>

{/* Module AI Expert */}
<ModuleAIExpert 
  moduleId={X}
  moduleName="Your Module Name"
  moduleContext={moduleContext}
/>
</div>
```

### Component Props

| Prop | Type | Description |
|------|------|-------------|
| `moduleId` | number | Unique module identifier (used for localStorage key) |
| `moduleName` | string | Full module name displayed in tutorial header |

### Tutorial Content

The tutorial automatically shows:
1. 📚 **Learn the Content**: How to navigate and use collapsible sections
2. 💬 **Ask the DGX AI Expert**: Where to find and how to use the AI assistant
3. 🏆 **Test Your Knowledge**: Information about the quiz at the end

### Behavior

- **First Visit**: Tutorial appears after 800ms
- **Subsequent Visits**: Tutorial does not appear (stored in localStorage)
- **Manual Reset**: Users can clear browser data to see it again
- **Storage Key**: `module-{moduleId}-tutorial-shown`

## DGX AI Expert

## Features
- Floats on the right side of the screen
- Scrolls with the page
- Default state: collapsed (shows small tab)
- Expands to full chat interface
- Context-aware: trained on specific module content
- Conversation memory within each session
- Reset conversation option

## How to Add to a New Module

### Step 1: Import the Component
Add to your module page imports:
```javascript
import { ModuleAIExpert } from "@/components/training/ModuleAIExpert";
```

### Step 2: Define Module Context
Create a `moduleContext` constant with key topics from your module:
```javascript
const moduleContext = `This is Module X: [Module Name].

Key Topics:
- Topic 1: Brief description
- Topic 2: Brief description
- Key concepts students should understand
- Important definitions
- Examples and use cases
`;
```

### Step 3: Add Component to JSX
Place before the closing `</div>` tag (after Footer):
```javascript
<Footer />

{/* Module AI Expert */}
<ModuleAIExpert 
  moduleId={X}
  moduleName="Your Module Name"
  moduleContext={moduleContext}
/>
</div>
```

## Component Props

| Prop | Type | Description |
|------|------|-------------|
| `moduleId` | number | Unique module identifier (1, 2, 3, etc.) |
| `moduleName` | string | Full module name displayed in header |
| `moduleContext` | string | Comprehensive summary of module content for AI training |

## Module Context Best Practices

1. **Be Comprehensive**: Include all major topics covered in the module
2. **Use Clear Structure**: Bullet points or numbered lists work best
3. **Include Key Terms**: List important vocabulary and concepts
4. **Add Examples**: Reference specific examples from the module
5. **Keep it Factual**: Stick to objective information from module content
6. **Update as Needed**: If module content changes, update the context

## Example Module Context Template

```javascript
const moduleContext = `This is Module [X]: [Module Title].

Key Topics:
- [Topic Area 1]
  - Subtopic A
  - Subtopic B
- [Topic Area 2]
  - Key concept
  - Important principle
  
Key Definitions:
- [Term 1]: Definition
- [Term 2]: Definition

Best Practices:
- DO: [Best practice 1]
- DON'T: [Thing to avoid]

Examples:
- [Department]: [Use case example]
- [Department]: [Use case example]

Key Takeaways:
- Main learning point 1
- Main learning point 2
`;
```

## Backend Integration

The component uses the `/api/module-assistant` endpoint which:
- Accepts module context and conversation history
- Uses GPT-4o for intelligent responses
- Stores conversations in `module_conversations` collection
- Restricts responses to module-specific content

## Styling Notes

- Component uses fixed positioning with high z-index (50)
- Responsive: full width on mobile, 384px on desktop
- Uses primary color gradient for header
- Matches existing design system tokens
- Smooth transitions for expand/collapse

## User Experience

1. **Collapsed State**: Small tab on right side with "DGX AI Expert" label on hover
2. **Expanded State**: Full chat interface with welcome message
3. **First Message**: Shows helpful prompt suggestions
4. **Conversation**: Supports back-and-forth dialogue
5. **Reset**: User can start new conversation at any time
6. **Close**: Click X or tab to collapse

## Tips for Module Authors

- Keep context under 2000 characters for optimal performance
- Focus on facts and concepts, not lengthy explanations
- Include common questions students might ask
- Reference specific sections of your module
- Test the AI assistant after adding it to ensure accurate responses

## Future Enhancements

Potential improvements for future versions:
- Save conversation history across sessions
- Export conversation as study notes
- Highlight related module sections
- Suggest related questions
- Track which topics users ask about most
