import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native';
import Cita from './componentes/cita';
import Formulario from './componentes/formulario';
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = ()  => {

  const [citas, setCitas] = useState([]);
  const [ mostrarForm, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
 try {
   const citasStorage = await AsyncStorage.getItem('citas');
   if (citasStorage) {
       setCitas(JSON.parse(citasStorage))
   }
 } catch (error) {
   console.log(error);
 }
    }
    obtenerCitasStorage();
  },[]);

  

  // Elimina los pacientes del state
  const eliminarPacientes = id =>{

    const citasFiltradas = citas.filter(  cita => cita.id !== id );
    setCitas ( citasFiltradas );
    guardarCistaStorage(JSON.stringify(citasFiltradas));
  }

  // Muestra o oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm( !mostrarForm );
  }

  // Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }


  // Almacenar las citas en storage
  const guardarCistaStorage = async ( citasJson) => {
    try {
      await AsyncStorage.setItem('citas', citasJson);
    } catch (error) {
      console.log(error);
    }
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
            guardarCitasStorage={guardarCitasStorage}
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
