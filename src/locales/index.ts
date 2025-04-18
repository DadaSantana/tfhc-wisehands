import { Platform, NativeModules } from 'react-native';
import { DISCORD_LOG_WEBHOOK } from '@/consts';

const { I18nManager } = NativeModules;

// Função responsável por adquirir o idioma utilizado no device iOS ou Android
export const getLanguageByDevice = () => {
  const locale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS
    : NativeModules.I18nManager.localeIdentifier; // Android

  return locale || 'en'; // Retorna o locale completo (ex: "pt_BR", "en_US") ou 'en' como fallback
};

// Função que retorna um código de idioma simplificado (ex: "pt", "en")
export const getSimpleLanguageCode = () => {
  const deviceLocale = getLanguageByDevice();
  // Pega a primeira parte do locale (ex: "pt" de "pt_BR")
  const languageCode = deviceLocale.split(/[-_]/)[0];
  return languageCode || 'en'; // Retorna o código simplificado ou 'en' como fallback
};

// Exemplo de uso fixo (mantido da versão anterior, mas pode ser ajustado ou removido)
export const getDeviceLanguage = () => {
  // Usando a API nativa para obter o idioma do dispositivo
  // Esta função parece redundante ou com propósito diferente da getLanguageByDevice.
  // Atualmente fixo em 'pt-br'. Considerar remover ou alinhar com getLanguageByDevice/getSimpleLanguageCode.
  return 'pt-br'; // Fallback para 'en' caso não esteja disponível
};


// --- Logging para Discord ---
// Obtém o idioma detectado para o log
const detectedDeviceLanguage = getLanguageByDevice();
const detectedSimpleCode = getSimpleLanguageCode();

console.log('Detected Device Language:', detectedDeviceLanguage);
console.log('Detected Simple Language Code:', detectedSimpleCode);

// Envia log para o Discord (sem a variável 'lng' do i18next)
if (DISCORD_LOG_WEBHOOK) {
  fetch(DISCORD_LOG_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `[Language Detection]: Device Locale: ${detectedDeviceLanguage}, Simple Code: ${detectedSimpleCode}`,
    }),
  }).catch(error => {
    console.error('Error sending log to Discord:', error);
  });
} else {
  console.warn('DISCORD_LOG_WEBHOOK is not defined. Skipping log.');
}

// Não há mais inicialização do i18n aqui.
// O arquivo agora apenas exporta as funções de detecção de idioma.

// Exemplo de como importar em outro lugar:
// import { getLanguageByDevice, getSimpleLanguageCode } from '@/locales';
