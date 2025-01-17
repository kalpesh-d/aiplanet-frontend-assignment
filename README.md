# LLM Workflow Builder

A web-based application for creating and executing visual workflows with Large Language Models (LLMs). This application allows users to create workflows by connecting three types of nodes: Input, LLM, and Output, providing a visual interface for interacting with language models.

## Features

- **Visual Workflow Builder**
  - Drag and drop interface for creating workflows
  - Three node types: Input, LLM, and Output
  - Visual connections between nodes
  - Real-time validation of workflow structure

- **LLM Integration**
  - Support for multiple LLM providers:
    - OpenAI (GPT-3.5, GPT-4)
    - Groq (Dynamic model list)
  - Dynamic model loading from Groq API
  - Configurable model parameters
  - Secure API key management

- **Workflow Execution**
  - Real-time execution of workflows
  - Visual feedback during execution
  - Error handling and validation
  - Success/failure notifications

## Architecture

### Core Components

1. **Node Types**
   - `InputNode`: Accepts user input text
   - `LLMNode`: Configures and manages LLM settings
   - `OutputNode`: Displays generated results

2. **Services**
   - `openaiService`: Handles OpenAI API interactions
   - `groqService`: Manages Groq API interactions
   - `workflowService`: Orchestrates workflow execution

3. **Context**
   - `WorkflowContext`: Manages global state and workflow execution

### Directory Structure

```
src/
├── components/
│   ├── nodes/
│   │   ├── InputNode.jsx
│   │   ├── LLMNode.jsx
│   │   └── OutputNode.jsx
│   ├── Alert.jsx
│   ├── DropArea.jsx
│   ├── Header.jsx
│   └── SidePanel.jsx
├── context/
│   └── WorkflowContext.jsx
├── services/
│   ├── openaiService.js
│   ├── groqService.js
│   └── workflowService.js
└── styles/
    └── nodeStyles.js
```

## Technical Details

### LLM Configuration

The LLM node supports configuration of:
- Model selection (OpenAI and Groq models)
- API key management
- Temperature (0-1)
- Max tokens

### API Integration

1. **OpenAI Integration**
```javascript
const response = await openaiService.createCompletion(
  apiKey,
  model,
  messages,
  temperature,
  maxTokens
);
```

2. **Groq Integration**
```javascript
const response = await groqService.createCompletion(
  apiKey,
  model,
  messages,
  temperature,
  maxTokens
);
```

### Workflow Validation

The workflow service validates:
- Required nodes (Input, LLM, Output)
- Node connections
- Input text
- API key presence

## Getting Started

1. **Installation**
```bash
npm install
```

2. **Development**
```bash
npm run dev
```

3. **Building**
```bash
npm run build
```

## Usage

1. **Creating a Workflow**
   - Drag nodes from the sidebar onto the canvas
   - Connect nodes in sequence: Input → LLM → Output
   - Configure the LLM node with your API key and preferences

2. **Executing a Workflow**
   - Enter text in the Input node
   - Click the "Run" button in the header
   - View results in the Output node

3. **Managing Models**
   - OpenAI models are built-in
   - Groq models are fetched automatically when an API key is provided

## Error Handling

The application includes comprehensive error handling for:
- Invalid workflow configurations
- Missing API keys
- Failed API requests
- Invalid node connections

## Best Practices

1. **API Key Security**
   - Never share your API keys
   - Use environment variables in production
   - API keys are stored only in memory

2. **Workflow Design**
   - Keep workflows simple and linear
   - Validate input before execution
   - Monitor execution status through UI feedback
