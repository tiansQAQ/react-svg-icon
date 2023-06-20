import React from 'react'

export default function Icon(props) {
  const { name } = props
  // props: className,style,icon,size,color...
  return (
    <svg>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}
