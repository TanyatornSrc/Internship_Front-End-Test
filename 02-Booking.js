const bookingData = [
    {
        "id": 1,
        "roomId": "A101",
        "startTime": "2019-09-28 13:00:00",
        "endTime": "2019-09-28 14:00:00",
        "title": "Lunch with Petr"
      },
      {
        "id": 2,
        "roomId": "A101",
        "startTime": "2019-09-28 14:00:00",
        "endTime": "2019-09-28 15:00:00",
        "title": "Sales Weekly Meeting"
      },
      {
        "id": 3,
        "roomId": "A101",
        "startTime": "2019-09-28 16:00:00",
        "endTime": "2019-09-28 18:00:00",
        "title": "Anastasia Website Warroom"
      },
      {
        "id": 4,
        "roomId": "A101",
        "startTime": "2019-09-29 13:00:00",
        "endTime": "2019-09-29 14:00:00",
        "title": "One-on-One Session"
      },
      {
        "id": 5,
        "roomId": "A101",
        "startTime": "2019-09-29 16:00:00",
        "endTime": "2019-09-29 18:00:00",
        "title": "UGC Sprint Planning"
      },
      {
        "id": 6,
        "roomId": "A102",
        "startTime": "2019-09-30 09:00:00",
        "endTime": "2019-10-04 18:00:00",
        "title": "5-Day Design Sprint Workshop"
      },
      {
        "id": 7,
        "roomId": "Auditorium",
        "startTime": "2019-09-19 09:00:00",
        "endTime": "2019-09-23 19:00:00",
        "title": "Thai Tech Innovation 2019"
      },
      {
        "id": 8,
        "roomId": "A101",
        "startTime": "2019-09-28 10:00:00",
        "endTime": "2019-09-28 13:00:00",
        "title": "Raimonland project"
      },
      {
        "id": 9,
        "roomId": "A102",
        "startTime": "2019-09-30 18:00:00",
        "endTime": "2019-09-30 20:00:00",
        "title": "Management Meetinng"
      },
      {
        "id": 10,
        "roomId": "A101",
        "startTime": "2019-10-04 14:00:00",
        "endTime": "2019-10-06 11:00:00",
        "title": "3-day workshop Corgi costume"
      }
  ];
  
  const toDate = (dateString) => new Date(dateString);
  
  const checkAvailability = (roomId, startTime, endTime) => {
    const start = toDate(startTime);
    const end = toDate(endTime);
    
    for (let booking of bookingData) {
      if (booking.roomId === roomId) {
        const bookingStart = toDate(booking.startTime);
        const bookingEnd = toDate(booking.endTime);
        
        if ((start < bookingEnd && end > bookingStart)) {
          return false; }
      }
    }
    
    return true;
  };
  
  const isDateInRange = (date, startOfWeek, endOfWeek) => {
    return date >= startOfWeek && date <= endOfWeek;
  };
  
  const getWeekRange = (referenceDate, weekOffset = 0) => {
    const startOfWeek = new Date(referenceDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1 + weekOffset * 7);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return { startOfWeek, endOfWeek };
  };
  
  const getBookingsForWeek = (roomId, weekNo) => {
    const today = new Date();
    const { startOfWeek, endOfWeek } = getWeekRange(today, weekNo);
  
    return bookingData.filter(booking => {
      if (booking.roomId === roomId) {
        const bookingStart = toDate(booking.startTime);
        const bookingEnd = toDate(booking.endTime);
  
        return isDateInRange(bookingStart, startOfWeek, endOfWeek) ||
               isDateInRange(bookingEnd, startOfWeek, endOfWeek) ||
               (bookingStart < startOfWeek && bookingEnd > endOfWeek);
      }
      return false;
    });
  };
  
  console.log(checkAvailability('A101', '2019-09-28 15:00:00', '2019-09-28 16:00:00')); 
  console.log(getBookingsForWeek('A101', 0)); 
  
