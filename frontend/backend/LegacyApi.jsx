const LegacyApi = {
  // Simulate retrieving a user's legacy name from the server. The return format is a the user's legacy name (string).
  // E.g., 'Vista'
  getLegacyName: async () => {
    // A fake delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'Vista';
  },
  
  // Simulate retrieving a list of legacy members from the server. The return format is an array of objects, each containing:
  // - name (string): The name of the member
  // - cohort (string): The cohort of the member
  // - location (string): The location of the member
  // - avatarUrl (string): The URL of the member's avatar image
  // The data doesn't need to be sorted.
  getLegacyMembers: async () => {
    // A fake delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dummy data
    const members = [
      {name: 'Albert', cohort: 'M26', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Bob', cohort: 'M27', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Cindy', cohort: 'M28', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Davis', cohort: 'M24', location: 'Berlin', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Edward', cohort: 'M25', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Frank', cohort: 'M26', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Grace', cohort: 'M27', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Howard', cohort: 'M28', location: 'Taipei', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Ivy', cohort: 'M24', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Jack', cohort: 'M25', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Kathy', cohort: 'M26', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Leo', cohort: 'M27', location: 'Berlin', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Mia', cohort: 'M28', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Nancy', cohort: 'M24', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Oliver', cohort: 'M25', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Peter', cohort: 'M26', location: 'Taipei', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Quincy', cohort: 'M27', location: 'San Francisco', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Rachel', cohort: 'M28', location: 'Tokyo', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
      {name: 'Sam', cohort: 'M24', location: 'Buenos Aires', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'},
    ];

    return members;
  },

  // Simulate fetching legacy ranking data from the server. The return format is an array of objects, each containing:
  // - name (string): The name of the legacy
  // - points (number): The points of the legacy
  // The data is sorted in descending order by points.
  getLegacyRanking: async () => {
    // Fake delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dummy data
    const legacyList = [
      {name: 'Octagon', points: 999},
      {name: 'Tower', points: 888},
      {name: 'Bridge', points: 777},
      {name: 'Hunter', points: 666},
      {name: 'Chronicle', points: 555},
      {name: 'Pyramid', points: 444},
      {name: 'Vista', points: 333},
      {name: 'Cable', points: 222},
      {name: 'Pulse', points: 111},
      {name: 'Horizon', points: 100},
      {name: 'Pioneer', points: 90},
      {name: 'Eclipse', points: 80},
      {name: 'Quest', points: 70},
      {name: 'Solar', points: 60},
      {name: 'Nova', points: 50},
      {name: 'Galaxy', points: 40},
      {name: 'Orbit', points: 30},
    ];

    return legacyList;
  }
};

export default LegacyApi;