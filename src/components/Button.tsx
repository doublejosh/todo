import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps
  extends React.DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return <button {...props}>{label}</button>
}
