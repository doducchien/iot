import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux'

Home_Doctor.propTypes = {
    
};

function Home_Doctor(props) {
    const load = useSelector(state=> state.load_reducer)
    return (
        <div className='Home_Doctor'>
            Home doctor
        </div>
    );
}

export default Home_Doctor;