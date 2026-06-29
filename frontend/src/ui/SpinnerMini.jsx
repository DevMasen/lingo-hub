import styled, { keyframes } from 'styled-components';

import { BiLoaderAlt } from 'react-icons/bi';
//---

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 1.8rem;
  height: 1.8rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
