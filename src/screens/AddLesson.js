import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TextInput,  FlatList, Alert, Dimensions } from 'react-native';
import globalStyles from '../components/globalStyles';
import GreenButton from '../components/Buttons/GreenButton';
import RedButton from '../components/Buttons/RedButton';
import ViewForm from '../components/Views/ViewForm';
import { AntDesign } from '@expo/vector-icons'; 
import logo from '../../assets/18151751060402.jpg';
import { AuthContext } from '../components/AuthProvider';
import RegisterStudentButton from '../components/Buttons/RegisterStudentButton';
import randomKeyGenerator from '../components/randomKeyGenerator';
import { splitSlashes, insertSlashes } from '../components/slashesHandler';

export default function AddLesson() {
    const [registerStudentModal, setRegisterStudentModal] = React.useState(false);
    const [addNewLessonModal, setAddNewLessonModal] = React.useState(false);
    const [studentInfo, setStudentInfo] = React.useState({});
    const [date, setDate] = React.useState('');
    const [dateBackHandler, setDateBackHandler] = React.useState('');
    const [kidName, setKidName] = React.useState('');
    const [dateBirth, setDateBirth] = React.useState('');
    const [parentName, setParentName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [houseNumber, setHouseNumber] = React.useState('');
    const [price, setPrice] = React.useState('0');

    const { students, studentsAdd, studentsEdit } = React.useContext(AuthContext);

    React.useEffect(() => {
        let nowDateBirth = dateBirth;
        if(dateBirth.length >= dateBackHandler.length) {
            setDateBackHandler(nowDateBirth);
            if(nowDateBirth.length === 2 || nowDateBirth.length === 5) {
                setDateBirth(nowDateBirth + '/');
                return;
            }

            let onlyDateBirth = splitSlashes(nowDateBirth, '/');
            if(onlyDateBirth.length > 7) {
                setDateBirth(insertSlashes(onlyDateBirth));
            }
        } else {
            setDateBackHandler(nowDateBirth);
        }
        
    }, [dateBirth]);

    function createStudent() {
        let randomnum = randomKeyGenerator();
        const newStudentObj = {
            id: randomnum,
            kidName: kidName,
            dateBirth: dateBirth,
            parentName: parentName,
            phoneNumber: phoneNumber,
            houseNumber: houseNumber,
            givenClasses: [],
            price: price,   
        }
        setDate('');
        setKidName('');
        setDateBirth('');
        setParentName('');
        setPhoneNumber('');
        setHouseNumber('');
        setPrice('0');
        studentsAdd(newStudentObj);
        setRegisterStudentModal(false);

        Alert.alert('Criar Aluno', 'Aluno Criado com sucesso');
    }

    function handleStudentPress(studentObj) {
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        if(date < 10) date = '0' + date;
        if(month < 10) month = '0' + month;
        setDate(date + '/' + month);
        setAddNewLessonModal(true);
        setStudentInfo(studentObj);
    }

    function addDateToStudent() {
        let studentObjInfo = studentInfo;
        studentObjInfo.givenClasses.push(date);
        studentsEdit(studentObjInfo);
        Alert.alert('Aula Cadastrada com Sucesso');
        setAddNewLessonModal(false);
    }
    return (
        <View style={styles.container}>
            {students? (<FlatList 
                data={students}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.studentContainer} onPress={() => handleStudentPress(item)}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={logo} />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.mainInfoContainer}>
                                <View style={{width: Dimensions.get('window').width}}>
                                    <Text style={globalStyles.bold_black_18_karla}>{item.kidName.length > 18? item.kidName.substring(0, 18) + '...': item.kidName}</Text>
                                </View>
                                <Text style={globalStyles.bold_black_14_karla}>{item.houseNumber}</Text>
                            </View>
                            <View style={styles.aditionalInfoContainer}>
                                <Text style={globalStyles.bold_black_12_karla}>A.D.: {item.givenClasses.length}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>)}
                keyExtractor={(item) => item.id}
            />): null}

            <Modal visible={addNewLessonModal} animationType='slide' transparent={true} onRequestClose={() => setAddNewLessonModal(false)}>
                <ViewForm style={styles.addLessonContainer}>
                    <View style={styles.addLessonBoxContainer}>
                        <View style={styles.addLessonInfoContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Adicionar aula para:</Text>
                            <Text style={globalStyles.bold_black_16_karla}>{studentInfo.kidName}</Text>
                            <TextInput style={[styles.input, {marginTop: 10, paddingVertical: 2, paddingHorizontal: 10, textAlign: 'center'}]} placeholder='eg. 17/10' keyboardType='phone-pad' defaultValue={date} onChangeText={(val) => setDate(val)}/>
                        </View>
                        <View style={styles.addLessonButtonContainer}>
                            <GreenButton onPress={addDateToStudent}>Adicionar</GreenButton>
                            <RedButton onPress={() => setAddNewLessonModal(false)}>Fechar</RedButton> 
                        </View>     
                    </View>
                </ViewForm>
            </Modal>


            <Modal visible={registerStudentModal} animationType='slide' onRequestClose={() => setRegisterStudentModal(false)}>
                <ViewForm style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setRegisterStudentModal(false)} activeOpacity={0.3}>
                        <AntDesign name="closecircleo" size={50} color="#BAB273" />
                    </TouchableOpacity>      
                    <Text style={[globalStyles.bold_black_18_karla, {marginBottom: 5}]}>Adicionar um Aluno</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Nome do Aluno</Text>
                            <TextInput style={styles.input} placeholder='eg. Cassiel Arruda' onChangeText={(val) => setKidName(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Data de Nascimento</Text>
                            <TextInput style={styles.input} placeholder='eg. 17/10/2006' keyboardType='phone-pad' value={dateBirth} onChangeText={(val) => {setDateBirth(val); }}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Nome do Responsável</Text>
                            <TextInput style={styles.input} placeholder='eg. Cristiani Arruda' onChangeText={(val) => setParentName(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Número do Telefone</Text>
                            <TextInput style={styles.input} placeholder='eg. 62988880000' keyboardType='phone-pad' onChangeText={(val) => setPhoneNumber(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Apartamento</Text>
                            <TextInput style={styles.input} placeholder='eg. Apto. 90' onChangeText={(val) => setHouseNumber(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Preço(reais)</Text>
                            <TextInput style={styles.input} placeholder='eg. 75' keyboardType='phone-pad' onChangeText={(val) => setPrice(val)}/>
                        </View>
                        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={createStudent}>
                            <Text style={globalStyles.bold_white_18_karla}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </ViewForm>
            </Modal>
            <RegisterStudentButton onPress={() => setRegisterStudentModal(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    /*Container dos alunos*/
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 0,
        position: 'relative',
    },
    studentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 16,
        paddingLeft: 30,
        paddingRight: 55,
        marginHorizontal: 0,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#BAB273',
        borderBottomWidth: 1,
        marginLeft: 15,
        paddingBottom: 16,
        width: '85%',
    },
    mainInfoContainer: {
        overflow: 'hidden',
        width: '80%',
    },
    aditionalInfoContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',   
        width: '20%',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        resizeMode: 'cover',
    },
    imageContainer: {
        paddingBottom: 5,
    },
    /*Container dos alunos*/

    /*Modal de adacionar alunos*/
    modalContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    formContainer: {
        width: '85%',
        marginBottom: 10,
    },
    inputContainer: {
        marginTop: 5,
    },
    input: {
        backgroundColor: '#9A8DD6',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 7,
        fontFamily: 'Karla_700Bold',
        fontSize: 16,
        color: '#FBFAFF',
        marginTop: 0,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2DCC69',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginTop: 20,
    },
    /*Modal de adacionar alunos*/

    /*Modal do box de adicionar aula*/
    addLessonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: '50%',
    },
    addLessonBoxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 170,
        width: 300, 
        paddingVertical: 15,
        shadowColor: "#000",
        borderColor: '#CCC591',
        borderWidth: 2,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addLessonInfoContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    addLessonButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    }
    /*Modal do box de adicionar aula*/
});