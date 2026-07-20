import styed from 'styled-components'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
    variant: ButtonVariant;
}

const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green'
}

const ButtonContainer = styed.button<ButtonContainerProps>`
width: 100px;
height: 40px;
${props =>{
     return `background-color: ${buttonVariants[props.variant]}`
}}
`





interface ButtonProps {
    variant?: ButtonVariant;
}

export function Button({variant = 'primary'}: ButtonProps) {
    return (
        <ButtonContainer variant={variant}>Enviar</ButtonContainer>
    )
}