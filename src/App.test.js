import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import store from './store/store';
import {testApi} from './API/API'
import axios from "axios";

jest.mock('axios')

describe('render tests', () => {
  const setup = () => render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  test('first render test', async () => {
    setup();
    const listElem = screen.getByText(/ITEM LIST/i);
    const incrBtnElem = screen.getAllByText(/increment/gi)
    const decrBtnElem = screen.getAllByText(/decrement/gi)
    const getBtnElem = screen.getByText(/get posts/gi)
    const settingBtnElem = screen.getByText(/setting/gi)
    const apiResponse = screen.queryAllByTestId('arrayElem')

    expect(listElem).toBeInTheDocument();
    expect(incrBtnElem).toHaveLength(2);
    expect(decrBtnElem).toHaveLength(2);
    expect(getBtnElem).toBeInTheDocument();
    expect(settingBtnElem).toBeInTheDocument();
    expect(apiResponse).toHaveLength(0);
  });

  test('click and modal', async ()=> {
    setup();
    const modalWrap = screen.getByTestId('modal');
    const settingBtnElem = screen.getByTestId('settingBtn')
    expect(modalWrap).toHaveStyle({display: 'none'});
    fireEvent.click(settingBtnElem);
    const settingModal = screen.getByText(/Settings/g)
    expect(settingModal).toBeInTheDocument();
    expect(modalWrap).toHaveStyle({display: 'block'});
    fireEvent.click(modalWrap);
    expect(modalWrap).toHaveStyle({display: 'none'});
  })
})

describe('fakeApiTest', () => {
  let response;
  beforeEach(() => {
    response = {
      data: [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
              "lat": "-43.9509",
              "lng": "-34.4618"
            }
          },
          "phone": "010-692-6593 x09125",
          "website": "anastasia.net",
          "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
          }
        },
        {
          "id": 3,
          "name": "Clementine Bauch",
          "username": "Samantha",
          "email": "Nathan@yesenia.net",
          "address": {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
            "geo": {
              "lat": "-68.6102",
              "lng": "-47.0653"
            }
          },
          "phone": "1-463-123-4447",
          "website": "ramiro.info",
          "company": {
            "name": "Romaguera-Jacobson",
            "catchPhrase": "Face to face bifurcated interface",
            "bs": "e-enable strategic applications"
          }
        }
      ]
    }
  })
  test('AxiosGetFakeApiTest', async ()=> {
    axios.get.mockReturnValue(response);
    const data = await testApi()
    expect(axios.get).toBeCalledTimes(1)
    expect(data).toEqual([1,2,3])
  })
})

