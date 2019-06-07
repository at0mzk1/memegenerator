import React, { Component } from 'react';
import Spinner from '../theme/spinner'
import Image from '../generator/generator.component'
import Upload from '../generator/upload.component'
import Notifications, { notify } from 'react-notify-toast'

const toastColor = { 
  background: '#505050', 
  text: '#fff' 
}

class Home extends Component {

  state = {
      uploading: false,
      image: {}
  }

  toast = notify.createShowQueue()
  
  onChange = e => {
    const errs = []
    const files = Array.from(e.target.files)

    // #1 There are too many files!
    if (files.length > 1) {
      const msg = 'Only 1 image can be uploaded at a time'
      return this.toast(msg, 'custom', 2000, toastColor)  
    }

    const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff']

    files.forEach((file, i) => {
      
      // #2 Catching wrong file types on the client
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }
      
      // #3 Catching files that are too large on the client
      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }

      formData.append(i, file)
    })

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor))
    }

    this.setState({ uploading: true })

    fetch(`${process.env.REACT_APP_API_HOSTNAME}/api/image-upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if (!res.ok) {
        throw res
      }
      return res.json()
    })
    .then(image => {
      this.setState({
        uploading: false, 
        image
      })
    })
    .catch(err => {
      err.json().then(e => {
        this.toast(e.message, 'custom', 2000, toastColor)
        this.setState({ uploading: false })
      })
    })
  }

  removeImage = id => {
    this.setState({
      image: {}
    })
  }

  render() {
    const { uploading, image } = this.state

    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case Object.keys(image).length > 0:
          return <Image image={image} removeImage={this.removeImage} />
        default:
          return <Upload onChange={this.onChange} />
      }
    }

    return (
      <div className='container'>
        <Notifications />
        <div className='buttons'>
          {content()}
        </div>
      </div>
    )
  }
}

export default Home;