import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { FavButton } from '../../src/client/layout';

describe('<FavButton />', () => {
  const mockOnClick = jest.fn();
  const wrapper = shallow(<FavButton characterId={1} onFavClicked={mockOnClick} />);

  describe('return()', () => {
    test('renders the FavButton component', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('onClick()', () => {
    test('successfully calls the onClick handler', () => {
      wrapper.find('button').simulate('click');
      expect(mockOnClick.mock.calls.length).toEqual(1);
    });
  });
});
