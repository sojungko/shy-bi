import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';
// import Button from '@material-ui/core/Button';
import { deleteImage, uploadImage } from '../actions';
import { getUsername } from '../modules/auth';

const CLOUDINARY_UPLOAD_PRESET = 'yzo22f3q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dm4fqf9nm/image/upload';

class ImageUpload extends Component {

  static propTypes = {
    deleteImage: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: '',
    };
  }

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0],
    });
    this.handleImageUpload(files[0]);
  }

  onDelete = () => {
    this.props.deleteImage(getUsername());
  }

  handleImageUpload(file) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      console.log('ImageUpload response.body : ', response.body);
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
        });
        const sending = {
          username: getUsername(),
          url: response.body.secure_url,
        };
        this.props.uploadImage(sending);
      }
    });
  }


  render() {
    return (
      <div>
        <div className="FileUpload">
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop}
          >
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
        <button label="Delete Photo" onClick={this.onDelete} />
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img role="presentation" src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteImage, uploadImage })(ImageUpload);
