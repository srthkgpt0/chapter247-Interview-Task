import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dragger from 'antd/lib/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons'
import {
  getSessionStorageToken,
  acceptImageFiles,
  fileSizeLimitCheck,
} from '../../utilities/common'
import { Alert,message ,Upload} from 'antd'
import logger from '../../utilities/logger'

let errorMessage = ''

class UploadMedia extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      previewFileList: [],
      errorMessageState: ''
    }
  }

  componentDidMount() {
    this.updatePreviewFileList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.media) !== JSON.stringify(this.props.media)) {
      this.updatePreviewFileList()
    }
  }

  updatePreviewFileList = () => {
    errorMessage = ''
    this.updateErrorMessageState(errorMessage)
    const media = this.props.media || []
    const previewFileList = []

    for (let index = 0; index < media.length; index++) {
      const element = media[index]
      if (element) {
        previewFileList.push({
          uid: element,
          name: element.split('/').pop(),
          status: 'done',
          url: element,
          thumbUrl: element
        })
      }
    }

    this.setState({
      previewFileList
    })
  }

  updateErrorMessageState = (msg = '') => {
    this.setState({
      errorMessageState: msg
    })
  }

  handleBeforeUpload = (file, fileList, accept, mediaType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = async (info) => {
    const { onFileUploaded, onAudioFileUploaded, multiple, mediaType } = this.props
    // const { status } = info.file

    let previewFileList = [...info.fileList]

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    if (!(multiple || false)) {
      previewFileList = previewFileList.slice(-1)
    }

    // 2. Read from response and show file link
    previewFileList = previewFileList.map(file => {
      if (file.response && file.response.success) {
        // PureComponent will show file.url as link
        file.url = file.response.data.baseUrl
      }
      return file
    })

    this.setState({ previewFileList })

    const pathsArr = []
    const audioInfoArr = []

    for (let index = 0; index < info.fileList.length; index++) {
      const uploadFile = info.fileList[index]
      if (uploadFile.status !== 'uploading') {
        logger({ file: info.file, filelist: info.fileList })
      }
      if (uploadFile.status === 'done') {
        if ('response' in uploadFile) {
          if (uploadFile.response.success) {
            errorMessage = ''
            this.updateErrorMessageState(errorMessage)
            pathsArr.push(uploadFile.response.data)
           
          } else {
            errorMessage = uploadFile.response.message || '`${fileName} upload failed`'
            this.updateErrorMessageState(errorMessage)
          }
        }
      }
      if (uploadFile.status === 'error' && !('event' in info)) {
        if (mediaType === 'audio') {
          onAudioFileUploaded({
            basePath: '',
            length: ''
          })
        } else {
          onFileUploaded('')
        }
      }
    }

    if (pathsArr.length > 0) {
      if (multiple) {
        onFileUploaded(pathsArr)
      } else {
        onFileUploaded(pathsArr[0],mediaType)
      }
    }
  }

  render() {
    const { actionURL, onFileRemoved, multiple, mediaType = 'image' ,customListType} = this.props
    const { previewFileList, errorMessageState } = this.state
    const apiToken = getSessionStorageToken()

    let accept = acceptImageFiles
    let listType = 'picture'
    if (customListType) {
      listType = customListType
    }

   

    const uploadMediaProps = {
      name: 'document',
      accept: accept,
      multiple: multiple || false,
      listType: listType,
      action: actionURL,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${apiToken}`
      },
      progress: {
        strokeColor: {
          '0%': '#fdbcd3',
          '100%': '#f84a87'
        },
        strokeWidth: 3,
        format: percent => `${parseFloat(percent.toFixed(2))}%`
      },
      beforeUpload: (file, fileList) => this.handleBeforeUpload(file, fileList, accept, mediaType),
      onChange: this.handleChange,
      onRemove: (file) => {
        errorMessage = ''
        this.updateErrorMessageState(errorMessage)
        if (multiple) {
          onFileRemoved(file)
        } else {
          onFileRemoved()
        }
      }
    }
    const uploadButton = (
      <div className="upload-custom-text">
        <i className="icon-photo_camera"></i>
      </div>
    );

    return (
      <>
        <Upload
        {...uploadMediaProps}
        fileList={[...previewFileList]}
      >
        {uploadButton}
      </Upload>
      </>
    )
  }
}

UploadMedia.propTypes = {
  actionURL: PropTypes.string.isRequired,
  onFileRemoved: PropTypes.func,
  onFileUploaded: PropTypes.func,
  media: PropTypes.array,
  multiple: PropTypes.bool,
  mediaType: PropTypes.string
}

export default UploadMedia
