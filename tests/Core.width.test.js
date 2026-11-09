import Core from '../src/Core.js';

const core = new Core();

const columns = core.makeColumns([
    { label: 'Code', leveling: true },
    { label: 'Name', width: { min: 100 } },
    { label: 'Description' },
]);

describe('makeColumns', () => {
    test('gives every column a width with min/max defaulting to null', () => {
        expect(columns[0].width).toEqual({ min: null, max: null });
        expect(columns[2].width).toEqual({ min: null, max: null });
    });
    test('keeps width given in the seed', () => {
        expect(columns[1].width).toEqual({ min: 100, max: null });
    });
});

describe('changeColumnWidth', () => {
    test('sets min/max on the target column only and does not mutate the input', () => {
        const out = core.changeColumnWidth(2, 'max', 300, columns);

        expect(out[2].width).toEqual({ min: null, max: 300 });
        expect(out[0]).toBe(columns[0]);
        expect(out[1]).toBe(columns[1]);
        expect(columns[2].width).toEqual({ min: null, max: null });
    });
    test('accepts numeric strings from inputs', () => {
        expect(core.changeColumnWidth(1, 'max', '250', columns)[1].width).toEqual({ min: 100, max: 250 });
    });
    test('treats empty, NaN and non-positive values as unset', () => {
        expect(core.changeColumnWidth(1, 'min', '', columns)[1].width.min).toBeNull();
        expect(core.changeColumnWidth(1, 'min', 'abc', columns)[1].width.min).toBeNull();
        expect(core.changeColumnWidth(1, 'min', 0, columns)[1].width.min).toBeNull();
        expect(core.changeColumnWidth(1, 'min', -5, columns)[1].width.min).toBeNull();
    });
});

describe('widthCellStyle / fitsFullWidth', () => {
    test('widthCellStyle pins the column width to max, nothing otherwise', () => {
        expect(core.widthCellStyle(columns[1])).toEqual({});
        expect(core.widthCellStyle(core.changeColumnWidth(1, 'max', 120, columns)[1])).toEqual({ width: 120 });
    });
    test('fitsFullWidth is false only when every column has a max', () => {
        expect(core.fitsFullWidth(columns)).toBe(true);

        let all = columns;
        for (const c of columns)
            all = core.changeColumnWidth(c.number, 'max', 100, all);

        expect(core.fitsFullWidth(all)).toBe(false);
        expect(core.fitsFullWidth(core.changeColumnWidth(2, 'max', '', all))).toBe(true);
    });
});

describe('widthStyle', () => {
    test('returns an empty style when nothing is set', () => {
        expect(core.widthStyle(columns[0])).toEqual({});
        expect(core.widthStyle({ label: 'x' })).toEqual({});
    });
    test('maps min to minWidth', () => {
        expect(core.widthStyle(columns[1])).toEqual({ minWidth: 100 });
    });
    test('maps max to maxWidth and enables word breaking', () => {
        const c = core.changeColumnWidth(2, 'max', 300, columns)[2];
        expect(core.widthStyle(c)).toEqual({ maxWidth: 300, overflowWrap: 'break-word' });
    });
});
