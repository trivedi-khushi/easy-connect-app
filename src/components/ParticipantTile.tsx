import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";

interface ParticipantTileProps {
  participantId: string;
}

export function ParticipantTile({ participantId }: ParticipantTileProps) {
  const { webcamStream, webcamOn, displayName, isLocal } =
    useParticipant(participantId);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && webcamOn && webcamStream) {
      videoRef.current.srcObject = new MediaStream([webcamStream.track]);
    }
  }, [webcamStream, webcamOn]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center"
        style={{ width: 300, height: 200 }}
      >
        {webcamOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span className="text-white font-medium">Camera Off</span>
        )}
      </div>
      <span className="text-sm text-muted-foreground">
        {displayName} {isLocal ? "(You)" : ""}
      </span>
    </div>
  );
}