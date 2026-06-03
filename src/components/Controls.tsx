import React from "react";
import { Button } from "@/components/ui/button";

interface ControlsProps {
  onToggleMic: () => void;
  onToggleWebcam: () => void;
  onLeave: () => void;
}

export function Controls({ onToggleMic, onToggleWebcam, onLeave }: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant="outline" onClick={onToggleMic}>
        Mic
      </Button>
      <Button variant="outline" onClick={onToggleWebcam}>
        Webcam
      </Button>
      <Button variant="destructive" onClick={onLeave}>
        Leave
      </Button>
    </div>
  );
}
