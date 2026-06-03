import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P2P Video Chat" },
      { name: "description", content: "A simple peer-to-peer video chat with no external APIs." },
    ],
  }),
  component: Index,
});

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
];

function Index() {
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [offerSdp, setOfferSdp] = useState("");
  const [answerSdp, setAnswerSdp] = useState("");
  const [remoteInput, setRemoteInput] = useState("");
  const [status, setStatus] = useState("Idle");
  const [started, setStarted] = useState(false);
  const [role, setRole] = useState<"none" | "caller" | "callee">("none");

  useEffect(() => {
    return () => {
      pcRef.current?.close();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const initPC = () => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    pc.ontrack = (e) => {
      if (remoteRef.current && e.streams[0]) {
        remoteRef.current.srcObject = e.streams[0];
      }
    };
    pc.onconnectionstatechange = () => setStatus(pc.connectionState);
    localStreamRef.current?.getTracks().forEach((t) =>
      pc.addTrack(t, localStreamRef.current!),
    );
    pcRef.current = pc;
    return pc;
  };

  const waitForIce = (pc: RTCPeerConnection) =>
    new Promise<void>((resolve) => {
      if (pc.iceGatheringState === "complete") return resolve();
      const check = () => {
        if (pc.iceGatheringState === "complete") {
          pc.removeEventListener("icegatheringstatechange", check);
          resolve();
        }
      };
      pc.addEventListener("icegatheringstatechange", check);
    });

  const encode = (desc: RTCSessionDescriptionInit) =>
    btoa(JSON.stringify(desc));
  const decode = (s: string): RTCSessionDescriptionInit =>
    JSON.parse(atob(s.trim()));

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localRef.current) localRef.current.srcObject = stream;
      setStarted(true);
      setStatus("Camera ready");
    } catch (e) {
      toast.error("Could not access camera/microphone");
      console.error(e);
    }
  };

  const createOffer = async () => {
    const pc = initPC();
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await waitForIce(pc);
    setOfferSdp(encode(pc.localDescription!));
    setRole("caller");
    setStatus("Offer ready — share it");
  };

  const acceptOffer = async () => {
    try {
      const pc = initPC();
      const offer = decode(remoteInput);
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await waitForIce(pc);
      setAnswerSdp(encode(pc.localDescription!));
      setRole("callee");
      setRemoteInput("");
      setStatus("Answer ready — send it back");
    } catch (e) {
      toast.error("Invalid offer code");
      console.error(e);
    }
  };

  const acceptAnswer = async () => {
    try {
      const answer = decode(remoteInput);
      await pcRef.current?.setRemoteDescription(answer);
      setRemoteInput("");
      setStatus("Connecting…");
    } catch (e) {
      toast.error("Invalid answer code");
      console.error(e);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const hangup = () => {
    pcRef.current?.close();
    pcRef.current = null;
    setOfferSdp("");
    setAnswerSdp("");
    setRemoteInput("");
    setRole("none");
    setStatus("Idle");
    if (remoteRef.current) remoteRef.current.srcObject = null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">P2P Video Chat</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Direct peer-to-peer. No accounts, no servers. Share the code with your friend.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Status: <span className="font-mono">{status}</span>
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card className="overflow-hidden">
            <div className="px-3 py-2 text-xs font-medium border-b">You</div>
            <video
              ref={localRef}
              autoPlay
              playsInline
              muted
              className="w-full aspect-video bg-muted object-cover"
            />
          </Card>
          <Card className="overflow-hidden">
            <div className="px-3 py-2 text-xs font-medium border-b">Peer</div>
            <video
              ref={remoteRef}
              autoPlay
              playsInline
              className="w-full aspect-video bg-muted object-cover"
            />
          </Card>
        </div>

        {!started ? (
          <div className="flex justify-center">
            <Button size="lg" onClick={startCamera}>
              Start Camera & Mic
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {role === "none" && (
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4 space-y-3">
                  <h2 className="font-semibold">1. Start a call</h2>
                  <p className="text-sm text-muted-foreground">
                    Create an offer code and send it to your friend.
                  </p>
                  <Button onClick={createOffer} className="w-full">
                    Create Offer
                  </Button>
                </Card>
                <Card className="p-4 space-y-3">
                  <h2 className="font-semibold">2. Join a call</h2>
                  <p className="text-sm text-muted-foreground">
                    Paste an offer code from your friend.
                  </p>
                  <Textarea
                    placeholder="Paste offer code…"
                    value={remoteInput}
                    onChange={(e) => setRemoteInput(e.target.value)}
                    rows={3}
                  />
                  <Button
                    onClick={acceptOffer}
                    className="w-full"
                    disabled={!remoteInput.trim()}
                  >
                    Accept Offer
                  </Button>
                </Card>
              </div>
            )}

            {role === "caller" && (
              <Card className="p-4 space-y-3">
                <h2 className="font-semibold">Share this offer code</h2>
                <Textarea readOnly value={offerSdp} rows={4} className="font-mono text-xs" />
                <Button variant="secondary" onClick={() => copy(offerSdp)}>
                  Copy Offer
                </Button>
                <div className="pt-4 border-t space-y-3">
                  <h2 className="font-semibold">Then paste their answer code</h2>
                  <Textarea
                    placeholder="Paste answer code…"
                    value={remoteInput}
                    onChange={(e) => setRemoteInput(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={acceptAnswer} disabled={!remoteInput.trim()}>
                    Connect
                  </Button>
                </div>
              </Card>
            )}

            {role === "callee" && (
              <Card className="p-4 space-y-3">
                <h2 className="font-semibold">Send this answer code back</h2>
                <Textarea readOnly value={answerSdp} rows={4} className="font-mono text-xs" />
                <Button variant="secondary" onClick={() => copy(answerSdp)}>
                  Copy Answer
                </Button>
                <p className="text-sm text-muted-foreground">
                  Connection will start automatically once they accept it.
                </p>
              </Card>
            )}

            <div className="flex justify-end">
              <Button variant="destructive" onClick={hangup}>
                Hang Up
              </Button>
            </div>
          </div>
        )}

        <footer className="mt-10 text-xs text-muted-foreground text-center">
          Uses WebRTC with manual signaling. A public STUN server helps peers find each other across NATs.
        </footer>
      </div>
    </div>
  );
}
