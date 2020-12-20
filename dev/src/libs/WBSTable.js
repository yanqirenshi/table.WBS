import React, { useState } from 'react';


import Asshole from '@yanqirenshi/wnqi.big.size';

import * as Comps from './Components.js';

const ASSHOLE = new Asshole();

function WBSTable (props) {
    const [chooser_column, setChooserColumn] = useState(false);

    const columns = props.columns;

    const records = ASSHOLE.build({
        data: props.source,
        options: props.options,
        start_id: props.start_id,
        flatten: true,
    });

    const style = props.style || {};

    const callbacks = {
        chooser: {
            switch: () => {
                setChooserColumn(!chooser_column);
            },
        },
    };

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
            <Comps.THead columns={columns} />
            <Comps.TBody columns={columns} records={records} />
          </table>
        </div>
    );
}

export default WBSTable;
