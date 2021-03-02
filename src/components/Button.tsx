import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps
  extends React.DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string
  icon?: JSX.Element
  isIcon?: boolean
}

export const Button: React.FC<ButtonProps> = ({ label, icon, ...props }) => {
  const isIcon = !!icon
  return (
    <button className={isIcon ? 'is-icon' : 'is-text'} {...props}>
      {icon || label}
    </button>
  )
}
