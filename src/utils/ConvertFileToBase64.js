export const ConvertMediaToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) resolve(null)

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const img = new Image()
      img.src = reader.result

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const maxWidth = 250
        const maxHeight = 250

        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            const newReader = new FileReader()
            newReader.readAsDataURL(blob)
            newReader.onloadend = () => {
              resolve(newReader.result)
            }
          },
          file.type,
          0
        )
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }
  })
}
