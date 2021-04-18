const generateCards = [
    {
      id: '0',
      icon: '',
      title: 'Restaurant', 
      selected: false,
    },
    
    {
        id: '1',
        icon: '',
        title: 'Movie Theater', 
        selected: false,
    },

    {
        id: '2',
        icon: '',
        title: 'Night Club', 
        selected: false,
    },

    {
        id: '3',
        icon: '',
        title: 'Cafe', 
        selected: false,
      },
      
      {
          id: '4',
          icon: '',
          title: 'Museum', 
          selected: false,
      },
  
      {
          id: '5',
          icon: '',
          title: 'Bar', 
          selected: false,
      },

      {
        id: '6',
        icon: '',
        title: 'Tourist Attraction', 
        selected: false,
      },
      
      {
          id: '7',
          icon: '',
          title: 'Gym', 
          selected: false,
      },
  
      {
          id: '8',
          icon: '',
          title: 'Park', 
          selected: false,
      },
    ];
    var init = () =>{
        for(var i =0; i <= 8; i++){
            generateCards[i].selected = false;
        }
    }
    export default generateCards;