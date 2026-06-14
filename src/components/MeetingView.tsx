import { useMeeting } from "@videosdk.live/react-sdk";
import { ParticipantTile } from "./ParticipantTile";
import { Controls } from "./Controls";
import { Button } from "@/components/ui/button";

interface MeetingViewProps {
  meetingId: string;
  onMeetingLeave: () => void;
}

export function MeetingView({ meetingId, onMeetingLeave }: MeetingViewProps) {
  const { join, participants } = useMeeting({
    onMeetingLeft: () => onMeetingLeave(),
  });

  const participantIds = [...new Set([...participants.keys()])];

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

      {participantIds.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <Button size="lg" onClick={() => join()}>
            Join
          </Button>
        </div>
      )}

      {participantIds.length > 0 && (
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {participantIds.map((id) => (
              <ParticipantTile key={id} participantId={id} />
            ))}
          </div>
        </div>
      )}

      {participantIds.length > 0 && (
        <div className="px-4 py-3 border-t">
          <Controls onMeetingLeave={onMeetingLeave} />
        </div>
      )}
    </div>
  );
}
