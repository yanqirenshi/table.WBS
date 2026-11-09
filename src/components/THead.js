import React from 'react';

import Core from '../Core.js';

const core = new Core();

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
                           style={{...style, ...core.widthCellStyle(d)}}>
                         <div style={core.widthStyle(d)}>
                           {d.label}
                         </div>
                       </th>;
            })}
          </tr>
        </thead>
    );
}

export default THead;
