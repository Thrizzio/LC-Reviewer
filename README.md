Habit Review System

A review-driven learning and execution system that combines:

Daily DSA problem assignment

Manual learning/task tracking

Confidence-based spaced review

Unified review workflow for technical and non-technical learning


Instead of behaving like a normal todo app, the system is designed around one core principle:

> Anything important should eventually come back for review.




---

Core Idea

The product combines two different intake systems:

1. A DSA problem pool that automatically assigns new problems daily


2. Manual learning/task entries that immediately enter the review cycle



Examples:

Solve LeetCode problems daily

Review Japanese grammar chapters

Track coding concepts/projects

Reinforce long-term memory using confidence-based scheduling


The system is intentionally designed to act more like a:

Learning reinforcement engine

Active recall system

Execution tracker


rather than a simple habit tracker or task manager.


---

Key Product Concepts

1. Problem Pool

The user can paste a list of LeetCode/DSA problems they want to solve.

Example:

1, 20, 53, 121

These problems are stored in a dedicated pool.

The backend automatically assigns a fixed number of new problems daily.


---

2. Daily Tasks

Tasks represent:

Newly assigned DSA problems

Review problems

Manual learning entries


Examples:

Problem 121

JLPT Chapter 30 Grammar

Build Task Manager Without AI



---

3. Review System

Once a task is completed, the user is asked to rate confidence.

Examples:

Confidence	Review Delay

Forgot	1 day
Partial	3 days
Good	7 days
Mastered	No review


The selected confidence determines the next review date.

This creates a lightweight spaced repetition system.


---

Architecture Overview

The backend is intentionally separated into:

Problem reservoir layer

Task/review execution layer

Review scheduling system


This keeps future work separate from active reviewable items.


---

System Flow

Problem Pool
    ↓
Daily Assignment Engine
    ↓
Tasks Table
    ↓
User Completion
    ↓
Confidence Rating
    ↓
Review Scheduling
    ↓
Review Queue


---

Database Design

Table: problem_pool

Stores all future DSA questions.

CREATE TABLE problem_pool (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  problemId INTEGER UNIQUE,
  assigned INTEGER DEFAULT 0,
  solved INTEGER DEFAULT 0,
  createdAt TEXT
);

Purpose

This table acts as:

A backlog

A source reservoir

A future assignment queue


Problems are NOT reviewed directly from this table.


---

Table: tasks

Stores all active/reviewable items.

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  title TEXT,
  type TEXT,

  status TEXT,

  reviewDate TEXT,
  reviewCount INTEGER DEFAULT 0,
  confidence TEXT,

  originPoolId INTEGER,

  createdAt TEXT,
  completedAt TEXT
);


---

Task Lifecycle

DSA Pool Item
    ↓
Assigned Today
    ↓
Completed
    ↓
Review Scheduled
    ↓
Review Cycle
    ↓
Mastered

Manual learning items skip the pool phase and directly enter review scheduling.


---

Frontend Architecture

The frontend is built using React.

The UI is divided into:

1. DSA Pool Intake

Used for adding future LeetCode problems.

Example:

1,20,53,121


---

2. Manual Learning Intake

Used for adding completed learning items.

Examples:

JLPT Chapter 30 Grammar

Built Task Manager Without AI

Studied Dynamic Programming Notes


These immediately enter the review cycle.


---

3. Today Dashboard

Displays:

New DSA assignments

Pending review items

Completion checkboxes



---

4. Review Popup

Triggered after completion.

The popup determines review scheduling based on confidence.


---

Backend Stack

Technology	Purpose

Node.js	Runtime
Express.js	API server
SQLite	Database
React.js	Frontend
JavaScript / TypeScript	Application logic



---

API Design

Health Check

GET /health

Checks if backend server is running.


---

Get Today's Plan

GET /api/problems/today

Returns:

Newly assigned problems

Review items due today


Example response:

{
  "newQuestions": [],
  "reviews": []
}


---

Mark Problem Solved

PATCH /api/problems/:id/solve

Marks a problem as solved and schedules review.


---

Add Problems To Pool

POST /api/pool/add

Adds DSA problems into the future assignment reservoir.

Example body:

{
  "problems": [1, 20, 53]
}


---

Add Manual Learning Item

POST /api/tasks/manual

Creates a reviewable task directly.

Example body:

{
  "title": "JLPT Chapter 30 Grammar",
  "type": "JAPANESE"
}


---

Why Separate Pool And Tasks?

The project intentionally separates:

Future unsolved DSA backlog

Active/reviewable items


This prevents:

Review logic becoming messy

Duplicate assignment issues

Confusion between backlog and review state


The pool acts as a source.

The tasks table acts as the execution + review layer.


---

Current MVP Features

Add DSA problem pool

Daily problem assignment

Mark tasks solved

Review scheduling

Overdue review tracking

React dashboard

SQLite persistence



---

Planned Features

Authentication

User accounts

JWT authentication

Anonymous mode



---

Review Intelligence

Confidence-based review intervals

Dynamic scheduling

Adaptive reinforcement



---

Social Features

Shared challenge rooms

Cooperative challenges

Public leaderboards

Anonymous participation



---

Analytics

Review retention statistics

Streak tracking

Learning heatmaps

Completion graphs



---

PostgreSQL Migration

Planned migration from SQLite to PostgreSQL for:

Better scaling

Multi-user support

Production deployment



---

Design Philosophy

The project is built around:

Execution + Reinforcement

Most productivity apps only track completion.

This system focuses on:

remembering

revisiting

retaining

reinforcing


The review loop is the central mechanic of the product.


---

Future Architecture Direction

Potential future architecture:

Frontend (React)
    ↓
Express API Layer
    ↓
Task + Review Engine
    ↓
PostgreSQL

Future services may include:

Scheduler service

Recommendation engine

Review interval optimizer

Notification system



---

Running Locally

Backend

npm install
npm run dev


---

Frontend

npm install
npm run dev


---

Environment Variables

Example:

PORT=3000
DB_PATH=./database.db


---

Status

Current status:

MVP / Early Prototype

The project is currently focused on:

stabilizing core review workflow

refining task lifecycle

improving scheduling logic

validating product direction
