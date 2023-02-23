// import React from 'react';
// import {TextInput, Button, Portal, Dialog} from 'react-native-paper';
// import PropTypes from 'prop-types';

// export default class StartDialog extends React.Component {
//   state = {
//     appKey: '',
//     showDialog: false,
//   };

//   _start() {
//     this.props.onStart(this.state.appKey.trim());
//   }

//   render() {
//     return (
//       <Portal>
//         <Dialog visible={this.props.visible} onDismiss={this.props.onDismiss}>
//           <Dialog.Content>
//             <TextInput
//               autoCapitalize="none"
//               style={{height: 40, backgroundColor: 'white'}}
//               value={this.state.appKey}
//               placeholder="Your app key"
//               onChangeText={text => this.setState({appKey: text})}
//             />
//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button onPress={this.props.onDismiss}>Cancel</Button>
//             <Button onPress={this._start.bind(this)}>Start</Button>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>
//     );
//   }
// }

// StartDialog.propTypes = {
//   onStart: PropTypes.func.isRequired,
//   visible: PropTypes.bool.isRequired,
//   onDismiss: PropTypes.func.isRequired,
// };

import React, {useState} from 'react';
import {TextInput, Button, Portal, Dialog} from 'react-native-paper';
import PropTypes from 'prop-types';

const StartDialog = props => {
  const [appKey, setAppKey] = useState('');

  const start = () => {
    props.onStart(appKey.trim());
  };

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.Content>
          <TextInput
            autoCapitalize="none"
            style={{height: 40, backgroundColor: 'white'}}
            value={appKey}
            placeholder="Your app key"
            onChangeText={text => setAppKey(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.onDismiss}>Cancel</Button>
          <Button onPress={start}>Start</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

StartDialog.propTypes = {
  onStart: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default StartDialog;
