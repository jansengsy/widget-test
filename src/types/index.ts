export interface WidgetMessage {
  type: string;
  payload?: any;
  timestamp?: string;
}

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export interface CounterWidgetState {
  count: number;
  history: Array<{
    value: number;
    timestamp: Date;
  }>;
}
