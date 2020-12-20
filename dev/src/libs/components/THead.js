import React from 'react';

function THead (props) {
    return (
        <thead>
          <tr>
            {props.columns.map((d, i)=> {
                return <th style={{background:'#fcc800'}}
                           key={i}>
                         {d.label}
                       </th>;
            })}
          </tr>
        </thead>
    );
}

export default THead;
