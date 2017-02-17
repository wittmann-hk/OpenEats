import React from 'react'
import {
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';

require("../css/footer.css");

class Footer extends React.Component{
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">
            <FormattedMessage
              id='footer.credit'
              description='Footer credit'
              defaultMessage='Created with {link}'
              values={{
                link: <a href="https://github.com/RyanNoelk/OpenEats">OpenEats</a>
              }}
            />
          </p>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(Footer);