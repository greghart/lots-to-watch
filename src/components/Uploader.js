import React from 'react';
import PropTypes from 'prop-types';

const Uploader = (props) => {
  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    props.onFileData && props.onFileData(content);
  }
  const handleFileChosen = (file) => {
    console.warn(file);
    props.onFile && props.onFile(file);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }

  return (
    <input
      type="file"
      required
      onChange={({ target }) => {
        console.warn({
          target
        }, 'upload onChange');
        handleFileChosen(target.files[0]);
      }}
    />
  );
};
Uploader.propTypes = {
  onFile: PropTypes.func,
  onFileData: PropTypes.func,
};

export default Uploader;
