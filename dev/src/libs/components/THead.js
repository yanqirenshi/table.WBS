import React from 'react';

const colSpan = (leveling, max_level) => {
    if (!leveling)
        return 1;

    return max_level + 1;
};

function THead (props) {
    const max_level = props.max_level;

    const style = props.style || {}; //{background:'#fcc800'};

    return (
        <thead>
          <tr>
            {props.columns.map((d, i)=> {
                return <th key={i}
                           colSpan={colSpan(d.leveling, max_level)}
                           style={style}>
                         {d.label}
                       </th>;
            })}
          </tr>
        </thead>
    );
}

export default THead;
