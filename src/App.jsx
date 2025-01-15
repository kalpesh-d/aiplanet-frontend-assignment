import Header from "./components/Header";
import DropArea from "./components/DropArea";
import SidePanel from "./components/SidePanel";
import { DragDropProvider } from "./context/DragDropContext";

function App() {
  return (
    <DragDropProvider>
      <Header />
      <main>
        <DropArea />
        <SidePanel />
      </main>
    </DragDropProvider>
  );
}

export default App