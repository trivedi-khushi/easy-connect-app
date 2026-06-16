# EasyConnect — Video Chat App

A lightweight real-time video conferencing app built with **React** and **[VideoSDK.live](https://videosdk.live)**. Create a meeting room instantly or join an existing one using a Meeting ID — no sign-up required.

## Features

- Create a new meeting room with one click
- Join any existing meeting using a Room ID
- Live video streaming for all participants
- Toggle microphone and camera on/off mid-call
- Multi-participant video grid
- Leave meeting and return to home screen
-
## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| Video & Audio | VideoSDK.live React SDK |
| Styling | Tailwind CSS + shadcn/ui |
| Bundler | Vite |
| Language | TypeScript |

## How It Works

VideoSDK handles all the complex WebRTC infrastructure — signaling, STUN/TURN servers, and media streams. This app uses the `MeetingProvider`, `useMeeting`, and `useParticipant` hooks to:

1. Create rooms via the VideoSDK REST API
2. Authenticate using a short-lived JWT token
3. Stream live audio/video between participants in real time

## Prerequisites
- Node.js 18+
- A free VideoSDK account → [app.videosdk.live](https://app.videosdk.live)

## Getting Started

Use the following steps to run the project locally:

1. Clone the repository
```bash
git clone https://github.com/trivedi-khushi/easy-connect-glow.git
cd easy-connect-glow
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Setup Environment Variables
Create a `.env` file in the root directory:
```bash
touch .env
```

Add the following:
VITE_VIDEOSDK_TOKEN=your_videosdk_auth_token

4. How to get your Token

| Credential | Where to Find It |
|---|---|
| `VITE_VIDEOSDK_TOKEN` | VideoSDK Dashboard → API Keys → Click the 🔑 icon → Set Role to **RTC** → Generate Token |

5. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

---

## Configuration

| Variable | Description | Required |
|---|---|---|
| `VITE_VIDEOSDK_TOKEN` | VideoSDK authorization token for room creation and joining | Yes |
## Usage

<img width="596" height="318" alt="Screenshot 2026-06-05 at 5 08 14 AM" src="https://github.com/user-attachments/assets/50d89518-83b1-445e-993d-2a41e03ab135" />

1. Click **Create New Meeting** — a unique Room ID is generated
2. Share the Room ID with anyone
3. They open the app, paste the ID, and click **Join Meeting**
4. Click **Join** inside the room to start streaming
5. Use **Mic** and **Webcam** buttons to toggle audio/video
6. Elsewhere, in case of directly joining an existing meeting, enter the meeting code and enter the specific room.

<img width="731" height="826" alt="Screenshot 2026-06-05 at 5 09 42 AM" src="https://github.com/user-attachments/assets/65477eb7-eff9-427d-bb67-9d636b45375c" />

## SDK Reference

- [VideoSDK React SDK Docs](https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/quick-start)
- [useMeeting Hook](https://docs.videosdk.live/react/api/sdk-reference/use-meeting/introduction)
- [useParticipant Hook](https://docs.videosdk.live/react/api/sdk-reference/use-participant/introduction)
