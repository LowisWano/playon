import { InboxChatmates } from '../entities/InboxEntity';

export type LatestChatmatesProps = {
    data: { //test data
        id: number;
        name: string;
        type: string;
    }[];
    inboxData: InboxChatmates[];  
}
