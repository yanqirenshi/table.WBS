import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faDownload, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import STYLE from './Style.js';
const style = STYLE.controller;

function Controller (props) {
    const style_right = {...style.center};
    if (props.open)
        style_right.background = '#f3f3f3';

    const callbacks = props.callbacks;
    const clickColumns = () => callbacks.chooser.switch();
    const clickSwidthVisibleWp = () => callbacks.wp.visible(!props.visible_wp);
    const changeFilter = (e) => callbacks.filter.change(e.target.value);
    const clickClearWpFilter = () => callbacks.filter.clear();

    const xxx = () => callbacks.download();

    return (
        <div style={style.root}>
          <div style={style.left}>
            <button className="button is-small"
                    style={props.visible_wp ? {fontWeight:'bold'} : null}
                    title="Workpackage の表示/非表示を切り替える"
                    onClick={clickSwidthVisibleWp}>
              Wp
            </button>

            <div style={{marginLeft:11, width: '100%'}}>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-small"
                         type="text"
                         placeholder="Filter Workpackage"
                         onKeyUp={changeFilter}
                         defaultValue={props.filter_wp} />

                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faFilter} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={style_right}>
            <button className="button is-small"
                    onClick={clickColumns}>
              Columns
            </button>
          </div>

          <div style={style.right}>
            <button className="button is-small"
                    onClick={xxx}>
              <FontAwesomeIcon icon={faDownload} style={{fontSize: 14}}/>
            </button>
          </div>
        </div>
    );
}

export default Controller;
