import React from 'react';
import './GroupingDropdown.css';

const GroupingDropdown = ({ onGroupingChange, onOrderingChange }) => {
  return (
    <div className="grouping-dropdown">
      <div className="dropdown">
        <label htmlFor="grouping">Grouping</label>
        <select id="grouping" onChange={e => onGroupingChange(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="ordering">Ordering</label>
        <select id="ordering" onChange={e => onOrderingChange(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default GroupingDropdown;
