import moment from 'moment';

// composeTree -> composeTreeWbs
// composeTree -> composeTreeWorkpackage
// composeTreeWbs -> addChildren

class Options {
    template () {
        return {
            term : { start: null, end: null },
            contracts: [],
            hide: { // ← filter じゃないかな。
                wbs: {
                    finished: null,
                },
                workpackage: {
                    finished: null,
                },
            },
        };
    }
}
