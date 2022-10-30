# table.WBS

## Usage

See: examples/

### (1) Code

```
import React from 'react';

import WBSTable from '@yanqirenshi/table.wbs';

import * as WBS_DATA from './data.js';

export default function Example() {
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
                return <span>{d.label}</span>;
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
```

### (2) Data

```
export const PROJECTS = [
    {
        _id: 1,
        _class: 'PROJECT',
        label: 'a',
    }
];
export const WBS = [
    {
        _id: 10,
        _class: 'WBS',
        label: 'b',
    }
];
export const WORKPACKAGES = [
    {
        _id: 100,
        _class: 'WORKPACKAGE',
        label: 'c',
    }
];

let i = 10000000;
export const EDGES = [
    {
        _id: i++,
        from_id: 1,
        from_class: 'PROJECT',
        to_id: 10,
        to_class: 'WBS',
    },
    {
        _id: i++,
        from_id: 10,
        from_class: 'WBS',
        to_id: 100,
        to_class: 'WORKPACKAGE',
    },
];
```
