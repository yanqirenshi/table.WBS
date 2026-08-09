import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faDownload, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import STYLE from './Style.js';
const style = STYLE.controller;

function DownloadButton (props) {
    const download = props.download;
    const [open, setOpen] = useState(false);
    const root = useRef(null);

    useEffect(() => {
        if (!open)
            return;

        const closeIfOutside = (e) => {
            if (root.current && !root.current.contains(e.target))
                setOpen(false);
        };

        document.addEventListener('mousedown', closeIfOutside);

        return () => document.removeEventListener('mousedown', closeIfOutside);
    }, [open]);

    if (typeof download === 'function') {
        return (
            <button className="button is-small" onClick={download}>
              <FontAwesomeIcon icon={faDownload} className="" style={{fontSize: 14}}/>
            </button>
        );
    }

    const select = (fn) => {
        fn();
        setOpen(false);
    };

    return (
        <div className={"dropdown is-right" + (open ? " is-active" : "")} ref={root}>
          <div className="dropdown-trigger">
            <button className="button is-small" onClick={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faDownload} className="" style={{fontSize: 14}}/>
            </button>
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a className="dropdown-item" onClick={() => select(download.hierarchy)}>階層</a>
              <a className="dropdown-item" onClick={() => select(download.flat)}>フラット</a>
              <a className="dropdown-item" onClick={() => select(download.data)}>データ</a>
            </div>
          </div>
        </div>
    );
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
                    <FontAwesomeIcon icon={faFilter} className="" />
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
            <DownloadButton download={callbacks.download} />
          </div>
        </div>
    );
}

export default Controller;
