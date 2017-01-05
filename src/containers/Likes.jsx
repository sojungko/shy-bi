import React from 'react';

console.log('CONTAINER/LIKES | Exporting LIKES...');

const Likes = () => {
  console.log('    CONTAINER/LIKES | Rendering LIKES Container...');
  return (
    <div>
      <h3>Liked User 1</h3>
      <h3>Liked User 2</h3>
      <h3>Liked User 3</h3>
      <h3>Liked User 4</h3>
      <h3>Liked User 5</h3>
    </div>
  );
};

export default Likes;

console.log('CONTAINER/LIKES | Exported LIKES');
console.log(' ');
