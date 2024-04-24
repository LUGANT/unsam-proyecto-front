import { Button } from '@chakra-ui/react'
import { ButtonType } from '../../types'

export function ButtonUi({children, type, onClick}:ButtonType){
  return <Button onClick={onClick} type={type}>{children}</Button>
}