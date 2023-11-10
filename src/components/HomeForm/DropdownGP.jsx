import { useState } from "react";
function DropdownGP({selectedGP, setSelectedGP, gpList}) {
  const [isActive, setIsActive] = useState(false);
  const options = gpList;

  //console.log("GPNames: ",gpList);

  return (
    <div className="dropdown">
      
      
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
          {selectedGP}
        <span className="fas fa-caret-down"></span>
      </div>
      
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelectedGP(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownGP;