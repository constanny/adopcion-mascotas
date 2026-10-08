import React, { useState } from 'react'

import {Card,CardHeader,CardContent,CardActions,TextField,RadioGroup,FormControlLabel,Radio,Rating,Button,Chip,Dialog,DialogTitle,DialogContent,DialogActions
} from '@mui/material'

function MascotasForm({ onCreateMascota = () => {} }) {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [especie, setEspecie] = useState('');
    const [edad, setEdad] = useState('');
    const [energia, setEnergia] = useState(0);
    const [dialogo, setDialogo] = useState(false);

    const calcularClasificacion = () => {

        if (edad !== '' && edad < 1) {
            return {
                categoria: 'Cachorro',
                aporte: 15000,
                color: 'warning'
            }
        }

        if (especie === 'gato' && edad > 5) {
            return {
                categoria: 'Senior',
                aporte: 0,
                color: 'info'
            }
        }

        if (edad > 7) {
            return {
                categoria: 'Senior',
                aporte: 0,
                color: 'info'
            }
        }

        return {
            categoria: 'Adulto',
            aporte: 15000,
            color: 'primary'
        }
    }

    const clasificacion = calcularClasificacion();

    const handleClick = () => {

        if (!nombre) {
            setDialogo(true);
            return;
        }

        if (!descripcion) {
            setDialogo(true);
            return;
        }

        if (!especie) {
            setDialogo(true);
            return;
        }

        if (edad === '') {
            setDialogo(true);
            return;
        }

        if (energia < 1) {
            setDialogo(true);
            return;
        }

        const mascota = {};

        mascota.nombre = nombre;
        mascota.descripcion = descripcion;
        mascota.especie = especie;
        mascota.edad = edad;
        mascota.energia = energia;
        mascota.categoria = clasificacion.categoria;
        mascota.aporte = clasificacion.aporte;
        mascota.color = clasificacion.color;

        onCreateMascota(mascota);

        setNombre('');
        setDescripcion('');
        setEspecie('');
        setEdad('');
        setEnergia(0);
    }

    return (
        <>
            <Card
                raised
                sx={{
                    backgroundColor: '#fff7fb'
                }}
            >

                <CardHeader
                    title="Registrar Mascota"
                    sx={{
                        backgroundColor: '#f8d7e8'
                    }}
                />

                <CardContent>

                    <div className="mt-3">
                        <TextField
                            fullWidth
                            label="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <TextField
                            fullWidth
                            multiline
                            label="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">

                        <strong>Especie</strong>

                        <RadioGroup
                            value={especie}
                            onChange={(e) => setEspecie(e.target.value)}
                        >

                            <FormControlLabel
                                value="perro"
                                control={<Radio />}
                                label="Perro"
                            />

                            <FormControlLabel
                                value="gato"
                                control={<Radio />}
                                label="Gato"
                            />

                            <FormControlLabel
                                value="conejo"
                                control={<Radio />}
                                label="Conejo"
                            />

                        </RadioGroup>

                    </div>

                    <div className="mt-3">
                        <TextField
                            fullWidth
                            type="number"
                            label="Edad aproximada (años)"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            inputProps={{
                                min: 0,
                                step: 0.1
                            }}
                        />
                    </div>

                    <div className="mt-3">

                        <strong>Nivel de energía</strong>

                        <div>
                            <Rating
                                value={energia}
                                onChange={(e, nuevoValor) =>
                                    setEnergia(nuevoValor)
                                }
                            />
                        </div>

                    </div>

                    <div className="mt-3">

                        <strong>Clasificación</strong>

                        <div>
                            <Chip
                                label={clasificacion.categoria}
                                color={clasificacion.color}
                            />
                        </div>

                    </div>

                    <div className="mt-3">

                        <strong>
                            Aporte de adopción: ${clasificacion.aporte}
                        </strong>

                    </div>

                </CardContent>

                <CardActions>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleClick}
                        sx={{
                            backgroundColor: '#e8a9c7'
                        }}
                    >
                        Registrar Mascota
                    </Button>

                </CardActions>

            </Card>

            <Dialog
                open={dialogo}
                onClose={() => setDialogo(false)}
            >

                <DialogTitle>
                    Datos incompletos
                </DialogTitle>

                <DialogContent>
                    Debes completar todos los campos y seleccionar al menos una estrella.
                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setDialogo(false)}
                    >
                        Aceptar
                    </Button>

                </DialogActions>

            </Dialog>
        </>
    )
}

export default MascotasForm