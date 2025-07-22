import React, { useState } from 'react';

function TestInput() {
  const [value, setValue] = useState('');
  return (
    <div style={{ padding: 40 }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type here"
        style={{ fontSize: 20, padding: 8 }}
      />
    </div>
  );
}

export default TestInput;
