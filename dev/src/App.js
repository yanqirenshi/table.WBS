import React, { useState } from 'react';

import 'bulma/css/bulma.min.css';

import WBSTable, {Core} from './libs/index.js';

import * as WBS_DATA from './Data.js';


function App() {
    const [core] = useState(new Core());

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
                         <span>{core.margin(d._level)}</span>
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
