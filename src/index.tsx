import { createRoot } from 'react-dom/client';

import { VirtualScrollList } from './components/VirtualScrollList';
import { createDatas } from './utils/mock';
export const App = () => {
  const mockData = createDatas(100);

  return (
    <>
      Hello World
      <VirtualScrollList
        scrollList={mockData}
        scrollHeight={400}
        estimatedHeight={50}
        renderItem={(item, index) => (
          <>
            <div>{item.user}</div>
            <div>{item.desc}</div>
          </>
        )}
        onScrollBottom={() => {
          console.log('bottom');
        }}
      />
    </>
  );
};

const root = document.querySelector('#root');

root && createRoot(root).render(<App />);
