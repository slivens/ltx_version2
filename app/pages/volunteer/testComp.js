import React, { Component } from 'react';

export default React.forwardRef( (props,ref) =>{
    return(
        <button ref={ref}>
        {props.children}
        </button>
    )
})

