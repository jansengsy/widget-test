import ReactDOM from "react-dom/client";
import MessageWidget from "./MessageWidget";
import "../../../index.css";

const rootElement = document.getElementById("widget-root");
if (!rootElement) throw new Error("Failed to find root element");

ReactDOM.createRoot(rootElement).render(<MessageWidget />);
