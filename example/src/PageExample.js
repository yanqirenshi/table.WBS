import React from 'react';

import WBSTable from './js/WBSTable';

import * as WBS_DATA from './data.js';

const margin = (level) => {
    let out = "";
    for (let i=0; i<level ;i++)
        out += "　";
    return out;
};

function PageExample() {
    const columns = [
        {
            label: 'Code',
            contents: (c, d) => {
                return <>{d._id}</>;
            }
        },
        {
            label: 'Name',
            contents: (c, d) => {
                return <>
               <span>{margin(d._level)}</span>
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
