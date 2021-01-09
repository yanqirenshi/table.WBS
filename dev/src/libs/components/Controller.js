import React from 'react';
import { CSVLink } from "react-csv";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faDownload, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import STYLE from './Style.js';
const style = STYLE.controller;

const headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" }
];
const data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

function Controller (props) {
    const style_right = {...style.center};
    if (props.open)
        style_right.background = '#f3f3f3';

    const callbacks = props.callbacks;
    const clickColumns = () => callbacks.chooser.switch();
    const clickSwidthVisibleWp = () => callbacks.wp.visible(!props.visible_wp);
    const changeFilter = (e) => callbacks.filter.change(e.target.value);
    const clickClearWpFilter = () => {
        console.log('xx');
        callbacks.filter.clear();
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
            <div style={{paddingTop: 10, paddingRight: 16}}>
              <CSVLink data={data} headers={headers}>
                <FontAwesomeIcon icon={faDownload} style={{fontSize: 22}}/>
              </CSVLink>
            </div>
          </div>
        </div>
    );
}

export default Controller;
