import { TextStyle } from 'react-native';

const theme = {
  colors: {
    primary: '#007bff',
    secondory: '#b88636',
    card: '#fdf',
    background: '#413a48',
    text: '#f5f5f5',
    border: 'black',
    notification: 'yellow',
    placeholder: '#ffffff40',
    success: 'green',
    error: '#d84515',
  },
  fonts: {
    h1: 64,
    h2: 48,
    h3: 32,
    h4: 24,
    h5: 16,
    h6: 12,
  },
  weights: {
    w1: '200',
    w2: '500',
    w3: '900',
  } as Record<'w1' | 'w2' | 'w3', TextStyle['fontWeight']>,
};

export default theme;
