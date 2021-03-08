import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const App = ()  => {

  const [citas, setCitas] = useState([
    { id: "1", paciente: "Hook", propietario: 'Juan', sintomas: "No come" },
    { id: "2", paciente: "Rosa", propietario: 'Juan', sintomas: "No come" },
    { id: "3", paciente: "Maria", propietario: 'Juan', sintomas: "No come" }
  ]);

  return (
    <View style= {styles.contenedor} >
      <Text style= {styles.titulo} >Administrador de Citas</Text>
          { citas.map(cita => (
            <View>
              <Text>{cita.paciente}</Text>
              <Text>ss</Text>
            </View>
          ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
