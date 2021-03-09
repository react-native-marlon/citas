import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Cita from './componentes/cita';
import Formulario from './componentes/formulario';

const App = ()  => {

  const [citas, setCitas] = useState([
    { id: "1", paciente: "Hook", propietario: 'Juan', sintomas: "No come" },
    { id: "2", paciente: "Rosa", propietario: 'Juan', sintomas: "No come" },
    { id: "3", paciente: "Maria", propietario: 'Juan', sintomas: "No come" }
  ]);

  // Elimina los pacientes del state
  const eliminarPacientes = id =>{
    setCitas (  ( citasActuales  ) => {
      return citasActuales.filter(  cita => cita.id !== id );
    })
  }

  return (
    <View style= {styles.contenedor} >
      <Text style= {styles.titulo} >Administrador de Citas</Text>

      <Formulario/>
      
      <Text style= {styles.titulo}>{ citas.length > 0 ? 'Administar citas' : '' }</Text>

      <FlatList
            data= {citas}
            renderItem = { ( {item} )=>  <Cita item={item }  eliminarPacientes={eliminarPacientes}  />  }
            keyExtractor={ citas => citas.id }
          />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },

  titulo: {
    color: '#FFF',
    marginTop: 40,
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
