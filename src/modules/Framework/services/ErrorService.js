
function getErrorText(response) {
    let text = ""
    if(response.data instanceof Object){
       for(let field in response.data.errors){
           response.data.errors[field].forEach(function (value){
               text = text +"\n"+field+": "+value
           })
        }
    } else {
        return response.data
    }
    return text
}

export default getErrorText
