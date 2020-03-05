import { useState } from 'react';

const useModal = () => {
  const [isShowing, setShow] = useState(false);

  // Toggle modal status
  function toggle () {
    setShow(!isShowing);
  }

  return {
    isShowing, toggle
  };
};

export default useModal;
