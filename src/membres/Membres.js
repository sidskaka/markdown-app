import React, { Component } from 'react';

const Membres = ({ age, nom, buttonChanged, textChanged }) => {
   return (
      <div>
         <input type="text" className="form-control"
            value={nom}
            onChange={textChanged}
         />
         <div>
            {nom} : {age}
         </div>
         <button onClick={buttonChanged}>Change</button>
      </div>
   )
}

export default Membres