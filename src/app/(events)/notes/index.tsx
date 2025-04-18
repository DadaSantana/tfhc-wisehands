import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Inter_500Medium } from '@expo-google-fonts/inter';

// Imagens mockadas para demonstração
const mockImages = [
  { id: 1, uri: null },
  { id: 2, uri: null },
  { id: 3, uri: null },
  { id: 4, uri: null },
  { id: 5, uri: null },
  { id: 6, uri: null },
];

export default function AddNotesScreen() {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState('Notes');
  const [noteText, setNoteText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.');
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [showCursor, setShowCursor] = useState(true);
  
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Montserrat_600SemiBold,
    Inter_500Medium,
  });

  // Efeito para animar o cursor piscando
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleImagePress = (id: number) => {
    setSelectedImageId(id);
    setShowDeleteOption(true);
  };

  const handleDeleteImage = () => {
    setShowDeleteOption(false);
    setSelectedImageId(null);
    // Lógica para deletar a imagem no backend
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4C5B73" />
        </TouchableOpacity>
        <Text style={styles.title}>Eventos</Text>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.notesTitle}
            value={noteTitle}
            onChangeText={setNoteTitle}
            placeholder="Notes"
            placeholderTextColor="#212525"
          />
          {showCursor && <Text style={styles.cursor}>|</Text>}
        </View>
        
        <TextInput
          style={styles.noteText}
          value={noteText}
          onChangeText={setNoteText}
          placeholder="Digite aqui sua anotação..."
          placeholderTextColor="#666"
          multiline
          textAlignVertical="top"
        />
        
        <View style={styles.imagesGrid}>
          {mockImages.map((image, index) => (
            <TouchableOpacity
              key={image.id}
              style={styles.imageContainer}
              onPress={() => handleImagePress(image.id)}
            >
              <View style={styles.image}>
                <Ionicons name="image-outline" size={32} color="#999" />
              </View>
              <TouchableOpacity 
                style={styles.moreButton} 
                onPress={() => handleImagePress(image.id)}
              >
                <Ionicons name="ellipsis-vertical" size={20} color={index === 1 ? "#FFB800" : "#999"} />
              </TouchableOpacity>
              
              {index === 1 && showDeleteOption && selectedImageId === image.id && (
                <View style={styles.deleteContainer}>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={handleDeleteImage}
                  >
                    <Ionicons name="close" size={20} color="#FFB800" />
                    <Text style={styles.deleteText}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Manrope_600SemiBold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  notesTitle: {
    fontSize: 32,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#212525',
    padding: 0,
  },
  cursor: {
    fontSize: 32,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#212525',
  },
  noteText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#666',
    lineHeight: 24,
    marginBottom: 36,
    padding: 0,
    minHeight: 120,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteContainer: {
    position: 'absolute',
    top: 10,
    right: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteText: {
    color: '#FFB800',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    fontWeight: '600',
  },
  uploadButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 