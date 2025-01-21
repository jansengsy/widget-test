import React, { useState, useEffect } from "react";
import { Send, History } from "lucide-react";

interface MessageEntry {
  text: string;
  timestamp: Date;
}

interface MessageState {
  currentMessage: string;
  history: MessageEntry[];
  showHistory: boolean;
}

const MessageWidget: React.FC = () => {
  const [state, setState] = useState<MessageState>({
    currentMessage: "",
    history: [],
    showHistory: false,
  });

  useEffect(() => {
    // Notify parent that widget is ready
    window.parent.postMessage({ type: "WIDGET_READY" }, "*");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentMessage.trim()) return;

    const messageEntry = {
      text: state.currentMessage,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      currentMessage: "",
      history: [...prev.history, messageEntry],
    }));

    // Send message to parent
    window.parent.postMessage(
      {
        type: "NEW_MESSAGE",
        payload: messageEntry,
      },
      "*"
    );
  };

  const toggleHistory = () => {
    setState((prev) => ({
      ...prev,
      showHistory: !prev.showHistory,
    }));
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-blue-500 rounded-lg text-white">
      <div className="w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Message Widget</h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={state.currentMessage}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  currentMessage: e.target.value,
                }))
              }
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
            <button
              type="submit"
              className="p-2 border-gray-100 border rounded-lg hover:scale-105 flex items-center justify-center"
              disabled={!state.currentMessage.trim()}
            >
              <Send className="w-5 h-5 pt-0.5" />
            </button>
          </div>
        </form>

        <div className="flex justify-center">
          <button
            onClick={toggleHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-100 hover:scale-105 rounded-lg"
          >
            <History className="w-4 h-4" />
            {state.showHistory ? "Hide History" : "Show History"}
          </button>
        </div>

        {state.showHistory && state.history.length > 0 && (
          <div className="mt-4">
            <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
              {state.history.map((entry, index) => (
                <div
                  key={index}
                  className="mb-2 pb-2 border-b border-gray-200 last:border-0"
                >
                  <p className="text-gray-800">{entry.text}</p>
                  <p className="text-xs text-gray-500">
                    {entry.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageWidget;
