import React, { useState } from 'react';

import Asshole from '@yanqirenshi/wnqi.big.size';

import * as Comps from './Components.js';

const ASSHOLE = new Asshole();

function WBSTable (props) {
    const [chooser_column, setChooserColumn] = useState(false);

    const style = props.style || {};

    const callbacks = {
        chooser: {
            switch: () => {
                setChooserColumn(!chooser_column);
            },
        },
    };

    const columns = props.columns;

    const records = ASSHOLE.build({
        data: props.source,
        options: props.options,
        start_id: props.start_id,
        flatten: true,
    });

    const max_lev = records.reduce((lev, d) => {
        return d._level > lev ? d._level : lev;
    }, 0);

    console.log(max_lev);

    return (
        <div>
          <div>
            <Comps.Controller open={chooser_column}
                              callbacks={callbacks}/>

            {chooser_column && <div style={{marginBottom: 11}}>
                                 <Comps.ChooserColumn columns={columns} />
                               </div>}
          </div>

          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                 style={style}>
            <Comps.THead columns={columns} max_level={max_lev} />
            <Comps.TBody columns={columns} max_level={max_lev} records={records} />
          </table>
        </div>
    );
}

export default WBSTable;
