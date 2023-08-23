const Button = (props) => {

  const handleClick = () => {
    props.handleClick(props.value)
  }

  return(
    <div 
      className={"grid-item " + props.type}
      onClick={handleClick}
      id={props.id}
    >
      {props.value}
    </div>
  )
}

export default Button;