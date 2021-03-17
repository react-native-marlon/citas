import React, { useState } from 'react';
import { Text, StyleSheet, Button,View, TextInput, TouchableHighlight, Alert, ScrollView, SegmentedControlIOSBase} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ( {citas, setCitas,guardarMostrarForm,guardarCitasStorage}   ) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [sintomas, guardarSintomas] = useState('');
    
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

   

    const confirmarFecha = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit"  }
        // console.warn("A date has been picked: ", date.toLocaleDateString('es-ES', opciones));
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };


    const confirmarHora = (hora) => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
        guardarHora(hora.toLocaleString('en-US', opciones));
        // console.warn("A Time has been picked: ", date);
        hideTimePicker();
    };

    const crearNuevaCita = () => {
        if(paciente.trim() === '' || propietario.trim() === '' || 
        telefono.trim() === '' || fecha.trim() === '' || 
        hora.trim() === '' || sintomas.trim() === ''){
            mostrarAlerta(); 
            return; 
        }

        const cita = { paciente, propietario, telefono, fecha, hora, sintomas };
        cita.id = shortid.generate();
        // console.log(cita);

        const citasNuevos = [...citas, cita];
        setCitas(citasNuevos)
        
        // pasamos las nuevas citas 
        guardarCitasStorage(JSON.stringify(citasNuevos));

        // ocultar formulario
        guardarMostrarForm(false);

        // Resetear el formulario
        
    };

    // Muestra la alerta si algo Fallo
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    

    return ( 
        <>
            <ScrollView style={ styles.formulario }> 
                <View>
                    <Text style={ styles.label }>Pacientes:</Text>
                    <TextInput 
                            style={ styles.input }
                            onChangeText = { texto=> guardarPaciente(texto)  }
                    />
                </View>

                <View>
                    <Text style={ styles.label }>Dueño:</Text>
                    <TextInput 
                            style={ styles.input }
                            onChangeText = { texto=> guardarPropietario(texto)  }
                    />
                </View>

                <View>
                    <Text style={ styles.label }>Telefono Contacto:</Text>
                    <TextInput 
                            style={ styles.input }
                            onChangeText = { texto=> guardarTelefono(texto)  }
                            keyboardType = 'numeric'
                            locale='es_ES'
                            
                    />
                </View>

                    <View>
                    <Text style={ styles.label} >Fecha: {fecha}</Text>
                    <Button title="Selecione la Fecha" onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={confirmarFecha}
                            onCancel={hideDatePicker}
                            locale='es_ES'
                            headerTextIOS='Elige la Fecha'
                            cancelTextIOS="Cancelar"
                            confirmTextIOS="Confirmar"
                        />
                        
                </View>

                <View>
                    <Text style={ styles.label} >Hora:</Text><Text>{hora}</Text>
                    <Button title="Selecione la Hora" onPress={showTimePicker} />
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={confirmarHora}
                            onCancel={hideTimePicker}
                            headerTextIOS='Elige la Hora'
                            cancelTextIOS="Cancelar"
                            confirmTextIOS="Confirmar"
                        />
                        
                </View>
                
                

                <View>
                    <Text style={ styles.label }>Sintomas:</Text>
                    <TextInput
                            multiline
                            style={ styles.input }
                            onChangeText = { texto=> guardarSintomas(texto) }
                            keyboardType = 'numeric'
                    />
                </View>

                <View>
                    <TouchableHighlight onPress={ () => crearNuevaCita() }  style={styles.btnSubmit} >
                        <Text style={styles.textoSubmit}> Crear Nueva Cita </Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        </>
     );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 13,
        
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderStyle: 'solid',
        backgroundColor: '#DCDCDE'

    },
    btnSubmit:{
        padding: 10,
        backgroundColor: '#A00960',
        marginVertical: 10
    },
    textoSubmit :{
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'

    }


})

export default Formulario;