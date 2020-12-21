import React from 'react';

import TBodyTr from './TBodyTr.js';

const makeTr = (d, props) => {
    return <TBodyTr key={d._id}
                    source={d}
                    columns={props.columns}
                    max_level={props.max_level}
                    callbacks={props.callbacks} />;
};

const makeTrList = (props) => {

    let reducer;

    if (props.visible_wp)
        reducer = (list, d) => {
            list.push(makeTr(d, props));

            return list;
        };
    else
        reducer = (list, d) => {
            if (d._core._class==="WORKPACKAGE")
                return list;

            list.push(makeTr(d, props));

            return list;
        };

    return props.records.reduce(reducer, []);
};

function TBody (props) {
    return (
        <tbody>
          {makeTrList(props)}
        </tbody>
    );
}

export default TBody;
