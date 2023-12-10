import { styled } from 'styled-components';



const Container = styled.div`

    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background-color: gray;

`;

function Navbar() {

    return (

        <Container>

            MY NOTES

        </Container>
    );
}

export default Navbar