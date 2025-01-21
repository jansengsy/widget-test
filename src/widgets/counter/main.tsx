import ReactDOM from "react-dom/client";
import CounterWidget from "./CounterWidget";
import "../../../index.css";

const rootElement = document.getElementById("widget-root");
if (!rootElement) throw new Error("Failed to find root element");

ReactDOM.createRoot(rootElement).render(<CounterWidget />);
