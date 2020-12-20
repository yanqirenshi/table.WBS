import React from 'react';

import FormInput from './FormInput.js';

const style = {
    root: {
        display:'flex',
    },
    left: {
        flexGrow: 1,
        display:'flex',
        paddingTop: 11,
        marginBottom: 8,
    },
    right: {
        display:'flex',
        marginLeft: 22,
        padding:11,
        borderRadius: '8px 8px 0px 0px',
    }
};

function Controller (props) {
    const style_right = {...style.right};
    if (props.open)
        style_right.background = '#f3f3f3';

    const clickColumns = () => {
        props.callbacks.chooser.switch();
    };

    return (
        <div style={style.root}>
          <div style={style.left}>
            {/* <FormInput /> */}
          </div>

          <div style={style_right}>
            <button className="button"
                    onClick={clickColumns}>
              Columns
            </button>
          </div>
        </div>
    );
}

export default Controller;
