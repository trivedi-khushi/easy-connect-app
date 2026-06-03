import React from "react";
import { Button } from "@/components/ui/button";
import { ParticipantTile } from "./ParticipantTile";
import { Controls } from "./Controls";

interface MeetingViewProps {
  meetingId: string;
  onMeetingLeave: () => void;
  onJoin: () => void;
  participantIds: string[];
}

export function MeetingView({
  meetingId,
  onMeetingLeave,
  onJoin,
  participantIds,
}: MeetingViewProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <h2 className="text-lg font-semibold">Meeting</h2>
          <p className="text-xs text-muted-foreground font-mono">{meetingId}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onMeetingLeave}>
          Leave
        </Button>
      </header>

      {/* Join button before entering */}
      {participantIds.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <Button size="lg" onClick={onJoin}>
            Join
          </Button>
        </div>
      )}

      {/* Participant grid */}
      {participantIds.length > 0 && (
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {participantIds.map((id) => (
              <ParticipantTile key={id} participantId={id} />
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      {participantIds.length > 0 && (
        <div className="px-4 py-3 border-t">
          <Controls
            onToggleMic={() => console.log("toggle mic")}
            onToggleWebcam={() => console.log("toggle webcam")}
            onLeave={onMeetingLeave}
          />
        </div>
      )}
    </div>
  );
}
