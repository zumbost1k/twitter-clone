import React from 'react';
import './chat.css';
import AllChats from '@/components/allChats/allChats';

const allChats = [
  {
    chatId: 1,
    chatUserPhoto: './photos/usersAvatar/emptyAvatar.jpg',
    chatUserName: 'misha',
    lastMessage:
      'I’m so overwhelmed in my knowledge that I seem to have been living on trillions and trillions of planets like this Earth for one hundred trillion billion years,',
    lastMessageTime: '2024-01-16T07:39:34.713',
    isOwnLastMessage:true,
    
  },
];

const Chat = () => {
  return (
    <div className='chat-section'>
      <AllChats allChats={allChats} />
    </div>
  );
};
export default Chat;
