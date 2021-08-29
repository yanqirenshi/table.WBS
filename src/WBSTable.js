import React, { useState } from 'react';

import Asshole from '@yanqirenshi/wnqi.big.size';
import Core from './Core.js';
import * as Comps from './Components.js';

function WBSTable (props) {
    const [core] = useState(new Core());
    const [colon] = useState(new Asshole());

    const [columns, setColumns] = useState(core.makeColumns(props.columns));
    const [visible_wp, setVisibleWp] = useState(true);
    const [chooser_column, setChooserColumn] = useState(false);
    const [closed_wbs, setClosedWbs] = useState({});
    const [filter_wp, setFilterWp] = useState('');

    const style = props.style || {};

    const callbacks = {
        chooser: { switch: () => setChooserColumn(!chooser_column), },
        wp: { visible: (v) => setVisibleWp(v), },
        body: {
            row: {
                visible: (number, v) => setColumns(core.changeColumnsVisible (number, v, columns)),
            },
            wbs: {
                switch: (action, _id) => setClosedWbs(core.contract(action, _id, closed_wbs)),
            },
        },
        filter: {
            change: (v) => setFilterWp(v),
        },
        download: () => {
            if (props.download)
                props.download();
        },
    };

    const records = colon.build({
        data: props.source, // array
        options: props.options,
        start_id: props.start_id,
        flatten: true,
    });

    const max_lev = records.reduce((lev, d) => {
        return d._level > lev ? d._level : lev;
    }, 0);

    const columns_filterd = columns.filter(d => d.visible);

    const records_filterd = [];
    let lev = null;
    for (const rec of records) {
        if (rec._class==="WORKPACKAGE" && !core.filterWp(rec, filter_wp))
            continue;

        if (closed_wbs[rec._id]) {
            lev = rec._level;
            records_filterd.push(rec);
            continue;
        }

        if (lev!==null && rec._level > lev)
            continue;

        lev = null;

        records_filterd.push(rec);
    }

    return (
        <div>
          <div>
            <Comps.Controller open={chooser_column}
                              visible_wp={visible_wp}
                              filter_wp={filter_wp}
                              callbacks={callbacks}
                              csv={core.makeCSV()}/>

            {chooser_column &&
             <div style={{marginBottom: 11}}>
               <Comps.ChooserColumn columns={columns}
                                    callbacks={callbacks} />
             </div>}
          </div>

          <table className="table is-fullwidth is-striped is-narrow is-hoverable"
                 style={style}>

            <Comps.THead columns={columns_filterd}
                         max_level={max_lev}
                         style={style.head}/>

            <Comps.TBody columns={columns_filterd}
                         max_level={max_lev}
                         records={records_filterd}
                         callbacks={callbacks}
                         visible_wp={visible_wp}
                         closed_wbs={closed_wbs}
                         filter_wp={filter_wp}
                         style={style.body} />
          </table>
        </div>
    );
}

export default WBSTable;
