import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function makeLevelingSpace (level) {
    const out = [];

    if (level>0)
        for (let i=0 ; i<level ; i++)
            out.push('');

    return out;
};

function colSpan (leveling, level, max_lev) {
    if (!leveling)
        return 1;

    return (max_lev + 1) - level;
};

function opener (row, column, closed_wbs, callback) {
    if (row._class==="WORKPACKAGE" || !column.leveling)
        return '';

    const x = closed_wbs[row._id];
    return (
        <span style={{width: 22, display:'inline-block'}}
              onClick={callback}
              action={x ? "open" : "close"}
              data_id={row._id}>
          {x  && <FontAwesomeIcon style={{color: '#888084'}} icon={faCaretRight} />}
          {!x && <FontAwesomeIcon style={{color: '#dddcd6'}} icon={faCaretDown} />}
        </span>
    );
}

function cells (props, clickOpner) {
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
            width: 33,
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

        let j = 0;
        for (const d of makeLevelingSpace(level)) {
            out.push(
                <td key={row + (j++)}
                    style={leveling && j===0 ? style.cell_s_first : style.cell_s}>
                  {d}
                </td>
            );
        }

        out.push(
            <td key={key++}
                style={leveling && (level===0 ? {} : style.cell_last)}
                colSpan={colSpan(column.leveling, level, max_level)}
                callbacks={callbacks}
                nowrap={column.nowrap ? 'true' : null}>
              {opener(row, column, props.closed_wbs, clickOpner)}
              {column.contents(column, row, key)}
            </td>
        );
    }

    return out;
};

function trStyle (props) {
    if (props.source._class==="WORKPACKAGE")
        return  {}; // return  { fontWeight: 'bold' };

    const x = props.max_level + 1 - props.source._level;

    return {fontSize: 14 + x * 2};
}


function TBodyTr (props) {
    trStyle(props);

    const clickOpner = (e) => {
        const span = (element) => {
            if (element.tagName==='SPAN')
                return element;
            return span(element.parentNode);
        };

        const element = span(e.target);

        const action =element.getAttribute('action');
        const data_id =element.getAttribute('data_id') * 1;

        props.callbacks.body.wbs.switch(action, data_id);
    };

    return (
        <tr style={trStyle(props)}>
          {cells(props, clickOpner)}
        </tr>
    );
}

export default TBodyTr;
