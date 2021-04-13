import React from 'react';
const conditions = (props) => {
   return (
       <div>
               <div>
                   ciao
           {props.responseObj.cod === 200 ?
               <div>
                   <p><strong>{props.responseObj.name}</strong></p>
                   <p>It is currently  degrees out with {props.responseObj.weather[0].description}.</p>
               </div>
           : null
           }
       </div>
       </div>
   )
}
export default conditions;