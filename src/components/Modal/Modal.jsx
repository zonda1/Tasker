import React from 'react';
import cl from './Modal.module.css';


const Modal = ({children,visible,toggle}) => {
    const rootClasses=[cl.modal__wrapper];

    if (visible) {
        rootClasses.push(cl.modal__active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={()=>toggle()}>
            <div className={cl.modal} onClick={e=>e.stopPropagation()} >
                {children}
            </div>
        </div>
    );
};

export default Modal;   