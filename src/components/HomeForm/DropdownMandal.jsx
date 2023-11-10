import { useState } from "react";
function DropdownMandal({selectedMandal, setSelectedMandal, mandalList}) {
  const [isActive, setIsActive] = useState(false);
  const options = mandalList;

  //console.log("MandalNames: ",mandalList);

  return (
    <div className="dropdown">
      
      
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
          {selectedMandal}
        <span className="fas fa-caret-down"></span>
      </div>
      
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelectedMandal(option);
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

export default DropdownMandal;