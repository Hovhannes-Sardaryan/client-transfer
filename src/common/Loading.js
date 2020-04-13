import React from 'react';
// import PropTypes from 'prop-types';

import './loading.css';

const Loading = () => {
  return <div className="loadingStyle" >
    <div className="lds-spinner" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div >
  </div>
}


// Loading.propTypes = {
//   margin: PropTypes.string
// }


export default Loading