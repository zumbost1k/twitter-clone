import React from 'react';
import './allChats.css';

const AllChats = ({ allChats }) => {
  return (
    <section className='container all-chats'>
      <h2 className='title all-chats__title'>Messages</h2>
      <div className='chats all-chats__chats'>
        {allChats.map((currentChat) => {
          return <div></div>;
        })}
      </div>
    </section>
  );
};

export default AllChats;
