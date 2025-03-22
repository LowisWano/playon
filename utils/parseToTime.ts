
export const parseToTime = (date: string) => {
    const today = new Date();
    const messageDate = new Date(date);
    const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
        return `${diffDays}d`;
    } else {
        return messageDate.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
    }
}