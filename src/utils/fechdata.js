const fetchData = (url_api) =>
{
  return new Promise((resolve, reject)=>{
    const xhttp = new XMLHttpRequest()
    xhttp.open('Get',url_api)
    xhttp.onreadystatechange = ()=>
    {
      if(xhttp.readyState === 4)
      {
        if(xhttp.status===200) resolve (JSON.parse(xhttp.responseText))
        else reject(new Error('Hubo un problema con la comunicación de la siguiente api ' + url_api))
      }
    }
    xhttp.send()
  })
}

// module.exports = fetchData