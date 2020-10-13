import React from 'react';

const ListGroup = ({ items, textProp, valueProp, onItemSelect, selectedItem }) => {
    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            onClick={() => onItemSelect(item)}
            key={item[valueProp]}
            className={
              item=== selectedItem
                ? "list-group-item active"
                : "list-group-item "
            }
          >
            {item[textProp]}
          </li>
        ))}
      </ul>
    );
};
ListGroup.defaultProps = {
  textProp: "name",
  valueProp: "_id"
}

export default ListGroup;
