const formatDateTime = (date) => {
    const currentDate = new Date(date)
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = currentDate.toLocaleString('en-US', options);
    
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();
  
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    const formattedDate = `${day}${daySuffix(day)} ${month} ${year}`;
    return `${timeString} ;${formattedDate}`;
  };

  export {formatDateTime}