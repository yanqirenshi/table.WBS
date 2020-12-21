import React from 'react';

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

    const callbacks = props.callbacks;
    const clickColumns = () => callbacks.chooser.switch();
    const clickSwidthVisibleWp = () => callbacks.wp.visible(!props.visible_wp);

    return (
        <div style={style.root}>
          <div style={style.left}>
            <button className={props.visible_wp ? "button is-warning" : "button"}
                    title="Workpackage の表示/非表示を切り替える"
                    onClick={clickSwidthVisibleWp}>
              Workpackage
            </button>
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
