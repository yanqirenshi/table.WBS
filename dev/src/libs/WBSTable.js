import React, { useState } from 'react';

import Asshole from '@yanqirenshi/wnqi.big.size';
import {Core} from './index.js';

import * as Comps from './Components.js';

const ASSHOLE = new Asshole();

function WBSTable (props) {
    const [columns, setColumns] = useState(new Core().makeColumns(props.columns));
    const [visible_wp, setVisibleWp] = useState(true);
    const [chooser_column, setChooserColumn] = useState(false);

    const style = props.style || {};

    const callbacks = {
        chooser: {
            switch: () => {
                setChooserColumn(!chooser_column);
            },
        },
        wp: {
            visible: (v) => {
                setVisibleWp(v);
            }
        },
        body: {
            row: {
                visible: (number, v) => {
                    const new_columns = columns.map(d => Object.assign(d));

                    const col = new_columns.find(d => d.number===number);

                    col.visible = v;

                    setColumns(new_columns);
                }
            },
        },
    };


    const records = ASSHOLE.build({
        data: props.source,
        options: props.options,
        start_id: props.start_id,
        flatten: true,
    });

    const max_lev = records.reduce((lev, d) => {
        return d._level > lev ? d._level : lev;
    }, 0);

    const columns_filterd = columns.filter(d => d.visible);
    return (
        <div>
          <div>
            <Comps.Controller open={chooser_column}
                              visible_wp={visible_wp}
                              callbacks={callbacks} />

            {chooser_column &&
             <div style={{marginBottom: 11}}>
               <Comps.ChooserColumn columns={columns}
                                    callbacks={callbacks} />
             </div>}
          </div>

          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                 style={style}>

            <Comps.THead columns={columns_filterd}
                         max_level={max_lev} />

            <Comps.TBody columns={columns_filterd}
                         max_level={max_lev}
                         records={records}
                         callbacks={callbacks}
                         visible_wp={visible_wp} />
          </table>
        </div>
    );
}

export default WBSTable;
