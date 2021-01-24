import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faDownload, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import STYLE from './Style.js';
const style = STYLE.controller;

function exportToJson(objectData) {
    let filename = "example.json";
    let contentType = "application/json;charset=utf-8;";

   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
       const json = decodeURIComponent(encodeURI(JSON.stringify(objectData)));
        var blob = new Blob([json], { type: contentType });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var a = document.createElement('a');
        a.download = filename;
        a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
        a.target = '_blank';

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    }
}

function Controller (props) {
    const style_right = {...style.center};
    if (props.open)
        style_right.background = '#f3f3f3';

    const callbacks = props.callbacks;
    const clickColumns = () => callbacks.chooser.switch();
    const clickSwidthVisibleWp = () => callbacks.wp.visible(!props.visible_wp);
    const changeFilter = (e) => callbacks.filter.change(e.target.value);
    const clickClearWpFilter = () => callbacks.filter.clear();

    const xxx = () => {
        exportToJson({
            a: 1,
            b: [ 2, 3 ],
            c: { 4: 5, 6: 7 },
        });
    };

    return (
        <div style={style.root}>
          <div style={style.left}>
            <button className={props.visible_wp ? "button is-warning" : "button"}
                    title="Workpackage の表示/非表示を切り替える"
                    onClick={clickSwidthVisibleWp}>
              Wp
            </button>

            <div style={{marginLeft:22, width: '100%'}}>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input className="input"
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
            <button className="button"
                    onClick={clickColumns}>
              Columns
            </button>
          </div>

          <div style={style.right}>
            <button className="button" onClick={xxx}>
              <FontAwesomeIcon icon={faDownload} style={{fontSize: 22}}/>
            </button>
          </div>
        </div>
    );
}

export default Controller;
