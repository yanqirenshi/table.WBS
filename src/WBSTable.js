import React from 'react';

import BodyTr from './BodyTr';
import Asshole from '@yanqirenshi/wnqi.big.size';

const ASSHOLE = new Asshole();

function WBSTable (props) {
    const columns = props.columns;

    const records = ASSHOLE.build({
        data: props.source,
        options: props.options,
        start_id: props.start_id,
        flatten: true,
    });

    const style = props.style || {};
    return (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
               style={style}>
          <thead>
            <tr>
              {columns.map((d, i)=> {
                  return <th key={i}>{d.label}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {records.map((d) => {
                return <BodyTr key={d._id} source={d} columns={columns} />;
            })}
          </tbody>
        </table>
    );
}

export default WBSTable;
