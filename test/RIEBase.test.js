import * as React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';

import RIEBase from '../src/RIEBase';

describe('<RIEBase />', () => {
    const defaultProps = {
        value: 'my-value',
        change: () => {},
        propName: 'my-prop'
    };

    it(`should have the value rendered as text`, () => {
        const rieBase = shallow(<RIEBase {...defaultProps}/>);
        expect(rieBase.text()).toEqual(defaultProps.value);
    });

});
