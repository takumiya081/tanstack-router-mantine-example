import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from './theme';

const a = 'test';
const _b = `test${a}`;

// biome-ignore lint/style/noDefaultExport: page
export default function App() {
  return <MantineProvider theme={theme}>App</MantineProvider>;
}
