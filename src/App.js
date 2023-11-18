import React, { useState } from 'react';
import './App.css'; // Import a CSS file for additional styling

const App = () => {
  const [block1Items, setBlock1Items] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [block2Items, setBlock2Items] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleTransfer = (fromBlock, toBlock) => {
    const updatedFromBlock = fromBlock.filter((item) => !selectedItems.includes(item));
    const updatedToBlock = toBlock.concat(selectedItems.filter((item) => !toBlock.includes(item)));

    if (fromBlock === block1Items) {
      setBlock1Items(updatedFromBlock);
    } else {
      setBlock2Items(updatedFromBlock);
    }

    if (toBlock === block1Items) {
      setBlock1Items(updatedToBlock);
    } else {
      setBlock2Items(updatedToBlock);
    }

    setSelectedItems([]);
  };

  return (
    <div className="app-container">
      <div className="block" id="block1">
        <h2>Block 1</h2>
        <ul>
          {block1Items.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="button-container">
        <button className="transfer-button" onClick={() => handleTransfer(block1Items, block2Items)}>
          ➡
        </button>
        <button className="transfer-button" onClick={() => handleTransfer(block2Items, block1Items)}>
          ⬅
        </button>
      </div>

      <div className="block" id="block2">
        <h2>Block 2</h2>
        <ul>
          {block2Items.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
