import React from 'react';

import 'bulma/css/bulma.min.css';

import WBSTable from './libs/index.js';

import * as WBS_DATA from './Data.js';

function exportToJson(objectData) {
    let filename = "example.json";
    let contentType = "application/json;charset=utf-8;";

   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
       const json = decodeURIComponent(encodeURI(JSON.stringify(objectData)));
        var blob = new Blob([json], { type: contentType });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var a = document.createElement('a');
        a.download = filename;
        a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
        a.target = '_blank';

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    }
}


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

    const dljs = () => {
        exportToJson({
            a: 1,
            b: [ 2, 3 ],
            c: { 4: 5, 6: 7 },
        });
    };

    return (
        <section className="section">
          <div className="container">
            <h1 className="title">WBS Table</h1>

            <WBSTable source={wbs_source}
                      columns={columns}
                      options={options}
                      style={style_table}
                      download={dljs} />
          </div>
        </section>
    );
}

export default App;
