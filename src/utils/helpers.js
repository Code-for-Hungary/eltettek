import React from 'react';

export const displayName = ({name, link}, title = '') => {
    console.log(name, 'name');
    
    const content = link ? <a href={link} target="_blank" rel="noopener noreferrer">{name}</a> : name;
    return (
        <>
            {content}
            {title && <i>{` (${title})`}</i>}
        </>
    )
}