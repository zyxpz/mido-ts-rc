import * as PropTypes from 'prop-types';
import * as React from 'react';
import './<%=name%>.less';

interface Props {
  text: string
}

interface Stats {
  
}

export default class <%=name%> extends React.Component<Props, Stats> {

  public defaultProps = {
    text: '<%=name%>'
  }

  public propTypes = {
    text: PropTypes.string
  }

  public state = {}

  public render() {
    const {
      text
    } = this.props;
    return (
      <div className="<%=name%>">{text}</div>
    )
  }
}