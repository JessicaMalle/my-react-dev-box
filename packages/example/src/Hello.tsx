import styled from 'styled-components';

function Hello({name}) {
  const Wrapper = styled.div`
    margin: 20px auto;
    color: tomato;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  `;

  return <Wrapper>Hello, {name}</Wrapper>
}

export default Hello;
