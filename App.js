import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native';
import Cita from './componentes/cita';
import Formulario from './componentes/formulario';

const App = ()  => {

  const [ mostrarForm, guardarMostrarForm] = useState(false);

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

  // Muestra o oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm( !mostrarForm );
  }

  // Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }


  return (
    <TouchableWithoutFeedback onPress={()=>cerrarTeclado() }>
    <View style= {styles.contenedor} >
      <Text style= {styles.titulo} >Administrador de Citas</Text>

      <View>
          <TouchableHighlight onPress={ () => mostrarFormulario() }  style={styles.btnMostrarForm} >
            <Text style={styles.textoMostrarForm}>  {mostrarForm ? 'Cancelar Crear Cita': 'Crear Nueva Cita'}  </Text>
          </TouchableHighlight>
      </View>

     <View style={styles.contenido}>

        { mostrarForm ? (
          <>
          <Text style= {styles.titulo}>Crear nueva cita</Text>
          <Formulario  
            citas={citas}
            setCitas={setCitas}
            guardarMostrarForm={guardarMostrarForm}
          />
          </>
        ) : (
            <>
          <Text style= {styles.titulo}>{ citas.length > 0 ? 'Administar citas' : '' }</Text>

          <FlatList style={styles.listado}
                data= {citas}
                renderItem = { ( {item} )=>  <Cita item={item }  eliminarPacientes={eliminarPacientes}  />  }
                keyExtractor={ citas => citas.id }
              />
</>
        )}    

     </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },

  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm:{
    padding: 10,
    backgroundColor: '#950C56',
    marginVertical: 10
},

textoMostrarForm:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'

}
});

export default App;
