import { Button } from "@/components/globals/button";
import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { useAuth } from "@/context/auth";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import * as Application from 'expo-application';

const FX_HISTORY_PURCHASE = "https://api.newton.jrinvestments.uk/api/Forex/HistoryPurchase";
const BASE_URL = "https://api.gauss.jrinvestments.uk/service/";
const USER_UPDATE = "userupdate.php";
const VIEW_USER = "users.php";

function DeleteMyAccountModal({
    visible,
    onClose,
    onDeleteAccount,
    ...rest }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >
            <ViewModal>
                <ModalTitle>Are you sure you want to delete your account?</ModalTitle>
                <Text>We’ll be sad to see you go! 😢 If you click Yes, your account and all its data will be permanently
                    deleted. But if you click No, we’ll be thrilled to keep you with us! 🎉{'\n\n'}
                    So, what do you say? Stick around for more fun, or ready to part ways?</Text>
                <ViewOptions>
                    <ModalButtonYes onPress={onDeleteAccount}>
                        <ModalButtonYesText>Yes - I’m sure, delete my account.</ModalButtonYesText>
                    </ModalButtonYes>
                    <ModalButtonNo onPress={onClose}>
                        <ModalButtonNoText>No - I’ve changed my mind, let’s stay together!</ModalButtonNoText>
                    </ModalButtonNo>
                </ViewOptions>
            </ViewModal>
        </Modal>
    )
}

