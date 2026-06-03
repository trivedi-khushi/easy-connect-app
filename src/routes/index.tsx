import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { JoinScreen } from "@/components/JoinScreen";
import { MeetingView } from "@/components/MeetingView";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Chat" },
      { name: "description", content: "A simple video chat app." },
    ],
  }),
  component: App,
});

function App() {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const getMeetingAndToken = useCallback((id: string | null) => {
    // Placeholder: in a real app this would fetch a token from a server
    const newMeetingId = id ?? Math.random().toString(36).slice(2, 10);
    setMeetingId(newMeetingId);
    setParticipantIds([]);
  }, []);

  const onJoin = useCallback(() => {
    // Placeholder: populate with dummy participants when joining
    setParticipantIds(["local-user", "remote-user-1"]);
  }, []);

  const onMeetingLeave = useCallback(() => {
    setMeetingId(null);
    setParticipantIds([]);
  }, []);

  return (
    <>
      <Toaster />
      {meetingId ? (
        <div id="meeting-provider" className="meeting-provider">
          <MeetingView
            meetingId={meetingId}
            onMeetingLeave={onMeetingLeave}
            onJoin={onJoin}
            participantIds={participantIds}
          />
        </div>
      ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
      )}
    </>
  );
}
