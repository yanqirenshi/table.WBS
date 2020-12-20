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
}
