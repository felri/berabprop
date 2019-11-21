const modules = {
  stringiparse,
  hexToRgb,
  getMultipartImageUploadFormData,
}

function stringiparse(string) {
  return JSON.parse(JSON.stringify(string))
}

function hexToRgb(hex) {
  const result = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null
}

function getMultipartImageUploadFormData(data, imagePath = null) {
  const uploadData = {
    data: JSON.stringify({
      ...data,
      type: 'application/json',
    }),
    files: imagePath && {
      uri: imagePath,
      name: 'image_' + imagePath,
      type: 'image/jpg',
    },
  }
  const formData = new FormData()
  for (const key in uploadData) {
    formData.append(key, uploadData[key])
  }
  return formData
}

global.Tools = modules

export default modules
