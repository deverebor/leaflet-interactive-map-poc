// App.tsx
import React from "react";
import CustomMap from "./CustomMap";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Define o elemento do aplicativo para acessibilidade

const App: React.FC = () => {
  return (
    <div id="root">
      <h1>My Custom Interactive Map</h1>
      <CustomMap />
    </div>
  );
};

export default App;
