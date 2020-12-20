import React from 'react';

const makeLevelingSpace = (level) => {
    const out = [];

    if (level>0)
        for (let i=0 ; i<level ; i++)
            out.push('');

    return out;
};

const colSpan = (leveling, level, max_lev) => {
    if (!leveling)
        return 1;

    return (max_lev + 1) - level;
};

function TBodyTr (props) {
    const row = props.source;
    const style = {
        cell: {
            borderLeft: 'none',
            borderRight: 'none',
        },
        cell_s: {
            borderLeft: 'none',
            borderRight: 'none',
            width: 22,
        },
    };

    return (
        <tr>
          {props.columns.map((column, i) => {
              const leveling = column.leveling;
              const level = leveling ? row._level : 0;

              return <>
                       {makeLevelingSpace(level).map((d,j) => {
                           return <td key={'col-space-'+j}
                                      style={leveling && style.cell_s}>
                                  </td>;
                       })}
                       <td key={'col-'+i}
                           style={leveling && style.cell}
                           colSpan={colSpan(column.leveling, level, props.max_level)}>
                         {column.contents(column, row, i)}
                       </td>
                     </>;
          })}
        </tr>
    );
}

export default TBodyTr;
