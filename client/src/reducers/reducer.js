import {RENDER_RECE, DETAIL_RECE, CARGAR, PREV_RECE, NEXT_RECE, GET_NAME, ASCENDENTE, DESCENDENTE, MAYOR_P, MENOR_P} from "../actions/action" 

let initialState={
todos: [],
render:[],
detail:{},
variable: 9,
names: []
}
export const rootReducer = (state= initialState, action) =>{
switch(action.type){
case RENDER_RECE:{
    return{
        ...state,
        render: action.payload.nine,
        todos: action.payload.todos
    }
}
case DETAIL_RECE:{
    return{
        ...state,
        detail: action.payload
    }
}
case CARGAR:{
    return{
        ...state,
        detail: action.payload.detail,
        names: action.payload.names
    }
}
case NEXT_RECE:{
    return{
        ...state,
        render: action.payload.todos,
        variable: action.payload.variable
    }
}
case PREV_RECE:{
    return{
        ...state,
        render: action.payload.todos,
        variable: action.payload.variable
    }
}
case GET_NAME:{
    return{
        ...state,
        names: action.payload
    }
}
case ASCENDENTE:{
    return{
        ...state,
        render: action.payload.array,
        todos: action.payload.todos
    }
}
case DESCENDENTE:{
    return{
        ...state,
        render: action.payload.array,
        todos: action.payload.todos
    }
}
case MAYOR_P:{
    return{
        ...state,
        render: action.payload.array,
        todos: action.payload.todos
    }
}
case MENOR_P:{
    return{
        ...state,
        render:action.payload.array,
        todos: action.payload.todos
    }
}
    default: return state
}

}