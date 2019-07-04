import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import classNames from 'classnames';
import { deleteImage, uploadImage } from 'actions';
import { getUsername } from 'modules/auth';

const CLOUDINARY_UPLOAD_PRESET = 'yzo22f3q';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dm4fqf9nm/image/upload';

class ImageUpload extends Component {
  static propTypes = {
    deleteImage: func.isRequired,
    uploadImage: func.isRequired,
    toggleImageEdit: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
    };
  }

  onImageDrop = files => {
    this.setState({
      uploadedFile: files[0],
    });
    this.uploadToCloudinary(files[0]);
  };

  onDelete = async () => {
    await this.props.deleteImage(getUsername());
    this.props.toggleImageEdit();
  };

  uploadToCloudinary(file) {
    const upload = request
      .post(CLOUDINARY_UPLOAD_URL)
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
      }
    });
  }

  onUpload = async () => {
    const sending = {
      username: getUsername(),
      url: this.state.uploadedFileCloudinaryUrl,
    };
    await this.props.uploadImage(sending);
    this.props.toggleImageEdit();
  };

  render() {
    const { toggleImageEdit } = this.props;
    return (
      <div>
        <div className="FileUpload">
          <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
        <button
          className={classNames({
            button: true,
            button__flat: true,
            button__large: true,
            'form--submit': true,
            button__disabled: !this.state.uploadedFileCloudinaryUrl,
          })}
          onClick={this.onUpload}
        >
          Upload
        </button>
        <button
          className={classNames({
            button: true,
            button__flat: true,
            button__large: true,
            'form--submit': true,
            // 'button__disabled': !!this.state.uploadedFileCloudinaryUrl,
          })}
          onClick={this.onDelete}
        >
          Delete Photo
        </button>
        <button
          className={classNames({
            button: true,
            button__flat: true,
            button__large: true,
            'form--submit': true,
          })}
          onClick={toggleImageEdit}
        >
          Cancel
        </button>
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null : (
            <div clasName="image-upload--preview">
              <p>{this.state.uploadedFile.name}</p>
              <img
                role="presentation"
                src={this.state.uploadedFileCloudinaryUrl}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteImage, uploadImage }
)(ImageUpload);
