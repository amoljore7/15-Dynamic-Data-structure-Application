let BASE_URL =  "http://localhost:5000";  //lets local default

//check the environment
if(process.env.REACT_APP_ENV === "development"){
    BASE_URL = "https://demo9082206.mockable.io/"
}

if(process.env.REACT_APP_ENV === "production"){
    BASE_URL = "https://demo6366519.mockable.io"
}

export {BASE_URL};