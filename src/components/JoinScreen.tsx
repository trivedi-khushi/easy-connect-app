import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface JoinScreenProps {
  getMeetingAndToken: (meetingId: string | null) => void;
}

export function JoinScreen({ getMeetingAndToken }: JoinScreenProps) {
  const [meetingIdInput, setMeetingIdInput] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Video Chat</h1>
          <p className="text-sm text-muted-foreground">
            Create a new meeting or join an existing one.
          </p>
        </div>

        <div className="space-y-3">
          <Button className="w-full" size="lg" onClick={() => getMeetingAndToken(null)}>
            Create New Meeting
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Enter Meeting ID"
              value={meetingIdInput}
              onChange={(e) => setMeetingIdInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && meetingIdInput.trim()) {
                  getMeetingAndToken(meetingIdInput.trim());
                }
              }}
            />
            <Button
              disabled={!meetingIdInput.trim()}
              onClick={() => getMeetingAndToken(meetingIdInput.trim())}
            >
              Join Meeting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
