import React from 'react';

function BodyTr (props) {
    const row = props.source;

    return (
        <>
          <tr>
            {props.columns.map((column, i) => {
                return <td key={i}>
                         {column.contents(column, row, i)}
                       </td>;
            })}
          </tr>
        </>
    );
}

export default BodyTr;
