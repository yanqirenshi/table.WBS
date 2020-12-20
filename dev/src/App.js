import React from 'react';

import 'bulma/css/bulma.min.css';

import WBSTable from './libs/index.js';

import * as WBS_DATA from './Data.js';

function App() {
    const columns = [
        {
            label: 'Code',
            required: true,
            contents: (c, d) => {
                return <>{d._id}</>;
            }
        },
        {
            label: 'Name',
            required: true,
            leveling: true,
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
        <section className="section">
          <div className="container">
            <h1 className="title">WBS Table</h1>

            <WBSTable source={wbs_source}
                      columns={columns}
                      options={options}
                      style={style_table}/>
          </div>
        </section>
    );
}

export default App;
