import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import TypesCard from './typesCard';
import "../css/typesContainer.scss"
import { useProperties } from '../core/hooks';
import { useSearchParams } from 'react-router-dom';


interface Type {
    type: string
}



function TypesContainer() {
    const getTypes = useProperties('type')
    const types: Type[] = useMemo(() => getTypes.data ?? [], [getTypes.data]);

    const [search, setSearch] = useSearchParams();

    function handleClick(e: React.MouseEvent<HTMLDivElement>, type: string) {
        if (type == search.get('query')) {
            e.currentTarget.classList.remove('active');
            search.delete('query');
            setSearch(search, {
                replace: true,
            });
        } else {
            e.currentTarget.classList.add('active');
            search.set('query', type);
            setSearch(search, {
                replace: true,
            });
        }
    }


    return (
        <div className='cardContainer mt-4'>
            {types?.map((type, i: number) => (
                <div className="item" key={i} onClick={(e) => { handleClick(e, type.type) }}>
                    <TypesCard type={type.type} />
                </div>

            ))}


        </div>
    )
}

export default TypesContainer