import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import Image from './Image';
import AcademyLayout from '@/app/(tabs)/academy/_layout';


export default function CursosCard(props: any) {
    const router = useRouter();
    const { ID, name, image } = props;

    const handlePress = () => {
        const queryParams = new URLSearchParams({
            info: JSON.stringify({ name }),
        });

        router.push(`/academy/modulos/${ID}?${queryParams.toString()}`);
    };
    
    return (
        <CardContainer onPress={handlePress}>
            <AcademyLayout />
            <Container1>
                <Title>{name}</Title>
            </Container1>
            <Image image={image}/>
        </CardContainer>
    );
  };

const CardContainer = styled.TouchableOpacity`
    background-color: #1F2229;
    border-radius: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Container1 = styled.View`
    gap: 10px;
    padding: 16px;
`

const Title = styled.Text`
    font-weight: 600;
    font-size: 16px;
    line-height: 40px;
    color: #E8E8E9;
`