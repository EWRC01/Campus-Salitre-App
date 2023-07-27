import React,  { useState } from "react";
import axios from "axios";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

function RegisterCultivation() {

    const [nameCultivation, setNameCultivation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleCultivationRegister = (e) => {
        e.preventDefault();

        //call the api
        axios.post('http://localhost:5000/api/registertypecultivation', {
            nameCultivation
        })
        .then((response) => {
            console.log('Cultivo Registrado con exito');
            setSuccessMessage('Cultivo Registrado con exito');
        })
        .catch((error) => {
            alert('Error during register the crop')
            setError('Erro al registrar el cultivo');
        });
    };

    return (
        <form onSubmit={handleCultivationRegister}>
        {error && <ErrorAlert message={error} />} {/* Mostrar el alerta de error si hay un mensaje de error */}
        {successMessage && <SuccessAlert message={successMessage} />} {/* Mostrar el alerta de éxito si hay un mensaje de éxito */}
        <h2>Agrega un nuevo cultivo</h2>
        <div>
            <label htmlFor="cultivationName">Nombre de cultivo: </label>
            <input
            type="text"
            id="cultivationName"
            value={nameCultivation}
            required
            onChange={(e) => setNameCultivation(e.target.value)}/>
        </div>
        <button type="submit">Agregar el cultivo</button>
        </form>
    );
}


export default RegisterCultivation;