import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AULAS, BASE_URL } from '@/consts';
import AulasCard from '@/components/academy/AulasCard';
import Accordion from 'react-native-collapsible/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/auth';
import i18n from '@/locales';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { colors } from '@/styles/colors';
import { fontFamily } from '@/styles/theme';

export default function Aulas() {
  const auth = useAuth();
  const router = useRouter();
  const { info } = useLocalSearchParams();

  const [aulas, setAulas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSections, setActiveSections] = useState<number[]>([]);

  let infoObj = { idmodulo: null, name: '', price: '0.00' };
  try {
    if (info && typeof info === 'string') {
      infoObj = JSON.parse(info);
    }
  } catch (error) {
    console.error('Error parsing info param in Aulas:', error);
  }

  if (!auth || !auth.user) {
    return <SafeAreaView style={styles.container}><ActivityIndicator color={colors.yellow} /></SafeAreaView>;
  }
  const { user } = auth;

  const URL = `${BASE_URL}${AULAS}?idmodulo=${infoObj.idmodulo}`;

  useEffect(() => {
    if (!infoObj.idmodulo) {
      setIsLoading(false);
      console.error('Missing idmodulo to fetch aulas');
      return;
    }
    
    setIsLoading(true);
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setAulas(data?.lstRows || []);
      })
      .catch(error => {
        console.error('Error fetching aulas:', error);
      }) 
      .finally(() => {
        setIsLoading(false);
      });

  }, [infoObj.idmodulo]);

  function renderHeader(section: any, _: number, isActive: boolean) {
    return (
      <View style={styles.accordHeader}>
        <Text style={styles.accordTitleText}>{section.title?.name || 'Aula'}</Text>
        <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} size={20} color={colors.blue.light} />
      </View>
    );
  }

  function renderContent(section: any, _: number, isActive: boolean) {
    return (
      section.content
    );
  }

  if (user.paid === 'N' && infoObj.price !== '0.00') {
    return (
      <SafeAreaView style={[styles.container, styles.centeredContainer]}>
        <Text style={styles.paymentTitle}>{i18n.t('Premium Content')}</Text>
        <Text style={styles.paymentText}>{i18n.t(`We hope you're enjoying your journey... We'd love to have you on board!`)}</Text>
        <Text style={styles.paymentSubText}>{i18n.t('Contact our team and purchase your course')}</Text>
        <TouchableOpacity
          style={styles.wppButton}
          onPress={() => {
            console.log('Navigate to WhatsApp');
          }}
        >
          <Text style={styles.wppButtonText}>{i18n.t('Get in touch')}</Text>
          <FontAwesomeIcon icon={faWhatsapp} size={20} color={colors.black.default} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.yellow} />
      ) : (
        <ScrollView style={styles.aulasListContainer}>
          {aulas.length > 0 ? (
            <Accordion
              sections={aulas.map((aula, index) => ({
                title: { name: aula.Description || `Aula ${index + 1}` },
                content: <AulasCard
                  key={aula.ID}
                  URL={aula.URL}
                  title={aula.Description || `Aula ${index + 1}`}
                />,
              }))}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={(sections: number[]) => setActiveSections(sections)}
              containerStyle={styles.accordionContainer}
              sectionContainerStyle={styles.accordionSection}
            />
          ) : (
            <Text style={styles.noAulasText}>Nenhuma aula encontrada para este módulo.</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black.default,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  aulasListContainer: {
    flex: 1,
  },
  accordHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[900],
  },
  accordTitleText: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white.default,
    flex: 1,
    marginRight: 8,
    fontFamily: fontFamily.montserratBold,
  },
  accordionContainer: {
    borderTopWidth: 1, 
    borderTopColor: colors.gray[900],
  },
  accordionSection: {
    backgroundColor: colors.gray[900],
  },
  noAulasText: {
    color: colors.gray[400],
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontFamily: fontFamily.inter,
  },
  paymentTitle: {
    fontWeight: '600',
    fontSize: 24,
    color: colors.white.default,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: fontFamily.montserratBold,
  },
  paymentText: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.gray[300],
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
    fontFamily: fontFamily.inter,
  },
  paymentSubText: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.gray[400],
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: fontFamily.inter500,
  },
  wppButton: {
    backgroundColor: '#25D366',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  wppButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black.default,
    textAlign: 'center',
    fontFamily: fontFamily.inter700,
  },
});