function ajax(method, url) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onreadystatechange(() => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText)
    }
  })
  xml.send('')
}
ajax('get', 'https://bing.com')