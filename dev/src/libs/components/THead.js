import React from 'react';

const colSpan = (leveling, max_level) => {
    if (!leveling)
        return 1;

    return max_level + 1;
};

function THead (props) {
    const max_level = props.max_level;

    return (
        <thead>
          <tr>
            {props.columns.map((d, i)=> {
                return <th key={i}
                           colSpan={colSpan(d.leveling, max_level)}
                           style={{background:'#fcc800'}}>
                         {d.label}
                       </th>;
            })}
          </tr>
        </thead>
    );
}

export default THead;
