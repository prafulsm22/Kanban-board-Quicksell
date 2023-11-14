import React from 'react';
import Card from '../Card/Card';
import {BarChart, MoreHorizontal,Plus, Volume1, Volume2} from "react-feather";
import {AlertCircle} from 'react-feather';
import './Column.css';

const Column = ({ title, tickets, grouping, users }) => {

    // Get the appropriate icon for priority
    const getPriorityIcon = priority => {
    
    // Define your icons for different priorities
    const icons = {
      'Urgent': <AlertCircle className="UrgentIcon" />,
      'High': <BarChart className="icon" />,
      'Medium': <Volume2 className="icon" />,
      'Low': <Volume1 className="icon" />,
      'No priority': <MoreHorizontal className="icon" />,
    };
    return icons[priority] || null ;
  };

  return (
    <div className="column">
        <div className='board_top'>
        {grouping === 'user' && (
          <img src="https://ui-avatars.com/api/?name=Praful+Mane&background=0D8ABC&color=fff" className="board-assignee-image" alt='' />
        )}
        {grouping === 'priority' && getPriorityIcon(title)}  &nbsp; &nbsp; 
        <p className='board_top_title'>{title} &nbsp; &nbsp;
            <span>{tickets.length}</span>
        </p>
        <Plus/>
        <MoreHorizontal />
      </div>
      {tickets.map((ticket) => (
        <Card key={ticket.id} 
            ticket={ticket} 
            grouping={grouping} />
      ))}
    </div>
  );
};

export default Column;
