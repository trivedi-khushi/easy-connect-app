import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect, useRef, useState } from "react";
import { ParticipantTile } from "./ParticipantTile";
import { Controls } from "./Controls";
import { Button } from "@/components/ui/button";
import { WhiteboardToggle } from "./WhiteboardToggle";
import { LiveCaptionsToggle } from "./LiveCaptionsToggle";

interface MeetingViewProps {
  meetingId: string;
  onMeetingLeave: () => void;
}

export function MeetingView({ meetingId, onMeetingLeave }: MeetingViewProps) {
  const joinedRef = useRef(false);
  const [isMeetingJoined, setIsMeetingJoined] = useState(false);

  const { join, participants } = useMeeting({
    onMeetingLeft: () => onMeetingLeave(),
    onMeetingJoined: () => {
      console.log("meeting joined successfully");
      setIsMeetingJoined(true);
    },
  });

  useEffect(() => {
    if (!joinedRef.current) {
      joinedRef.current = true;
      setTimeout(() => join(), 1500);
    }
  }, []);

  const participantIds = [...participants.keys()];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <h2 className="text-lg font-semibold">Meeting</h2>
          <p className="text-xs text-muted-foreground font-mono">{meetingId}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => onMeetingLeave()}>
          Leave
        </Button>
      </header>

      {!isMeetingJoined && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Connecting...</p>
        </div>
      )}

      {isMeetingJoined && (
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {participantIds.map((id) => (
              <ParticipantTile key={id} participantId={id} />
            ))}
          </div>
        </div>
      )}

      {isMeetingJoined && (
        <div className="px-4 py-2 border-t space-y-2">
          <WhiteboardToggle />
          <LiveCaptionsToggle />
        </div>
      )}

      {isMeetingJoined && (
        <div className="px-4 py-3 border-t">
          <Controls onMeetingLeave={onMeetingLeave} />
        </div>
      )}
    </div>
  );
}