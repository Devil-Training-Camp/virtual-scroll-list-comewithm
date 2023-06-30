import { createRoot } from 'react-dom/client';

import { VirtualScrollList } from './components/VirtualScrollList';
import { createDatas } from './utils/util';
export const App = () => {
  const mockData = createDatas(100);

  return (
    <>
      Hello World
      <VirtualScrollList
        scrollList={mockData}
        renderItem={(item, index) => (
          <>
            <div>{item.user}</div>
            <div>{item.desc}</div>
          </>
        )}
        offset={50}
        onScrollBottom={() => {
          console.log('bottom');
        }}
      />
    </>
  );
};

const root = document.querySelector('#root');

root && createRoot(root).render(<App />);
