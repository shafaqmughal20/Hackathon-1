# Data Model: Physical AI & Humanoid Robotics Interactive Textbook

**Feature**: 001-physical-ai-textbook
**Date**: 2025-12-10
**Status**: Draft

## Entity Definitions

### Student
**Description**: A user of the textbook system who accesses content, saves progress, and interacts with the chatbot

**Attributes**:
- `id` (string): Unique identifier for the student
- `email` (string): Student's email address (unique)
- `username` (string): Student's chosen username
- `password_hash` (string): Hashed password for authentication
- `first_name` (string): Student's first name
- `last_name` (string): Student's last name
- `background_level` (enum): ["beginner", "cs_ai", "engineering"] - Student's technical background
- `preferred_language` (string): Default language preference (e.g., "en", "ur")
- `created_at` (datetime): Account creation timestamp
- `updated_at` (datetime): Last account update timestamp
- `last_login_at` (datetime): Last login timestamp
- `is_active` (boolean): Account active status

**Relationships**:
- One-to-many with `UserProgress`
- One-to-many with `QuizAttempt`
- One-to-many with `Note`

### Chapter
**Description**: Educational content unit containing lessons, summaries, and quizzes; has different variants for different student backgrounds

**Attributes**:
- `id` (string): Unique identifier for the chapter
- `module_id` (string): Reference to parent module
- `title` (string): Chapter title
- `slug` (string): URL-friendly identifier
- `description` (string): Brief chapter description
- `word_count` (integer): Total word count for the chapter
- `estimated_reading_time` (integer): Estimated time in minutes
- `background_variant` (enum): ["common", "beginner", "cs_ai", "engineering"]
- `prerequisites` (array): List of prerequisite chapter IDs
- `learning_objectives` (array): List of learning objectives
- `created_at` (datetime): Creation timestamp
- `updated_at` (datetime): Last update timestamp

**Relationships**:
- Many-to-one with `Module` (parent)
- One-to-many with `Lesson`
- One-to-many with `Quiz`
- One-to-many with `Summary`

### Lesson
**Description**: Subdivision of a chapter containing specific educational content and interactive elements

**Attributes**:
- `id` (string): Unique identifier for the lesson
- `chapter_id` (string): Reference to parent chapter
- `title` (string): Lesson title
- `slug` (string): URL-friendly identifier
- `content` (string): Main content in MDX format
- `lesson_order` (integer): Order within the chapter
- `estimated_completion_time` (integer): Estimated time in minutes
- `interactive_elements` (array): List of interactive component types used
- `code_examples` (array): List of code example IDs
- `created_at` (datetime): Creation timestamp
- `updated_at` (datetime): Last update timestamp

**Relationships**:
- Many-to-one with `Chapter` (parent)
- One-to-many with `CodeExample`
- One-to-many with `InteractiveElement`

### ChatbotResponse
**Description**: AI-generated answer to student questions that is grounded in textbook content with proper citations

**Attributes**:
- `id` (string): Unique identifier for the response
- `student_id` (string): Reference to asking student
- `query` (string): Original question from student
- `response_text` (string): AI-generated response
- `citations` (array): List of source references with page/chapter info
- `confidence_score` (float): Confidence level of the response (0.0-1.0)
- `grounding_validation` (boolean): Whether response is properly grounded in textbook
- `response_time` (float): Time taken to generate response in seconds
- `created_at` (datetime): Creation timestamp
- `query_context` (string): Context of the query (selected text, chapter, etc.)

**Relationships**:
- Many-to-one with `Student` (user who asked)
- Many-to-many with `Chapter` (cited sources)

### UserProgress
**Description**: Record of a student's learning progress including completed chapters, quiz scores, and current position

**Attributes**:
- `id` (string): Unique identifier for the progress record
- `student_id` (string): Reference to the student
- `chapter_id` (string): Reference to the chapter
- `current_lesson_index` (integer): Current lesson position in chapter
- `completed_lessons` (array): List of completed lesson IDs
- `progress_percentage` (float): Overall progress in the chapter (0.0-100.0)
- `time_spent_seconds` (integer): Total time spent on the chapter
- `last_accessed_at` (datetime): Last time the chapter was accessed
- `quiz_scores` (array): List of quiz attempt scores for this chapter
- `notes` (array): List of note IDs associated with this chapter
- `personalization_applied` (object): Background level and preferences applied

**Relationships**:
- Many-to-one with `Student` (owner)
- Many-to-one with `Chapter` (progress for)

### Quiz
**Description**: Assessment with questions based on chapter content to test student understanding

**Attributes**:
- `id` (string): Unique identifier for the quiz
- `chapter_id` (string): Reference to parent chapter
- `title` (string): Quiz title
- `description` (string): Brief description
- `total_questions` (integer): Number of questions in the quiz
- `time_limit_seconds` (integer): Time limit for completion (0 if none)
- `passing_score` (float): Minimum score required to pass (0.0-100.0)
- `created_at` (datetime): Creation timestamp
- `updated_at` (datetime): Last update timestamp

