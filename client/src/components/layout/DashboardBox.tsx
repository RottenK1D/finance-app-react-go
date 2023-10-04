import { ReactNode } from "react";

//Type provided by React for inline styles
type Props = {
  style?: React.CSSProperties;
  children: ReactNode;
};

const DashboardBox = ({ style, children }: Props) => {
  return (
    <div
      className="dark bg-card border-2 border-border rounded-lg overflow-auto"
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default DashboardBox;
