import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TypesCard from './typesCard';
import "../css/typesContainer.scss"


interface Type {
    type: string
}



function TypesContainer() {

    const [types, setTypes] = useState<Type[]>()

    useEffect(() => {
        axios.get<Type[]>('http://localhost:3000/product/types')
            .then((response) => {
                // handle success
                setTypes(response.data)
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    })
    return (
        <div className='cardContainer mt-4'>
            {types?.map((type, i: number) => (
                <div className="item">
                    <TypesCard key={i++} type={type.type} />
                </div>

            ))}


        </div>
    )
}

export default TypesContainer