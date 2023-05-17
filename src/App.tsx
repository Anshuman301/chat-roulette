import { useEffect, useRef, useState } from "react";
import "./App.scss";
const peer = new window.Peer("afgs236-sgshg-2627a", {
  host: "localhost",
  port: 9000,
  path: "/chat",
  debug: 3,
});

peer.on("open", (id) => {
  console.log("The generated id is:", id);
});
function App() {
  const inputRef = useRef(null);
  const videoRef = useRef<null | HTMLVideoElement>(null);
  peer.on("connection", function (conn) {
    conn.on("open", function () {
      // Receive messages
      console.log(conn);
      conn.on("data", function (data) {
        console.log("Received", data);
      });
    });
  });
  const handleSend = () => {
    const dc = peer.connect("cbnbfj34-djhd-djdj34");
    dc.on("open", function () {
      dc.send(inputRef.current.value);
    });
  };
  const handleCall = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const call = peer.call("cbnbfj34-djhd-djdj34", mediaStream);
    call.on("stream", function (stream) {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
        });
      }
    });
  };
  peer.on("call", async function (call) {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log("CALL INITIATED");
      call.answer(mediaStream);
      call.on("stream", function (stream) {
        console.log("CALL STREAM");
        if (videoRef.current) {
          console.log("hi");
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadedmetadata", async () => {
            await videoRef.current.play();
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <div>
      {/* <button onClick={handleClick}>Connect</button> */}
      <input name="inputText" ref={inputRef} />
      <button onClick={handleSend}>Send</button>
      <button onClick={handleCall}>Call</button>
      <video ref={videoRef} muted={true} />
    </div>
  );
}

export default App;
