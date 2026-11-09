import React, { useState } from 'react';

import WBSTable from '@yanqirenshi/table.wbs';

import * as WBS_DATA from './data.js';

function PageExample() {
    const [selected, setSelected] = useState([]);

    const columns = [
        {
            label: 'Code',
            leveling: true,
            required: true,
            value: (d) => d._id,
            contents: (c, d) => {
                return <>{d._id}</>;
            }
        },
        {
            label: 'Name',
            required: true,
            value: (d) => d.label,
            contents: (c, d) => {
                return <>
               <span>{d.label}</span>
             </>;
            },
        },
        {
            label: 'Description',
            value: (d) => d.description,
            contents: (c, d) => {
                return d.description;
            }
        },
    ];

    const wbs_source = {
        projects:     WBS_DATA.PROJECTS,
        wbs:          WBS_DATA.WBS,
        workpackages: WBS_DATA.WORKPACKAGES,
        edges:        WBS_DATA.EDGES,
    };

    const options = {}; // or null
    const style_table = { fontSize: '16px' }; // or null
    return (
        <div style={{padding: '33px'}}>
          <WBSTable source={wbs_source}
                    columns={columns}
                    options={options}
                    style={style_table}
                    selection="multiple"
                    onSelect={(records) => setSelected(records)}/>

          <div style={{marginTop: 22}} data-testid="selected">
            <strong>Selected:</strong>
            {' '}
            {selected.length===0
             ? <span style={{color: '#888'}}>(none)</span>
             : selected.map(d => d._id + ' ' + d.label).join(', ')}
          </div>
        </div>
    );
}

export default PageExample;