export default function MyProfile() {
    const [isEditable, setIsEditable] = useState(false);
    const router = useRouter();

    const [myUserid, setMyUserId] = useState('');
    const [name, setName] = useState('');
    //const [contato, setContato] = useState('');
    const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');
    // const [senha2, setSenha2] = useState('');
    const [cpf, setCPF] = useState('');
    const [banco, setBanco] = useState('');
    const [agencia, setAgencia] = useState('');
    const [conta, setConta] = useState('');
    const [telefone, setTelefone] = useState('');
    const [selectedButton, setSelectedButton] = useState(0);
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [showDeleteMyAccountModal, setShowDeleteMyAccountModal] = useState(false);

    const idconfig = 12

    const { user, signOut } = useAuth();
    const userid = user?.userId
    const token = user?.token;

    const handleEdit = () => {
        setIsEditable(true);
    };
    const handleCancel = () => {
        setIsEditable(false);
        router.replace("/profile");
    };

    const handleSave = async () => {
        const UPDATE_USER_API = BASE_URL + USER_UPDATE
        try {
            const response = await fetch(UPDATE_USER_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "ID": userid,
                    "Nome": name,
                    "Email": email,
                    "CPF": cpf,
                    "Banco": banco,
                    "Agencia": agencia,
                    "Conta": conta,
                    "Telefone": telefone,
                    "IDConfig": idconfig
                }),
            });
            //"Contato": contato,
            // "Senha": senha,
            // "Senha2": senha2,

            const data = await response.json();
            Alert.alert(`$Success`, `$Your data has been saved successfully!`);
            console.log('Profile updated successfully', data);

            setIsEditable(false);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };


    const fetchProfileData = async () => {
        const VIEW_USER_API = BASE_URL + VIEW_USER + '?id=' + userid
        try {
            const response = await fetch(VIEW_USER_API);
            const data = await response.json();


            setMyUserId(userid);
            setName(data.Nome);
            setEmail(data.Email);
            setCPF(data.CPF);
            setBanco(data.Banco);
            setAgencia(data.Agencia);
            setConta(data.Conta);
            setTelefone(data.Telefone);

        } catch (error) {
            console.error('Error fetching profile data', error);
        }
    };

    const fetchPurchaseHistory = async () => {
        try {
            const response = await fetch(FX_HISTORY_PURCHASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token
                }),

            });
            const data = await response.json();
            setPurchaseHistory(data.result);
        } catch (error) {
            console.error('Error fetching purchase history', error);
        }
    }

    useEffect(() => {
        fetchProfileData();
        fetchPurchaseHistory();
    }, []);

    return (

        <MainContainer>
            <HeaderMenuBack title="My Profile" color={colors.white.default} />
            <View style={{
                paddingHorizontal: 16,
            }}>
                {/* <HeadingContainer>
        <Title>My profile</Title>
      </HeadingContainer> */}
                <OptionsContainer>
                    <Button style={{ flex: 1 }} isActive={selectedButton == 0} onPress={() => setSelectedButton(0)}>
                        <Button.Text>My Profile</Button.Text>
                    </Button>

                    <Button style={{ flex: 1 }} isActive={selectedButton == 1} onPress={() => setSelectedButton(1)}>
                        <Button.Text>Purchase History</Button.Text>
                    </Button>

                </OptionsContainer>

                <ScrollContainer showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 50,
                    }}
                >
                    {
                        selectedButton == 0 ? (
                            <>
                                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingBottom: 20 }}>

                                    <View style={styles.containerForm}>

                                        <Title>Personal data</Title>
                                        <Info>User ID:</Info>
                                        <InputField
                                            style={[styles.input, isEditable && styles.editableInput]}
                                            editable={isEditable}
                                            value={myUserid}
                                            onChangeText={text => setName(text)}
                                        />
                                        <Info>Name:</Info>
                                        <InputField
                                            style={[styles.input, isEditable && styles.editableInput]}
                                            editable={isEditable}
                                            value={name}
                                            onChangeText={text => setName(text)}
                                        />
                                        <Info>Email:</Info>
                                        <InputField
                                            style={[styles.input, isEditable && styles.editableInput]}
                                            editable={isEditable}
                                            value={email}
                                            onChangeText={text => setEmail(text)}
                                            textContentType={'emailAddress'}
                                        />
                                        <Info>CPF:</Info>
                                        <InputField
                                            style={styles.input}
                                            editable={false}
                                            value={cpf}
                                        />

                                    </View>

                                    <View style={styles.containerForm}>
                                        <Title>Contact Details:</Title>
                                        <Info>Cel Phone:</Info>
                                        <InputField
                                            style={[styles.input, isEditable && styles.editableInput]}
                                            editable={isEditable}
                                            value={telefone}
                                            onChangeText={text => setTelefone(text)}
                                        />

                                    </View>

                                    <View style={styles.containerForm2}>
                                        <Title>Bank data</Title>
                                        <Info>Bank:</Info>
                                        <InputField
                                            style={[styles.input, isEditable && styles.editableInput]}
                                            editable={isEditable}
                                            value={banco}
                                            onChangeText={text => setBanco(text)}
                                        />

                                        <Info>Agency:</Info>
                                        <InputField
                                            style={[styles.input, isEditable && styles.editableInput]}
                                            editable={isEditable}
                                            value={agencia}
                                            onChangeText={text => setAgencia(text)}
                                        />

                                        <Info>Account:</Info>
                                        <InputField
                                            style={[styles.input, isEditable && styles.editableInput]}
                                            editable={isEditable}
                                            value={conta}
                                            onChangeText={text => setConta(text)}
                                        />

                                    </View>

                                    {!isEditable ? (
                                        <>
                                            <TouchableOpacity onPress={() => setShowDeleteMyAccountModal(true)} style={styles.deleteAccountButton}>
                                                <Text style={styles.deleteAccountButtonText}>Delete my account</Text>
                                            </TouchableOpacity>
                                            {/* <TouchableOpacity onPress={() => router.push('/profile/changepassword')} style={styles.passwordButton}>
                                                <Text style={styles.buttonText}>Change Password</Text>
                                            </TouchableOpacity> */}
                                            <TouchableOpacity onPress={() => signOut()} style={styles.outButton}>
                                                <Text style={styles.outButtonText}>Log out of account</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.versionText}>{Application.nativeApplicationVersion}</Text>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                            </>
                        ) : (
                            <View style={{ paddingTop: 4 }}>
                                {
                                    purchaseHistory.map((item) => {
                                        let ticketInfo = {}
                                        console.log("item", item)
                                        if (item.productsub != null &&
                                            item.idproductsub > 0
                                        ) {
                                            ticketInfo.isTicket = true
                                        }

                                        if (Object.entries(ticketInfo).length > 0 && ticketInfo) {
                                            console.log("ticketInfo", ticketInfo)
                                        }

                                        return <PurchasedItem
                                            key={item.id}
                                            itemName={item.product}
                                            itemPrice={item.price}
                                            itemPurchaseDate={item.createdat}
                                            itemObservation={item.obs}
                                            itemQRCodeCrypto={item.qrcodecrypto}
                                            itemRedeemed={item.redeemed}
                                            itemProductSub={item.productsub}
                                            {...ticketInfo}
                                        />
                                    }
                                    )
                                }
                            </View>
                        )
                    }

                </ScrollContainer>

                {!isEditable ? (
                    <></>
                ) : (
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                        <Text style={{ color: 'black', fontWeight: 700, fontSize: 18 }}>Save</Text>
                    </TouchableOpacity>
                )}

                <DeleteMyAccountModal
                    visible={showDeleteMyAccountModal}
                    onClose={() => setShowDeleteMyAccountModal(false)}
                    onDeleteAccount={() => {
                        fetch(DISCORD_LOG_WEBHOOK, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                content: `Account Deletion Requested: User ID [${userid}], Email [${email}], Username [${name}]. Initiated by user within the app. All associated data scheduled for deletion, pending any legal retention requirements. ${JSON.stringify({
                                    token,
                                })}`,
                            }),
                        })

                        fetch(PROFILE_REMOVE_MY_ACCOUNT, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                token,
                            }),
                        })
                            .then((res) => {
                                console.log(res)
                                console.log("Account deleted successfully");
                                signOut();
                            })
                            .catch(error => {
                                console.error('Error deleting account', error);
                                setShowDeleteMyAccountModal(false);
                            })
                    }}
                />
            </View>
        </MainContainer>
    );
};