**Relationships**:
- Many-to-one with `Chapter` (parent)
- One-to-many with `QuizQuestion`
- One-to-many with `QuizAttempt`

### QuizQuestion
**Description**: Individual question within a quiz

**Attributes**:
- `id` (string): Unique identifier for the question
- `quiz_id` (string): Reference to parent quiz
- `question_text` (string): The question text
- `question_type` (enum): ["multiple_choice", "true_false", "short_answer", "code_completion"]
- `options` (array): List of possible answers (for multiple choice)
- `correct_answer` (string): The correct answer
- `explanation` (string): Explanation of the correct answer
- `difficulty_level` (enum): ["easy", "medium", "hard"]
- `question_order` (integer): Order within the quiz

**Relationships**:
- Many-to-one with `Quiz` (parent)
- One-to-many with `QuizAnswer` (student responses)

### Module
**Description**: Top-level organizational unit grouping related chapters

**Attributes**:
- `id` (string): Unique identifier for the module
- `title` (string): Module title
- `slug` (string): URL-friendly identifier
- `description` (string): Brief module description
- `module_order` (integer): Order within the textbook
- `total_chapters` (integer): Number of chapters in the module
- `estimated_duration_hours` (integer): Estimated time to complete module
- `prerequisites` (array): List of prerequisite module IDs
- `learning_outcomes` (array): List of expected learning outcomes
- `created_at` (datetime): Creation timestamp
- `updated_at` (datetime): Last update timestamp

**Relationships**:
- One-to-many with `Chapter`

### Note
**Description**: Personal notes taken by a student while studying

**Attributes**:
- `id` (string): Unique identifier for the note
- `student_id` (string): Reference to the student
- `chapter_id` (string): Reference to the chapter (optional)
- `lesson_id` (string): Reference to the lesson (optional)
- `content` (string): Note content
- `highlighted_text` (string): Text that was highlighted when note was taken
- `position` (integer): Position in the content where note was taken
- `created_at` (datetime): Creation timestamp
- `updated_at` (datetime): Last update timestamp
- `is_public` (boolean): Whether note can be shared (for future features)

**Relationships**:
- Many-to-one with `Student` (owner)
- Many-to-one with `Chapter` (optional)
- Many-to-one with `Lesson` (optional)

### CodeExample
**Description**: Executable code example within lessons

**Attributes**:
- `id` (string): Unique identifier for the code example
- `lesson_id` (string): Reference to parent lesson
- `title` (string): Example title
- `code` (string): The actual code content
- `language` (string): Programming language (python, cpp, etc.)
- `description` (string): Explanation of what the code does
- `is_executable` (boolean): Whether the code can be run in playground
- `expected_output` (string): Expected output when executed
- `created_at` (datetime): Creation timestamp
- `updated_at` (datetime): Last update timestamp

**Relationships**:
- Many-to-one with `Lesson` (parent)

### InteractiveElement
**Description**: Interactive component within lessons (simulations, quizzes, etc.)

**Attributes**:
- `id` (string): Unique identifier for the element
- `lesson_id` (string): Reference to parent lesson
- `element_type` (enum): ["simulation", "interactive_diagram", "code_playground", "quiz_component"]
- `title` (string): Element title
- `configuration` (object): Configuration options for the element
- `created_at` (datetime): Creation timestamp
- `updated_at` (datetime): Last update timestamp

**Relationships**:
- Many-to-one with `Lesson` (parent)

## Validation Rules

### Student Entity
- Email must be valid email format
- Username must be 3-30 characters, alphanumeric with underscores/hyphens
- Password must meet complexity requirements (min 8 chars, mixed case, number, special char)
- Background level must be one of the defined enum values

### Chapter Entity
- Title must be 1-100 characters
- Slug must be URL-friendly (alphanumeric, hyphens, underscores only)
- Word count must be positive
- Estimated reading time must be positive
- Background variant must be one of the defined enum values

### Lesson Entity
- Title must be 1-100 characters
- Slug must be URL-friendly
- Lesson order must be positive
- Estimated completion time must be positive
- Content must be valid MDX format

### UserProgress Entity
- Progress percentage must be between 0.0 and 100.0
- Time spent must be non-negative
- Current lesson index must be valid for the chapter's lesson count
- Quiz scores must be between 0.0 and 100.0

### Quiz Entity
- Title must be 1-100 characters
- Total questions must be positive
- Time limit must be non-negative
- Passing score must be between 0.0 and 100.0

### ChatbotResponse Entity
- Confidence score must be between 0.0 and 1.0
- Response time must be positive
- Grounding validation must be boolean
- Citations must be properly formatted references