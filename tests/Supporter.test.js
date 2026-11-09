import React from 'react';

import Supporter from '../src/Supporter.js';

const wbs = { _id: 10, _class: 'WBS', _level: 1, label: 'b', description: 'desc-b' };
const wp  = { _id: 100, _class: 'WORKPACKAGE', _node_type: 'DB_TABLE', _level: 2,
              label: 'c', _core: { physical_name: 'T_C', use: true } };

describe('margin', () => {
    test('default indent is a full-width space per level', () => {
        const s = new Supporter();
        expect(s.margin(0)).toBe('');
        expect(s.margin(3)).toBe('　　　');
    });
    test('indent can be customized', () => {
        const s = new Supporter({ indent: '--' });
        expect(s.margin(2)).toBe('----');
    });
});

describe('path / to', () => {
    test('falls back to defaultPath when the node type is unknown', () => {
        const s = new Supporter();
        expect(s.to(wbs)).toBe('/wbs/10');
    });
    test('uses _node_type before _class to look up paths', () => {
        const s = new Supporter({ paths: { DB_TABLE: 'database/tables', WORKPACKAGE: 'wp' } });
        expect(s.to(wp)).toBe('/database/tables/100');
    });
    test('defaultPath can be customized', () => {
        const s = new Supporter({ defaultPath: 'nodes' });
        expect(s.to(wbs)).toBe('/nodes/10');
    });
});

describe('cellID', () => {
    test('returns the raw _id when no link renderer is given', () => {
        const s = new Supporter();
        expect(s.cellID({}, wbs)).toBe(10);
        expect(s.cellIDNotLink({}, wbs)).toBe(10);
    });
    test('delegates to the link renderer with (to, label, data)', () => {
        const link = jest.fn((to, label) => `${label}@${to}`);
        const s = new Supporter({ link: link });

        expect(s.cellID({}, wbs)).toBe('10@/wbs/10');
        expect(link).toHaveBeenCalledWith('/wbs/10', 10, wbs);
    });
    test('methods are bound so they can be passed as contents directly', () => {
        const s = new Supporter({ link: (to, label) => `${label}@${to}` });
        const contents = s.cellID;
        expect(contents({}, wbs)).toBe('10@/wbs/10');
    });
});

describe('cellLabel / cellDescription / cellValue / cellCoreValue', () => {
    const s = new Supporter({ empty: '-' });

    test('cellLabel returns label', () => {
        expect(s.cellLabel({}, wbs)).toBe('b');
    });
    test('cellDescription returns description or empty mark', () => {
        expect(s.cellDescription({}, wbs)).toBe('desc-b');
        expect(s.cellDescription({}, wp)).toBe('-');
    });
    test('cellValue reads data[key]', () => {
        expect(s.cellValue('label')({}, wp)).toBe('c');
        expect(s.cellValue('nothing')({}, wp)).toBe('-');
    });
    test('cellCoreValue reads data._core[key]', () => {
        expect(s.cellCoreValue('physical_name')({}, wp)).toBe('T_C');
        expect(s.cellCoreValue('physical_name')({}, wbs)).toBe('-');
    });
});

describe('cellFlag', () => {
    test('shows ○ for true and -- otherwise, looking in data then _core', () => {
        const s = new Supporter();
        const f = s.cellFlag('use');
        expect(f({}, wp)).toBe('○');
        expect(f({}, wbs)).toBe('--');
        expect(f({}, { use: true })).toBe('○');
        expect(f({}, { use: 'yes' })).toBe('--');
    });
    test('marks can be customized globally and per cell', () => {
        const s = new Supporter({ marks: { true: 'Y', false: 'N' } });
        expect(s.cellFlag('use')({}, wp)).toBe('Y');
        expect(s.cellFlag('use', { false: '×' })({}, wbs)).toBe('×');
    });
});

describe('cellByType', () => {
    test('switches contents by node type and falls back to cellLabel', () => {
        const s = new Supporter();
        const f = s.cellByType({ DB_TABLE: s.cellCoreValue('physical_name') });
        expect(f({}, wp)).toBe('T_C');
        expect(f({}, wbs)).toBe('b');
    });
    test('custom fallback is used for unmatched types', () => {
        const s = new Supporter();
        const f = s.cellByType({}, () => '---');
        expect(f({}, wbs)).toBe('---');
    });
});

describe('withMargin', () => {
    test('wraps contents with a level-based indent', () => {
        const s = new Supporter();
        const el = s.withMargin(s.cellLabel)({}, wp, 0);
        const [margin, body] = el.props.children;

        expect(margin.props.children).toBe('　　');
        expect(body.props.children).toBe('c');
    });
});
