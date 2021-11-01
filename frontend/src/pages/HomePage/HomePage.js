import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function HomePage() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:5000`);
    console.log(newSocket);
    newSocket.emit("id", { data: "helllo" });
    return () => newSocket.close();
  }, [setSocket]);

  const sendData = (username, roomname) => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username: "ajay", roomname: "1" });
      //if empty error message pops up and returns to the same page
    } else {
      alert("username and roomname are must !");
      window.location.reload();
    }
  };
  return (
    <div className="App">
      <p>Hi</p>
    </div>
  );
}

export default HomePage;
