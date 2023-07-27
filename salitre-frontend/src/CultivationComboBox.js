import React, { useEffect, useState } from "react";
import axios from 'axios';

function CultivationComboBox({name, value, onChange}) {
    const [cultivationTypes, setCultivationTypes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/types-cultivation')
            .then((response) => {
                setCultivationTypes(response.data);
            })
            .catch((error) => {
                console.error('Error during fetching cultivation types: ', error);
            });

    }, [])

    return (
        <select name={name} value={value} onChange={onChange}>
            {/* Add an initial Blank Option */}
            <option value=""> Selecciona una opcion por favor</option>
            {cultivationTypes.map((type) => (
                <option key={type.ID_Type_Cultivation} value={type.ID_Type_Cultivation}>
                    {type.Name_Type_Cultivation}
                </option>
            ))}
        </select>
    );
}

export default CultivationComboBox;
