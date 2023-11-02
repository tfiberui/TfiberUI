import React from "react"

function CellTowerForm() {
    return (
    <div className="input-wrapper-container">
    <label>Add your details</label>
    <div className="input-wrapper-details">
      <div className="user-name">
        <label className="label-details">Name</label>
        <input
          type="text"                          
          placeholder="Enter here"
          name="name"
                   
        />
      </div>
      <div className="user-number">
        <label className="label-details">Mobile Number</label>
        <input
          type="text"
          name="mobile"
          placeholder="+91"                          
          
        />
      </div>
    </div>
    <div className="input-wrapper-details">
      <div className="user-name">
        <label className="label-details">Organization</label>
        <input
          type="text"                          
          placeholder="Enter here"
          name="name"
         
        />
      </div>
      <div className="user-number">
        <label className="label-details">Email address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter here"                          
          
        />
      </div>
    </div>
    <div className="checkbox-wrapper">
        <label className="checkbox-label">Type of Services</label>
        <div className="label-wrapper">
          <label>
            <input
              type="checkbox"
              name="broadband"
             
            />
            Hub and Spoke<span className="checkmark"></span>
          </label>
          <label>
            <input
              type="checkbox"
              name="ill"
              autoComplete="off"
             
            />
            Point to Point <span className="checkmark"></span>{" "}
          </label>         
        </div>
      </div>
      <div className="cloud-wrapper">
        <input
          type="text"
          placeholder="Please specify in case other services are needed"
          name="other"
          autoComplete="off"         
        />
      </div>

  </div>
  )
}

export default CellTowerForm;