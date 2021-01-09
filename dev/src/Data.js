export const PROJECTS = [
    {
        _id: 1,
        _class: 'PROJECT',
        label: 'LEVEL 01',
    }
];
export const WBS = [
    {
        _id: 10,
        _class: 'WBS',
        label: 'LEVEL 02-01',
    },
    {
        _id: 11,
        _class: 'WBS',
        label: 'LEVEL 02-02',
    },
];
export const WORKPACKAGES = [
    {
        _id: 100,
        _class: 'WORKPACKAGE',
        label: 'LEVEL 03-01',
    },
    {
        _id: 101,
        _class: 'WORKPACKAGE',
        label: 'LEVEL 03-02',
    },
    {
        _id: 102,
        _class: 'WORKPACKAGE',
        label: 'LEVEL 03-03',
    },
    {
        _id: 103,
        _class: 'WORKPACKAGE',
        label: 'LEVEL 03-04',
    },
    {
        _id: 104,
        _class: 'WORKPACKAGE',
        label: 'LEVEL 03-05',
    },
    {
        _id: 105,
        _class: 'WORKPACKAGE',
        label: 'LEVEL 03-06',
    },
];

let i = 10000000;
export const EDGES = [
    { _id: i++, from_id:  1, from_class: 'PROJECT', to_id: 10,  to_class: 'WBS' },
    { _id: i++, from_id: 10, from_class: 'WBS',     to_id: 100, to_class: 'WORKPACKAGE' },
    { _id: i++, from_id: 10, from_class: 'WBS',     to_id: 101, to_class: 'WORKPACKAGE' },
    { _id: i++, from_id: 10, from_class: 'WBS',     to_id: 102, to_class: 'WORKPACKAGE' },
    { _id: i++, from_id:  1, from_class: 'PROJECT', to_id: 11,  to_class: 'WBS' },
    { _id: i++, from_id: 11, from_class: 'WBS',     to_id: 103, to_class: 'WORKPACKAGE' },
    { _id: i++, from_id: 11, from_class: 'WBS',     to_id: 104, to_class: 'WORKPACKAGE' },
    { _id: i++, from_id: 11, from_class: 'WBS',     to_id: 105, to_class: 'WORKPACKAGE' },
];
