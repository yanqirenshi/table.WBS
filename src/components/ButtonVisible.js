import React from 'react';

const buttonClass = (props) => {
    if (props.source.visible===true)
        return "button is-small is-warning";

    return "button is-small";
};

function ButtonVisible (props) {
    const click = () => {
        props.callbacks.body.row.visible(props.source.number, !props.source.visible);
    };

    return (
        <button className={buttonClass(props)}
                onClick={click} >
          表示
        </button>
    );
}

export default ButtonVisible;
