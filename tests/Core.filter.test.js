import Core from '../src/Core.js';

const core = new Core();

// 1
// ├ 20
// │  ├ 22
// │  │  └ 220 (wp)
// │  └ 21
// │     ├ 210 (wp)
// │     └ 211 (wp)
// └ 10
//    └ 100 (wp)
const wp = (_id, _level, label) => ({ _id, _level, _class: 'WORKPACKAGE', label, _core: { label } });
const wbs = (_id, _level, label) => ({ _id, _level, _class: 'WBS', label, _core: { label } });

const records = [
    wbs(1,   0, 'project'),
    wbs(20,  1, 'design'),
    wbs(22,  2, 'detail'),
    wp(220,  3, 'api'),
    wbs(21,  2, 'basic'),
    wp(210,  3, 'screen'),
    wp(211,  3, 'db'),
    wbs(10,  1, 'requirements'),
    wp(100,  2, 'survey'),
];

const ids = (list) => list.map(d => d._id);

describe('applyFilter (collapse)', () => {
    test('shows everything when nothing is closed', () => {
        expect(ids(core.applyFilter('', {}, records))).toEqual([1, 20, 22, 220, 21, 210, 211, 10, 100]);
    });
    test('hides the descendants of a closed node but keeps the node itself', () => {
        expect(ids(core.applyFilter('', { 21: true }, records))).toEqual([1, 20, 22, 220, 21, 10, 100]);
    });
    test('a closed node inside a closed ancestor stays hidden', () => {
        // 21 を閉じてから 20 を閉じる → 21 は 20 の中なので見えてはいけない
        expect(ids(core.applyFilter('', { 21: true, 20: true }, records))).toEqual([1, 20, 10, 100]);
    });
    test('siblings after a closed subtree are shown again', () => {
        expect(ids(core.applyFilter('', { 20: true }, records))).toEqual([1, 20, 10, 100]);
    });
});

describe('applyFilter (workpackage filter)', () => {
    test('keeps only matching workpackages, case-insensitively, and all WBS rows', () => {
        expect(ids(core.applyFilter('API', {}, records))).toEqual([1, 20, 22, 220, 21, 10]);
    });
});
