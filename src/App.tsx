import { useEffect, useRef, useState } from "react";
import "./App.scss";
const peer = new window.Peer("cbnbfj34-djhd-djdj34", {
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
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((value) => {
        console.log(value);
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
    const dc = peer.connect("afgs236-sgshg-2627a");
    dc.on("open", function () {
      dc.send(inputRef.current.value);
    });
  };
  return (
    <div>
      {/* <button onClick={handleClick}>Connect</button> */}
      <input name="inputText" ref={inputRef} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
