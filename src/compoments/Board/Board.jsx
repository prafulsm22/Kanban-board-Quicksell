import React,{useState, useEffect} from 'react';
import Column from '../Column/Column';
import "./Board.css";

const Board = ({grouping, ordering}) => {
  const [data, setData] = useState({ tickets: [], users: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
   
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Helper functions for grouping tickets
  const groupByStatus = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      acc[ticket.status] = [...(acc[ticket.status] || []), ticket];
      return acc;
    }, {});
  };

  const groupByUser = (tickets, users) => {
    return tickets.reduce((acc, ticket) => {
      const user = users.find(user => user.id === ticket.userId);
      const userName = user ? user.name : 'Unassigned';
      acc[userName] = [...(acc[userName] || []), ticket];
      return acc;
    }, {});
  };
  // Ensure 'Done' and 'Completed' columns are present when grouping by 'status'
  const ensureStatusColumns = (grouped) => {
    const requiredStatusColumns = ['Done', 'Completed'];
    requiredStatusColumns.forEach((status) => {
      if (!grouped[status]) {
        grouped[status] = [];
      }
    });
    return grouped;
  };

// Define the order for 'priority' grouping
const priorityOrder = ['No priority', 'Urgent', 'High', 'Medium', 'Low',  ];

  const groupByPriority = (tickets) => {
    // Initialize the object with all priorities
    const priorityGroups = {
      'No priority': [],
      'Urgent': [],
      'High': [],
      'Medium': [],
      'Low': []
    };
    
    tickets.forEach((ticket) => {
      // Assuming ticket.priority is a number 0-4, with 0 being 'No priority' and 4 being 'Urgent'
      const priorityName = priorityOrder[ticket.priority];
      if (priorityName) {
        priorityGroups[priorityName].push(ticket);
      } else {
        // If priority is not defined or out of range, it defaults to 'No priority'
        priorityGroups['No priority'].push(ticket);
      }
    });
    return priorityGroups;
  };

  const sortTickets = (tickets) => {
    if (ordering === 'priority') {
      // Sorting by priority, descending (higher priority first)
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (ordering === 'title') {
      // Sorting by title, ascending (alphabetical order)
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets; // No sorting applied
  };

  let groupedTickets = {};
    if (grouping === 'status') {
      groupedTickets = groupByStatus(data.tickets);
      groupedTickets = ensureStatusColumns(groupedTickets);
    } else if (grouping === 'user') {
      groupedTickets = groupByUser(data.tickets, data.users);
    } else if (grouping === 'priority') {
      groupedTickets = groupByPriority(data.tickets);
      // Sort the priorities according to the defined order
      const sortedGroupedTickets = {};
      priorityOrder.forEach((priority) => {
        sortedGroupedTickets[priority] = groupedTickets[priority] || [];
      });
      groupedTickets = sortedGroupedTickets;
    }
  
  // Apply sorting to each group
  Object.keys(groupedTickets).forEach((group) => {
    groupedTickets[group] = sortTickets(groupedTickets[group]);
  });
   // Determine the column order based on grouping
   const columnOrder = grouping === 'status' ? ['Backlog', 'Todo', 'In progress', 'Done', 'Completed'] : Object.keys(groupedTickets);

  return (
    <div className="board">

        <div className='board_cards'>
        {columnOrder.map((column) => (
          <Column
            key={column}
            title={column}
            tickets={groupedTickets[column] || []}
            grouping={grouping}
            users={data.users}
          />
        ))}
        </div>
    </div>
  );
};

export default Board;
