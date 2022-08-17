export function downloadUrl (url: string, filename: string) {
    let a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', filename)
    a.setAttribute('target', '_blank')
    // let clickEvent = document.createEvent('MouseEvents')
    // clickEvent.initEvent('click', true, true)
    // a.dispatchEvent(clickEvent)
    a.click()

}

export function downloadBase64 (base64: string, filename: string) {
    let blob = base64ToBlob(base64)
    let url = URL.createObjectURL(blob)
    console.log(1, url, filename)
    downloadUrl(url, filename)
}

export function base64ToBlob (base64: string, mimeType?: string) {
    let arr = base64.split(',')
    let mime = mimeType || 'image/png'
    if (arr.length === 2) {
        let matches = arr[0].match(/:(.*?);/)
        mime = mimeType || matches && matches[1] || mime
    }
    let bstr = atob(arr[arr.length - 1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

export function atob(str: string) {
    // return Buffer.from(str, 'base64').toString('binary')
    return window.atob(str)
}

export function btoa(str: string) {
    // Buffer.from(str, 'binary').toString('base64')
    return window.btoa(str)
}
