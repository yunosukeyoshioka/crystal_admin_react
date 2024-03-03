import React from "react";
import App from "../features/app/App";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <App />
      {children}
    </>
  );
};

export default Layout;
