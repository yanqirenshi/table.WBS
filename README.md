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

### (3) CSV Download

The download button in the controller offers three CSV export types out of the box: 階層 (hierarchy, indented by WBS level), フラット (flat), and データ (raw computed records, all fields).

Each column can define a `value(d)` function to control what plain text goes into the 階層/フラット CSV cell (`contents` is JSX and isn't used for CSV). Columns without `value` fall back to `d[column.key]`, then `d._id`.

```
{
    label: 'Name',
    required: true,
    value: (d) => d.label,
    contents: (c, d) => {
        return <span>{d.label}</span>;
    },
},
```

To keep the previous behavior of delegating the click to your own handler instead of the built-in dropdown, pass a `download` prop to `<WBSTable>`:

```
<WBSTable source={wbs_source}
          columns={columns}
          download={() => myOwnExport()}/>
```

### (4) Supporter

`Supporter` bundles the cell renderers you would otherwise write by hand for every `contents`.
Node-type paths and the link component are app concerns, so they are passed in through the constructor.

```
import WBSTable, { Supporter } from '@yanqirenshi/table.wbs';
import { Link } from 'react-router-dom';

const supporter = new Supporter({
    paths:       { DB_TABLE: 'database/tables', SCREEN: 'screens' }, // keyed by _node_type (falls back to _class)
    defaultPath: 'wbs',                                              // used when the type is not in paths
    link:        (to, label, d) => <Link to={to}>{label}</Link>,     // omit to render the plain _id
    marks:       { true: '○', false: '--' },                         // used by cellFlag
    empty:       '',                                                 // shown for null / undefined values
    indent:      '　',                                               // used by margin / withMargin
});

const columns = [
    { label: 'ID',          leveling: true, required: true, contents: supporter.cellID },
    { label: 'Name',        required: true,                 contents: supporter.cellLabel },
    { label: 'Physical',    contents: supporter.cellByType({ DB_TABLE: supporter.cellCoreValue('physical_name') }) },
    { label: 'Use',         contents: supporter.cellFlag('use') },
    { label: 'Description', contents: supporter.cellDescription },
];
```

| method | returns |
| --- | --- |
| `cellID(c, d)` | `link(to, d._id, d)` when `link` is set, otherwise `d._id` |
| `cellIDNotLink(c, d)` | `d._id` |
| `cellLabel(c, d)` | `d.label` |
| `cellDescription(c, d)` | `d.description` |
| `cellValue(key)` | a `contents` that returns `d[key]` |
| `cellCoreValue(key)` | a `contents` that returns `d._core[key]` |
| `cellFlag(key, marks?)` | a `contents` that shows `marks.true` when `d[key]` (or `d._core[key]`) is `true`, else `marks.false` |
| `cellByType(table, fallback?)` | a `contents` that picks `table[_node_type]`, falling back to `cellLabel` |
| `withMargin(contents)` | wraps a `contents` with a `margin(d._level)` indent (for columns without `leveling`) |
| `margin(level)` / `path(d)` / `to(d)` | the building blocks above |

### (5) Row selection

Pass `selection` to make rows clickable. Selected rows get a `wbs-selected` class and a `#F2F2B0` background (text color is left as is). Override the background with `style.selected`:

```
const style_table = { selected: { backgroundColor: '#ffe' } };
```

```
<WBSTable source={wbs_source}
          columns={columns}
          selection="multiple"                       // 'single' | 'multiple' (true means 'single')
          onSelect={(records, ids, clicked) => ...}/>  // called after every toggle
```

| prop | description |
| --- | --- |
| `selection` | `'single'` (one row at a time, click again to clear) or `'multiple'` (toggle each row). Omit or `false` to disable. |
| `onSelect(records, ids, clicked)` | Called after every click with the selected records (in table order), their `_id`s, and the record that was clicked. |
| `selected` | Optional array of `_id`s. When given, the table is *controlled*: it renders exactly these rows as selected and leaves updating them to your `onSelect`. |

Clicking the collapse caret on a WBS row does not change the selection.
