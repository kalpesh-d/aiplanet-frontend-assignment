import Header from "./components/Header";
import DropArea from "./components/DropArea";
import SidePanel from "./components/SidePanel";
import Alert from "./components/Alert";
import { WorkflowProvider } from "./context/WorkflowContext";

const App = () => {
  return (
    <WorkflowProvider>
      <Header />
      <Alert />
      <DropArea />
      <SidePanel />
    </WorkflowProvider>
  );
};

export default App;