import { Component } from 'react';
import { graphql } from 'react-apollo';

import carrera from '../../queries/carrera';

class Prueba extends Component {
    deleteAccent(s) {
        var mapaAcentos = {
            'á':'A', 'é':'E', 'í':'I','ó':'O','ú':'U',
            'Á':'A', 'É':'E', 'Í':'I','Ó':'O','Ú':'U'
        };
        if (!s) { return ''; }
        var ret = '';
        for (var i = 0; i < s.length; i++) {
            ret += mapaAcentos[s.charAt(i)] || s.charAt(i);
        }
        return ret;
    };
    prepareString(string){
        let array = string.toLowerCase().split(" ");
        for (let i = 0; i < array.length; i++) {
            array[i] = this.deleteAccent(array[i]);
            if(array[i][array[i].length-1] === 's'){
                array[i] = array[i].slice(0, array[i].length-1);
            }
        }
        for (let i = 0; i < array.length; i++) {
            [
                'a', 'ante', 'bajo', 'con', 
                'de', 'desde', 'durante', 'en', 'entre', 'hacia', 
                'hasta',  'para', 'por', 'sin', 'sobre', 'y', 'e',
                'o', 'u', 'ya', 'pero', 'mas', 'sino', 'luego', 'aun', 
                'aunque', 'si', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas'   
            ].map((o) => {
                if(o === array[i]){
                    array.splice(i, 1);
                    i = i-1;
                }
                return array;
            });
        }
        return array;
    } 
    compareMaterias(materias1, materias2){
        let arrayFinal = [];
        materias1.forEach(o => {
            let arrayPush = this.compareMateria(o, materias2);
            if(arrayPush.length > 0){
                arrayFinal.push(this.compareMateria(o, materias2));
            }
        });
        return arrayFinal;
    }
    compareMateria(materia, materias) {
        let materia1 = this.prepareString(materia);
        let materias1 = []
        for (let i = 0; i < materias.length; i++) {
            materias1.push(this.prepareString(materias[i]));
        }
        let response = [];
        for (let i = 0; i < materias1.length; i++) {
            if(this.compareArray(materia1, materias1[i])){
                response = [materia, materias[i]];
            }
        }
        return response;
    }

    compareArray(array1, array2){
        let maximum = (array1.length > array2.length) ? array1.length : array2.length;
        let contador = 0;
        array1.forEach(o => {
            array2.forEach((e) =>{
                if(o.search(e) >= 0){
                    contador += 1;
                }
            });
        });
        if((contador/maximum) >= 0.5 ){
            return true;
        }else{
            return false;
        }
    }

    render() {
        if (this.props.data.loading) return "Cargando";
        console.log(this.compareMaterias(
            [
                "Comunicacion oral",
                "Dibujos y diseño de piezas por computadora", 
                "Calculo I"
            ], 
            [
                "Dibujo asistido por computadora", 
                "Calculo diferencial"
            ]
            ));
        return 'Ve la consola!! ;)';
    }
}
 
export default graphql(carrera)(Prueba);
  