    
export const convertToInboxTime = (date: number | string ) => {
    const today = new Date();
    const messageDate = new Date(date);
    // console.log(today, messageDate, "TODAY AND MESSAGE DATE");
    const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
        return `${diffDays}d`;
    } else {
        return messageDate.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
    }
}

export const convertToChatRoomTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    // If the timestamp is from today
    if (diffDays === 0) {
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
    // If the timestamp is from yesterday
    else if (diffDays === 1) {
        return `Yesterday, ${date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })}`;
    }
    // If the timestamp is within the last 7 days but not today or yesterday
    else if (diffDays < 7) {
        return date.toLocaleString('en-US', {
            weekday: 'short',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
    // If the timestamp is older than a week
    else {
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
}

export const isTimeExceeds30mins = (time1: string, time2: string | null) => {
    if (time2 === null) return false;
    const diff = Math.abs(
      new Date(time1).getTime() - new Date(time2).getTime()
    );
    // console.log(new Date(time1), new Date(time2), diff, "TIME DIFFERENCE");
    if(diff > 1800000){
      return true;
    }
    return false;
}