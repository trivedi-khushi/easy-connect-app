# Future Scope — EasyConnect

Feature ideas under consideration for future iterations of this project. Not committed to a roadmap or timeline — this is a backlog of product concepts explored from a creative and technical standpoint.

---

## AI & Intelligence

### 1. AI Notetaker
Auto-generate meeting notes by combining the live captions pipeline with an LLM call at meeting-end. Summarizes key discussion points and action items without manual note-taking.

### 2. Auto Translate
Extend the live captions feature to translate transcribed speech into a second language in real time, enabling multilingual participants to follow along.

### 3. "Explain This" on Captions
Click any line in the live transcript to get an AI-generated clarification or definition inline. Useful in technical or educational contexts where jargon comes up mid-conversation.

### 4. Live Whiteboard-to-Diagram Cleanup
Let participants draw rough, messy diagrams on the whiteboard, then run the canvas through a vision model to redraw it as a clean flowchart or architecture diagram. High "wow" factor for technical audiences.

---

## Collaboration

### 5. Synchronized Code Editor
A shared Monaco/CodeMirror editor embedded in the meeting room, enabling pair programming or live technical interviews. Strong differentiator for a developer-focused audience — most generic video tools don't offer this.

### 6. Polls / Reactions Overlay
Quick thumbs-up/down or multiple-choice polls that appear over the video grid. Useful for any call with more than two participants to gather quick feedback without interrupting flow.

### 7. Whiteboard "Freeze Frame" for Latecomers
When a participant joins late, they immediately see a static snapshot of the current whiteboard state before live-syncing — avoiding the experience of joining a blank or loading canvas and missing context.

### Push Whiteboard Snapshot to Slack/Notion
One-click export of the whiteboard's current state to external tools the team already uses. Connects the ephemeral meeting artifact to permanent team knowledge.

### 8. "Parking Lot" Sidebar
A running list (tied to the whiteboard or separate) where any participant can drop an off-topic idea without interrupting the current discussion, to be revisited at the end of the meeting.

---

## Meeting Structure & Facilitation

### 9. Built-in Timer / Agenda Tracker
Host sets agenda items with time allocations; a subtle progress bar shows remaining time for the current topic. Useful for time-boxed meetings, interviews, and standups.

### 10. Meeting End Countdown
A visible progress bar indicating how much time is left before the scheduled meeting end time.

---

## Async & Absence Handling

### 11. "Leave a Video Note" for Absent Participants
If someone can't attend a meeting, they record a short async video response that gets attached to that meeting's record for others to watch later.

---

## Experiential / Demo-Impact Features

### 12. Spatial Audio
Position each participant's audio output based on their tile's location in the video grid (e.g., left tile pans audio left). Niche, but creates a noticeably more immersive experience in live demos.

---

## Notes

This list will grow as more ideas surface during development and user testing. Priority and feasibility for each item should be evaluated against effort required, audience relevance (developer-focused vs general), and whether VideoSDK's existing hooks/APIs support the underlying mechanism natively or require custom integration.