import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, lazy, Suspense } from "react";
import { JoinScreen } from "@/components/JoinScreen";
import { Toaster } from "@/components/ui/sonner";

const MeetingProviderWrapper = lazy(() => import("../components/MeetingProviderWrapper"));

const authToken = import.meta.env.VITE_VIDEOSDK_TOKEN;

async function createMeeting() {
  const res = await fetch("https://api.videosdk.live/v2/rooms", {
    method: "POST",
    headers: {
      authorization: authToken,
      "Content-Type": "application/json",
    },
  });
  const { roomId } = await res.json();
  return roomId;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Video Chat" }, { name: "description", content: "A simple video chat app." }],
  }),
  component: App,
});

function App() {
  const [name, setName] = useState<string>("");
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const getMeetingAndToken = useCallback(async (id: string | null, userName: string) => {
    setName(userName);
    const roomId = id ?? (await createMeeting());
    setMeetingId(roomId);
  }, []);

  const onMeetingLeave = useCallback(() => {
    setMeetingId(null);
    setName("");
  }, []);

  return (
    <>
      <Toaster />
      {meetingId ? (
        <Suspense fallback={<div>Loading...</div>}>
          <MeetingProviderWrapper
            meetingId={meetingId}
            authToken={authToken}
            onMeetingLeave={onMeetingLeave}
            name={name}
          />
        </Suspense>
      ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
      )}
    </>
  );
}
