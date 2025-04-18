import React, { useEffect, useState } from "react";
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/globals/button";
import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { useAuth } from "@/context/auth";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/theme";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import * as Application from 'expo-application';

const FX_HISTORY_PURCHASE = "https://api.newton.jrinvestments.uk/api/Forex/HistoryPurchase";
const BASE_URL = "https://api.gauss.jrinvestments.uk/service/";
const USER_UPDATE = "userupdate.php";
const VIEW_USER = "users.php";

interface PurchaseHistoryItem {
    id: number;
    product: string;
    price: number;
    createdat: string;
    obs?: string;
    qrcodecrypto?: string;
    redeemed?: boolean;
    productsub?: string;
    idproductsub?: number;
}

interface DeleteMyAccountModalProps {
    visible: boolean;
    onClose: () => void;
    onDeleteAccount: () => void;
}

function DeleteMyAccountModal({ visible, onClose, onDeleteAccount }: DeleteMyAccountModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >
            <ViewModal>
                <ModalTitle>Are you sure you want to delete your account?</ModalTitle>
                <Text>We'll be sad to see you go! 😢 If you click Yes, your account and all its data will be permanently
                    deleted. But if you click No, we'll be thrilled to keep you with us! 🎉{'\n\n'}
                    So, what do you say? Stick around for more fun, or ready to part ways?</Text>
                <ViewOptions>
                    <ModalButtonYes onPress={onDeleteAccount}>
                        <ModalButtonYesText>Yes - I'm sure, delete my account.</ModalButtonYesText>
                    </ModalButtonYes>
                    <ModalButtonNo onPress={onClose}>
                        <ModalButtonNoText>No - I've changed my mind, let's stay together!</ModalButtonNoText>
                    </ModalButtonNo>
                </ViewOptions>
            </ViewModal>
        </Modal>
    )
}

