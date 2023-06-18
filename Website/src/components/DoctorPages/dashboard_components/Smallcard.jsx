import React from 'react';
// import calenderpng from 'src\components\images\calendar-png-icon.jpg'

function Smallcard({title, icon,value}) {
  return (
    <div>
        <div className="box-post">
            <div className="box-icon">
              {/* <i class={`bi ${ff}`}></i> */}
              <i className={icon}></i>
            </div>
            <div className="box-text-item ">
              <h6 className="box-title">{title}</h6>
              <h5 className="box-count">{value}</h5>
            </div>

          
        </div>
    </div>
  )
}

export default Smallcard