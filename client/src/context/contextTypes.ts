export enum ActionTypes {
    START_USER_REQUEST = 'START_USER_REQUEST',
    SET_USER_ERROR = 'SET_USER_ERROR',
    CLEAR_USER_ERROR = 'CLEAR_USER_ERROR',
    END_USER_REQUEST = 'END_USER_REQUEST',
    SET_USER = 'SET_USER',
    RESET_USER = 'RESET_USER',
}

export interface UserObject {
    id: number | null
    createdAt: string
    updatedAt: string
    email: string
    firstName?: string
    lastName?: string
    tickets: number[]
}

export interface UserAction {
    type: ActionTypes
    payload: UserObject
}
export enum APIStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface UserState {
    userData: UserObject
    apiStatus: APIStatus
}
