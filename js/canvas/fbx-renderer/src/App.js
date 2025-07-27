// import FbxRenderer from "./components/FbxRenderer";
import GltfRenderer from "./components/GltfRenderer";

function App() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <GltfRenderer src={"/assets/102301.glb"} scale={1} />
      <GltfRenderer src={"/assets/102311.glb"} scale={1} />
    </div>
  );
}

export default App;
