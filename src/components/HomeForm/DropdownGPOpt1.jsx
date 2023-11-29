import { useState } from "react";
function DropdownGPOpt1({selectedGram, setSelectedGram, gramListOpt1}) {
  const [isActive, setIsActive] = useState(false);
  const options = gramListOpt1;

  //console.log("gramListOpt1: ",gramListOpt1);

  return (
    <div className="dropdown">
      
      
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
          {selectedGram}
        <span className="fa fa-caret-down"></span>
      </div>
      
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelectedGram(option);
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

export default DropdownGPOpt1;