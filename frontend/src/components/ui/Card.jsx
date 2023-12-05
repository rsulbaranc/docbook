import PropTypes from 'prop-types';

export const Card = ( {children, className} ) => {
    return (
        <div className= {`bg-zinc-100 p-10 rounded-md ${className}`} >{children}</div>

       
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Card;