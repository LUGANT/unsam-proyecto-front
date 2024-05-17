import { ReactNode } from "react"

export type Test = {
  test: string
}

//Log
export type logginType = {
  usuario: string
  contrasenia: string
}

export type signupType = {
  nombre: string
  apellido: string
  email: string
  usuario: string
  contrasenia: string
}

//
export type textFieldType = {
  isRequired?: boolean
  size : string
  placeholder?: string
  inputType?: string
  label: string
  isError: boolean
  touched: boolean
  errorMessage: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export type ButtonType = {
  children: ReactNode
  type: "button" | "submit" | "reset" | undefined
  onClick : () => void
}