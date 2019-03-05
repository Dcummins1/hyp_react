import React from 'react';
import "./ImageUpload.css"
import CircularProgress from '@material-ui/core/CircularProgress';
import { storage } from '../../../firebase';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ButtonBase from '@material-ui/core/ButtonBase';

class ImageUpload extends React.Component {
  inputRef = null;

  state = {
    loading: false
  }
  constructor(props) {
    super(props);
    this.handleImage = this.handleImage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.inputRef = React.createRef();
  }
  handleImage(e) {
    if (e.target.files[0]) {
      this.setState({loading: true});
      const file = e.target.files[0];
      setTimeout(function () {
        this.handleUpload(file);
      }.bind(this), 0);
    }
    
  }
  handleUpload(file) {
    if (this.state.loading) {
      //TODO: incorperate image here for write permissions, and for image reuse (this would save a lot on hosting potentially)
      const storagePromise = storage.uploadImage(file,  {user: "sam", folder: this.props.folder});
      storagePromise.then(function (snapshot) {
        //TODO: generalize this? 
        const storageLocation = "gs://" + snapshot.metadata.bucket + "/" + snapshot.metadata.fullPath;
        storage.getImageUrl(storageLocation).then(function (url) {
          if (this.props.imageUpdated) {
            this.props.imageUpdated({imageURL: url, imageLocation: storageLocation});
          }
          let img = document.createElement("IMG");
          img.src = url;
          img.onload = function () {
            this.setState({loading: false});
          }.bind(this);
        }.bind(this))
      }.bind(this));
    }
  }
  chooseImage() {
    this.inputRef.current.click();
  }
  render() {
    return (
      <div className="imageUpload">
        <ButtonBase onClick={this.chooseImage} className="buttonBase" disabled={this.state.loading}
          style={this.props.imageURL && !this.state.loading ? {backgroundImage: 'url(' + this.props.imageURL + ')'} :{}} >
            <input type="file" accept="image/*" style={{visibility: "hidden", display: "none"}} ref={this.inputRef} onChange={this.handleImage}/>
            {this.state.loading ? <CircularProgress color="secondary"></CircularProgress> : ""}
            {!this.state.loading && this.props.imageURL? <CheckCircleIcon className="buttonIcon" fontSize="large" color="secondary"/> : ""}
            {!this.state.loading && !this.props.imageURL ? <AddAPhotoIcon fontSize="large"/> : ""}
          </ButtonBase>
      </div>
    );
  }
}

export default ImageUpload;