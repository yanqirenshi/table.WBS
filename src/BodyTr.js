import React from 'react';

function BodyTr (props) {
    const data = props.source;

    return (
        <>
          <tr>
            {props.columns.map((column, i) => {
                return <td key={i}>
                         {column.contents(column, data, i)}
                       </td>;
            })}
          </tr>
        </>
    );
}

export default BodyTr;
