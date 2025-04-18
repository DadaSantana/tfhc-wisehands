import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { BASE_URL, LIST_CURSOS, MESAS_API } from '@/consts';
import CursosCard from './CursosCard';
import { ScrollView, StyleSheet } from 'react-native';


export default function ListCursos() {
  const [cursos, setCursos] = useState([]);

  const API_URL = BASE_URL + LIST_CURSOS;

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCursos(data.lstRows);
      } catch (error) {
        console.log('Error fetching cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
    >
      {cursos.map((curso: any, index: number) => (
        <CursosCard
          key={index}
          ID={curso.ID}
          name={curso.Description}
          image={curso.Image}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 30,
  },
  contentContainer: {
    paddingHorizontal: 20,
    gap: 20,
  }
});