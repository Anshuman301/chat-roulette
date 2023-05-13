import { useEffect, useRef } from "react";
import "./App.scss";
const peer = new window.Peer("afgs236-sgshg-2627a", {
  host: "localhost",
  port: 9000,
  path: "/chat",
  debug: 0,
});

peer.on("open", (id) => {
  console.log("The generated id is:", id);
});
function App() {
  const refConn = useRef(null);
  const inputRef = useRef(null);
  const handleClick = () => {
    const dataConnection = peer.connect("cbnbfj34-djhd-djdj34", {
      serialization: "utf-8",
    });
    refConn.current = dataConnection;
  };
  peer.on("connection", function (conn) {
    console.log(conn);
    refConn.current = conn;
  });

  useEffect(() => {
    const { current } = refConn;
    if (current) {
      current.on("data", function (data) {
        console.log("Received", data);
      });
    }
    return () => {
      if (current) current.off("data");
    };
  }, [refConn.current]);
  const handleSend = () => {
    const { current: dataConnection } = refConn;
    if (dataConnection)
      dataConnection.on("open", function () {
        console.log("OPEN");
        // Send messages
        dataConnection.send("Hello!");
      });
  };
  return (
    <div>
      <button onClick={handleClick}>Connect</button>
      <input name="inputText" ref={inputRef} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
