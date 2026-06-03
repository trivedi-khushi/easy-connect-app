import React from "react";

interface ParticipantTileProps {
  participantId: string;
}

export function ParticipantTile({ participantId }: ParticipantTileProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center justify-center rounded-lg bg-gray-700 text-white font-medium"
        style={{ width: 300, height: 200 }}
      >
        Camera Off
      </div>
      <span className="text-sm text-muted-foreground">{participantId}</span>
    </div>
  );
}
