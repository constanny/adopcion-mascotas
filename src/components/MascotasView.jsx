import React from 'react'

import {
    Card,
    CardHeader,
    CardContent,
    Chip,
    Rating,
    Alert
} from '@mui/material'

function MascotasView({ mascotas = [] }) {

    if (!mascotas?.length) {
        return (
            <Alert severity="info">
                Debes ingresar al menos una mascota.
            </Alert>
        )
    }

    return (
        <div className="row">

            {mascotas.map((mascota, index) => (

                <div
                    className="col-6 mb-3"
                    key={index}
                >

                    <Card raised>

                        <CardHeader
                            title={mascota.nombre}
                            subheader={mascota.especie}
                        />

                        <CardContent>

                            <p>
                                {mascota.descripcion}
                            </p>

                            <p>
                                <strong>Edad:</strong> {mascota.edad} años
                            </p>

                            <div className="mb-2">
                                <Rating
                                    value={mascota.energia}
                                    readOnly
                                />
                            </div>

                            <div className="mb-2">
                                <Chip
                                    label={mascota.categoria}
                                    color={mascota.color}
                                />
                            </div>

                            <p>
                                <strong>
                                    Aporte de adopción:
                                </strong>

                                {' '}

                                ${mascota.aporte}
                            </p>

                        </CardContent>

                    </Card>

                </div>

            ))}

        </div>
    )
}

export default MascotasView