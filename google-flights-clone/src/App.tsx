import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Hero from "./components/Hero";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Hero />
      </div>
    </LocalizationProvider>
  );
}

export default App;
