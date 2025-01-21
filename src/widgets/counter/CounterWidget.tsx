import React, { useState, useEffect } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";

interface HistoryEntry {
  value: number;
  timestamp: Date;
}

interface CounterState {
  count: number;
  history: HistoryEntry[];
}

interface MessageEvent {
  type: "SET_COUNT" | "RESET";
  payload?: number;
}

const CounterWidget: React.FC = () => {
  const [state, setState] = useState<CounterState>({
    count: 0,
    history: [],
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      switch (event.type) {
        case "SET_COUNT":
          if (event.payload !== undefined) {
            updateCount(event.payload);
          }
          break;
        case "RESET":
          handleReset();
          break;
      }
    };

    window.parent.postMessage({ type: "WIDGET_READY" }, "*");
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const updateCount = (newCount: number) => {
    setState((prev) => ({
      count: newCount,
      history: [...prev.history, { value: newCount, timestamp: new Date() }],
    }));

    window.parent.postMessage(
      {
        type: "COUNT_UPDATED",
        payload: {
          count: newCount,
          timestamp: new Date(),
        },
      },
      "*"
    );
  };

  const handleIncrement = () => updateCount(state.count + 1);
  const handleDecrement = () => updateCount(state.count - 1);

  const handleReset = () => {
    setState({ count: 0, history: [] });
    window.parent.postMessage({ type: "COUNTER_RESET" }, "*");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between bg-blue-500 overflow-hidden p-4 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-6">Counter Widget</h2>

      <div>
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={handleDecrement}
            className="p-2 rounded-full border-2 border-gray-100 hover:scale-105"
            aria-label="Decrease count"
          >
            <Minus className="w-6 h-6" />
          </button>

          <span className="text-3xl font-bold min-w-16 text-center">
            {state.count}
          </span>

          <button
            onClick={handleIncrement}
            className="p-2 rounded-full border-2 border-gray-100 hover:scale-105"
            aria-label="Increase count"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 mx-auto text-sm border-2 border-gray-100 rounded-lg hover:scale-105"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="mt-6 text-left w-full p-4 h-48 max-h-48">
        <h3 className="text-lg font-semibold mb-2">History:</h3>
        <div className="max-h-36 overflow-y-auto px-4">
          {state.history.map((entry, index) => (
            <div key={index} className="text-sm py-1 border-b ">
              Value: {entry.value} at {entry.timestamp.toLocaleTimeString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterWidget;
