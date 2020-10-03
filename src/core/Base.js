import React from "react";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "text-dark p-4",
  children
}) => (
  <div>
    
    <div className="container-fluid">
      <div className="jumbotron text-light text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Base;
