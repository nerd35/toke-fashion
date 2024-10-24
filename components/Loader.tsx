// components/Loader.tsx
import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      {/* You can replace this with any GIF URL */}
      <img src="/images/loader.png" alt="Loading..." className="loader-gif" />
    </div>
  );
};

export default Loader;
