import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

const getSelectionCountText = (count) => {
    if (count === 0) {
      return 'раз';
    }
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return 'раз';
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
      return 'раза';
    } else {
      return 'раз';
    }
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
         list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}
                <div className='Item-selection-count'>
                  {item.selectionCount > 0 && `| Выделяли  ${Number(item.selectionCount)} ${getSelectionCountText(Number(item.selectionCount))}`}
                </div>
                </div>
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
