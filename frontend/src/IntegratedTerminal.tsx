// IntegratedTerminal.tsx
import { useEffect, useRef, useState } from "react";
import terminalVideo from "./assets/terminal.mp4";
import TypingText from "./TypingText";
import vaultBoySticker from "./assets/Fallout Vault Dweller Sticker by Amazon Prime Video.gif";
import VaultDwellerList from "./VaultDwellerList";
import FoodStorageList from "./FoodStorageList";

type Box = { left: number; top: number; width: number; height: number };
type Screen =
  | "main"
  | "help"
  | "status"
  | "vault boy"
  | "dwellers"
  | "food storage";

const HELP_TEXT =
  "Available commands:\n  help - show this screen\n  status - backend test \n  back - return to the terminal \n vault boy - displays the vault boy \n dwellers - Displays the Vault Dwellers Database \n food storage - shows food storage";

function IntegratedTerminal() {
  const [oopMessage, setOopMessage] = useState("Loading...");
  const [videoBox, setVideoBox] = useState<Box>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [screen, setScreen] = useState<Screen>("main");
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/message")
      .then((res) => res.text())
      .then((msg) => setOopMessage(msg))
      .catch(() => setOopMessage("Error fetching message"));
  }, []);

  // Track the actual on-screen rectangle of the video (it's letterboxed via
  // objectFit: "contain", so its rendered size/position shifts with the
  // window's aspect ratio). Overlay elements are positioned relative to this
  // rectangle instead of the viewport, so they stay put on the CRT screen
  // no matter how the browser is resized.
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const recompute = () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;

      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const videoRatio = vw / vh;
      const containerRatio = cw / ch;

      let width: number;
      let height: number;
      if (videoRatio > containerRatio) {
        width = cw;
        height = cw / videoRatio;
      } else {
        height = ch;
        width = ch * videoRatio;
      }

      setVideoBox({
        left: (cw - width) / 2,
        top: (ch - height) / 2,
        width,
        height,
      });
    };

    video.addEventListener("loadedmetadata", recompute);
    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(container);
    recompute();

    return () => {
      video.removeEventListener("loadedmetadata", recompute);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [screen, notice]);

  const commands: Record<string, () => void> = {
    help: () => setScreen("help"),
    status: () => setScreen("status"),
    back: () => setScreen("main"),
    exit: () => setScreen("main"),
    "vault boy": () => setScreen("vault boy"),
    dwellers: () => setScreen("dwellers"),
    "food storage": () => setScreen("food storage"),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    setInput("");
    if (!command) return;

    const run = commands[command];
    if (run) {
      setNotice(null);
      run();
    } else {
      setNotice(`Unknown command: ${command}`);
    }
  };

  const hasBox = videoBox.width > 0 && videoBox.height > 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1,
        backgroundColor: "#dbdce9",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={terminalVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />

      {hasBox && (
        <>
          <div
            style={{
              position: "absolute",
              top: videoBox.top + videoBox.height * 0.199,
              left: videoBox.left + videoBox.width * 0.3611,
              width: videoBox.width * 0.016,
              height: videoBox.height * 0.017,
              backgroundColor: "black",
              zIndex: 0,
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              top: videoBox.top,
              left: videoBox.left,
              width: videoBox.width * 0.02,
              height: videoBox.height * 0.01,
              backgroundColor: "black",
              zIndex: 1,
            }}
          />

          {/* handling user inputs */}
          <div
            ref={scrollRef}
            className="terminal-scroll"
            style={{
              position: "absolute",
              top: videoBox.top + videoBox.height * 0.19,
              left: videoBox.left + videoBox.width * 0.365,
              width: videoBox.width * 0.24,
              maxHeight: videoBox.height * 0.35,
              overflowY: "auto",
              overflowX: "hidden",
              color: "#00ff00",
              fontFamily: "monospace",
              fontSize: `${videoBox.width * 0.015}px`,
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
          >
            {screen === "help" && <TypingText text={HELP_TEXT} />}
            {screen === "status" && <TypingText text={`>${oopMessage}`} />}
            {screen === "dwellers" && <VaultDwellerList />}
            {screen === "food storage" && <FoodStorageList />}
            {screen === "vault boy" && (
              <img
                src={vaultBoySticker}
                alt="Vault Boy"
                style={{ width: "60%" }}
              />
            )}

            {notice && <p>{notice}</p>}

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span>{">"}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                style={{
                  width: `${input.length}ch`,
                  marginLeft: "4px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: 0,
                  color: "#00ff00",
                  caretColor: "transparent",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                }}
              />
              <span
                style={{
                  display: "inline-block",
                  width: "0.65em",
                  height: "1em",
                  backgroundColor: "#00ff00",
                  animation: "blink 0.6s steps(1) infinite",
                }}
              ></span>
            </form>
          </div>
        </>
      )}

      {/* Styling for the nav bar and blinking curser */}
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .terminal-scroll {
            scrollbar-width: thin;
            scrollbar-color: #00ff00 transparent;
          }
          .terminal-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .terminal-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .terminal-scroll::-webkit-scrollbar-thumb {
            background-color: #00ff00;
            border-radius: 3px;
          }
        `}
      </style>
    </div>
  );
}

export default IntegratedTerminal;
