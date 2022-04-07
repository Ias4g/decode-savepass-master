import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Container, IconContainer, InputText } from './styles';

export type InputProps = TextInputProps & {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  value?: string;
}

export function Input({ icon, value, ...rest }: InputProps) {
  let colorIcon = ""
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  if (isFocused) {
    colorIcon = "#DC1637"
  } else if (isFilled) {
    colorIcon = "#00A88E"
  } else {
    colorIcon = "#AEAEB3"
  }

  return (
    <Container >
      <IconContainer isFocused={isFocused}>
        <MaterialIcons
          name={icon}
          size={24}
          color={colorIcon}
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        value={value}
        {...rest}
      />
    </Container>
  );
}





// import { Text, TextInput, TextInputProps, View } from 'react-native';

// import { styles } from './styles';

// type Props = TextInputProps & {
//   label: string;
// }

// export function Input({ label, ...rest }: Props) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>
//         {label}
//       </Text>

//       <TextInput style={styles.input} {...rest} />
//     </View>
//   );
// }