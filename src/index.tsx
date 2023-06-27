import { createRoot } from 'react-dom/client';

export const App = () => {
  return <>Hello World</>;
};

const root = document.querySelector('#root');

root && createRoot(root).render(<App />);