export default function MyProfile() {
    const [isEditable, setIsEditable] = useState(false);
    const router = useRouter();
    const auth = useAuth();

    const [myUserid, setMyUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [banco, setBanco] = useState('');
    const [agencia, setAgencia] = useState('');
    const [conta, setConta] = useState('');
    const [telefone, setTelefone] = useState('');
    const [selectedButton, setSelectedButton] = useState(0);
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);
    const [showDeleteMyAccountModal, setShowDeleteMyAccountModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const idconfig = 12

    if (!auth || !auth.user) {
        return <View><Text>Loading user...</Text></View>;
    }
    const { user, signOut } = auth;
    const userid = user?.userId
    const token = user?.token;

    const handleEdit = () => {
        setIsEditable(true);
    };
    const handleCancel = () => {
        setIsEditable(false);
        fetchProfileData();
    };

    const handleSave = async () => {
        if (!userid || !token) return;
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

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", "Your data has been saved successfully!");
                setIsEditable(false);
            } else {
                throw new Error(data.msg || 'Failed to save profile');
            }
        } catch (error: any) {
            console.error('Error updating profile', error);
            Alert.alert('Error', error.message || "Could not save profile.");
        }
    };

    const fetchProfileData = async () => {
        if (!userid) return;
        setIsLoading(true);
        const VIEW_USER_API = BASE_URL + VIEW_USER + '?id=' + userid
        try {
            const response = await fetch(VIEW_USER_API);
            const data = await response.json();

            setMyUserId(userid);
            setName(data.Nome || '');
            setEmail(data.Email || '');
            setCPF(data.CPF || '');
            setBanco(data.Banco || '');
            setAgencia(data.Agencia || '');
            setConta(data.Conta || '');
            setTelefone(data.Telefone || '');
        } catch (error) {
            console.error('Error fetching profile data', error);
            Alert.alert("Error", "Could not load profile data.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPurchaseHistory = async () => {
        if (!token) return;
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
            setPurchaseHistory(data.result || []);
        } catch (error) {
            console.error('Error fetching purchase history', error);
        }
    }

    const handleDeleteConfirm = () => {
        setShowDeleteMyAccountModal(false);
        Alert.alert("Account Deletion", "Account deletion process initiated (not implemented yet).");
    };

    useEffect(() => {
        fetchProfileData();
        fetchPurchaseHistory();
    }, [userid]);

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <MainContainer>
            <HeaderMenuBack title="My Profile" color={colors.white.default} />
            <View style={{ paddingHorizontal: 16, flex: 1 }}>
                <OptionsContainer>
                    <Button style={{ flex: 1 }} isActive={selectedButton == 0} onPress={() => setSelectedButton(0)}>
                        My Profile
                    </Button>
                    <Button style={{ flex: 1 }} isActive={selectedButton == 1} onPress={() => setSelectedButton(1)}>
                        Purchase History
                    </Button>
                </OptionsContainer>

                <ScrollContainer showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                >
                    {selectedButton == 0 ? (
                        <View style={{ paddingBottom: 20 }}>
                            <View style={styles.containerForm}>
                                <Title>Personal data</Title>
                                <Info>User ID:</Info>
                                <InputField
                                    style={[styles.input]}
                                    editable={false}
                                    value={myUserid}
                                />
                                <Info>Name:</Info>
                                <InputField
                                    style={[styles.input, isEditable && styles.editableInput]}
                                    editable={isEditable}
                                    value={name}
                                    onChangeText={(text: string) => setName(text)}
                                />
                                <Info>Email:</Info>
                                <InputField
                                    style={[styles.input, isEditable && styles.editableInput]}
                                    editable={isEditable}
                                    value={email}
                                    onChangeText={(text: string) => setEmail(text)}
                                    textContentType={'emailAddress'}
                                    keyboardType={'email-address'}
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
                                    onChangeText={(text: string) => setTelefone(text)}
                                    keyboardType={'phone-pad'}
                                />
                            </View>

                            <View style={styles.containerForm2}>
                                <Title>Bank data</Title>
                                <Info>Bank:</Info>
                                <InputField
                                    style={[styles.input, isEditable && styles.editableInput]}
                                    editable={isEditable}
                                    value={banco}
                                    onChangeText={(text: string) => setBanco(text)}
                                />
                                <Info>Agency:</Info>
                                <InputField
                                    style={[styles.input, isEditable && styles.editableInput]}
                                    editable={isEditable}
                                    value={agencia}
                                    onChangeText={(text: string) => setAgencia(text)}
                                />
                                <Info>Account:</Info>
                                <InputField
                                    style={[styles.input, isEditable && styles.editableInput]}
                                    editable={isEditable}
                                    value={conta}
                                    onChangeText={(text: string) => setConta(text)}
                                />
                            </View>

                            {!isEditable ? (
                                <View style={{gap: 8}}>
                                    <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                                        <Text style={styles.buttonText}>Edit Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setShowDeleteMyAccountModal(true)} style={styles.deleteAccountButton}>
                                        <Text style={styles.deleteAccountButtonText}>Delete my account</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => signOut && signOut()} style={styles.outButton}>
                                        <Text style={styles.outButtonText}>Log out of account</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.versionText}>{Application.nativeApplicationVersion}</Text>
                                </View>
                            ) : (
                                <></>
                            )}
                        </View>
                    ) : (
                        <View style={{ paddingTop: 4 }}>
                            {purchaseHistory.length > 0 ? (
                                purchaseHistory.map((item) => (
                                    <View key={item.id} style={{ padding: 10, borderBottomWidth: 1, borderColor: colors.gray[600] }}>
                                        <Text style={{ color: colors.white.default }}>{item.product} - ${item.price}</Text>
                                        <Text style={{ color: colors.gray[400] }}>{new Date(item.createdat).toLocaleDateString()}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={{ color: colors.gray[400], textAlign: 'center', marginTop: 20 }}>No purchase history.</Text>
                            )}
                        </View>
                    )}
                </ScrollContainer>

                {isEditable && selectedButton == 0 ? (
                    <View style={styles.editFooterButtons}>
                        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>

            <DeleteMyAccountModal
                visible={showDeleteMyAccountModal}
                onClose={() => setShowDeleteMyAccountModal(false)}
                onDeleteAccount={handleDeleteConfirm}
            />
        </MainContainer>
    );
};

const ViewModal = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  width: 80%;
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

const MainContainer = styled.SafeAreaView`
    background-color: ${colors.green.light};
    flex: 1;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const ScrollContainer = styled.ScrollView`
  padding-top: 8px;
  flex: 1;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.green.dark};
  margin-top:8px;
  margin-bottom: 8px;
`;

const Info = styled.Text`
  font-weight: 400;
  font-size: 20px;
  padding: 8px 0px 0px;
  color: ${colors.green.dark2};
`;

const InputField = styled.TextInput`
  padding: 8px 0px;
  margin-bottom: 12px;
  width: 100%;
  color: ${colors.black.default};
  font-weight: 400;
  font-size: 18px;
`;

const styles = StyleSheet.create({
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
        borderRadius: 4,
    },
    input: {
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: '#ADB1BB',
        paddingVertical: 10,
        fontSize: 20,
    },
    editableInput: {
        borderBottomWidth: 1,
        borderColor: '#65686DD9',
    },
    editButton: {
        backgroundColor: colors.yellow,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 4,
        marginTop: 16,
    },
    editFooterButtons: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: colors.gray[300],
    },
    saveButton: {
        backgroundColor: colors.yellow,
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 4,
    },
    cancelButton: {
        backgroundColor: colors.gray[600],
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 4,
    },
    deleteAccountButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        backgroundColor: '#ff3f34',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white.default
    },
    deleteAccountButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },
    outButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.gray[600],
    },
    outButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.white.default
    },
    versionText: {
        paddingBottom: 25,
        color: '#3A3A3A',
        alignSelf: 'center',
        marginTop: 16,
        fontSize: 12,
    },
});
