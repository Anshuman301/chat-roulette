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
  const mediaStream = useRef<null | MediaStream>(null);
  const videoRef = useRef<null | HTMLVideoElement>(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((value) => {
        mediaStream.current = value;
      })
      .catch((reason) => console.log(reason));
  }, []);
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
  const handleCall = () => {
    const call = peer.call("cbnbfj34-djhd-djdj34", mediaStream.current);
    call.on("stream", function (stream) {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    });
  };
  peer.on("call", function (call) {
    call.answer(mediaStream.current);
    call.on("stream", function (stream) {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    });
  });
  return (
    <div>
      {/* <button onClick={handleClick}>Connect</button> */}
      <input name="inputText" ref={inputRef} />
      <button onClick={handleSend}>Send</button>
      <button onClick={handleCall}>Call</button>
      <video ref={videoRef} />
    </div>
  );
}

export default App;
