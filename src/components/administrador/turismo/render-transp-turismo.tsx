

export const RenderTranspTurismo = ({ transpTurismo }) => {
    return (
        transpTurismo.map((transp, index) => (
            <div key={index} className='multas'>
                <ul>
                    <li>Empresa: {transp.nombre_empresa}</li>
                    <li>Marca del vehiculo: {transp.marca_vehiculo}</li>
                    <li>Dominio: {transp.dominio_vehiculo}</li>
                    <li>Conductores: {(transp.nombre_conductores.length > 0) ? (<ul>
                        {
                            transp.nombre_conductores.map((conductor) => (
                                <li className='subElemento'>{conductor}</li>
                            ))
                        }
                    </ul> ): null

                    }</li>
                    <li>Fecha de ingreso: {transp.fecha_hora_ingreso}</li>
                    <li>Fecha de egreso: {transp.fecha_hora_egreso}</li>
                </ul>
            </div>
        ))
    )
}
