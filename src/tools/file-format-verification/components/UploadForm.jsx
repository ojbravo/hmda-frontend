import React, { Component, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { useScrollIntoView } from '../../../common/useScrollIntoView'

import './UploadForm.css'

let timeout = null

export const UploadErrors = ({errors}) => {
  const[ref, scrollToRef] = useScrollIntoView()

  useEffect(() => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(scrollToRef(), 100)
  }, [errors, scrollToRef])

  if (errors.length === 0) return null

  return (
    <div className="alert alert-error" role="alert" ref={ref}>
      <div className="alert-body">
        <ul className="alert-text">
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default class Upload extends Component {
  updateDropArea(props, fileStatus) {
    let content = (
      <p>
        Drag your LAR file into this area or click in this box to select a LAR
        file to test.
      </p>
    )
    if (props.file && 'name' in props.file) {
      const statusText =
        props.errors.length !== 0
          ? "Sorry, we can't check "
          : fileStatus === 'error'
          ? 'Errors found in '
          : 'No errors found in '
      content = (
        <React.Fragment>
          <p>
            {statusText} <strong>{props.file.name}</strong>.
          </p>
          <p>
            Drag another LAR file into this area or click in this box to select
            a LAR file to test.
          </p>
        </React.Fragment>
      )
    }

    return <div className="dropzone-content">{content}</div>
  }

  componentDidUpdate() {
    if (document.activeElement.classList[0] === 'dropzone')
      document.activeElement.blur()
  }

  render() {
    // don't do anything if submission is in progress
    const setFile = this.props.code > 1 ? null : this.props.setFile
    const dropzoneDisabled = this.props.code > 1 ? 'dropzone-disabled' : ''
    const { parsed, errorCount } = this.props.parseErrors
    const uploadErrorCount = this.props.errors.length
    const fileStatus =
      !parsed && !uploadErrorCount
        ? ''
        : errorCount + uploadErrorCount > 0
        ? 'error'
        : 'success'

    return (
      <div>
        <div className={`UploadForm ${fileStatus}`}>
          <UploadErrors errors={this.props.errors} />
          <div className="container-upload">
            <Dropzone
              disablePreview={true}
              onDrop={setFile}
              multiple={false}
            >
              {({getRootProps, getInputProps}) => {
                return (
                  <div {...getRootProps({className: `dropzone ${dropzoneDisabled}`})}>
                    <input {...getInputProps()}/>
                    {this.updateDropArea(this.props, fileStatus)}
                  </div>
                )
              }}
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  setFile: PropTypes.func,
  uploading: PropTypes.bool,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array,
  filingPeriod: PropTypes.string
}

Upload.defaultProps = {
  file: {
    name: 'No file chosen'
  },
  errors: []
}
