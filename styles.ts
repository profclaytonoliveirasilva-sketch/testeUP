import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    paddingTop: 50,
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
    color: '#222',
  },

  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
  },

  botao: {
    height: 50,
    backgroundColor: '#1976d2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2',
  },

  cardTexto: {
    fontSize: 15,
    marginBottom: 5,
    color: '#333',
  },

  botaoExcluir: {
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },

  textoBotaoExcluir: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

});

export default styles;