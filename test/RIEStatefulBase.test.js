import * as React from 'react';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow, mount } from 'enzyme';

import RIEStatefulBase from '../src/RIEStatefulBase';

describe('<RIEStatefulBase />', () => {
  const defaultProps = {
    value   : 'my-value',
    change  : () => {},
    propName: 'my-prop',
  };

  it('should have the value rendered as text', () => {
    const rieBase = shallow(<RIEStatefulBase {...defaultProps} />);
    expect(rieBase.text()).toEqual(defaultProps.value);
  });

  it('should have the value rendered as text', () => {
    const rieBase = shallow(<RIEStatefulBase {...defaultProps} />);
    expect(rieBase.text()).toEqual(defaultProps.value);
  });

  it('should change to editing mode on click', () => {
    const rieBase = mount(<RIEStatefulBase {...defaultProps} />);

    rieBase.simulate('click');

    expect(rieBase.state().editing).toEqual(true);
  });

  it('should change to editing mode on click', () => {
    const rieBase = mount(<RIEStatefulBase {...defaultProps} />);

    rieBase.simulate('click');

    expect(rieBase.state().editing).toEqual(true);
  });

  it('should change to editing mode on click', () => {
    const rieBase = mount(<RIEStatefulBase {...defaultProps} />);

    rieBase.simulate('click');

    expect(rieBase.state().editing).toEqual(true);
  });
});
