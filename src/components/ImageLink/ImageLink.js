import React from 'react';
import './ImageLink.css'

const ImageLink = ({onInputChange,onButtonSubmit}) => {
	return (
       <div>
       <p className='f3 fw7'>
       {'This Smart Brain Will Detect The Faces In Your Pictures'} 
       </p>
       <div className='center'>
       <div className='form center pa4 br3 shadow-5'>
       <input
        className='f4 pa2 w-70 center' 
        type='text'
        onChange={onInputChange}
        />
       <button onClick={onButtonSubmit}>Detect</button>
       </div>
       </div>
       </div>
		);
}

export default ImageLink;