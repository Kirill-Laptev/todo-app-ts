export type StateType = {
    age: number
    name: string
    childrenCount: number
}

export type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch(action.type){
        case 'INCREMENT_AGE': 
            return {
                ...state,
                age: state.age + 1
            }
        case 'INCREMENT_CHILDREN_COUNT': 
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            throw new Error('I dont understand this type')
    }
}