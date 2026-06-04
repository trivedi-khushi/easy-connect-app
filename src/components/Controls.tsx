import { useMeeting } from "@videosdk.live/react-sdk";
import { Button } from "@/components/ui/button";

interface ControlsProps {
  onMeetingLeave: () => void;
}

export function Controls({ onMeetingLeave }: ControlsProps) {
  const { toggleMic, toggleWebcam, leave } = useMeeting();

  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant="outline" onClick={() => toggleMic()}>Mic</Button>
      <Button variant="outline" onClick={() => toggleWebcam()}>Webcam</Button>
      <Button variant="destructive" onClick={() => { leave(); onMeetingLeave(); }}>
        Leave
      </Button>
    </div>
  );
}