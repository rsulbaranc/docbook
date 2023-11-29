import PropTypes from 'prop-types';

export const Card = ( {children} ) => {
    return (
        <div className='bg-zinc-100 p-10 rounded-md'>{children}</div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Card;