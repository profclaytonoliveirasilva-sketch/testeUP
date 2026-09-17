import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Funcionario from './models/Funcionario';

import styles from './styles';

export default function Cadastro() {

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [unidade, setUnidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  // Lista de funcionários
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);


  // Executa quando a tela é aberta
  useEffect(() => {
    carregarFuncionarios();
  }, []);


  // =====================================================
  // CARREGAR DADOS DO STORAGE
  // =====================================================

  async function carregarFuncionarios() {
    try {
      const dados = await AsyncStorage.getItem('funcionarios');
      if (dados !== null) {
        const lista = JSON.parse(dados);
        setFuncionarios(lista);
      }
    } catch (error) {
      console.log('Erro ao carregar funcionários:', error);
    }
  }


  // =====================================================
  // CADASTRAR FUNCIONÁRIO
  // =====================================================

  async function cadastrar() {
    // Verificar se os campos estão preenchidos
    if (
      nome === '' ||  matricula === '' ||  email === '' ||  unidade === '' || endereco === '' ||  telefone === ''
    ) {

      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    // Criar objeto utilizando a classe
    const novoFuncionario = new Funcionario(
      nome, matricula, email, unidade, endereco, telefone);
    // Adicionar funcionário na lista
    const novaLista = [ ...funcionarios, novoFuncionario ];


    try {
      // Salvar no AsyncStorage
      await AsyncStorage.setItem( 'funcionarios', JSON.stringify(novaLista));
      // Atualizar a tela
      setFuncionarios(novaLista);
      // Limpar os campos
      limparCampos();
      Alert.alert('Sucesso','Funcionário cadastrado com sucesso!');

    } catch (error) {
      console.log( 'Erro ao salvar funcionário:', error);
    }
  }


  // =====================================================
  // LIMPAR CAMPOS
  // =====================================================

  function limparCampos() {

    setNome('');
    setMatricula('');
    setEmail('');
    setUnidade('');
    setEndereco('');
    setTelefone('');
  }


  // =====================================================
  // EXCLUIR FUNCIONÁRIO
  // =====================================================

  async function excluirFuncionario(index: number) {
    Alert.alert('Excluir','Deseja realmente excluir este funcionário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            const novaLista = funcionarios.filter(
              (_, i) => i !== index
            );
            setFuncionarios(novaLista);
            await AsyncStorage.setItem('funcionarios', JSON.stringify(novaLista) );
          },
        },
      ]
    );
  }


  // =====================================================
  // EXIBIR FUNCIONÁRIO
  // =====================================================

  function renderFuncionario({
    item,
    index,
  }: {
    item: Funcionario;
    index: number;
  }) {

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{item.nome}</Text>
        <Text style={styles.cardTexto}>Matrícula: {item.matricula} </Text>
        <Text style={styles.cardTexto}>E-mail: {item.email} </Text>
        <Text style={styles.cardTexto}>Unidade: {item.unidade}</Text>
        <Text style={styles.cardTexto}>Endereço: {item.endereco}</Text>
        <Text style={styles.cardTexto}>Telefone: {item.telefone}</Text>
        <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirFuncionario(index)} >
          <Text style={styles.textoBotaoExcluir}> Excluir </Text>
        </TouchableOpacity>
      </View>
    );
  }


  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Funcionário</Text>
      <TextInput  style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome}/>

      <TextInput style={styles.input} placeholder="Matrícula" value={matricula}
        onChangeText={setMatricula} keyboardType="numeric" />

      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail}
        keyboardType="email-address"  autoCapitalize="none"/>

      <TextInput  style={styles.input} placeholder="Unidade alocada" value={unidade} onChangeText={setUnidade}/>

      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco}/>

      <TextInput style={styles.input} placeholder="Telefone celular"  value={telefone}
        onChangeText={setTelefone}keyboardType="phone-pad"/>

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Funcionários cadastrados</Text>

      <FlatList  data={funcionarios}  keyExtractor={(_, index) => index.toString()}
        renderItem={renderFuncionario} showsVerticalScrollIndicator={true} />

    </View>
  );
}

