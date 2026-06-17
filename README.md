# EasyConnect — Video Chat App

A lightweight real-time video conferencing app built with **React** and **[VideoSDK.live](https://videosdk.live)**. Create a meeting room instantly or join an existing one using a Meeting ID — no sign-up required.

## Features

- Create a new meeting room with one click
- Join any existing meeting using a Room ID
- Enter your name before joining — shown to all participants
- Auto-joins the meeting instantly, no extra click needed
- Live video streaming for all participants
- Toggle microphone and camera on/off mid-call
- Collaborative whiteboard — toggle on/off mid-meeting
- Live captions — real-time speech transcription for all participants
- Multi-participant video grid
- Leave meeting and return to home screen

## Tech Stack

| Layer         | Technology               |
| ------------- | ------------------------ |
| Frontend      | React 18 + TypeScript    |
| Video & Audio | VideoSDK.live React SDK  |
| Styling       | Tailwind CSS + shadcn/ui |
| Bundler       | Vite                     |
| Routing       | TanStack Router          |

## How It Works

VideoSDK handles all the complex WebRTC infrastructure — signaling, STUN/TURN servers, and media streams. This app uses the following SDK hooks:

| Hook | Purpose |
|---|---|
| `MeetingProvider` | Authenticates session and connects to the room |
| `useMeeting` | Join, leave, toggle mic/camera, read participant list |
| `useParticipant` | Access individual participant's live video/audio stream |
| `useWhiteboard` | Start/stop collaborative whiteboard session |
| `useTranscription` | Start/stop live speech-to-text captions |

## Prerequisites

- Node.js 18+
- A free VideoSDK account → [app.videosdk.live](https://app.videosdk.live)

## Getting Started

Use the following steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/trivedi-khushi/easy-connect-app.git
cd easy-connect-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:
```bash
touch .env
```

Add the following:
VITE_VIDEOSDK_TOKEN=your_videosdk_auth_token

### 4. How to get your Token

| Credential            | Where to Find It                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `VITE_VIDEOSDK_TOKEN` | VideoSDK Dashboard → API Keys → Click the 🔑 icon → Set Role to **RTC** → Generate Token |

### 5. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

---

## Configuration

| Variable              | Description                                                | Required |
| --------------------- | ---------------------------------------------------------- | -------- |
| `VITE_VIDEOSDK_TOKEN` | VideoSDK authorization token for room creation and joining | Yes      |

## Usage

<img width="596" height="318" alt="Screenshot 2026-06-05 at 5 08 14 AM" src="https://github.com/user-attachments/assets/50d89518-83b1-445e-993d-2a41e03ab135" />

1. Enter your name on the landing screen
2. Click **Create New Meeting** — a unique Room ID is generated, and you're joined instantly
3. Share the Room ID with anyone
4. They open the app, enter their name, paste the ID, and click **Join**
5. Use **Mic** and **Webcam** buttons to toggle audio/video
6. Click **Start Whiteboard** to open a shared collaborative canvas — click again to close
7. Click **Start Captions** to enable live speech transcription — click again to stop
8. To join an existing meeting, enter your name and the Meeting ID, then click **Join**

<img width="731" height="826" alt="Screenshot 2026-06-05 at 5 09 42 AM" src="https://github.com/user-attachments/assets/65477eb7-eff9-427d-bb67-9d636b45375c" />

## CI

This repo uses GitHub Actions for continuous integration. On every push to `main`, the pipeline automatically runs lint and build checks.

![CI](https://github.com/trivedi-khushi/easy-connect-app/actions/workflows/ci.yml/badge.svg)

## SDK Reference

- [VideoSDK React SDK Docs](https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/quick-start)
- [useMeeting Hook](https://docs.videosdk.live/react/api/sdk-reference/use-meeting/introduction)
- [useParticipant Hook](https://docs.videosdk.live/react/api/sdk-reference/use-participant/introduction)
- [useWhiteboard Hook](https://docs.videosdk.live/react/api/sdk-reference/use-whiteboard)
- [useTranscription Hook](https://docs.videosdk.live/react/api/sdk-reference/use-transcription)