

function createBackdrop() {
    let backdrop = document.createElement('div')
    backdrop.style.position = 'absolute'
    backdrop.style.top = '0'
    backdrop.style.left = '0'
    backdrop.style.width = '100%'
    backdrop.style.height = '100%'
    backdrop.style.background = 'rgba(0, 0, 0, 0.75)'
    backdrop.style.transition = '0.4s'
    backdrop.style.opacity = '0'
    backdrop.style.zIndex = '99999'
    backdrop.className = 'little-loading'
    setTimeout(() => (backdrop.style.opacity = '1'), 600)

    return backdrop
}

function createLoadingMessage(imgSrc, defaultText) {
    let msgDiv = document.createElement('div')
    msgDiv.style.width = '100%'
    msgDiv.style.maxWidth = '250px'
    msgDiv.style.margin = `${ window.innerHeight > 500 ? '280px' : '0' } auto`

    let img = new Image()
    img.src = imgSrc
    img.style.display = 'block'
    img.style.margin = '0 auto'
    msgDiv.appendChild(img)

    let info = document.createElement('h1')
    info.style.fontSize = '1.6rem'
    info.style.color = '#EFEFEF'
    info.style.margin = '21px 0'
    info.style.width = '100%'
    info.style.fontFamily = 'Arial'
    info.style.textAlign = 'center'
    info.style.fontWeight = '100'
    info.textContent = defaultText || 'Aguarde, carregando...'
    msgDiv.appendChild(info)

    return msgDiv
}

window.$littleLoading = {

    isLoading: false,
    imgPath: 'loading.svg',

    setimgPath(path) {
        this.imgPath = path || this.imgPath
    },

    show() {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true
        this.backdrop = createBackdrop()
        this.backdrop.appendChild(createLoadingMessage(this.imgPath), this.defaultText)
        document.body.appendChild(this.backdrop)
        createLoadingMessage()
    },

    hide() {
        if (! this.isLoading) {
            return;
        }

        if (this.backdrop && this.backdrop.parentElement) {
            this.backdrop.style.opacity = 0
            setTimeout(() => {
                this.isLoading = false
                this.backdrop.parentElement.removeChild(this.backdrop)
            }, 600)
        }
    }
}
