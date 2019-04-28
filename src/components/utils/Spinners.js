import React from 'react';


const CubeGridSpinner = (props)=> {
    const cubes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        var classname = "sk-cube sk-cube"+i;
        return (
        <div 
            key={i}
            className={classname} 
            style={{background:props.foreground}} />
        );
    });
    return (
        <div className="sk-cube-grid" style={{background:props.background}}>
            {cubes}
            {/* <div className="sk-cube sk-cube1" />
            <div className="sk-cube sk-cube2" />
            <div className="sk-cube sk-cube3" />
            <div className="sk-cube sk-cube4" />
            <div className="sk-cube sk-cube5" />
            <div className="sk-cube sk-cube6" />
            <div className="sk-cube sk-cube7" />
            <div className="sk-cube sk-cube8" />
            <div className="sk-cube sk-cube9" /> */}
        </div>
    
    );
};

export default CubeGridSpinner;