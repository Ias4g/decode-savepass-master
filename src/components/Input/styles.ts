import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: #FFFFFF;

  
  ${({ isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: #DC1637;   
  `};
`;


export const InputText = styled(TextInput) <Props>`
  flex: 1;
  background-color: #FFFFFF;
  color: #7A7A80;
  padding: 0 23px;

  ${({ isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: #DC1637;    
  `};
`;




// import { StyleSheet } from 'react-native';

// export const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     marginBottom: 16
//   },
//   label: {
//     fontSize: 15,
//     color: '#888D97',
//     marginBottom: 7
//   },
//   input: {
//     height: 56,
//     width: '100%',
//     borderColor: '#E3E3E3',
//     borderWidth: 1,
//     paddingLeft: 22,
//     borderRadius: 4,
//     backgroundColor: '#fff',

//   }
// });
