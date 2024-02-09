export interface IAuth {
    username: string,
    password: string,
}

export interface IAuthForm extends IAuth {
    confirmPassword?: string
}