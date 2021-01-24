import React from 'react';

import ButtonVisible from './ButtonVisible.js';

const style = {
    root: {
        padding: 11,
        background: '#f3f3f3',
        borderRadius: '8px',
    },
};

function ChooserColumn (props) {
    const columns = props.columns || [];

    return (
        <div style={style.root}>
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr style={{background:'rgba(252, 200, 0, 0.3)'}}>
                <th rowSpan="2"></th>
                <th colSpan="3">基本</th>
                <th colSpan="3">文字</th>
                <th colSpan="1">背景</th>
              </tr>
              <tr style={{background:'rgba(252, 200, 0, 0.3)'}}>
                <th>Label</th>
                <th>Width</th>
                <th>Leveling</th>
                <th>Size</th>
                <th>Color</th>
                <th>Bold</th>
                <th>Color</th>
              </tr>
            </thead>

            <tbody>
              {columns.map((d,i) => {
                  return <tr key={i}>
                           <td style={{width: 66, textAlign: 'center'}}>
                             {d.required===true
                              && <p style={{color:'#ccc'}} >必須</p>}
                             {d.required!==true
                              && <ButtonVisible source={d}
                                                callbacks={props.callbacks}/>}
                           </td>
                           <td>
                             {d.label}
                           </td>
                           <td>--</td>
                           <td>
                             {d.leveling ? '○' : '×'}
                           </td>
                           <td>--</td>
                           <td>--</td>
                           <td>--</td>
                           <td>--</td>
                         </tr>;
              })}
            </tbody>
          </table>

        </div>
    );
}

export default ChooserColumn;
