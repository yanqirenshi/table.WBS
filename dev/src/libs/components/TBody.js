import React from 'react';

import TBodyTr from './TBodyTr.js';

function TBody (props) {
    return (
        <tbody>
          {props.records.map((d) => {
              return <TBodyTr key={d._id}
                              source={d}
                              columns={props.columns}
                              max_level={props.max_level}
                              callbacks={props.callbacks} />;
          })}
        </tbody>
    );
}

export default TBody;
