/*const cardData = [
  {
    id: '1',
    image: require('../images/outdoor1.png'), //call through api?
    title: 'Fishing', //call through api?
    selected: true,
  },
  {
    id: '2',
    image: require('../images/outdoor2.png'),//call through api?
    title: 'Karting',//call through api?
    selected: false,
  },
  {
    id: '3',
    image: require('../images/outdoor1.png'),//call through api?
    title: 'Fishing',//call through api?
    selected: false,
  },
    {
      id: '1',
      image: require('../images/outdoor1.png'), //call through api?
      title: 'Fishing', //call through api?
      selected: false,
    },
    {
      id: '2',
      image: require('../images/outdoor2.png'),//call through api?
      title: 'Karting',//call through api?
      selected: false,
    },
    {
      id: '3',
      image: require('../images/outdoor1.png'),//call through api?
      title: 'Fishing',//call through api?
      selected: false,
    }
  ];*/
  var cardData = [];

  var createCardRow = (type, index) => {
    var cardRow = [];
    var url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?"),
      params = {
        key:"AIzaSyCYW0drTYtabjf1zEoAVNyBYZGNkI_FxwQ", 
        location:"32.9858,-96.760627", 
        radius: 10000,
        type: type
      }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //console.log(url);
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success
        //console.log(responseJson);
        var photoRefs = []
        for(var i = 0; i < responseJson.results.length; i++){
          //console.log(responseJson.results[i].name);
          var costStr = "";
          for(var j = 0; j < responseJson.results[i].price_level; j++){
            costStr += "$"
          }
          var openNowStr = "";
          if(!responseJson.results[i].hasOwnProperty('opening_hours')){
            openNowStr = "Closed"
          }
          else if(!responseJson.results[i].opening_hours.open_now){
            openNowStr = "Closed"
          }
          else{
            openNowStr = "Open"
          }
          card = {
            id: i.toString(),
            //image: require("../images/outdoor1.png"),
            image: "https://lh3.googleusercontent.com/p/AF1QipMxbRXvky1a-aPDviu2FilAkT3FKt4e2cNY-INp=s1600-h5",
            title: responseJson.results[i].name,
            selected: false,
            address: responseJson.results[i].vicinity,
            rating: responseJson.results[i].rating,
            type: (responseJson.results[i].types[0].charAt(0).toUpperCase() + responseJson.results[i].types[0].slice(1)).split('_').join(' '),
            typeIcon: 'key',
            cost: costStr,
            status: responseJson.results[i].business_status,
            openNow: openNowStr,
            lat: responseJson.results[i].geometry.location.lat,
            long: responseJson.results[i].geometry.location.lng
          }

          cardRow.push(card); //adds each card to the row

          if(responseJson.results[i].hasOwnProperty("photos")) {
            photoRefs[i] = (responseJson.results[i].photos[0].photo_reference);
            //setCardImage(cardData.length, i, responseJson.results[i].photos[0].photo_reference)
            //cardRow[i].image = setCardImage(responseJson.results[i].photos[0].photo_reference);
          }
        } 
        cardData[index]=(cardRow); //adds each row to cardData
        for(var j = 0; j < photoRefs.length; j++){
          if(photoRefs[j] !== undefined){
            setCardImage(index, j, photoRefs[j]);
          }
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        alert("ERROR IN API CALL "+JSON.stringify(error));
        console.error(error);
      });
  }
  
  
  var setCardImage = (i, j, photoreference) => {
    var url = new URL("https://maps.googleapis.com/maps/api/place/photo?"),
      params = {
        key:"AIzaSyCYW0drTYtabjf1zEoAVNyBYZGNkI_FxwQ", 
        photoreference: photoreference, 
        maxheight: 250
      }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //console.log(url);
    fetch(url, {
      method: 'GET',
    })
      .then((responseImage) => {
        //Success
        cardData[i][j].image = responseImage.url;
        //console.log("Image url: "+ responseImage.url)
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        alert("ERROR IN PHOTO CALL "+JSON.stringify(error));
        console.error(error);
      });
  }

  createCardRow("restaurant",0)
  createCardRow("museum",1)
  createCardRow("tourist_attraction",2)
  createCardRow("cafe",3)

  export default cardData;