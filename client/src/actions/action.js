import axios from "axios";
export const RENDER_RECE= "RENDER_RECE"
export const DETAIL_RECE= "DETAIL_RECE"
export const CARGAR= "CARGAR"
export const PREV_RECE= "PREV_RECE"
export const NEXT_RECE= "NEXT_RECE"
export const GET_NAME="GET_NAME"
export const ASCENDENTE= "ASCENDENTE"
export const DESCENDENTE= "DESCENDENTE"
export const MAYOR_P= "MAYOR_P"
export const MENOR_P="MENOR_P"
export const TYPES_DIETS="TYPES_DIETS"
export const MATCHEA_DIETS="MATCHEA_DIETS"
export const DATA_CREATED= "DATA_CREATED"
export const POST_CREATED="POST_CREATED"
export const CREATED_RECIPE="CREATED_RECIPE"

export function renderRece(){
return function (dispatch, getState){
let todos = getState().todos;
const nine= []
 axios.get ("http://localhost:3001/recipes")
 .then(response=>{
     todos= response.data
    //  console.log(todos)
     for(let i=0; i<9; i++){
         nine.push(todos[i])
        }
     dispatch({
         type: RENDER_RECE,
        payload: {
            todos: todos,
            nine: nine
        }
        })
 })
}    
}
export function detailRece(id){
return function(dispatch){
    axios.get(`http://localhost:3001/recipes/${id}`)
    .then(response=>{
        dispatch({
            type: DETAIL_RECE,
            payload: response.data
        })
    })
}
}
export function cargar(){
    return function(dispatch){
        dispatch({
            type: CARGAR,
            payload: {
                detail:{},
                names:[]
            }
        })
    }
}
export function nextRece(){
    return function (dispatch,getState){
let variable= getState().variable;
let todos= getState().todos
let next = []
if(variable < 99){
    for(let i= variable; i< variable + 9; i++){
     next.push(todos[i])
    }
    dispatch({
        type: NEXT_RECE,
        payload:{
            todos: next,
            variable: variable + 9
        }
    })
}
}
}
export function previousRece(){
return function (dispatch, getState){
    let variable= getState().variable;   
    let todos= getState().todos;
    let previous=[]
    if(variable > 9){
        for(let i= variable -18; i< variable - 9; i++){
            previous.push(todos[i])
        }
        dispatch({
            type: PREV_RECE,
            payload:{
                todos: previous,
                variable: variable - 9
            }
        })
    }
}
}
export function getName(name){
return function(dispatch){
 axios.get(`http://localhost:3001/recipes?name=${name}`)    
 .then(response=>{
     dispatch({
         type: GET_NAME,
         payload: response.data
     })
 })
}
}
export function ascendente(){
    return function(dispatch, getState){
      let todos= getState().todos
      let variable= getState().variable
      let ascendente = todos.sort(function(a,b){
          var nameA= a.title.toUpperCase();
          var nameB = b.title.toUpperCase();
        if(nameA < nameB){
            return -1;
        }
        if(nameA > nameB){
            return 1;
        }
        return 0;
      })
      let array =[]
      for(let i=variable - 9; i< variable; i++ ){
          array.push(ascendente[i])
      }
      dispatch({
          type: ASCENDENTE,
          payload:{
              array: array,
             todos: ascendente
          }
      })
    }
}
export function descendente(){
    return function (dispatch, getState){
        let todos= getState().todos
        let variable= getState().variable
        let descendente= todos.sort(function(a,b){
            var nameA= a.title.toUpperCase();
            var nameB= b.title.toUpperCase();
          if(nameA > nameB){
            return -1;
          }
          if(nameA < nameB){
              return 1;
          }
          return 0;  
        })
        let array=[]
        for(let i= variable-9; i< variable; i++){
            array.push(descendente[i]);
        }
        dispatch({
            type: DESCENDENTE,
            payload:{
                array: array,
                todos: descendente
            }
        })
    }
}
export function mayorP(){
    return function(dispatch, getState){
        let todos= getState().todos;
        let variable= getState().variable;
        let mayorAll= todos.sort((a, b)=> b.puntos - a.puntos);
        let array=[]
        for(let i= variable - 9; i< variable; i++){
            array.push(mayorAll[i])
        }
        dispatch({
            type: MAYOR_P,
            payload:{
                array: array,
                todos: mayorAll
            }
        })
    }
}
export function menorP(){
    return function(dispatch, getState){
        let todos= getState().todos;
        let variable= getState().variable;
        let menorAll= todos.sort((a, b) => a.puntos - b.puntos)
        let array=[]
        for(let i = variable - 9; i<variable; i++){
            array.push(menorAll[i])
        } 
        dispatch({
            type: MENOR_P,
            payload:{
                array: array,
                todos: menorAll
            }
        })   
    }
}
export function typesDiets(){
    return function (dispatch){
        axios.get ("http://localhost:3001/types")
        .then((response)=>{
            let  res1= response.data
            console.log(res1)
            dispatch({
                type: TYPES_DIETS,
                payload: res1
            })
        })
    }
}
export function matcheaDiets(elem){
    return function(dispatch, getState){
        let todos= getState().todos
        let array= []
        for(let i=0; i< todos.length; i++){
            if( !!todos[i].diets){
                for(let j=0; j< todos[i].diets.length; j++){
                    if(todos[i].diets[j].toUpperCase() === elem.toUpperCase()){
                        array.push(todos[i])
                    }
                }
            }
        }
        dispatch({
            type: MATCHEA_DIETS,
            payload: array
        })
    }
}
export function formCrea(data){
return function(dispatch){
    axios.get ("http://localhost:3001/created", data)
    .then((response)=>{
        dispatch({
         type: DATA_CREATED,
        payload:response.data
        })
    })
}
}
export function getCreated(){
    return function(dispatch){
        axios.get ("http://localhost:3001")
        .then(response=>{
            dispatch({
                type: POST_CREATED,
                payload: response.data
            })
        })   
    }
}
export function createdRecipe(){
    return function(dispatch, getState){
        let createdPost= getState().createdPost
        let baseRece= createdPost.map((c)=>{
            return {
                id: c.id,
                title: c.title,
                diets: c.types.map((t)=> t.name),
                resumen:c.resumen,
                nivel:c.nivel,
                paso: c.paso,
                puntos: c.puntos
            }
        })
        dispatch({
            type: CREATED_RECIPE,
            payload: baseRece
        })
    }
}