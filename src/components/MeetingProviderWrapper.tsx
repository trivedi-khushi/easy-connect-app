import { MeetingProvider } from "@videosdk.live/react-sdk";
import { MeetingView } from "./MeetingView";
import { useRef } from "react";

interface Props {
  meetingId: string;
  authToken: string;
  onMeetingLeave: () => void;
  name: string;
}

export default function MeetingProviderWrapper({
  meetingId,
  authToken,
  onMeetingLeave,
  name,
}: Props) {
  const mounted = useRef(false);

  if (mounted.current === false) {
    mounted.current = true;
  }

  return (
    <MeetingProvider
      key={meetingId}
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name,
        debugMode: false,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  );
}