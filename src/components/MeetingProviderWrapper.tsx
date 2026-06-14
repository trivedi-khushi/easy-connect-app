import { MeetingProvider } from "@videosdk.live/react-sdk";
import { MeetingView } from "./MeetingView";

interface Props {
  meetingId: string;
  authToken: string;
  onMeetingLeave: () => void;
}

export default function MeetingProviderWrapper({ meetingId, authToken, onMeetingLeave }: Props) {
  return (
    <MeetingProvider
      key={meetingId}
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "User",
        debugMode: false,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  );
}
