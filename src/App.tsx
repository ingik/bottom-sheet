import "./App.css";
import { BottomSheetProvider } from "./components/BottomSheetProvider";
import { TestScreen } from "./screens/TestScreen";

function App() {
  return (
    <div className="App">
      <BottomSheetProvider>
        <TestScreen />
      </BottomSheetProvider>
    </div>
  );
}

export default App;
