import merge from 'deepmerge';

export default class Core {
    margin (level) {
        let out = "";
        for (let i=0; i<level ;i++)
            out += "　";
        return out;
    }
    /* **************************************************************** *
     *  Column
     * **************************************************************** */
    templateColumn (i) {
        return {
            number: i,
            label: 'col-' + (i+1),
            required: false,
            visible: true,
            contents: (c, d) => {
                return d._id;
            }
        };
    }
    makeColumn (seed, i) {
        const column = merge(this.templateColumn(i), seed);

        return column;
    }
    makeColumns (seeds) {
        if (!Array.isArray(seeds))
            return [];

        return seeds.map((seed,i) => this.makeColumn(seed, i));
    }
    /* **************************************************************** *
     *  Visible                                                         *
     * **************************************************************** */
    changeColumnsVisible (number, v, columns) {
        const new_columns = columns.map(d => Object.assign(d));

        const col = new_columns.find(d => d.number===number);

        col.visible = v;

        return new_columns;
    }
    /* **************************************************************** *
     *  contract                                                        *
     * **************************************************************** */
    contract (action, _id, closed_wbs) {
        const tmp = {...closed_wbs};

        if (action==='close') {
            if (!tmp[_id])
                tmp[_id] = true;
        } else {
            if (tmp[_id])
                delete tmp[_id];
        }

        return tmp;
    }
    /* **************************************************************** *
     *  selection                                                       *
     * **************************************************************** */
    // selected: { [_id]: true } 形式。mode は 'single' か 'multiple'。
    toggleSelected (_id, selected, mode) {
        if (mode==='multiple') {
            const tmp = {...selected};

            if (tmp[_id])
                delete tmp[_id];
            else
                tmp[_id] = true;

            return tmp;
        }

        return selected[_id] ? {} : { [_id]: true };
    }
    selectedIds (selected) {
        return Object.keys(selected).map(k => k * 1);
    }
    selectedRecords (selected, records) {
        return records.filter(d => selected[d._id]);
    }
    /* **************************************************************** *
     *  filter                                                          *
     * **************************************************************** */
    filterWp (wbs, filter_wp) {
        const core = wbs._core;
        const word = filter_wp.toUpperCase();

        for (const k in core) {
            let v = core[k];
            const type = typeof v;

            if (type==='string' || type==='number')
                v = ('' + v).toUpperCase();
            else
                continue;

            if (v.indexOf(word)!==-1)
                return true;
        }

        return false;
    }
    applyFilter (filter_wp, closed_wbs, records) {
        const out = [];

        let lev = null;

        for (const rec of records) {
            if (rec._class==="WORKPACKAGE" && !this.filterWp(rec, filter_wp))
                continue;

            if (closed_wbs[rec._id]) {
                lev = rec._level;
                out.push(rec);
                continue;
            }

            if (lev!==null && rec._level > lev)
                continue;

            lev = null;

            out.push(rec);
        }

        return out;
    }
    /* **************************************************************** *
     *  csv                                                             *
     * **************************************************************** */
    escapeCSVField (v) {
        const s = (v===null || v===undefined) ? '' : String(v);

        if (/[",\r\n]/.test(s))
            return '"' + s.replace(/"/g, '""') + '"';

        return s;
    }
    toCSVString (headers, rows) {
        return [headers, ...rows]
            .map(row => row.map(v => this.escapeCSVField(v)).join(','))
            .join('\r\n');
    }
    columnValue (column, record) {
        if (typeof column.value === 'function')
            return column.value(record);

        if (column.key!==undefined && record[column.key]!==undefined)
            return record[column.key];

        return record._id;
    }
    makeCSVFlat (columns, records) {
        const headers = columns.map(c => c.label);
        const rows = records.map(r => columns.map(c => this.columnValue(c, r)));

        return this.toCSVString(headers, rows);
    }
    makeCSVHierarchy (columns, records) {
        const headers = columns.map(c => c.label);
        const rows = records.map(r => columns.map(c => {
            const v = this.columnValue(c, r);

            return c.leveling ? (this.margin(r._level) + v) : v;
        }));

        return this.toCSVString(headers, rows);
    }
    jsonStringifySafe (v) {
        const seen = new WeakSet();

        return JSON.stringify(v, (key, val) => {
            if (val!==null && typeof val==='object') {
                if (seen.has(val))
                    return '[Circular]';

                seen.add(val);
            }

            return val;
        });
    }
    makeCSVData (records) {
        const keys = records.reduce((set, r) => {
            Object.keys(r).forEach(k => set.add(k));

            return set;
        }, new Set());
        const headers = Array.from(keys);
        const rows = records.map(r => headers.map(k => {
            const v = r[k];

            return (v!==null && typeof v==='object') ? this.jsonStringifySafe(v) : v;
        }));

        return this.toCSVString(headers, rows);
    }
    /* **************************************************************** *
     *  utils                                                           *
     * **************************************************************** */
    maxLev (records) {
        return records.reduce((lev, d) => {
            return d._level > lev ? d._level : lev;
        }, 0);
    }
}
