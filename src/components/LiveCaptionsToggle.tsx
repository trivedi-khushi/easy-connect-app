import { useTranscription } from "@videosdk.live/react-sdk";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LiveCaptionsToggle() {
  const [active, setActive] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);

  const { startTranscription, stopTranscription } = useTranscription({
    onTranscriptionStateChanged: (data) => {
      if (data.status === "TRANSCRIPTION_STARTING") setActive(true);
      if (data.status === "TRANSCRIPTION_STOPPED") setActive(false);
    },
    onTranscriptionText: (data) => {
      setCaptions((prev) => [...prev.slice(-4), `${data.participantName}: ${data.text}`]);
    },
  });

  const toggle = () => {
    if (active) {
      stopTranscription();
    } else {
      startTranscription({ webhookUrl: "" });
    }
  };

  return (
    <div className="w-full">
      <Button variant={active ? "default" : "outline"} onClick={toggle}>
        {active ? "Stop Captions" : "Start Captions"}
      </Button>
      {active && captions.length > 0 && (
        <div className="mt-2 p-3 bg-black/70 rounded-lg text-white text-sm space-y-1">
          {captions.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
