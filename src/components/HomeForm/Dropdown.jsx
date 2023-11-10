import { useState } from "react";
function Dropdown({selectedDistrict, setSelectedDistrict, districtList}) {
  const [isActive, setIsActive] = useState(false);
  const options = districtList;

  //console.log("DistrictNames: ",districtList);
  //console.log("isActiveDistrict: ",districtList);

  return (
    <div className="dropdown">
      
      
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
          {selectedDistrict}
        <span className="fa fa-caret-down"></span>
      </div>
      
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelectedDistrict(option);
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

export default Dropdown;