//novo
/*
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Funcionario from './models/Funcionario';

import styles from './styles';

export default function Cadastro() {

  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [unidade, setUnidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function carregarFuncionarios() {

    try {

      const dados = await AsyncStorage.getItem('funcionarios');

      if (dados !== null) {

        const lista = JSON.parse(dados);

        setFuncionarios(lista);
      }

    } catch (error) {

      console.log('Erro ao carregar funcionários:', error);
    }
  }

  async function cadastrar() {

    if (
      nome === '' ||
      matricula === '' ||
      email === '' ||
      unidade === '' ||
      endereco === '' ||
      telefone === ''
    ) {

      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );

      return;
    }

    const funcionarioExistente = funcionarios.find(
      funcionario => funcionario.matricula === matricula
    );

    if (funcionarioExistente) {

      Alert.alert(
        'Atenção',
        'Já existe um funcionário com esta matrícula.'
      );

      return;
    }

    const novoFuncionario = new Funcionario(
      nome,
      matricula,
      email,
      unidade,
      endereco,
      telefone
    );

    const novaLista = [
      ...funcionarios,
      novoFuncionario
    ];

    try {

      await AsyncStorage.setItem(
        'funcionarios',
        JSON.stringify(novaLista)
      );

      setFuncionarios(novaLista);

      limparCampos();

      Alert.alert(
        'Sucesso',
        'Funcionário cadastrado com sucesso!'
      );

    } catch (error) {

      console.log(
        'Erro ao salvar funcionário:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível salvar o funcionário.'
      );
    }
  }

  function limparCampos() {

    setNome('');
    setMatricula('');
    setEmail('');
    setUnidade('');
    setEndereco('');
    setTelefone('');
  }

  function excluirFuncionario(matriculaFuncionario: string) {

    Alert.alert(
      'Excluir funcionário',
      'Deseja realmente excluir este funcionário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',
          style: 'destructive',

          onPress: async () => {

            try {

              const novaLista = funcionarios.filter(
                funcionario =>
                  funcionario.matricula !== matriculaFuncionario
              );

              await AsyncStorage.setItem(
                'funcionarios',
                JSON.stringify(novaLista)
              );

              setFuncionarios(novaLista);

              Alert.alert(
                'Sucesso',
                'Funcionário excluído com sucesso!'
              );

            } catch (error) {

              console.log(
                'Erro ao excluir funcionário:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir o funcionário.'
              );
            }
          },
        },
      ]
    );
  }

  function renderFuncionario({
    item,
  }: {
    item: Funcionario;
    index: number;
  }) {

    return (

      <View style={styles.card}>

        <Text style={styles.cardTitulo}>
          {item.nome}
        </Text>

        <Text style={styles.cardTexto}>
          Matrícula: {item.matricula}
        </Text>

        <Text style={styles.cardTexto}>
          E-mail: {item.email}
        </Text>

        <Text style={styles.cardTexto}>
          Unidade: {item.unidade}
        </Text>

        <Text style={styles.cardTexto}>
          Endereço: {item.endereco}
        </Text>

        <Text style={styles.cardTexto}>
          Telefone: {item.telefone}
        </Text>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() =>
            excluirFuncionario(item.matricula)
          }
        >

          <Text style={styles.textoBotaoExcluir}>
            Excluir
          </Text>

        </TouchableOpacity>

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Cadastro de Funcionário
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Unidade alocada"
        value={unidade}
        onChangeText={setUnidade}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone celular"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrar}
      >

        <Text style={styles.textoBotao}>
          Cadastrar
        </Text>

      </TouchableOpacity>

      <Text style={styles.subtitulo}>
        Funcionários cadastrados
      </Text>

      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.matricula}
        renderItem={renderFuncionario}
        showsVerticalScrollIndicator={true}
      />

    </View>
  );
}
```

### `models/Funcionario.ts`

```tsx
export default class Funcionario {

  nome: string;
  matricula: string;
  email: string;
  unidade: string;
  endereco: string;
  telefone: string;

  constructor(
    nome: string,
    matricula: string,
    email: string,
    unidade: string,
    endereco: string,
    telefone: string
  ) {

    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.unidade = unidade;
    this.endereco = endereco;
    this.telefone = telefone;
  }
}
*/
