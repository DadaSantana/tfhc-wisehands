import { useLocalSearchParams, useRouter } from 'expo-router';
import styled from 'styled-components/native';
// import Image from './Image'; // Removido
import { Text } from 'react-native';
import { useAuth } from '@/context/auth';

export default function ModulosCard(props: any) {
    const router = useRouter();
    // Pegamos o id do curso da rota pai, não do searchParams aqui
    const parentParams = useLocalSearchParams(); 
    let courseId = parentParams.id;

    // Garantir que courseId seja uma string
    if (Array.isArray(courseId)) {
      courseId = courseId[0];
    }

    const { idmodulo, name, price: propPrice } = props;

    const auth = useAuth();
    const user = auth?.user;

    const handlePress = () => {
        // Garantir que temos o ID do curso para a rota de aulas e que é uma string
        if (!courseId || typeof courseId !== 'string') {
            console.error("Course ID is missing or not a string:", courseId);
            return; // Ou mostrar um alerta
        }

        const queryParams = new URLSearchParams({
            info: JSON.stringify({ name, idmodulo, price: propPrice }),
            // Passar o ID do curso para a tela de aulas, se necessário
            // courseId: typeof courseId === 'string' ? courseId : JSON.stringify(courseId), // Removido, não usado diretamente aqui
        });

        // Navegar para a tela de aulas correspondente.
        const targetPathname = '/academy/aulas/[aulasid]'; // Caminho literal do arquivo
        const routeParams = { 
          aulasid: courseId, // Passar o ID do curso como o parâmetro esperado pelo arquivo
          info: JSON.stringify({ name, idmodulo, price: propPrice }) 
        };

        console.log("Navigating to pathname:", targetPathname);
        console.log("With params:", routeParams);
        console.log("Course ID value:", courseId);

        // Usar a sintaxe de objeto com pathname literal e params
        router.push({
          pathname: targetPathname,
          params: routeParams
        });
    };

    // O texto 'Free' ou 'Subscribe now' não aparece na imagem final
    // let tipo = ''; 
    // switch (propPrice) {
    //     case '0.00':
    //         tipo = 'Free';
    //         break;
    //     default:
    //         tipo = (user && user.paid === 'N') ? "Subscribe now" : '';
    //         break;
    // }

    return (
        // Usamos CardContainer diretamente, sem Container1 ou PriceText separados
        <CardContainer onPress={handlePress}> 
            <Title>{name}</Title> 
            {/* <PriceText>{tipo}</PriceText> // Removido */}
        </CardContainer>
    );
};

const CardContainer = styled.TouchableOpacity`
    background-color: #000000; /* Fundo preto */
    border-radius: 8px;       /* Bordas arredondadas */
    padding: 15px;           /* Espaçamento interno */
    /* margin-bottom: 12px; */ /* Espaçamento agora é controlado pelo gap no pai */
    /* Remover flex-direction, justify-content, align-items */
`;

// Container1 removido

// PriceText removido

const Title = styled.Text`
    font-weight: 400; /* Peso normal da fonte */
    font-size: 16px;
    color: #FFFFFF;    /* Cor branca */
    /* line-height removido */
`;