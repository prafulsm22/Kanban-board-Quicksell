import React from 'react'
import { Circle, MoreHorizontal } from 'react-feather';
import "./Card.css"

const Card = ({ ticket, grouping }) => {

    return (
    <div className='card'>
                <div>
                    <div className='card_top'>
                        <span className="card-id">{ticket.id}</span>
                        {grouping === 'status' &&(<img src="https://robohash.org/mail@ashallendesign.co.uk" className="card-assignee-image" alt='userImage' />)}
                    </div>
                    <div className='card_body'>
                        <span className="card-title">{grouping === 'priority' &&(<Circle /> )} &nbsp;{ticket.title}</span>
                    </div>
                    <div className="card-footer">
                        <button className="card-status-button"> <MoreHorizontal/> </button>
                        <span className="card-feature"><Circle/> {ticket.tag[0]}</span>
                    </div>
                </div>
    </div>
  );
};

export default Card