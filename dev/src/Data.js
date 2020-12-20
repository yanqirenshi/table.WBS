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
