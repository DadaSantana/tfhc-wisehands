import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import styled from "styled-components/native"
import { BASE_URL, CURSOS_MODULOS } from '@/consts';
import ModulosCard from '@/components/academy/ModulosCard';
import { useAuth } from '@/context/auth';

// import i18n from '@/locales'
import { Alert, View, Text } from 'react-native';

export default function Modulos(props: any) {
  const auth = useAuth();
  const router = useRouter();
  const { id, info } = useLocalSearchParams();
  const [modulos, setModulos] = useState<any[]>([]);

  let courseName = 'Curso';
  if (typeof info === 'string') {
    try {
      const infoObj = JSON.parse(info);
      courseName = infoObj?.name || 'Curso';
    } catch (e) {
      console.error("Failed to parse info param:", e);
    }
  }

  if (!auth || !auth.user) {
    console.error("Auth context or user is not available");
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Erro: Usuário não autenticado.</Text>
      </View>
    );
  }
  const { user, signOut } = auth;

  const URL = BASE_URL + CURSOS_MODULOS + "?idcurso=" + id + "&allowpaid=" + user.paid

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data?.lstRows)) {
          setModulos(data.lstRows);
        } else {
          console.warn('API did not return lstRows as an array:', data);
          setModulos([]);
        }
      })
      .catch(error => {
        console.error("Error fetching modulos:", error);
        Alert.alert("Failure", "Try again");
      });
  }, [URL]);


  // if (user.paid === 'N') {
  //   return (
  //     <Container>
  //       <BootstrapIcon icon="bar-chart-fill" size={40} color="#e8e8e9" />
  //       <BH4>{i18n.t(`We hope you're enjoying your journey with us. It looks like you're trying to access a course that is part of our premium offering.`)} {"\n\n"} {i18n.t(`We'd love to have you on board with full access!\n`)}</BH4>
  //       <BH7>
  //         {i18n.t('Contact our team and purchase your course')}
  //       </BH7>
  //       <ConfirmBtnWpp
  //         onPress={() => {
  //           router.push("https://wa.me/447453274072");
  //         }}
  //       >
  //         <BtnTextBlack>{i18n.t('Get in touch')}</BtnTextBlack>
  //         <FontAwesomeIcon icon={faWhatsapp} size={20} color="#0D0E12" />
  //       </ConfirmBtnWpp>
  //     </Container>
  //   );
  // }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: courseName }} />
      <ModulosList contentContainerStyle={{ flexGrow: 1 }}>
        <ModuloContainer>
          {modulos.length > 0 ? (
            modulos.map((modulo) => (
              <ModulosCard
                key={modulo.IDModulo}
                idmodulo={modulo.IDModulo}
                idcurso={modulo.IDCurso}
                name={modulo.Description}
                price={modulo.Price}
              />
            ))
          ) : (
            <Text>Nenhum módulo encontrado.</Text>
          )}
        </ModuloContainer>
      </ModulosList>
      <Footer>
        <VoltarButton onPress={() => router.back()}>
          <VoltarButtonText>Voltar</VoltarButtonText>
        </VoltarButton>
      </Footer>
    </ScreenContainer>
  )
}

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

const ModulosList = styled.ScrollView`
  flex: 1;
`;

const ModuloContainer = styled.View`
  padding: 20px;
  gap: 12px;
`;

const Footer = styled.View`
  padding: 20px;
  background-color: #FFFFFF;
`;

const VoltarButton = styled.TouchableOpacity`
  background-color: #000000;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
`;

const VoltarButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

// const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   padding: 0px 16px;
//   gap: 8px;
//   width: 350px;
//   margin: auto;
// `;

// const BH4 = styled.Text`
//   font-weight: 600;
//   font-size: 24px;
//   color: #e8e8e9;
//   text-align: center;
// `;
// const BH7 = styled.Text`
//   font-weight: 600;
//   font-size: 16px;
//   color: #adb1b8e5;
//   text-align: center;
//   padding-bottom: 8px;
// `;

// const BtnTextBlack = styled.Text`
//   font-weight: 700;
//   font-size: 16px;
//   color: #0d0e12;
//   text-align: center;
// `;

// const ConfirmBtnWpp = styled.TouchableOpacity`
//   background: #25d366;
//   border-radius: 4px;
//   padding: 12px 24px;
//   flex-direction: row;
//   gap: 8px;
//   align-items: center;
// `;