import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import App from '../../src/client/App';

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => {
    const p = new Promise((resolve, reject) => {
      resolve({
        code: 200,
        data: {
          results: [
            {
              id: 1,
              name: '',
              description: '',
              thumbnail: {
                path: '',
                extension: ''
              },
              comics: {
                items: []
              },
              series: {
                items: []
              },
              urls: []
            }
          ]
        },
        attributionText: ''
      });
    });

    return p;
  });
});

describe('<App />', () => {
  describe('render()', () => {
    test('renders the App component', () => {
      const component = shallow(<App />);

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
