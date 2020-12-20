import React from 'react';

import BodyTr from './BodyTr.js';

function TBody (props) {
    return (
            <tbody>
              {props.records.map((d) => {
                  return <BodyTr key={d._id}
                                 source={d}
                                 columns={props.columns} />;
              })}
            </tbody>
    );
}

export default TBody;
