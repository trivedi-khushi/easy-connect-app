import { useWhiteboard } from "@videosdk.live/react-sdk";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function WhiteboardToggle() {
  const { startWhiteboard, stopWhiteboard, whiteboardUrl } = useWhiteboard();
  const [active, setActive] = useState(false);

  const toggle = () => {
    if (active) {
      stopWhiteboard();
      setActive(false);
    } else {
      startWhiteboard();
      setActive(true);
    }
  };

  return (
    <div className="w-full">
      <Button variant={active ? "default" : "outline"} onClick={toggle}>
        {active ? "Stop Whiteboard" : "Start Whiteboard"}
      </Button>
      {active && whiteboardUrl && (
        <iframe
          src={whiteboardUrl}
          className="w-full mt-2 rounded-lg border"
          style={{ height: 400 }}
        />
      )}
    </div>
  );
}
