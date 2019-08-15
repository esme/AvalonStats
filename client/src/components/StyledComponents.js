import styled from 'tachyons-components';

const Avatar = styled('img')`
  br-100 h4 w4 dib ba b--black-05
`;

const Main = styled('div')`
  measure center pa4
`;

const Button = styled('input')`
  ${({ darkTheme }) => (!darkTheme ? 'b--black-20' : 'b--white-60 dark-gray')};
  br2 b pv2 input-reset ba bg-light-gray grow pointer f6 dib w-80
`;

const ButtonPill = styled('input')`
  f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3
`;

const Div = styled('div')`
  mt3
`;

const Input = styled('input')`
  ${({ darkTheme }) => (!darkTheme ? 'b--black-20' : 'b--white-60')};
  br2 pt2 pb2 input-reset ba bg-transparent w-80
`;

// const Header = styled.section`
//   height: 65px;
//   padding: 0 20px;
//   font-size: 26px;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${props => (props.whiteColor ? '#f7f7f7' : '#28282a')};
//   span {
//     color: #f45531;
//     background-color: ${props => (props.whiteColor ? '#f7f7f7' : '#28282a')};
//   }
// `;

export {
  Avatar,
  Main,
  Button,
  ButtonPill,
  Div,
  Input,
};
