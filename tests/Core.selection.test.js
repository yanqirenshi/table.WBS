import Core from '../src/Core.js';

const core = new Core();

const records = [
    { _id: 1,   _class: 'PROJECT',     _level: 0 },
    { _id: 10,  _class: 'WBS',         _level: 1 },
    { _id: 100, _class: 'WORKPACKAGE', _level: 2 },
];

describe('toggleSelected (single)', () => {
    test('selects the clicked row and replaces any previous selection', () => {
        expect(core.toggleSelected(10, {}, 'single')).toEqual({ 10: true });
        expect(core.toggleSelected(100, { 10: true }, 'single')).toEqual({ 100: true });
    });
    test('clicking the selected row again clears the selection', () => {
        expect(core.toggleSelected(10, { 10: true }, 'single')).toEqual({});
    });
    test('does not mutate the given object', () => {
        const before = { 10: true };
        core.toggleSelected(100, before, 'single');
        expect(before).toEqual({ 10: true });
    });
});

describe('toggleSelected (multiple)', () => {
    test('adds rows to the selection', () => {
        expect(core.toggleSelected(10, {}, 'multiple')).toEqual({ 10: true });
        expect(core.toggleSelected(100, { 10: true }, 'multiple')).toEqual({ 10: true, 100: true });
    });
    test('removes a row that is already selected', () => {
        expect(core.toggleSelected(10, { 10: true, 100: true }, 'multiple')).toEqual({ 100: true });
    });
    test('does not mutate the given object', () => {
        const before = { 10: true };
        core.toggleSelected(100, before, 'multiple');
        expect(before).toEqual({ 10: true });
    });
});

describe('selectedIds / selectedRecords', () => {
    test('selectedIds returns numeric ids', () => {
        expect(core.selectedIds({ 10: true, 100: true }).sort((a, b) => a - b)).toEqual([10, 100]);
        expect(core.selectedIds({})).toEqual([]);
    });
    test('selectedRecords keeps record order', () => {
        expect(core.selectedRecords({ 100: true, 1: true }, records).map(d => d._id)).toEqual([1, 100]);
    });
});
