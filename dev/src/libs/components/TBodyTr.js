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
        cell_s_first: {
            borderRight: 'none',
            width: 22,
        },
        cell_last: {
            borderLeft: 'none',
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
                    style={leveling && j===0 ? style.cell_s_first : style.cell_s}>
                </td>
            );
        });

        out.push(
            <td key={key++}
                style={leveling && (level===0 ? {} : style.cell_last)}
                colSpan={colSpan(column.leveling, level, max_level)}
                callbacks={callbacks}>
              {column.contents(column, row, key)}
            </td>
        );
    }

    return out;
};

const trStyle = (props) => {
    if (props.source._class==="WORKPACKAGE")
        return  { fontWeight: 'bold' };

    const x = props.max_level + 1 - props.source._level;

    return {fontSize: 14 + x * 2};
}

function TBodyTr (props) {
    trStyle(props);

    return (
        <tr style={trStyle(props)}>
          {cells(props)}
        </tr>
    );
}

export default TBodyTr;
