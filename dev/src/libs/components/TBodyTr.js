import React from 'react';

const makeLevelingSpace = (level) => {
    const out = [];

    if (level>0)
        for (let i=0 ; i<level ; i++)
            out.push('');

    return out;
};

const colSpan = (leveling, level, max_lev) => {
    if (!leveling)
        return 1;

    return (max_lev + 1) - level;
};

const cells = (props) => {
    const out = [];

    const row = props.source;
    const callbacks = props.callbacks;
    const max_level = props.max_level;
    const columns = props.columns;

    const style = {
        cell: {
            borderLeft: 'none',
            borderRight: 'none',
        },
        cell_s: {
            borderLeft: 'none',
            borderRight: 'none',
            width: 22,
        },
    };

    let key = 0;
    for (const column of columns) {
        const leveling = column.leveling;
        const level = leveling ? row._level : 0;
        const number = column.number;

        makeLevelingSpace(level).map((d,j) => {
            out.push(
                <td key={key++}
                    style={leveling && style.cell_s}>
                </td>
            );
        });

        out.push(
            <td key={key++}
                style={leveling && style.cell}
                colSpan={colSpan(column.leveling, level, max_level)}
                callbacks={callbacks}>
              {column.contents(column, row, key)}
            </td>
        );
    }

    return out;
};

function TBodyTr (props) {
    return (
        <tr>{cells(props)}</tr>
    );
}

export default TBodyTr;
