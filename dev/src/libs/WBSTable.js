import React, { useState, useEffect } from 'react';

import Asshole from '@yanqirenshi/wnqi.big.size';
import Core from './Core.js';
import * as Comps from './Components.js';

const core = new Core();
const colon = new Asshole();

function WBSTable (props) {
    const [columns, setColumns] = useState(core.makeColumns(props.columns));
    const [records, setRecords] = useState([]);
    const [visible_wp, setVisibleWp] = useState(true);
    const [chooser_column, setChooserColumn] = useState(false);
    const [closed_wbs, setClosedWbs] = useState({});
    const [filter_wp, setFilterWp] = useState('');

    const data = props.source;
    const options = props.options;
    const start_id = props.start_id;
    const download = props.download;
    const style = props.style || {};

    useEffect(() => {
        (async () => {
            setRecords(colon.build({
                data:     data,
                options:  options,
                start_id: start_id,
                flatten:  true,
            }));
        })();
    }, [filter_wp, closed_wbs]);

    const max_lev = core.maxLev(records);
    const columns_filterd = columns.filter(d => d.visible);
    const records_filterd = core.applyFilter(filter_wp, closed_wbs, records);

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
        download: () => { if (download) download(); },
    };

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