const ViewModal = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  width: 80%;
  /* align-items: center; */
  justify-content: center;
  margin: auto;
`;

const ViewOptions = styled.View`
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #0D0E12;
  text-align: center;
  padding-bottom: 16px;
`;

const ModalButtonYes = styled.TouchableOpacity`
  background-color: #ff3f34;
  padding: 12px;
  border-radius: 4px;
  align-items: center;
`;

const ModalButtonYesText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

const ModalButtonNo = styled.TouchableOpacity`
  background-color: #0d0e12;
  padding: 12px;
  border-radius: 4px;
  align-items: center;
`;

const ModalButtonNoText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

const HeadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  `;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const MainContainer = styled.SafeAreaView`
    background-color: ${colors.green.light};
    flex: 1;
    padding: 0px 12px;
`

const OptionsContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const ScrollContainer = styled.ScrollView`
  padding-top: 8px;
`

const Title = styled.Text`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.green.dark};
  margin-top:8px;
  margin-bottom: 8px;
`
const Info = styled.Text`
  font-weight: 400;
  font-size: 20px;
  padding: 8px 0px 0px;
  color: ${colors.green.dark2};
`

const InputField = styled.TextInput`
  padding: 8px 0px;
  margin-bottom: 12px;
  width: 100%;
  color: ${colors.black.default};
  font-weight: 400;
  font-size: 18px;
`

const styles = StyleSheet.create({
    containerLogo: {
        paddingBottom: 50,
    },
    containerForm: {
        justifyContent: 'flex-start',
        width: '100%',
        paddingVertical: 8,
        backgroundColor: colors.white.default,
        paddingHorizontal: 16,
        marginTop: 8,
        borderRadius: 4,
    },
    containerForm2: {
        justifyContent: 'flex-start',
        width: '100%',
        paddingVertical: 8,
        backgroundColor: colors.white.default,
        paddingHorizontal: 16,
        marginTop: 8,
        marginBottom: 30,
        borderRadius: 4,
    },
    input: {
        color: '#fff',
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: '#ADB1BB',
        paddingVertical: 10,
        fontSize: 20,
    },
    editButton: {
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: '#E8E8E9',
        width: '22%',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingVertical: 8,
        borderRadius: 4,
    },
    saveButton: {
        backgroundColor: '#FF8500',
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 4,
        marginHorizontal: 8,
        position: 'absolute',
        bottom: 8
    },
    passwordButton: {
        backgroundColor: '#15181E',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 4,
        marginTop: 8,
    },
    outButton: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 4,
        borderWidth: 1,
    },
    deleteAccountButton: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 4,
        backgroundColor: '#ff3f34',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ADB1B8E5'
    },
    outButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.white.default
    },
    deleteAccountButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },
    link: {
        color: '#E8E8E9',
    },
    editableInput: {
        borderBottomWidth: 1,
        borderColor: '#65686DD9',
    },
    input: {},
    versionText: {
        color: '#fff',
        paddingBottom: 25,
        color: '#3A3A3A',
        alignSelf: 'center',
    },
});
