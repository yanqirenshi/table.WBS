import React from 'react';

import WBSTable from '@yanqirenshi/table.wbs';

import * as WBS_DATA from './data.js';

function PageExample() {
    const columns = [
        {
            label: 'Code',
            leveling: true,
            required: true,
            contents: (c, d) => {
                return <>{d._id}</>;
            }
        },
        {
            label: 'Name',
            required: true,
            contents: (c, d) => {
                return <>
               <span>{d.label}</span>
             </>;
            },
        },
        {
            label: 'Description',
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
                    style={style_table}/>
        </div>
    );
}

export default PageExample;
